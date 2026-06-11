import type { CryptoAsset, MarketRate } from "./types";

export const BASE_RATES: Record<CryptoAsset, number> = {
  btc: 65_000,
  eth: 3_200,
  usdt: 1,
  sol: 145,
};

export const ASSET_META: Record<
  CryptoAsset,
  { symbol: string; name: string; color: string; decimals: number }
> = {
  btc: { symbol: "BTC", name: "Bitcoin", color: "#f7931a", decimals: 6 },
  eth: { symbol: "ETH", name: "Ethereum", color: "#627eea", decimals: 5 },
  usdt: { symbol: "USDT", name: "Tether", color: "#26a17b", decimals: 2 },
  sol: { symbol: "SOL", name: "Solana", color: "#9945ff", decimals: 4 },
};

export function createInitialRates(): MarketRate[] {
  return (Object.keys(BASE_RATES) as CryptoAsset[]).map((asset) => ({
    asset,
    symbol: ASSET_META[asset].symbol,
    name: ASSET_META[asset].name,
    usd: BASE_RATES[asset],
    change24h: (Math.random() - 0.5) * 4,
    color: ASSET_META[asset].color,
  }));
}

/** Har 3 soniyada kurslarni biroz silkitadi */
export function tickRates(rates: MarketRate[]): MarketRate[] {
  return rates.map((r) => {
    const swing = (Math.random() - 0.5) * 0.018;
    const next = Math.max(r.usd * 0.85, r.usd * (1 + swing));
    return {
      ...r,
      usd: next,
      change24h: r.change24h + (Math.random() - 0.5) * 0.3,
    };
  });
}

export function getRate(rates: MarketRate[], asset: CryptoAsset): number {
  return rates.find((r) => r.asset === asset)?.usd ?? BASE_RATES[asset];
}

export function formatUsd(n: number): string {
  return n >= 1000 ? `$${n.toLocaleString("en-US", { maximumFractionDigits: 0 })}` : `$${n.toFixed(2)}`;
}

export function formatCrypto(n: number, asset: CryptoAsset): string {
  const d = ASSET_META[asset].decimals;
  return `${n.toFixed(d)} ${ASSET_META[asset].symbol}`;
}
