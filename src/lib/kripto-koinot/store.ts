"use client";

import { create } from "zustand";
import { FAILED_PLANET, PLACEABLE_PLANETS, PLANETS_TO_WIN } from "./planets";
import type { CrashReason, EducationalModalData, GamePhase, PlanetRuntimeState } from "./types";

interface MarketStore {
  phase: GamePhase;
  marketVolatility: number;
  orbitalStability: number;
  playerXP: number;
  portfolioSafetyScore: number;
  gravityForce: number;
  damping: number;
  placedCount: number;
  activeModal: EducationalModalData | null;
  planetStates: Record<string, PlanetRuntimeState>;
  pathCompleteFired: boolean;
  rewarded: boolean;
  crashCount: number;

  startGame: () => void;
  setVolatility: (v: number) => void;
  updateMassesFromVolatility: () => void;
  planetPlaced: (id: string) => void;
  planetCrashed: (id: string, reason: CrashReason) => void;
  showModal: (modal: EducationalModalData) => void;
  dismissModal: () => void;
  adjustSafety: (delta: number) => void;
  addXP: (n: number) => void;
  setGravityForce: (v: number) => void;
  setDamping: (v: number) => void;
  checkWin: () => boolean;
  setPhase: (p: GamePhase) => void;
  resetGame: () => void;
  markPathComplete: () => void;
  setRewarded: (v: boolean) => void;
}

function initPlanetStates(): Record<string, PlanetRuntimeState> {
  const now = Date.now();
  const states: Record<string, PlanetRuntimeState> = {};
  for (const p of PLACEABLE_PLANETS) {
    states[p.id] = {
      id: p.id,
      placed: false,
      locked: false,
      exploded: false,
      consumed: false,
      spawnTime: now,
      deadlineMs: 60_000,
    };
  }
  states[FAILED_PLANET.id] = {
    id: FAILED_PLANET.id,
    placed: false,
    locked: false,
    exploded: false,
    consumed: false,
    spawnTime: now,
    deadlineMs: 60_000,
  };
  return states;
}

const initial = {
  phase: "intro" as GamePhase,
  marketVolatility: 0.35,
  orbitalStability: 100,
  playerXP: 10,
  portfolioSafetyScore: 8,
  gravityForce: 0.0008,
  damping: 0.02,
  placedCount: 0,
  activeModal: null as EducationalModalData | null,
  planetStates: initPlanetStates(),
  pathCompleteFired: false,
  rewarded: false,
  crashCount: 0,
};

export const useMarketStore = create<MarketStore>((set, get) => ({
  ...initial,

  startGame: () =>
    set({
      phase: "playing",
      planetStates: initPlanetStates(),
      placedCount: 0,
      orbitalStability: 100,
      portfolioSafetyScore: 8,
      crashCount: 0,
      activeModal: null,
    }),

  setVolatility: (v) => set({ marketVolatility: Math.max(0, Math.min(1, v)) }),

  updateMassesFromVolatility: () => {
    const v = get().marketVolatility;
    set({ orbitalStability: Math.max(20, 100 - v * 45) });
  },

  planetPlaced: (id) => {
    const states = { ...get().planetStates };
    if (states[id]?.placed) return;
    states[id] = { ...states[id], placed: true, locked: true };
    const placedCount = get().placedCount + 1;
    set({
      planetStates: states,
      placedCount,
      playerXP: get().playerXP + 2,
      portfolioSafetyScore: Math.min(10, get().portfolioSafetyScore + 0.5),
    });
    if (placedCount >= PLANETS_TO_WIN) {
      set({ phase: "won" });
    }
  },

  planetCrashed: (id, reason) => {
    const states = { ...get().planetStates };
    const p = PLACEABLE_PLANETS.find((x) => x.id === id) ?? FAILED_PLANET;
    if (reason === "wrong_orbit" || reason === "market_crash") {
      states[id] = { ...states[id], exploded: true };
    } else {
      states[id] = { ...states[id], consumed: true };
    }
    const crashCount = get().crashCount + 1;
    set({
      planetStates: states,
      crashCount,
      orbitalStability: Math.max(0, get().orbitalStability - 25),
      portfolioSafetyScore: Math.max(0, get().portfolioSafetyScore - 2),
      phase: "modal",
      activeModal: {
        planetId: id,
        title: p.eduTitle,
        body: p.eduBody,
        reason,
      },
    });
    if (crashCount >= 3) {
      set({ phase: "lost" });
    }
  },

  showModal: (modal) => set({ activeModal: modal, phase: "modal" }),
  dismissModal: () => {
    const phase = get().crashCount >= 3 ? "lost" : get().placedCount >= PLANETS_TO_WIN ? "won" : "playing";
    set({ activeModal: null, phase });
  },

  adjustSafety: (delta) =>
    set({ portfolioSafetyScore: Math.max(0, Math.min(10, get().portfolioSafetyScore + delta)) }),

  addXP: (n) => set({ playerXP: get().playerXP + n }),

  setGravityForce: (v) => set({ gravityForce: v }),
  setDamping: (v) => set({ damping: v }),

  checkWin: () => get().placedCount >= PLANETS_TO_WIN,

  setPhase: (p) => set({ phase: p }),

  resetGame: () => set({ ...initial, planetStates: initPlanetStates() }),

  markPathComplete: () => set({ pathCompleteFired: true }),
  setRewarded: (v) => set({ rewarded: v }),
}));
