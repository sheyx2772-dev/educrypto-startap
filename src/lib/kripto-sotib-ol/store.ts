"use client";

import { create } from "zustand";
import { verifyTransaction } from "./calculation";
import { createInitialRates, getRate, tickRates } from "./market";
import { MAX_FAILED_ATTEMPTS, STALL_PRODUCTS, WIN_PURCHASE_COUNT } from "./products";
import type { MarketRate, PurchasedItem, StallProduct } from "./types";
import type { GamePhase } from "./types";

interface SotibOlStore {
  phase: GamePhase;
  rates: MarketRate[];
  selectedProduct: StallProduct | null;
  purchased: PurchasedItem[];
  purchasedIds: Set<string>;
  failedAttempts: number;
  successStreak: number;
  olaaMessage: string;
  lastTxMessage: string;
  txShake: boolean;
  pathCompleteFired: boolean;
  rewarded: boolean;

  startGame: () => void;
  tickMarket: () => void;
  selectProduct: (p: StallProduct | null) => void;
  submitPayment: (amount: number) => boolean;
  dismissModal: () => void;
  resetGame: () => void;
  markPathComplete: () => void;
  setRewarded: (v: boolean) => void;
}

const initial = {
  phase: "intro" as GamePhase,
  rates: createInitialRates(),
  selectedProduct: null as StallProduct | null,
  purchased: [] as PurchasedItem[],
  purchasedIds: new Set<string>(),
  failedAttempts: 0,
  successStreak: 0,
  olaaMessage: "",
  lastTxMessage: "",
  txShake: false,
  pathCompleteFired: false,
  rewarded: false,
};

export const useSotibOlStore = create<SotibOlStore>((set, get) => ({
  ...initial,
  purchasedIds: new Set(),

  startGame: () =>
    set({
      phase: "playing",
      olaaMessage: "Rastadan narsa tanlang va kassada kripto miqdorini hisoblang!",
    }),

  tickMarket: () => set({ rates: tickRates(get().rates) }),

  selectProduct: (p) => {
    if (!p) {
      set({ selectedProduct: null });
      return;
    }
    if (get().purchasedIds.has(p.id)) {
      set({ olaaMessage: "Bu narsa allaqachon sotib olingan!" });
      return;
    }
    set({
      selectedProduct: p,
      olaaMessage: p.tip,
      lastTxMessage: "",
    });
  },

  submitPayment: (amount) => {
    const { selectedProduct, rates, purchased, purchasedIds, failedAttempts } = get();
    if (!selectedProduct) return false;

    const rate = getRate(rates, selectedProduct.payWith);
    const result = verifyTransaction(amount, selectedProduct, rate);

    if (result.success) {
      const item: PurchasedItem = {
        productId: selectedProduct.id,
        paidCrypto: amount,
        asset: selectedProduct.payWith,
        rateAtPurchase: rate,
      };
      const newIds = new Set(purchasedIds);
      newIds.add(selectedProduct.id);
      const newPurchased = [...purchased, item];
      const won = newPurchased.length >= WIN_PURCHASE_COUNT;

      set({
        purchased: newPurchased,
        purchasedIds: newIds,
        selectedProduct: null,
        lastTxMessage: result.message,
        successStreak: get().successStreak + 1,
        olaaMessage: won
          ? "Tabriklaymiz! Barcha xaridlar muvaffaqiyatli — siz Hisob-kitob Ustasisiz!"
          : `✓ ${selectedProduct.nameUz} qo'shildi! Yana ${WIN_PURCHASE_COUNT - newPurchased.length} ta xarid qiling.`,
        phase: won ? "won" : "playing",
        txShake: false,
      });
      return true;
    }

    const newFailed = failedAttempts + 1;
    set({
      failedAttempts: newFailed,
      lastTxMessage: result.message,
      txShake: true,
      olaaMessage:
        newFailed >= MAX_FAILED_ATTEMPTS
          ? "Juda ko'p xato! Kurslarni qayta ko'rib, ehtiyotkor hisoblang."
          : "Tranzaksiya rad etildi! Kurs va formulani tekshiring: Narx(USD) ÷ Kurs",
    });

    setTimeout(() => set({ txShake: false }), 600);
    return false;
  },

  dismissModal: () => set({ selectedProduct: null, lastTxMessage: "" }),

  resetGame: () =>
    set({
      ...initial,
      rates: createInitialRates(),
      purchasedIds: new Set(),
      rewarded: get().rewarded,
    }),

  markPathComplete: () => set({ pathCompleteFired: true }),

  setRewarded: (v) => set({ rewarded: v }),
}));

export { STALL_PRODUCTS, WIN_PURCHASE_COUNT };
