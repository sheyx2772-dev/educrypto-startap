// lib/game-store.ts
'use client'

import { create } from 'zustand'
import type { BlockField } from "@/types/blockchain-game";
import { LEVELS } from "./game-data";

interface BlockchainGameStore {
  // State
  currentLevel: number
  score: number
  totalXP: number
  totalUSDT: number
  streak: number
  mistakes: number
  timeElapsed: number
  isLevelComplete: boolean
  isGameComplete: boolean
  showHint: boolean
  showConcept: string | null
  activeBlockId: string | null
  draggedField: (BlockField & { blockId: string }) | null
  
  // Per-level block field order (blockId → ordered field ids)
  fieldOrders: Record<string, string[]>
  correctBlocks: string[]
  completedLevels: number[]
  rewardedLevels: number[]

  // Actions
  setLevel: (level: number) => void
  switchLevel: (level: number) => void
  completeLevel: (levelIndex: number, xp: number, usdt: number) => void
  addScore: (points: number) => void
  addReward: (xp: number, usdt: number) => void
  incrementMistakes: () => void
  incrementTime: () => void
  setShowHint: (show: boolean) => void
  setShowConcept: (blockId: string | null) => void
  setActiveBlock: (id: string | null) => void
  setDraggedField: (field: (BlockField & { blockId: string }) | null) => void
  reorderFields: (blockId: string, newOrder: string[]) => void
  initFieldOrder: (blockId: string, fieldIds: string[]) => void
  markBlockCorrect: (blockId: string) => void
  setLevelComplete: (v: boolean) => void
  setGameComplete: (v: boolean) => void
  resetLevel: () => void
  resetFullGame: () => void
}

export const useGameStore = create<BlockchainGameStore>((set) => ({
  currentLevel: 0,
  score: 0,
  totalXP: 0,
  totalUSDT: 0,
  streak: 0,
  mistakes: 0,
  timeElapsed: 0,
  isLevelComplete: false,
  isGameComplete: false,
  showHint: false,
  showConcept: null,
  activeBlockId: null,
  draggedField: null,
  fieldOrders: {},
  correctBlocks: [],
  completedLevels: [],
  rewardedLevels: [],

  setLevel: (level) => set({ currentLevel: level, isLevelComplete: false }),

  switchLevel: (level) =>
    set({
      currentLevel: level,
      isLevelComplete: false,
      mistakes: 0,
      showHint: false,
      fieldOrders: {},
      correctBlocks: [],
      activeBlockId: null,
      draggedField: null,
      timeElapsed: 0,
    }),

  completeLevel: (levelIndex, xp, usdt) =>
    set((s) => {
      const completed = s.completedLevels.includes(levelIndex)
        ? s.completedLevels
        : [...s.completedLevels, levelIndex];
      const alreadyRewarded = s.rewardedLevels.includes(levelIndex);
      const rewardedLevels = alreadyRewarded
        ? s.rewardedLevels
        : [...s.rewardedLevels, levelIndex];
      return {
        completedLevels: completed,
        rewardedLevels,
        totalXP: alreadyRewarded ? s.totalXP : s.totalXP + xp,
        totalUSDT: alreadyRewarded
          ? s.totalUSDT
          : +(s.totalUSDT + usdt).toFixed(4),
        isLevelComplete: true,
        isGameComplete: completed.length >= LEVELS.length,
      };
    }),
  addScore: (points) => set((s) => ({ score: s.score + points })),
  addReward: (xp, usdt) => set((s) => ({ totalXP: s.totalXP + xp, totalUSDT: +(s.totalUSDT + usdt).toFixed(4) })),
  incrementMistakes: () => set((s) => ({ mistakes: s.mistakes + 1 })),
  incrementTime: () => set((s) => ({ timeElapsed: s.timeElapsed + 1 })),
  setShowHint: (show) => set({ showHint: show }),
  setShowConcept: (blockId) => set({ showConcept: blockId }),
  setActiveBlock: (id) => set({ activeBlockId: id }),
  setDraggedField: (field) => set({ draggedField: field }),
  reorderFields: (blockId, newOrder) =>
    set((s) => ({ fieldOrders: { ...s.fieldOrders, [blockId]: newOrder } })),
  initFieldOrder: (blockId, fieldIds) =>
    set((s) => ({
      fieldOrders: s.fieldOrders[blockId] ? s.fieldOrders : { ...s.fieldOrders, [blockId]: fieldIds },
    })),
  markBlockCorrect: (blockId) =>
    set((s) => ({
      correctBlocks: s.correctBlocks.includes(blockId) ? s.correctBlocks : [...s.correctBlocks, blockId],
      streak: s.streak + 1,
    })),
  setLevelComplete: (v) => set({ isLevelComplete: v }),
  setGameComplete: (v) => set({ isGameComplete: v }),
  resetLevel: () =>
    set({
      mistakes: 0,
      timeElapsed: 0,
      isLevelComplete: false,
      showHint: false,
      fieldOrders: {},
      correctBlocks: [],
      activeBlockId: null,
    }),
  resetFullGame: () =>
    set({
      currentLevel: 0,
      score: 0,
      totalXP: 0,
      totalUSDT: 0,
      streak: 0,
      mistakes: 0,
      timeElapsed: 0,
      isLevelComplete: false,
      isGameComplete: false,
      showHint: false,
      showConcept: null,
      activeBlockId: null,
      draggedField: null,
      fieldOrders: {},
      correctBlocks: [],
      completedLevels: [],
      rewardedLevels: [],
    }),
}))
