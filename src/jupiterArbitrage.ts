import web3, { AddressLookupTableAccount, TransactionInstruction, TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import Decimal from "decimal.js";
import bs58 from "bs58";
import * as spl from "@solana/spl-token";
import { config as configDotEnv } from "dotenv";
import path from "path";
import fetch from "node-fetch";
import { RestakingProgram } from "@fragmetric-labs/sdk";

configDotEnv({ path: path.join(__dirname, "../.env") });

// rpc
const connection = new web3.Connection(process.env.RPC_ENDPOINT!);

// tokens to deal with
const wfragSolAddr = new web3.PublicKey("WFRGSWjaz8tbAxsJitmbfRuFV2mSNwy7BMWcCwaA28U");
const jitoSolAddr = new web3.PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn");

// constants
const DECIMALS = 10**9;

const wallet = web3.Keypair.fromSecretKey(Uint8Array.from(bs58.decode(process.env.WALLET_PRIVATE_KEY!)));

// fragmetric
const fragmetric = RestakingProgram.mainnet(process.env.RPC_ENDPOINT);

const jupiterArbitrage = async () => {
    const fragSOLFund = await fragmetric.fragSOL.resolve();

    const inTokenMint = jitoSolAddr;
    const outTokenMint = wfragSolAddr;

    const walletInputTokenTotalBalance = await getWalletTokenBalance(connection, wallet.publicKey, inTokenMint);
    const walletOutTokenTotalBalance = await getWalletTokenBalance(connection, wallet.publicKey, outTokenMint);

    const walletInputTokenBalance = walletInputTokenTotalBalance.sub(Math.floor(0.4033073869999999 * DECIMALS));
    console.log(`wallet's input token (${inTokenMint}) balance: ${walletInputTokenBalance.div(new Decimal(DECIMALS))}`);
    console.log(`wallet's output token (${outTokenMint}) balance: ${walletOutTokenTotalBalance.div(new Decimal(DECIMALS))}`);

    // jupiter ultra api
    // await getJupiterUltraSwapOrder(
    //     jitoSolAddr,
    //     wfragSolAddr,
    //     walletJitoSolTokenBalance,
    //     wallet.publicKey,
    // );

    // find appropriate swapInAmount for arbitrage
    // jupiter swap api

    let maxProfit = new Decimal(0);
    let maxProfitSwapAmount = new Decimal(0);
    let maxProfitSwapQuoteResList: any[] = [];

    let low = new Decimal(0);
    let high = walletInputTokenBalance;
    let swapInAmount = walletInputTokenBalance;
    let breakThreshold = new Decimal(0.00001 * DECIMALS); // tx fee * 2

    while (true) {
        const inToOutTokenSwapQuoteRes = await getJupiterSwapQuote(
            inTokenMint,
            outTokenMint,
            swapInAmount,
            false, // dynamicSlippage
            30, // 10 bps = 0.1%
        );
        if (!inToOutTokenSwapQuoteRes) continue;
        const outToInTokenSwapQuoteRes = await getJupiterSwapQuote(
            outTokenMint,
            inTokenMint,
            new Decimal(inToOutTokenSwapQuoteRes.outAmount),
            false, // dynamicSlippage
            30, // 10 bps = 0.1%
        );
        if (!outToInTokenSwapQuoteRes) continue;

        const input = new Decimal(inToOutTokenSwapQuoteRes.inAmount);
        const returned = new Decimal(outToInTokenSwapQuoteRes.outAmount);

        if (returned.greaterThan(input)) { // then it's arbitragey opportunity -> need swap
            const profit = returned.sub(input);

            if (profit.greaterThan(maxProfit)) {
                maxProfit = profit;
                maxProfitSwapAmount = swapInAmount;
                maxProfitSwapQuoteResList = [inToOutTokenSwapQuoteRes, outToInTokenSwapQuoteRes];
            }

            // 더 나은 기회 탐색
            low = swapInAmount;
            swapInAmount = swapInAmount.add(
                high.sub(swapInAmount).div(2).floor()
            );
        } else {
            high = swapInAmount;
            swapInAmount = swapInAmount.sub(
                swapInAmount.sub(low).div(2).floor()
            );
        }

        if (high.sub(low).lessThan(breakThreshold)) {
            console.log(`Found arbitrage opportunity with swapInAmount = ${maxProfitSwapAmount.toString()}`);
            break;
        }
    }

    if (maxProfitSwapAmount.equals(0) || maxProfitSwapQuoteResList.length !== 2) {
        console.log("No arbitrage opportunity found in current range.");
        return; // 또는 에러 throw, fallback 처리
    }

    // do swap with calculated optimal swapInAmount
    console.log(`calculated optimal swapInAmount: ${maxProfitSwapAmount}`);

    const estimatedProfitAsInputToken = new Decimal(maxProfitSwapQuoteResList[1].outAmount).sub(maxProfitSwapAmount);
    console.log(`estimated profit (JitoSOL): ${estimatedProfitAsInputToken}`);
    console.log(`calculated max profit (JitoSOL): ${maxProfit}`);

    const inTokenAsSolValue = fragSOLFund?.supportedAssets.filter(asset => asset.mint == inTokenMint.toString())[0].oneTokenAsSol;
    const estimatedProfitAsSol = estimatedProfitAsInputToken.mul(inTokenAsSolValue!.toString()).div(DECIMALS).floor();
    console.log(`estimated profit (SOL): ${estimatedProfitAsSol}`);

    let swapInstructionResults = [];
    for (const swapQuoteRes of maxProfitSwapQuoteResList) {
        // await buildSwapJupiterTx(swapQuoteRes, wallet.publicKey);

        swapInstructionResults.push(await buildSwapJupiterInstructions(swapQuoteRes, wallet.publicKey, false, 30));
    }

    const addressLookupTableAccounts: AddressLookupTableAccount[] = [];

    const lookupTableAccountsNested = await Promise.all(
        swapInstructionResults.map(swapInstructionResult => getAddressLookupTableAccounts(swapInstructionResult.addressLookupTableAddresses))
    );
    const lookupTableAccounts = lookupTableAccountsNested.flat();

    addressLookupTableAccounts.push(...lookupTableAccounts);

    const { blockhash } = await connection.getLatestBlockhash();
    const messageV0 = new TransactionMessage({
        payerKey: wallet.publicKey,
        recentBlockhash: blockhash,
        instructions: [
            ...(swapInstructionResults.map(swapInstructionResult => deserializeInstruction(swapInstructionResult.swapInstructionPayload))),
        ],
    }).compileToV0Message(addressLookupTableAccounts);
    const transaction = new VersionedTransaction(messageV0);

    // calculate transaction fee
    const txFeeCalculator = await connection.getFeeForMessage(messageV0);
    let txFee = txFeeCalculator.value;
    if (!txFee) {
        txFee = 5_000;
    }

    if (estimatedProfitAsSol.greaterThan(txFee)) {
        // do swap -> send tx
        transaction.sign([wallet]);
        const transactionBinary = transaction.serialize();

        const txHash = await connection.sendRawTransaction(transactionBinary, {
            maxRetries: 2,
            skipPreflight: false,
        });

        // confirm tx
        const txConfirmation = await connection.confirmTransaction(txHash, "confirmed");
        if (txConfirmation.value.err) {
            throw new Error(`Transaction failed: ${JSON.stringify(txConfirmation.value.err)}\nhttps://solscan.io/tx/${txHash}/`);
        } else console.log(`Transaction successful: https://solscan.io/tx/${txHash}/`);
    } else {
        // no swap occurs
        console.log(`No arbitrage opportunity found!`);
    }
}

const getWalletTokenBalance = async (connection: web3.Connection, wallet: web3.PublicKey, tokenMint: web3.PublicKey): Promise<Decimal> => {
    const tokenAddress = spl.getAssociatedTokenAddressSync(tokenMint, wallet, false);
    const tokenBalance = await connection.getTokenAccountBalance(tokenAddress);
    return new Decimal(tokenBalance.value.amount);
}

const getJupiterUltraSwapOrder = async (inTokenMint: web3.PublicKey, outTokenMint: web3.PublicKey, swapInAmount: Decimal, recipient: web3.PublicKey, referralAccount?: web3.PublicKey, referralFee?: Decimal) => {
    let uri = `${process.env.JUPITER_ULTRA_API_BASE_ENDPOINT}?inputMint=${jitoSolAddr.toString()}&outputMint=${wfragSolAddr.toString()}&amount=${swapInAmount.toString()}&taker=${recipient.toString()}`;
    if (referralAccount) {
        uri += `&referralAccount=${referralAccount.toString()}`;
    }
    if (referralFee) {
        uri += `&referralFee=${referralFee.toString()}`;
    }

    const swapOrderRes = await (await fetch(uri)).json();
    console.log(JSON.stringify(swapOrderRes, null, 2));

    return swapOrderRes;
}

const getJupiterSwapQuote = async (inTokenMint: web3.PublicKey, outTokenMint: web3.PublicKey, swapInAmount: Decimal, dynamicSlippage: boolean, slippageBps: number = 10) => {
    let uri = `${process.env.JUPITER_SWAP_API_BASE_ENDPOINT}quote?inputMint=${inTokenMint.toString()}&outputMint=${outTokenMint.toString()}&amount=${swapInAmount.toString()}&restrictIntermediateTokens=true`;

    if (dynamicSlippage) {
        uri += `&dynamicSlippage=${dynamicSlippage}`;
    } else {
        uri += `&slippageBps=${slippageBps}`;
    }

    const swapQuoteRes = await (await fetch(uri)).json();
    console.log(`swap quote response:`, JSON.stringify(swapQuoteRes, null, 2));

    return swapQuoteRes;
}

const buildSwapJupiterTx = async (quoteResponse: any, wallet: web3.PublicKey) => {
    const uri = `${process.env.JUPITER_SWAP_API_BASE_ENDPOINT}swap`;

    const swapRes = await (await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            quoteResponse,
            userPublicKey: wallet.toString(),
            dynamicComputeUnitLimit: true,
            dynamicSlippage: true,
            prioritizationFeeLamports: {
                priorityLevelWithMaxLamports: {
                    maxLamports: 1_000_000,
                    priorityLevel: "medium", // 25th percentile
                },
            },
        }),
    })).json();

    console.log(`swap response:`, JSON.stringify(swapRes, null, 2));
}

