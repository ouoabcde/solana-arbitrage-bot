# solana-arbitrage-bot

## 1. Requirements before execute
1. Install dependencies.
```
$ pnpm install
```
2. Create `.env` file at the root. Refer to `.example.env` file format.

## 2. Two kinds of bots
1. `/src/jupiterArbitrage.ts`
- This is the bot which tries to find <i>BEST</i> arbitrage opportunity between two tokens with Jupiter SWAP API.
- This bot tries to swap input token -> output token -> back to input token, so tries to earn revenue with input token.
- Example two tokens are wfragSOL and JitoSOL.
- Using Jupiter SWAP API is Free Plan right now, so it would meet rate limit error often.

2. `/src/orcaMeteoraArbitrage.ts`
- This bot tries to find arbitrage opportunity between Orca and Meteora pools.
- Example two tokens are wfragSOL and JitoSOL.

## 3. How to execute
1. Jupiter Bot
```
$ pnpx tsx src/jupiterArbitrage.ts
```
2. Orca Meteora Arbitrage Bot
```
$ pnpx tsx src/orcaMeteoraArbitrage.ts
```