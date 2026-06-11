"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, ChevronRight } from "lucide-react";
import { LEVELS } from "@/lib/blockchain-zanjiri/game-data";
import { useGameStore } from "@/lib/blockchain-zanjiri/game-store";
import BlockCard from "./BlockCard";
import GameHeader from "./GameHeader";
import RewardPopup from "./RewardPopup";
import ChainMascot, { type ChainMascotMood } from "./ChainMascot";
import "./blockchain-theme.css";

type MascotState = {
  mood: ChainMascotMood;
  message: string;
};

const MASCOT_STATES: Record<string, MascotState> = {
  idle: { mood: "idle", message: "Maydonlarni to'g'ri tartibga soling!" },
  correct: { mood: "excited", message: "Zo'r! To'g'ri! 🎉" },
  wrong: { mood: "warning", message: "Hmm, bu tartib noto'g'ri. Qayta urining!" },
  hint: { mood: "teaching", message: "Timestamp har doim birinchi keladi!" },
  thinking: { mood: "thinking", message: "Qaysi maydon avval keladi?" },
  complete: { mood: "happy", message: "Barcha bloklar to'g'ri! 🏆" },
};

export interface BlockchainGameProps {
  onComplete?: () => void;
  allowReplay?: boolean;
}

export function BlockchainGame({ onComplete, allowReplay = false }: BlockchainGameProps) {
  const {
    currentLevel,
    showHint,
    setShowHint,
    correctBlocks,
    resetLevel,
    resetFullGame,
    switchLevel,
    completeLevel,
    isLevelComplete,
    isGameComplete,
    completedLevels,
    totalXP,
    totalUSDT,
  } = useGameStore();

  const [showReward, setShowReward] = useState(false);
  const [mascot, setMascot] = useState<MascotState>(MASCOT_STATES.idle);
  const [rewarded, setRewarded] = useState(allowReplay);

  useEffect(() => {
    resetFullGame();
    if (allowReplay) setRewarded(true);
  }, [allowReplay, resetFullGame]);

  const level = LEVELS[currentLevel];
  const nonLockedBlocks = level
    ? level.blocks.filter((b) => !b.isComplete).map((b) => b.id)
    : [];
  const allCorrect =
    nonLockedBlocks.length > 0 && nonLockedBlocks.every((id) => correctBlocks.includes(id));

  useEffect(() => {
    if (!level) return;
    if (allCorrect && nonLockedBlocks.length > 0 && !isLevelComplete) {
      setMascot(MASCOT_STATES.complete);
      setTimeout(() => {
        completeLevel(currentLevel, level.reward.xp, level.reward.usdt);
        setShowReward(true);
      }, 800);
    }
  }, [level, currentLevel, allCorrect, nonLockedBlocks.length, isLevelComplete, completeLevel]);

  useEffect(() => {
    if (isGameComplete && !rewarded) {
      setRewarded(true);
      onComplete?.();
    }
  }, [isGameComplete, rewarded, onComplete]);

  const handleBlockCorrect = useCallback(() => {
    setMascot(MASCOT_STATES.correct);
    setTimeout(() => setMascot(MASCOT_STATES.idle), 2000);
  }, []);

  const handleHint = () => {
    const next = !showHint;
    setShowHint(next);
    setMascot(next ? MASCOT_STATES.hint : MASCOT_STATES.idle);
  };

  const handleRewardClose = () => {
    setShowReward(false);
    setMascot(MASCOT_STATES.idle);
  };

  const handleSelectLevel = (index: number) => {
    if (index === currentLevel) return;
    setShowReward(false);
    switchLevel(index);
    setMascot(MASCOT_STATES.idle);
  };

  const handleReset = () => {
    resetLevel();
    setMascot(MASCOT_STATES.idle);
  };

  const handleFullRestart = () => {
    resetFullGame();
    setMascot(MASCOT_STATES.idle);
    setShowReward(false);
  };

  if (!level) return null;

  if (isGameComplete && !showReward) {
    return (
      <GameCompleteScreen
        totalXP={totalXP}
        totalUSDT={totalUSDT}
        allowReplay={allowReplay || rewarded}
        onRestart={handleFullRestart}
      />
    );
  }

  return (
    <div className="bz-game rounded-b-2xl overflow-hidden">
      <GameHeader onHint={handleHint} onSelectLevel={handleSelectLevel} />

      <div className="px-3 pb-5 max-w-md mx-auto">
        <motion.div
          key={`mascot-${currentLevel}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bz-glass rounded-xl px-2.5 py-2 mb-3 flex items-center gap-2.5"
        >
          <ChainMascot mood={mascot.mood} size={52} className="shrink-0" />
          <p className="text-[11px] font-bold text-white leading-snug line-clamp-2 flex-1">
            {mascot.message}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentLevel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3"
          >
            {level.blocks.map((block, idx) => (
              <BlockCard
                key={block.id}
                block={block}
                levelIndex={idx}
                onBlockCorrect={handleBlockCorrect}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Tugmalar */}
        <div className="flex gap-2 mt-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-[11px] font-bold"
          >
            <RotateCcw size={14} />
            Qayta
          </motion.button>

          {isLevelComplete && completedLevels.length < LEVELS.length && (
            <p className="flex-1 flex items-center justify-center text-[11px] font-bold text-gray-400 px-2">
              Boshqa bosqichni yuqoridan tanlang
              <ChevronRight size={12} className="ml-0.5 text-duo-yellow" />
            </p>
          )}
        </div>
      </div>

      <RewardPopup
        show={showReward}
        xp={level.reward.xp}
        usdt={level.reward.usdt}
        allLevelsDone={completedLevels.length >= LEVELS.length}
        levelTitle={level.titleUz}
        onNext={handleRewardClose}
        onClose={handleRewardClose}
      />
    </div>
  );
}

function GameCompleteScreen({
  totalXP,
  totalUSDT,
  allowReplay,
  onRestart,
}: {
  totalXP: number;
  totalUSDT: number;
  allowReplay: boolean;
  onRestart: () => void;
}) {
  return (
    <div className="bz-game rounded-b-2xl px-5 py-10 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 160 }}
        className="bz-glass-light rounded-3xl p-8 max-w-sm mx-auto relative overflow-hidden"
      >
        <div className="absolute inset-0 bz-shimmer pointer-events-none" />

        <div className="relative z-10">
          <ChainMascot mood="excited" size={120} className="mx-auto mb-4" />

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-duo-yellow to-amber-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-duo-yellow/30"
          >
            <Trophy size={32} className="text-secondary" />
          </motion.div>

          <h2 className="text-xl font-extrabold text-secondary mb-2">
            Blokchain Zanjiri tugadi!
          </h2>
          <p className="text-sm text-gray-500 mb-6 leading-relaxed">
            {allowReplay
              ? "Mukofot olingan — xohlagan vaqtda qayta o'ynashingiz mumkin"
              : "3 bosqichni muvaffaqiyatli tugatdingiz!"}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-100 border border-amber-200 p-4">
              <div className="text-xl mb-1">⚡</div>
              <div className="text-xl font-extrabold text-amber-800">+{totalXP}</div>
              <div className="text-[10px] font-bold text-amber-600">Jami XP</div>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 p-4">
              <div className="text-xl mb-1">💵</div>
              <div className="text-xl font-extrabold text-emerald-800">+{totalUSDT.toFixed(2)}</div>
              <div className="text-[10px] font-bold text-emerald-600">USDT</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRestart}
            className="w-full py-3.5 rounded-xl bz-btn-gold text-sm"
          >
            Qayta o&apos;ynash
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