const buildSwapJupiterInstructions = async (quoteResponse: any, wallet: web3.PublicKey, dynamicSlippage: boolean, slippageBps: number = 10) => {
    const uri = `${process.env.JUPITER_SWAP_API_BASE_ENDPOINT}swap-instructions`;

    const instructions = await (await fetch(uri, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            quoteResponse,
            userPublicKey: wallet.toString(),
            dynamicComputeUnitLimit: true,
            dynamicSlippage,
            slippageBps, // 10 bps = 0.1%
            prioritizationFeeLamports: {
                priorityLevelWithMaxLamports: {
                    maxLamports: 1_000_000,
                    priorityLevel: "medium", // 25th percentile
                },
            },
        }),
    })).json();

    if (instructions.error) {
        throw new Error("Failed to get swap instructions: " + instructions.error);
    }

    const {
        tokenLedgerInstruction, // If you are using `useTokenLedger = true`.
        computeBudgetInstructions, // The necessary instructions to setup the compute budget.
        setupInstructions, // Setup missing ATA for the users.
        swapInstruction: swapInstructionPayload, // The actual swap instruction.
        cleanupInstruction, // Unwrap the SOL if `wrapAndUnwrapSol = true`.
        addressLookupTableAddresses, // The lookup table addresses that you can use if you are using versioned transaction.
    }: any = instructions;

    return {
        tokenLedgerInstruction,
        computeBudgetInstructions,
        setupInstructions,
        swapInstructionPayload,
        cleanupInstruction,
        addressLookupTableAddresses,
    };
}

const deserializeInstruction = (instruction: any) => {
    return new TransactionInstruction({
        programId: new web3.PublicKey(instruction.programId),
        keys: instruction.accounts.map((key: any) => ({
            pubkey: new web3.PublicKey(key.pubkey),
            isSigner: key.isSigner,
            isWritable: key.isWritable,
        })),
        data: Buffer.from(instruction.data, "base64"),
    });
}

const getAddressLookupTableAccounts = async (keys: string[]): Promise<AddressLookupTableAccount[]> => {
    const addressLookupTableAccountInfos = await connection.getMultipleAccountsInfo(
        keys.map(key => new web3.PublicKey(key))
    );

    return addressLookupTableAccountInfos.reduce((acc, accountInfo, index) => {
        const addressLookupTableAddress = keys[index];
        if (accountInfo) {
            const addressLookupTableAccount = new AddressLookupTableAccount({
                key: new web3.PublicKey(addressLookupTableAddress),
                state: AddressLookupTableAccount.deserialize(accountInfo.data),
            });
            acc.push(addressLookupTableAccount);
        }

        return acc;
    }, new Array<AddressLookupTableAccount>());
}

jupiterArbitrage();
