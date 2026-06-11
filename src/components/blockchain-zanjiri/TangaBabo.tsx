// components/game/TangaBabo.tsx
'use client'

import { motion, AnimatePresence } from 'framer-motion'

type Mood = 'idle' | 'happy' | 'thinking' | 'excited' | 'warning' | 'teaching'

interface TangaBaboProps {
  mood?: Mood
  size?: number
  message?: string
  className?: string
}

const MOOD_CONFIGS: Record<Mood, {
  eyeY: number
  mouthD: string
  eyebrowD: string
  blush: boolean
  hatTilt: number
  bodyBounce: boolean
}> = {
  idle: {
    eyeY: 0,
    mouthD: 'M 72 122 Q 88 132 104 122',
    eyebrowD: '',
    blush: false,
    hatTilt: 0,
    bodyBounce: true,
  },
  happy: {
    eyeY: 2,
    mouthD: 'M 68 120 Q 88 145 108 120',
    eyebrowD: '',
    blush: true,
    hatTilt: 5,
    bodyBounce: true,
  },
  thinking: {
    eyeY: -3,
    mouthD: 'M 76 126 Q 88 124 100 128',
    eyebrowD: '',
    blush: false,
    hatTilt: -8,
    bodyBounce: false,
  },
  excited: {
    eyeY: 3,
    mouthD: 'M 66 118 Q 88 148 110 118',
    eyebrowD: '',
    blush: true,
    hatTilt: 12,
    bodyBounce: true,
  },
  warning: {
    eyeY: -5,
    mouthD: 'M 74 132 Q 88 120 102 132',
    eyebrowD: '',
    blush: false,
    hatTilt: -3,
    bodyBounce: false,
  },
  teaching: {
    eyeY: 0,
    mouthD: 'M 72 122 Q 88 136 104 122',
    eyebrowD: '',
    blush: false,
    hatTilt: 2,
    bodyBounce: false,
  },
}

const MOOD_COLORS: Record<Mood, string> = {
  idle: '#FFD700',
  happy: '#FFE44D',
  thinking: '#FFC107',
  excited: '#FFED4A',
  warning: '#FF9800',
  teaching: '#FFD700',
}

export default function TangaBabo({ mood = 'idle', size = 120, message, className = '' }: TangaBaboProps) {
  const cfg = MOOD_CONFIGS[mood]
  const bodyColor = MOOD_COLORS[mood]
  const scale = size / 176

  const bodyVariants = {
    bounce: {
      y: [0, -6, 0],
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" as const },
    },
    still: { y: 0 },
  };

  const hatVariants = {
    tilt: {
      rotate: cfg.hatTilt,
      transition: { type: "spring" as const, stiffness: 200, damping: 12 },
    },
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <motion.div
        variants={bodyVariants}
        animate={cfg.bodyBounce ? 'bounce' : 'still'}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 176 176"
          width={size}
          height={size}
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Soya */}
          <ellipse cx="88" cy="170" rx="44" ry="6" fill="rgba(0,0,0,0.12)" />

          {/* Tana — asosiy sariq doira */}
          <motion.circle
            cx="88"
            cy="105"
            r="68"
            fill={bodyColor}
            stroke="#E6B800"
            strokeWidth="3"
            animate={{ fill: bodyColor }}
            transition={{ duration: 0.3 }}
          />

          {/* Tana teksura — ichki doira */}
          <circle cx="88" cy="105" r="58" fill="none" stroke="#E6B800" strokeWidth="1" opacity="0.3" />

          {/* Shlaypa asosi (brim) */}
          <motion.g variants={hatVariants} animate="tilt" style={{ originX: '88px', originY: '38px' }}>
            <rect x="46" y="50" width="84" height="10" rx="5" fill="#7B3F00" />
            {/* Shlaypa tanasi */}
            <rect x="54" y="18" width="68" height="36" rx="10" fill="#8B4513" />
            {/* Shlaypa chiziq */}
            <rect x="54" y="46" width="68" height="5" rx="2" fill="#A0522D" />
            {/* Yulduz badge */}
            <circle cx="88" cy="32" r="8" fill="#FFD700" />
            <text x="88" y="36" textAnchor="middle" fontSize="10" fill="#7B3F00" fontWeight="bold">★</text>
          </motion.g>

          {/* Ko'zlar */}
          <motion.g animate={{ y: cfg.eyeY }} transition={{ type: 'spring', stiffness: 150 }}>
            {/* Chap ko'z */}
            <circle cx="72" cy="98" r="11" fill="white" />
            <circle cx="75" cy="100" r="6" fill="#1A1A2E" />
            <circle cx="77" cy="97" r="2" fill="white" />

            {/* O'ng ko'z */}
            <circle cx="104" cy="98" r="11" fill="white" />
            <circle cx="107" cy="100" r="6" fill="#1A1A2E" />
            <circle cx="109" cy="97" r="2" fill="white" />

            {/* Warning holati — qosh */}
            {mood === 'warning' && (
              <>
                <line x1="62" y1="86" x2="76" y2="90" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="100" y1="90" x2="114" y2="86" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
              </>
            )}

            {/* Thinking — bir ko'z qisilgan */}
            {mood === 'thinking' && (
              <line x1="94" y1="98" x2="114" y2="98" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" />
            )}
          </motion.g>

          {/* Og'iz */}
          <motion.path
            d={cfg.mouthD}
            stroke="#7B3F00"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            animate={{ d: cfg.mouthD }}
            transition={{ type: 'spring', stiffness: 100 }}
          />

          {/* Yonoq (qizarish) */}
          <AnimatePresence>
            {cfg.blush && (
              <motion.g
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <circle cx="60" cy="115" r="9" fill="#FF9999" opacity="0.55" />
                <circle cx="116" cy="115" r="9" fill="#FF9999" opacity="0.55" />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Teaching holati — qo'l (ko'rsatuvchi) */}
          {mood === 'teaching' && (
            <g>
              <line x1="148" y1="110" x2="128" y2="100" stroke="#E6B800" strokeWidth="6" strokeLinecap="round" />
              <circle cx="150" cy="109" r="5" fill="#E6B800" />
            </g>
          )}

          {/* Excited — qo'llar yuqoriga */}
          {mood === 'excited' && (
            <g>
              <motion.line
                x1="25" y1="95" x2="44" y2="80"
                stroke="#E6B800" strokeWidth="6" strokeLinecap="round"
                animate={{ rotate: [-5, 5, -5] }}
                style={{ originX: '44px', originY: '80px' }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
              <motion.line
                x1="151" y1="95" x2="132" y2="80"
                stroke="#E6B800" strokeWidth="6" strokeLinecap="round"
                animate={{ rotate: [5, -5, 5] }}
                style={{ originX: '132px', originY: '80px' }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Nutq pufagi */}
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            className="relative max-w-[220px] text-center"
          >
            {/* Pufak dumchasi */}
            <div
              style={{
                width: 0, height: 0,
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderBottom: '10px solid #FFD700',
                margin: '0 auto',
              }}
            />
            <div
              style={{
                background: '#FFD700',
                borderRadius: 12,
                padding: '8px 14px',
                fontSize: 13,
                fontWeight: 600,
                color: '#3a2e00',
                lineHeight: 1.4,
                fontFamily: 'Nunito, sans-serif',
              }}
            >
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
