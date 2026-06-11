"use client";

import Image from "next/image";
import { motion, AnimatePresence, type TargetAndTransition } from "framer-motion";

export type ChainMascotMood = "idle" | "happy" | "thinking" | "excited" | "warning" | "teaching";

interface ChainMascotProps {
  mood?: ChainMascotMood;
  size?: number;
  message?: string;
  className?: string;
}

const MOOD_ANIM: Record<ChainMascotMood, TargetAndTransition> = {
  idle: {
    y: [0, -10, 0],
    rotate: [0, 1.5, 0, -1.5, 0],
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  thinking: {
    y: [0, -6, 0],
    rotate: [-3, 3, -3],
    transition: { duration: 2.4, repeat: Infinity, ease: "easeInOut" as const },
  },
  excited: {
    y: [0, -14, 0],
    scale: [1, 1.06, 1],
    rotate: [0, -4, 4, 0],
    transition: { duration: 0.7, repeat: Infinity, ease: "easeOut" as const },
  },
  happy: {
    y: [0, -12, 0],
    scale: [1, 1.04, 1],
    transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
  },
  warning: {
    x: [-4, 4, -4, 4, 0],
    rotate: [0, -2, 2, 0],
    transition: { duration: 0.45, repeat: 2 },
  },
  teaching: {
    y: [0, -8, 0],
    scale: [1, 1.03, 1],
    transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
  },
};

export default function ChainMascot({
  mood = "idle",
  size = 96,
  message,
  className = "",
}: ChainMascotProps) {
  const showGlow = mood === "excited" || mood === "happy" || mood === "teaching";

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        {/* Yorug'lik halqasi */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={
            showGlow
              ? { opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.15, 0.9] }
              : { opacity: [0.2, 0.35, 0.2], scale: [0.95, 1.05, 0.95] }
          }
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle, rgba(255,200,0,0.55) 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />

        {/* Lampochka pulsatsiyasi (o'ylash / maslahat) */}
        {(mood === "thinking" || mood === "teaching") && (
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-duo-yellow/80"
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ boxShadow: "0 0 12px #FFD700, 0 0 24px rgba(255,200,0,0.5)" }}
          />
        )}

        <motion.div
          animate={MOOD_ANIM[mood]}
          className="relative z-10"
          style={{ width: size, height: size }}
        >
          <Image
            src="/game/blockchain/mascot.png"
            alt="Blokchain maskoti"
            width={size}
            height={size}
            className="drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
            priority
            unoptimized
          />
        </motion.div>

        {/* Zanjir bo'laklari — suzuvchi */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-lg opacity-60"
          animate={{ y: [0, 3, 0], rotate: [0, 8, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          ⛓️‍💥
        </motion.div>
      </div>

      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            className="relative max-w-[220px] rounded-2xl bg-white/95 backdrop-blur-md border border-duo-yellow/30 px-3.5 py-2.5 shadow-lg shadow-duo-yellow/10"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 border-l border-t border-duo-yellow/30 rotate-45" />
            <p className="text-xs font-bold text-secondary leading-snug text-center relative z-10">
              {message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
