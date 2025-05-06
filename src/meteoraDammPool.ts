import web3 from "@solana/web3.js";
import { AnchorProvider, Program, BorshInstructionCoder, Idl, BN } from "@coral-xyz/anchor";
import AmmImpl from "@meteora-ag/dynamic-amm-sdk";
import Decimal from "decimal.js";

// tokens to deal with
const wfragSolAddr = new web3.PublicKey("WFRGSWjaz8tbAxsJitmbfRuFV2mSNwy7BMWcCwaA28U");
const jitoSolAddr = new web3.PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn");

// meteora pools
const meteoraWfragSolJitoSolPoolAddr = new web3.PublicKey("iMTNY8mkASoED5kmGFrmbJXmV4GpWuhn92JRYGEMUuV");

const DECIMALS = 10**9;

export const meteoraPoolPriceReader = async (connection: web3.Connection) => {
    const dammPool = await AmmImpl.create(connection, meteoraWfragSolJitoSolPoolAddr);
    // console.log(dammPool);

    const tokenA = dammPool.tokenAMint;
    const tokenB = dammPool.tokenBMint;
    const baseToken = tokenA;

    const tokenAReserve = new Decimal(dammPool.poolInfo.tokenAAmount.toString());
    const tokenBReserve = new Decimal(dammPool.poolInfo.tokenBAmount.toString());
    let poolPrice = tokenBReserve.div(tokenAReserve);
    if (baseToken.address.equals(jitoSolAddr)) {
        poolPrice = new Decimal(1).div(poolPrice);
    }
    console.log(`tokenA reserve: ${tokenAReserve.toString()}, tokenB reserve: ${tokenBReserve.toString()}`);
    console.log(`current pool price (tokenB=${tokenB.address}/tokenA=${tokenA.address}): ${poolPrice.toString()}`);

    return poolPrice;
}

export const meteoraSwapQuote = async (connection: web3.Connection, inTokenMint: web3.PublicKey, outTokenMint: web3.PublicKey, swapInAmount: Decimal, slippage: number) => {
    const dammPool = await AmmImpl.create(connection, meteoraWfragSolJitoSolPoolAddr);

    const tokenA = dammPool.tokenAMint;
    const tokenB = dammPool.tokenBMint;
    const baseToken = tokenA;

    const swapQuote = dammPool.getSwapQuote(inTokenMint, new BN(swapInAmount.toString()), slippage);
    console.log(`Meteora Swap simulation:`);
    console.log(`> inToken: ${inTokenMint}, outToken: ${outTokenMint}, slippage: ${slippage}`);
    console.log(`> swapQuote - swapInAmount:`, new Decimal(swapQuote.swapInAmount.toString()).div(DECIMALS));
    console.log(`>  - swapOutAmount:`, new Decimal(swapQuote.swapOutAmount.toString()).div(DECIMALS));
    console.log(`>  - minSwapOutAmount:`, new Decimal(swapQuote.minSwapOutAmount.toString()).div(DECIMALS));
    console.log(`>  - price impact: ${swapQuote.priceImpact}`);

    console.log(`>> - swapOutAmount's price (tokenB/tokenA) = ${new Decimal(swapQuote.swapInAmount.toString()).div(new Decimal(swapQuote.swapOutAmount.toString()))}`);

    return {
        swapInAmount: new Decimal(swapQuote.swapInAmount.toString()),
        swapOutAmount: new Decimal(swapQuote.swapOutAmount.toString()),
        minSwapOutAmount: new Decimal(swapQuote.minSwapOutAmount.toString()),
        swapOutTokenPrice: new Decimal(swapQuote.swapInAmount.toString()).div(new Decimal(swapQuote.swapOutAmount.toString())),
        priceImpact: swapQuote.priceImpact,
    }
}
