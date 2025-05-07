import web3 from "@solana/web3.js";
import { orcaPoolPriceReader, orcaSwapQuote } from "./orcaPool";
import { meteoraPoolPriceReader, meteoraSwapQuote } from "./meteoraDammPool";
import Decimal from "decimal.js";
import bs58 from "bs58";
import * as spl from "@solana/spl-token";
import { config as configDotEnv } from "dotenv";
import path from "path";

configDotEnv({ path: path.join(__dirname, "../.env") });

// rpc
const connection = new web3.Connection(process.env.RPC_ENDPOINT!);

// tokens to deal with
const wfragSolAddr = new web3.PublicKey("WFRGSWjaz8tbAxsJitmbfRuFV2mSNwy7BMWcCwaA28U");
const jitoSolAddr = new web3.PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn");

// constants
const DECIMALS = 10**9;

const threshold = new Decimal(0.1);
const swapSlippage = 0.1;

// const walletSecretKey = fs.readFileSync(path.join(__dirname, "../wallet-keypair.json"), "utf8").trim();
const wallet = web3.Keypair.fromSecretKey(Uint8Array.from(bs58.decode(process.env.WALLET_PRIVATE_KEY!)));

const orcaMeteoraArbitrage = async () => {
    const walletWfragSolTokenBalance = await getWalletTokenBalance(connection, wallet.publicKey, wfragSolAddr);
    const walletJitoSolTokenTotalBalance = await getWalletTokenBalance(connection, wallet.publicKey, jitoSolAddr);

    const walletJitoSolTokenBalance = walletJitoSolTokenTotalBalance.sub(Math.floor(0.4033073869999999 * DECIMALS));
    console.log(`wallet's wfragSOL balance: ${walletWfragSolTokenBalance.div(new Decimal(DECIMALS))}`);
    console.log(`wallet's JitoSOL balance: ${walletJitoSolTokenBalance.div(new Decimal(DECIMALS))}`);

    const orcaPoolPrice = await orcaPoolPriceReader(connection);
    const meteoraPoolPrice = await meteoraPoolPriceReader(connection);

    console.log(`Current orca pool price:`, orcaPoolPrice);
    console.log(`Current meteora pool price:`, meteoraPoolPrice);

    const deviation = getPriceDeviation(orcaPoolPrice, meteoraPoolPrice);
    console.log(`deviation:`, deviation);

    if (deviation.greaterThan(threshold)) { // capture arbitrage opportunity
        if (orcaPoolPrice < meteoraPoolPrice) {
            // then orca's wfragSOL is cheaper than meteora's
            // we should buy wfragSOL from orca and sell it on meteora
            // 1. swap JitoSOL to wfragSOL at Orca
            // 2. swap wfragSOL to JitoSOL at Meteora
            console.log(`Let's buy wfragSOL at Orca and sell it on Meteora`);

            const orcaSwapQuoteRes = await orcaSwapQuote(connection, jitoSolAddr, walletJitoSolTokenBalance, swapSlippage);

            // recheck price
            if (meteoraPoolPrice < orcaSwapQuoteRes.estimatedEndPrice) {
                let swapQuoteRes;
                let swapInAmount = walletJitoSolTokenBalance;
                do {
                    console.log(`Huge price impact occured at Orca! Let's set the swapInAmount lower for lower price impact and for valid swap`);
                    swapQuoteRes = await meteoraFirstOrcaBehind(connection, jitoSolAddr, wfragSolAddr, swapInAmount, swapSlippage);
                    if (!swapQuoteRes) {
                        swapInAmount = swapInAmount.div(2).floor();
                    }
                } while (!swapQuoteRes);
                console.log(`Let's do swap with ${swapInAmount.div(DECIMALS)}`);
            } else {
                await orcaFirstMeteoraBehind(connection, jitoSolAddr, wfragSolAddr, walletJitoSolTokenBalance, swapSlippage);
            }
        } else if (orcaPoolPrice > meteoraPoolPrice) {
            // do opposite
            console.log(`Let's buy wfragSOL at Meteora and sell it on Orca`);

            const meteoraSwapQuoteRes = await meteoraSwapQuote(connection, jitoSolAddr, wfragSolAddr, walletJitoSolTokenBalance, swapSlippage);

            // const orcaSwapQuoteRes2 = await orcaSwapQuote(wfragSolAddr, walletWfragSolTokenBalance.add(meteoraSwapQuoteRes.swapOutAmount), swapSlippage);

            // recheck price
            if (orcaPoolPrice < meteoraSwapQuoteRes.swapOutTokenPrice) {
                let swapQuoteRes;
                let swapInAmount = walletJitoSolTokenBalance;
                do {
                    console.log(`Huge price impact occured at Meteora! Let's set the swapInAmount lower for lower price impact and for valid swap`);
                    swapQuoteRes = await orcaFirstMeteoraBehind(connection, jitoSolAddr, wfragSolAddr, swapInAmount, swapSlippage);
                    if (!swapQuoteRes) {
                        swapInAmount = swapInAmount.div(2).floor();
                    }
                } while (!swapQuoteRes);
                console.log(`Let's do swap with ${swapInAmount.div(DECIMALS)}`);
            } else {
                await meteoraFirstOrcaBehind(connection, jitoSolAddr, wfragSolAddr, walletJitoSolTokenBalance, swapSlippage);
            }
        }
    }
}

const getWalletTokenBalance = async (connection: web3.Connection, wallet: web3.PublicKey, tokenMint: web3.PublicKey): Promise<Decimal> => {
    const tokenAddress = spl.getAssociatedTokenAddressSync(tokenMint, wallet, false);
    const tokenBalance = await connection.getTokenAccountBalance(tokenAddress);
    return new Decimal(tokenBalance.value.amount);
}

const getPriceDeviation = (priceA: Decimal, priceB: Decimal) => {
    // deviation = abs(priceA - priceB) / avg(priceA, priceB)
    const deviation = Decimal.abs(priceA.sub(priceB))
        .div(
            (priceA.add(priceB)).div(new Decimal(2))
        );
    return deviation;
}

const orcaFirstMeteoraBehind = async (connection: web3.Connection, firstInTokenMint: web3.PublicKey, firstOutTokenMint: web3.PublicKey, swapInAmount: Decimal, swapSlippage: number) => {
    const orcaSwapQuoteRes = await orcaSwapQuote(connection, firstInTokenMint, swapInAmount, swapSlippage);
    const meteoraSwapQuoteRes = await meteoraSwapQuote(connection, firstOutTokenMint, firstInTokenMint, orcaSwapQuoteRes.estimatedAmountOut, swapSlippage);

    if (meteoraSwapQuoteRes.swapOutAmount < swapInAmount) {
        return null; // do again
    } else {
        // do swap
        return meteoraSwapQuoteRes.swapOutAmount;
    }
}

const meteoraFirstOrcaBehind = async (connection: web3.Connection, firstInTokenMint: web3.PublicKey, firstOutTokenMint: web3.PublicKey, swapInAmount: Decimal, swapSlippage: number) => {
    const meteoraSwapQuoteRes = await meteoraSwapQuote(connection, firstInTokenMint, firstOutTokenMint, swapInAmount, swapSlippage);
    const orcaSwapQuoteRes = await orcaSwapQuote(connection, firstOutTokenMint, meteoraSwapQuoteRes.swapOutAmount, swapSlippage);

    if (orcaSwapQuoteRes.estimatedAmountOut < swapInAmount) {
        return null; // do again
    } else {
        // do swap
        return orcaSwapQuoteRes.estimatedAmountOut;
    }
}

orcaMeteoraArbitrage();
