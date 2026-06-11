"use client";

import { create } from "zustand";
import { BOARD_TILES } from "./board";
import { getCardByType, getQuiz, getRisk, getStable } from "./challenges";
import type {
  AvatarId,
  BoardTile,
  GameCard,
  GamePhase,
  QuizChallenge,
  RiskChallenge,
  StablecoinChallenge,
} from "./types";
import { MIN_TILES_TO_WIN, WIN_TILE, XP_PER_LEVEL } from "./types";

interface SayohatStore {
  phase: GamePhase;
  avatar: AvatarId | null;
  position: number;
  knowledgePoints: number;
  portfolioSafety: number;
  level: number;
  usdtBalance: number;
  tilesCompleted: number;
  currentTile: BoardTile | null;
  activeQuiz: QuizChallenge | null;
  activeStable: StablecoinChallenge | null;
  activeRisk: RiskChallenge | null;
  activeCard: GameCard | null;
  olaaMessage: string;
  stableSelected: Set<number>;
  awaitingTileClick: boolean;
  pathCompleteFired: boolean;
  rewarded: boolean;

  setAvatar: (a: AvatarId) => void;
  startGame: () => void;
  /** Faqat joriy katak bosilganda chaqiriladi */
  openCurrentTile: () => void;
  answerQuiz: (index: number) => boolean;
  toggleStableStep: (index: number) => void;
  submitStable: () => boolean;
  handleRiskListen: () => void;
  handleRiskIgnore: () => void;
  applyCard: () => void;
  claimReward: () => void;
  advance: (steps?: number) => void;
  checkWin: () => boolean;
  resetGame: () => void;
  markPathComplete: () => void;
  setRewarded: (v: boolean) => void;
}

function calcLevel(xp: number) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

function clearChallenges() {
  return {
    activeQuiz: null as QuizChallenge | null,
    activeStable: null as StablecoinChallenge | null,
    activeRisk: null as RiskChallenge | null,
    activeCard: null as GameCard | null,
    stableSelected: new Set<number>(),
  };
}

const initial = {
  phase: "avatar" as GamePhase,
  avatar: null as AvatarId | null,
  position: 0,
  knowledgePoints: 10,
  portfolioSafety: 75,
  level: 1,
  usdtBalance: 0,
  tilesCompleted: 0,
  currentTile: null as BoardTile | null,
  activeQuiz: null as QuizChallenge | null,
  activeStable: null as StablecoinChallenge | null,
  activeRisk: null as RiskChallenge | null,
  activeCard: null as GameCard | null,
  olaaMessage: "",
  stableSelected: new Set<number>(),
  awaitingTileClick: false,
  pathCompleteFired: false,
  rewarded: false,
};

