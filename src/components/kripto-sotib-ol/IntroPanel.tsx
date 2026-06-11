"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { WIN_PURCHASE_COUNT } from "@/lib/kripto-sotib-ol/store";

interface Props {
  onStart: () => void;
}

export function IntroPanel({ onStart }: Props) {
  return (
    <div className="kso-intro-panel">
      <div className="kso-intro-glow kso-intro-glow-1" />
      <div className="kso-intro-glow kso-intro-glow-2" />

      <div className="kso-intro-badge">⚡ LIVE SAVDO — REAL KURS</div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="kso-intro-hero-wrap"
      >
        <Image
          src="/game/kripto-sotib-ol/savatcha-hero.png"
          alt="Kripto savatcha"
          width={220}
          height={220}
          className="kso-intro-hero"
          unoptimized
          priority
        />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="kso-intro-headline"
      >
        <span className="kso-intro-head-white">Kripto-</span>
        <span className="kso-intro-head-gold">Sotib Ol</span>
      </motion.h1>

      <p className="kso-intro-tagline">
        <span className="kso-intro-tag-white">Haqiqiy qiymat dueli — </span>
        <span className="kso-intro-tag-gold">USD narxni kriptoga aylantiring!</span>
      </p>

      <div className="kso-intro-stats">
        <div className="kso-intro-stat">
          <span className="kso-intro-stat-val">7</span>
          <span className="kso-intro-stat-lbl">Mahsulot</span>
        </div>
        <div className="kso-intro-stat-div" />
        <div className="kso-intro-stat">
          <span className="kso-intro-stat-val">3s</span>
          <span className="kso-intro-stat-lbl">Live kurs</span>
        </div>
        <div className="kso-intro-stat-div" />
        <div className="kso-intro-stat">
          <span className="kso-intro-stat-val">{WIN_PURCHASE_COUNT}</span>
          <span className="kso-intro-stat-lbl">Xarid = g&apos;alaba</span>
        </div>
      </div>

      <ul className="kso-intro-features">
        <li><span className="kso-feat-gold">BTC · ETH · SOL · USDT</span> bilan to&apos;lov</li>
        <li><span className="kso-feat-white">Kalkulyator kassa</span> — mobil uchun qulay</li>
        <li><span className="kso-feat-gold">Noto&apos;g&apos;ri hisob</span> = tranzaksiya rad</li>
      </ul>

      <motion.button
        type="button"
        className="kso-intro-cta"
        onClick={onStart}
        whileTap={{ scale: 0.97 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <span className="kso-intro-cta-shine" />
        <span className="kso-intro-cta-text">Rastani ochish</span>
        <span className="kso-intro-cta-icon">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.button>
    </div>
  );
}
