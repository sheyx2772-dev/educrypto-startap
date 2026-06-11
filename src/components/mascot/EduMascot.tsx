"use client";

import Image from "next/image";
import { AnimatePresence, motion, type TargetAndTransition } from "framer-motion";
import {
  mascotAssets,
  mascotMessages,
  type MascotState,
} from "@/types/mascot";

const loopAnimations: Record<MascotState, TargetAndTransition> = {
  idle: {
    y: [0, -10, 0],
    scale: [1, 1.02, 1],
    transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" as const },
  },
  happy: {
    y: [0, -14, 0],
    rotate: [0, -4, 4, -2, 0],
    scale: [1, 1.06, 1],
    transition: { repeat: Infinity, duration: 0.7 },
  },
  warning: {
    x: [0, -8, 8, -6, 6, 0],
    transition: { repeat: Infinity, duration: 0.45 },
  },
  thinking: {
    rotate: [0, 2, -2, 1, -1, 0],
    y: [0, -4, 0],
    transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const },
  },
  talking: {
    y: [0, -6, 0, -4, 0],
    scale: [1, 1.03, 1, 1.02, 1],
    transition: { repeat: Infinity, duration: 0.55 },
  },
};

const glowColors: Record<MascotState, string> = {
  idle: "rgba(255, 200, 0, 0.25)",
  happy: "rgba(255, 215, 0, 0.4)",
  warning: "rgba(231, 76, 60, 0.35)",
  thinking: "rgba(72, 201, 163, 0.3)",
  talking: "rgba(255, 200, 0, 0.3)",
};

interface EduMascotProps {
  mood?: MascotState;
  message?: string;
  showBubble?: boolean;
  position?: "fixed" | "inline" | "hero";
  size?: number;
}

export function EduMascot({
  mood = "idle",
  message,
  showBubble = true,
  position = "fixed",
  size = 200,
}: EduMascotProps) {
  const displayMessage = message ?? mascotMessages[mood];

  const positionClasses = {
    fixed: "fixed bottom-6 right-6 z-50",
    inline: "relative inline-flex flex-col items-center",
    hero: "relative flex flex-col items-center",
  };

  return (
    <motion.div
      className={`${positionClasses[position]} flex flex-col items-center gap-3`}
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 14 }}
    >
      <AnimatePresence mode="wait">
        {showBubble && (
          <motion.div
            key={`bubble-${mood}`}
            className="speech-bubble text-center max-w-[280px] z-10"
            initial={{ opacity: 0, y: 14, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.85 }}
            transition={{ duration: 0.35, type: "spring", stiffness: 200 }}
          >
            {displayMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative" style={{ width: size, height: size * 1.15 }}>
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl -z-10"
          style={{ background: glowColors[mood] }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={mood}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 8 }}
            transition={{
              opacity: { duration: 0.25 },
              scale: { duration: 0.35, type: "spring", stiffness: 200 },
              rotate: { duration: 0.3 },
            }}
          >
            <motion.div
              animate={loopAnimations[mood]}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src={mascotAssets[mood]}
                alt={`Shlyapa-Coin — ${mood}`}
                width={size}
                height={Math.round(size * 1.15)}
                className="object-contain w-full h-full drop-shadow-2xl pointer-events-none select-none"
                priority
                unoptimized
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2/3 h-4 bg-black/15 rounded-[50%] blur-md -z-10"
          animate={{ scaleX: [1, 0.85, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  );
}