export const useSayohatStore = create<SayohatStore>((set, get) => ({
  ...initial,
  stableSelected: new Set(),

  setAvatar: (a) => set({ avatar: a }),

  startGame: () => {
    set({ phase: "board", position: 0, awaitingTileClick: true, olaaMessage: "START katakdan boshlang — yonib turgan katakni bosing!" });
  },

  openCurrentTile: () => {
    const { position, phase, awaitingTileClick } = get();
    if (phase !== "board" || !awaitingTileClick) return;

    const tile = BOARD_TILES[position];
    if (!tile) return;

    if (tile.type === "start") {
      set({ currentTile: tile, olaaMessage: "Sayohat boshlandi! Keyingi katak yonib turibdi — bosing.", awaitingTileClick: false });
      get().advance(1);
      return;
    }

    switch (tile.type) {
      case "educational":
        set({
          phase: "challenge",
          currentTile: tile,
          awaitingTileClick: false,
          ...clearChallenges(),
          activeQuiz: getQuiz(tile.challengeId),
          olaaMessage: "",
        });
        break;
      case "stablecoin": {
        const stable = getStable(tile.challengeId);
        set({
          phase: "challenge",
          currentTile: tile,
          awaitingTileClick: false,
          ...clearChallenges(),
          activeStable: stable,
          olaaMessage: stable.olaaTip,
        });
        break;
      }
      case "risk": {
        const risk = getRisk(tile.challengeId);
        set({
          phase: "olaa",
          currentTile: tile,
          awaitingTileClick: false,
          ...clearChallenges(),
          activeRisk: risk,
          olaaMessage: risk.olaaMessage,
        });
        break;
      }
      case "reward":
        set({
          phase: "reward",
          currentTile: tile,
          awaitingTileClick: false,
          ...clearChallenges(),
          olaaMessage: "Tabriklayman! Mukofot sandig'ini oching!",
        });
        break;
      case "card":
        if (!tile.cardType) return;
        set({
          phase: "card",
          currentTile: tile,
          awaitingTileClick: false,
          ...clearChallenges(),
          activeCard: getCardByType(tile.cardType),
          olaaMessage: "",
        });
        break;
    }
  },

  answerQuiz: (index) => {
    const { activeQuiz, knowledgePoints, portfolioSafety, tilesCompleted } = get();
    if (!activeQuiz) return false;
    const correct = index === activeQuiz.correctIndex;
    if (correct) {
      const newXp = knowledgePoints + activeQuiz.xp;
      set({
        knowledgePoints: newXp,
        portfolioSafety: Math.min(100, portfolioSafety + 3),
        level: calcLevel(newXp),
        tilesCompleted: tilesCompleted + 1,
        olaaMessage: activeQuiz.olaaTip,
        phase: "board",
        ...clearChallenges(),
      });
      get().advance(1);
      return true;
    }
    set({
      portfolioSafety: Math.max(0, portfolioSafety - 5),
      olaaMessage: "Noto'g'ri! Qayta o'qing va urinib ko'ring.",
    });
    return false;
  },

  toggleStableStep: (index) => {
    const sel = new Set(get().stableSelected);
    if (sel.has(index)) sel.delete(index);
    else sel.add(index);
    set({ stableSelected: sel });
  },

  submitStable: () => {
    const { activeStable, stableSelected, knowledgePoints, portfolioSafety, tilesCompleted } = get();
    if (!activeStable) return false;
    const correctSteps = activeStable.steps.map((s, i) => (s.correct ? i : -1)).filter((i) => i >= 0);
    const allCorrect =
      correctSteps.every((i) => stableSelected.has(i)) &&
      [...stableSelected].every((i) => activeStable.steps[i]?.correct);

    if (allCorrect) {
      const newXp = knowledgePoints + activeStable.xp;
      set({
        knowledgePoints: newXp,
        portfolioSafety: Math.min(100, portfolioSafety + 5),
        level: calcLevel(newXp),
        tilesCompleted: tilesCompleted + 1,
        phase: "board",
        ...clearChallenges(),
        olaaMessage: activeStable.olaaTip,
      });
      get().advance(1);
      return true;
    }
    set({
      portfolioSafety: Math.max(0, portfolioSafety - 8),
      olaaMessage: "Ba'zi qadamlar noto'g'ri! Faqat xavfsiz qadamlarni tanlang.",
    });
    return false;
  },

  handleRiskListen: () => {
    const { activeRisk, portfolioSafety } = get();
    if (!activeRisk) return;
    const back = activeRisk.backTiles;
    const newPos = Math.max(1, get().position - back);
    set({
      position: newPos,
      portfolioSafety: Math.min(100, portfolioSafety + 10),
      phase: "board",
      ...clearChallenges(),
      awaitingTileClick: true,
      olaaMessage: `Yaxshi qaror! ${back} katak orqaga — yonib turgan katakni bosing.`,
    });
  },

  handleRiskIgnore: () => {
    const { activeRisk, knowledgePoints, portfolioSafety, tilesCompleted } = get();
    if (!activeRisk) return;
    set({
      knowledgePoints: Math.max(0, knowledgePoints - activeRisk.ignorePenalty.xp),
      portfolioSafety: Math.max(0, portfolioSafety - activeRisk.ignorePenalty.safety),
      tilesCompleted: tilesCompleted + 1,
      phase: "board",
      ...clearChallenges(),
      olaaMessage: "Ogohlantirishni e'tiborsiz qoldirdingiz! Ballar kamaydi.",
    });
    get().advance(1);
  },

  applyCard: () => {
    const { activeCard, knowledgePoints, portfolioSafety, usdtBalance, tilesCompleted } = get();
    if (!activeCard) return;
    let xp = knowledgePoints;
    let safety = portfolioSafety;
    let usdt = usdtBalance;
    if (activeCard.xp) xp += activeCard.xp;
    if (activeCard.safety) safety = Math.min(100, safety + activeCard.safety);
    if (activeCard.penalty) safety = Math.max(0, safety - activeCard.penalty);
    if (activeCard.type === "imkoniyat") usdt += 5;
    set({
      knowledgePoints: xp,
      portfolioSafety: safety,
      usdtBalance: usdt,
      level: calcLevel(xp),
      tilesCompleted: tilesCompleted + 1,
      phase: "board",
      ...clearChallenges(),
      olaaMessage: "Karta qo'llanildi! Keyingi yonib turgan katakni bosing.",
    });
    get().advance(1);
  },

  claimReward: () => {
    const { knowledgePoints, usdtBalance, tilesCompleted } = get();
    const bonus = 20;
    set({
      knowledgePoints: knowledgePoints + bonus,
      usdtBalance: usdtBalance + 10,
      tilesCompleted: tilesCompleted + 1,
      level: calcLevel(knowledgePoints + bonus),
      phase: "board",
      ...clearChallenges(),
      olaaMessage: `+${bonus} Bilim balli va +10 USDT! Keyingi katakni bosing.`,
    });
    get().advance(1);
  },

  advance: (steps = 1) => {
    const newPos = Math.min(WIN_TILE, get().position + steps);
    const tile = BOARD_TILES[newPos];
    set({
      position: newPos,
      awaitingTileClick: true,
      phase: "board",
      ...clearChallenges(),
      olaaMessage: tile
        ? `📍 ${tile.title} — sariq yonib turibdi, bosing!`
        : "Keyingi katakni bosing!",
    });
    if (get().checkWin()) {
      set({ phase: "won", awaitingTileClick: false, olaaMessage: "Kripto-Sayohat tugadi! Siz Kripto-Usta bo'ldingiz!" });
    }
  },

  checkWin: () => {
    const { position, tilesCompleted } = get();
    return position >= WIN_TILE || tilesCompleted >= MIN_TILES_TO_WIN;
  },

  resetGame: () => set({ ...initial, stableSelected: new Set(), rewarded: get().rewarded }),

  markPathComplete: () => set({ pathCompleteFired: true }),

  setRewarded: (v) => set({ rewarded: v }),
}));
