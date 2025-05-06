import web3 from "@solana/web3.js";
import { AnchorProvider, Program, BorshInstructionCoder, Idl, BN } from "@coral-xyz/anchor";
import WhirlpoolIDLFile from "../idl/whirlpool.json";
import { Whirlpool } from "../idl/whirlpool";
import Decimal from "decimal.js";
import { WhirlpoolContext, ORCA_WHIRLPOOL_PROGRAM_ID, swapQuoteByInputToken, buildWhirlpoolClient, IGNORE_CACHE } from "@orca-so/whirlpools-sdk";
import { Percentage } from "@orca-so/common-sdk";

// tokens to deal with
const wfragSolAddr = new web3.PublicKey("WFRGSWjaz8tbAxsJitmbfRuFV2mSNwy7BMWcCwaA28U");
const jitoSolAddr = new web3.PublicKey("J1toso1uCk3RLmjorhTtrVwY9HJ7X8V9yYac6Y7kGCPn");

// orca pools
const orcaWfragSolJitoSolPoolAddr = new web3.PublicKey("5xfKkFmhzNhHKTFUkh4PJmHSWB6LpRvhJcUMKzPP6md2");

const DECIMALS = 10**9;

export const orcaPoolPriceReader = async (connection: web3.Connection) => {
    const provider = new AnchorProvider(connection, {} as any);

    const ctx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID);
    const whirlpoolClient = buildWhirlpoolClient(ctx);
    const pool = await whirlpoolClient.getPool(orcaWfragSolJitoSolPoolAddr);

    const tokenA = pool.getTokenAInfo();
    const tokenB = pool.getTokenBInfo();
    const baseToken = tokenA;

    const sqrtPriceX64 = pool.getData().sqrtPrice;
    let poolPrice = sqrtPriceX64ToPrice(sqrtPriceX64);
    if (baseToken.mint.equals(jitoSolAddr)) {
        poolPrice = new Decimal(1).div(poolPrice);
    }
    console.log(`current poolPrice (tokenB=${tokenB.mint}/tokenA=${tokenA.mint}):`, poolPrice); // tokenB/tokenA = tokenA의 가격을 tokenB로 표현한 값
    console.log(`> this means 1 tokenA(${tokenA.mint}) = ${poolPrice} tokenB(${tokenB.mint})`);

    return poolPrice;
}

const sqrtPriceX64ToPrice = (sqrtPriceX64: BN): Decimal => {
    // price = (sqrtPriceX64 / 2^64)^2
    const shift = 2n ** 64n;

    const sqrtPrice = new Decimal(sqrtPriceX64.toString()).div(shift.toString());
    const price = sqrtPrice.mul(sqrtPrice);

    return price;
}

export const orcaSwapQuote = async (connection: web3.Connection, inTokenMint: web3.PublicKey, swapInAmount: Decimal, slippage: number) => {
    const provider = new AnchorProvider(connection, {} as any);

    const ctx = WhirlpoolContext.withProvider(provider, ORCA_WHIRLPOOL_PROGRAM_ID);
    const whirlpoolClient = buildWhirlpoolClient(ctx);

    const wfragSolJitoSolWhirlpool = await whirlpoolClient.getPool(orcaWfragSolJitoSolPoolAddr);

    const swapQuote = await swapQuoteByInputToken(
        wfragSolJitoSolWhirlpool,
        inTokenMint,
        new BN(swapInAmount.toString()),
        Percentage.fromFraction(1, 1000), // 1/1000 = 0.1%
        ctx.program.programId,
        ctx.fetcher,
        IGNORE_CACHE,
    );

    console.log(`Orca swap simulation:`);
    console.log(`> swapQuote - estimatedAmountIn: ${new Decimal(swapQuote.estimatedAmountIn.toString()).div(DECIMALS)}`);
    console.log(`>  - estimatedAmountOut: ${new Decimal(swapQuote.estimatedAmountOut.toString()).div(DECIMALS)}`);
    console.log(`>  - estimatedEndPrice: ${sqrtPriceX64ToPrice(swapQuote.estimatedEndSqrtPrice)}`);

    return {
        estimatedAmountOut: new Decimal(swapQuote.estimatedAmountOut.toString()),
        estimatedEndPrice: sqrtPriceX64ToPrice(swapQuote.estimatedEndSqrtPrice),
    };
}
