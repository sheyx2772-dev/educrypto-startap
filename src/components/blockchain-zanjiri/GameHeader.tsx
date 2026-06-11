"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Zap, Check } from "lucide-react";
import { useGameStore } from "@/lib/blockchain-zanjiri/game-store";
import { LEVELS, LEVEL_SHORT_NAMES } from "@/lib/blockchain-zanjiri/game-data";
import { useEffect, useState } from "react";

interface GameHeaderProps {
  onHint: () => void;
  onSelectLevel: (index: number) => void;
}

export default function GameHeader({ onHint, onSelectLevel }: GameHeaderProps) {
  const {
    currentLevel,
    totalXP,
    totalUSDT,
    mistakes,
    showHint,
    timeElapsed,
    incrementTime,
    completedLevels,
  } = useGameStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const t = setInterval(incrementTime, 1000);
    return () => clearInterval(t);
  }, [incrementTime]);

  const level = LEVELS[currentLevel];
  const maxXP = 73;
  const xpPercent = Math.min((totalXP / maxXP) * 100, 100);
  const mins = Math.floor(timeElapsed / 60)
    .toString()
    .padStart(2, "0");
  const secs = (timeElapsed % 60).toString().padStart(2, "0");

  if (!mounted || !level) return null;

  return (
    <div className="bz-glass sticky top-0 z-50 rounded-b-2xl px-3 pt-2.5 pb-2.5 mb-3 shadow-lg shadow-black/20">
      {/* Qator 1: sarlavha + stat */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="min-w-0">
          <h2 className="text-sm font-extrabold text-white truncate">{level.titleUz}</h2>
          <p className="text-[9px] text-gray-400 font-bold">
            {currentLevel + 1}/{LEVELS.length} · {mins}:{secs} · {totalUSDT.toFixed(2)} USDT
          </p>
        </div>
        <button
          type="button"
          onClick={onHint}
          className={`shrink-0 p-2 rounded-lg border text-xs ${
            showHint
              ? "bg-duo-yellow/20 border-duo-yellow/40 text-duo-yellow"
              : "bg-white/5 border-white/10 text-gray-400"
          }`}
        >
          <Lightbulb size={14} />
        </button>
      </div>

      {/* XP */}
      <div className="flex items-center gap-2 mb-2">
        <Zap size={11} className="text-duo-yellow shrink-0" />
        <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-duo-yellow to-amber-400"
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
        <span className="text-[9px] font-bold text-gray-400 shrink-0">{totalXP} XP</span>
      </div>

      {/* Bosqich tugmalari — ixcham */}
      <div className="flex gap-1.5">
        {LEVELS.map((l, i) => {
          const isActive = i === currentLevel;
          const isDone = completedLevels.includes(i);
          const shortName = LEVEL_SHORT_NAMES[i] ?? l.titleUz.split(" ")[0];

          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onSelectLevel(i)}
              className={`flex-1 py-1.5 rounded-lg text-[10px] font-extrabold border transition-all flex items-center justify-center gap-0.5 ${
                isActive
                  ? "bg-duo-yellow text-secondary border-duo-yellow shadow-md shadow-duo-yellow/30"
                  : isDone
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                    : "bg-white/5 text-gray-400 border-white/10"
              }`}
            >
              {isDone && <Check size={9} />}
              {shortName}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showHint && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[10px] text-amber-100 mt-2 leading-snug overflow-hidden"
          >
            💡 {level.hint}
          </motion.p>
        )}
      </AnimatePresence>

      {mistakes > 0 && (
        <div className="flex items-center justify-end gap-1 mt-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${i < mistakes ? "bg-red-500" : "bg-white/15"}`}
            />
          ))}
          <span className="text-[9px] text-red-300 font-bold">xato</span>
        </div>
      )}
    </div>
  );
}
