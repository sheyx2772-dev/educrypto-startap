"use client";

import { motion, AnimatePresence } from "framer-motion";
import ChainMascot from "./ChainMascot";

interface RewardPopupProps {
  show: boolean;
  xp: number;
  usdt: number;
  allLevelsDone?: boolean;
  onNext: () => void;
  onClose: () => void;
  levelTitle: string;
}

function Confetti() {
  const colors = ["#FFD700", "#10B981", "#6366F1", "#8B5CF6", "#F59E0B", "#EC4899"];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 32 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: `${(i * 13) % 100}%`, y: -20, rotate: 0, opacity: 1 }}
          animate={{
            y: "110%",
            rotate: (i % 2 === 0 ? 1 : -1) * (180 + (i % 5) * 72),
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + (i % 3) * 0.5,
            delay: (i % 8) * 0.1,
            ease: "easeIn",
          }}
          className="absolute rounded-sm"
          style={{
            width: 6 + (i % 4) * 2,
            height: 6 + (i % 3) * 2,
            borderRadius: i % 2 === 0 ? "50%" : 2,
            background: colors[i % colors.length],
          }}
        />
      ))}
    </div>
  );
}

export default function RewardPopup({
  show,
  xp,
  usdt,
  allLevelsDone,
  onNext,
  onClose,
  levelTitle,
}: RewardPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-5"
          style={{ background: "rgba(8,8,20,0.82)", backdropFilter: "blur(8px)" }}
        >
          <motion.div
            initial={{ scale: 0.75, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 30, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
            className="relative w-full max-w-sm rounded-3xl overflow-hidden bg-white shadow-2xl shadow-black/40"
          >
            <Confetti />

            <div className="h-1.5 bg-gradient-to-r from-duo-yellow via-amber-400 to-orange-400 bz-shimmer" />

            <div className="px-6 pt-8 pb-6 text-center relative">
              <div className="flex justify-center mb-2">
                <ChainMascot mood="excited" size={110} />
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-extrabold text-secondary mb-1"
              >
                Zo&apos;r! To&apos;g&apos;ri tartib!
              </motion.h2>

              <p className="text-sm text-gray-500 font-medium mb-6">
                {levelTitle} — muvaffaqiyatli tugatildi
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-3 mb-6"
              >
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-100 border-2 border-amber-200 p-4">
                  <div className="text-2xl mb-1">⚡</div>
                  <div className="text-2xl font-extrabold text-amber-800">+{xp}</div>
                  <div className="text-[11px] font-bold text-amber-600">XP Ball</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-200 p-4">
                  <div className="text-2xl mb-1">💵</div>
                  <div className="text-2xl font-extrabold text-emerald-800">+{usdt.toFixed(2)}</div>
                  <div className="text-[11px] font-bold text-emerald-600">USDT</div>
                </div>
              </motion.div>

              <div className="flex gap-2.5">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-sm font-bold text-gray-500 hover:bg-gray-50"
                >
                  Chiqish
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onNext}
                  className="flex-[2] py-3 rounded-xl bz-btn-gold text-sm"
                >
                  {allLevelsDone ? "🏆 Tugatish" : "Davom etish →"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
