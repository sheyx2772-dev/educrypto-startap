"use client";

import { motion } from "framer-motion";

const sparkles = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 16) * Math.PI * 2) * (60 + Math.random() * 40),
  y: Math.sin((i / 16) * Math.PI * 2) * (60 + Math.random() * 40),
  delay: i * 0.05,
  size: 8 + Math.random() * 12,
}));

export function SparkleBurst({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center">
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute text-duo-yellow font-bold"
          style={{ fontSize: s.size }}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: s.x, y: s.y }}
          transition={{ duration: 1.2, delay: s.delay, ease: "easeOut" }}
        >
          ✦
        </motion.div>
      ))}
      {["🪙", "⭐", "✨", "💰"].map((emoji, i) => (
        <motion.span
          key={emoji}
          className="absolute text-2xl"
          initial={{ opacity: 0, y: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], y: -80 - i * 20, scale: [0, 1.2, 0.8] }}
          transition={{ duration: 1, delay: 0.2 + i * 0.15 }}
          style={{ left: `calc(50% + ${(i - 2) * 40}px)` }}
        >
          {emoji}
        </motion.span>
      ))}
    </div>
  );
}
