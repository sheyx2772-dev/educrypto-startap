import { ASSET_META } from "./market";
import type { CryptoAsset, StallProduct, TransactionResult } from "./types";

const TOLERANCE: Record<CryptoAsset, number> = {
  btc: 0.00005,
  eth: 0.0005,
  usdt: 0.05,
  sol: 0.01,
};

export function computeRequiredCrypto(
  priceUsd: number,
  rate: number,
  gasUsd = 0
): number {
  return (priceUsd + gasUsd) / rate;
}

export function verifyTransaction(
  userInput: number,
  product: StallProduct,
  rate: number
): TransactionResult {
  if (!Number.isFinite(userInput) || userInput <= 0) {
    return {
      success: false,
      message: "Noto'g'ri miqdor! Musbat raqam kiriting.",
    };
  }

  const expected = computeRequiredCrypto(product.priceUsd, rate, product.gasUsd ?? 0);
  const tolerance = TOLERANCE[product.payWith];
  const diff = Math.abs(userInput - expected);

  if (diff <= tolerance) {
    return {
      success: true,
      message: "Tranzaksiya muvaffaqiyatli! Aktiv portfelga qo'shildi.",
      expected,
    };
  }

  const sym = ASSET_META[product.payWith].symbol;
  if (userInput < expected - tolerance) {
    return {
      success: false,
      message: `Hisob yetarli emas! Kamida ${expected.toFixed(ASSET_META[product.payWith].decimals)} ${sym} kerak.`,
      expected,
    };
  }

  return {
    success: false,
    message: "Hisob xato! Kurs o'zgardi yoki miqdor noto'g'ri kiritildi.",
    expected,
  };
}
