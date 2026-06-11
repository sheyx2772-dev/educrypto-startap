"use client";

import { motion, type TargetAndTransition } from "framer-motion";
import type { MascotState } from "@/types/mascot";

interface ShlyapaCoinProps {
  state: MascotState;
  size?: number;
}

const bodyAnimations: Record<MascotState, TargetAndTransition> = {
  idle: { y: [0, -6, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" as const } },
  happy: { rotate: [0, -3, 3, 0], transition: { repeat: Infinity, duration: 0.6 } },
  warning: { x: [0, -4, 4, -4, 0], transition: { repeat: Infinity, duration: 0.5 } },
  thinking: { rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" as const } },
  talking: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.4 } },
};

const starAnimation: TargetAndTransition = {
  opacity: [0.4, 1, 0.4],
  scale: [0.8, 1.2, 0.8],
  transition: { repeat: Infinity, duration: 0.8 },
};

const warningAnimation: TargetAndTransition = {
  scale: [1, 1.15, 1],
  transition: { repeat: Infinity, duration: 0.8 },
};

const bulbAnimation: TargetAndTransition = {
  opacity: [0.5, 1, 0.5],
  transition: { repeat: Infinity, duration: 1.2 },
};

const eyeBlinkAnimation: TargetAndTransition = {
  scaleY: [1, 0.1, 1],
  transition: { repeat: Infinity, duration: 4, ease: "easeInOut" as const },
};

const mouthTalkAnimation: TargetAndTransition = {
  scaleY: [1, 0.3, 1, 0.5, 1],
  transition: { repeat: Infinity, duration: 0.5 },
};

export function ShlyapaCoin({ state, size = 160 }: ShlyapaCoinProps) {
  const bodyAnim = bodyAnimations[state];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label={`Shlyapa-Coin mascot - ${state}`}
    >
      {/* Happy stars */}
      {state === "happy" && (
        <>
          {[
            { cx: 30, cy: 50, delay: 0 },
            { cx: 170, cy: 45, delay: 0.2 },
            { cx: 25, cy: 100, delay: 0.4 },
            { cx: 175, cy: 95, delay: 0.1 },
          ].map((star, i) => (
            <motion.polygon
              key={i}
              points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2"
              fill="#FFD700"
              transform={`translate(${star.cx}, ${star.cy})`}
              animate={starAnimation}
              transition={{ delay: star.delay }}
            />
          ))}
        </>
      )}

      {/* Thinking lightbulb */}
      {state === "thinking" && (
        <motion.g animate={bulbAnimation}>
          <ellipse cx="100" cy="28" rx="18" ry="22" fill="#FFF9C4" stroke="#FFD700" strokeWidth="2" />
          <rect x="92" y="48" width="16" height="8" rx="2" fill="#BDC3C7" />
          <line x1="100" y1="10" x2="100" y2="4" stroke="#FFD700" strokeWidth="2" />
          <line x1="82" y1="18" x2="76" y2="12" stroke="#FFD700" strokeWidth="2" />
          <line x1="118" y1="18" x2="124" y2="12" stroke="#FFD700" strokeWidth="2" />
        </motion.g>
      )}

      {/* Warning icon */}
      {state === "warning" && (
        <motion.g animate={warningAnimation}>
          <polygon points="165,70 185,110 145,110" fill="#E74C3C" />
          <text x="165" y="102" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">
            !
          </text>
        </motion.g>
      )}

      <motion.g animate={bodyAnim}>
        {/* Graduation cap */}
        <polygon points="40,75 100,45 160,75 100,65" fill="#1A1A2E" />
        <rect x="55" y="72" width="90" height="8" fill="#1A1A2E" />
        <line x1="160" y1="75" x2="175" y2="95" stroke="#FFD700" strokeWidth="3" />
        <circle cx="175" cy="97" r="5" fill="#FFD700" />

        {/* Bitcoin symbol on cap */}
        <text x="100" y="72" textAnchor="middle" fill="#FFD700" fontSize="14" fontWeight="bold">
          ₿
        </text>

        {/* Coin body */}
        <circle cx="100" cy="120" r="65" fill="#FFD700" stroke="#E6C200" strokeWidth="3" />

        {/* Coin inner ring */}
        <circle cx="100" cy="120" r="55" fill="none" stroke="#F0D000" strokeWidth="2" opacity="0.5" />

        {/* Eyes */}
        {state === "happy" ? (
          <>
            <path d="M 68 108 Q 78 118 88 108" stroke="#2C3E50" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 112 108 Q 122 118 132 108" stroke="#2C3E50" strokeWidth="4" fill="none" strokeLinecap="round" />
          </>
        ) : state === "warning" ? (
          <>
            <line x1="68" y1="105" x2="88" y2="115" stroke="#2C3E50" strokeWidth="4" strokeLinecap="round" />
            <line x1="88" y1="105" x2="68" y2="115" stroke="#2C3E50" strokeWidth="4" strokeLinecap="round" />
            <line x1="112" y1="105" x2="132" y2="115" stroke="#2C3E50" strokeWidth="4" strokeLinecap="round" />
            <line x1="132" y1="105" x2="112" y2="115" stroke="#2C3E50" strokeWidth="4" strokeLinecap="round" />
          </>
        ) : state === "thinking" ? (
          <>
            <ellipse cx="78" cy="112" rx="10" ry="12" fill="white" stroke="#2C3E50" strokeWidth="2" />
            <circle cx="80" cy="114" r="5" fill="#2C3E50" />
            <ellipse cx="122" cy="112" rx="10" ry="12" fill="white" stroke="#2C3E50" strokeWidth="2" />
            <circle cx="124" cy="110" r="5" fill="#2C3E50" />
            {/* Hand on chin */}
            <ellipse cx="145" cy="145" rx="12" ry="10" fill="white" stroke="#2C3E50" strokeWidth="2" />
          </>
        ) : (
          <>
            <motion.ellipse
              cx="78"
              cy="112"
              rx="10"
              ry={state === "talking" ? 10 : 12}
              fill="white"
              stroke="#2C3E50"
              strokeWidth="2"
              animate={state === "idle" ? eyeBlinkAnimation : undefined}
            />
            <circle cx="78" cy="114" r="5" fill="#2C3E50" />
            <motion.ellipse
              cx="122"
              cy="112"
              rx="10"
              ry={state === "talking" ? 10 : 12}
              fill="white"
              stroke="#2C3E50"
              strokeWidth="2"
              animate={state === "idle" ? eyeBlinkAnimation : undefined}
            />
            <circle cx="122" cy="114" r="5" fill="#2C3E50" />
          </>
        )}

        {/* Mouth */}
        {state === "happy" ? (
          <path d="M 75 140 Q 100 165 125 140" fill="#2C3E50" />
        ) : state === "warning" ? (
          <path d="M 82 145 Q 100 135 118 145" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
        ) : state === "talking" ? (
          <motion.ellipse
            cx="100"
            cy="145"
            rx="15"
            ry="10"
            fill="#2C3E50"
            animate={mouthTalkAnimation}
            style={{ transformOrigin: "100px 145px" }}
          />
        ) : (
          <path d="M 85 142 Q 100 150 115 142" stroke="#2C3E50" strokeWidth="3" fill="none" strokeLinecap="round" />
        )}

        {/* Cheeks for happy */}
        {state === "happy" && (
          <>
            <circle cx="60" cy="130" r="8" fill="#FF8C69" opacity="0.4" />
            <circle cx="140" cy="130" r="8" fill="#FF8C69" opacity="0.4" />
          </>
        )}
      </motion.g>
    </svg>
  );
}
