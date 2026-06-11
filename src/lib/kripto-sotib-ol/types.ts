export type CryptoAsset = "btc" | "eth" | "usdt" | "sol";

export type GamePhase = "intro" | "playing" | "won";

export interface MarketRate {
  asset: CryptoAsset;
  symbol: string;
  name: string;
  usd: number;
  change24h: number;
  color: string;
}

export interface StallProduct {
  id: string;
  name: string;
  nameUz: string;
  description: string;
  priceUsd: number;
  payWith: CryptoAsset;
  gasUsd?: number;
  image: string;
  category: string;
  tip: string;
}

export interface PurchasedItem {
  productId: string;
  paidCrypto: number;
  asset: CryptoAsset;
  rateAtPurchase: number;
}

export interface TransactionResult {
  success: boolean;
  message: string;
  expected?: number;
}
