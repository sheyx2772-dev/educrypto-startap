"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSayohatStore } from "@/lib/kripto-sayohat/store";
import type { AvatarId } from "@/lib/kripto-sayohat/types";
import { BoardEdge } from "./BoardEdge";
import "./kripto-sayohat-theme.css";

const AVATARS: { id: AvatarId; emoji: string; label: string }[] = [
  { id: "coder", emoji: "</>", label: "Koder" },
  { id: "vr_girl", emoji: "🥽", label: "VR Student" },
  { id: "analyst", emoji: "📊", label: "Tahlilchi" },
  { id: "btc_knight", emoji: "₿", label: "BTC Ritsar" },
  { id: "eth_guard", emoji: "Ξ", label: "ETH Qo'riqchi" },
];

interface Props {
  onComplete?: () => void;
  allowReplay?: boolean;
}

export function KriptoSayohatGame({ onComplete, allowReplay = false }: Props) {
  const store = useSayohatStore();
  const [quizFeedback, setQuizFeedback] = useState<"ok" | "bad" | null>(null);
  const [pickedAvatar, setPickedAvatar] = useState<AvatarId | null>(null);

  useEffect(() => {
    if (allowReplay) store.setRewarded(true);
    return () => store.resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (store.phase === "won" && !store.pathCompleteFired && onComplete && !store.rewarded) {
      store.setRewarded(true);
      store.markPathComplete();
      setTimeout(onComplete, 2000);
    }
  }, [store.phase, store.pathCompleteFired, store.rewarded, onComplete, store]);

  const handleStart = () => {
    if (!pickedAvatar) return;
    store.setAvatar(pickedAvatar);
    store.startGame();
  };

  const handleQuiz = (idx: number) => {
    const ok = store.answerQuiz(idx);
    setQuizFeedback(ok ? "ok" : "bad");
    setTimeout(() => setQuizFeedback(null), 1200);
  };

  const handleTileClick = () => {
    store.openCurrentTile();
  };

  const modalPhase = store.phase;

  if (store.phase === "avatar") {
    return (
      <div className="ks-root min-h-[520px]">
        <div className="gplay-screen !min-h-[520px] !py-6">
        <div className="gplay-badge">Global Edition</div>
        <Image src="/game/kripto-sayohat/olaa.png" alt="Olaa" width={100} height={100} className="mx-auto mb-3" unoptimized />
        <h2 className="gplay-screen-title"><span className="white">Kripto-</span><span className="gold">Sayohat</span></h2>
        <p className="gplay-screen-desc !mb-4">Figurangizni tanlang — 40 katakli Blockchain yo&apos;lida sayohat qiling</p>
        <div className="ks-avatar-grid">
          {AVATARS.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setPickedAvatar(a.id)}
              className={`ks-avatar-card ${pickedAvatar === a.id ? "selected" : ""}`}
            >
              <div className="ks-avatar-emoji">{a.emoji}</div>
              <div className="ks-avatar-label">{a.label}</div>
            </button>
          ))}
        </div>
        <div className="px-4 pb-2 w-full flex justify-center">
          <button type="button" className="gplay-btn" disabled={!pickedAvatar} onClick={handleStart}>
            Sayohatni boshlash
          </button>
        </div>
        </div>
      </div>
    );
  }

  if (store.phase === "won") {
    return (
      <div className="ks-root min-h-[520px]">
        <div className="ks-won">
          <Image src="/game/kripto-sayohat/olaa.png" alt="Olaa" width={120} height={120} className="mx-auto" unoptimized />
          <p className="ks-won-title">KRYPTO-USTA</p>
          <p className="text-sm text-[var(--ks-muted)]">Kripto-Sayohat tugadi!</p>
          <p className="text-xs mt-2">⭐ {store.knowledgePoints} Bilim balli · 🛡️ {store.portfolioSafety}% xavfsizlik</p>
          <p className="text-xs text-[var(--ks-gold)] font-bold mt-1">Level {store.level} · {store.usdtBalance} USDT</p>
          {(allowReplay || store.rewarded) && (
            <button
              type="button"
              className="gplay-btn mt-6"
              onClick={() => { store.resetGame(); store.setRewarded(true); }}
            >
              Qayta o&apos;ynash →
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="ks-root min-h-[520px] relative">
      <div className="ks-hud">
        <div className="ks-stat">
          <span className="text-lg">⭐</span>
          <div>
            <div className="ks-stat-label">Bilim Ballari</div>
            <div className="ks-stat-value">{store.knowledgePoints}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-[9px] font-bold text-[var(--ks-muted)]">LEVEL {store.level}</div>
          <div className="text-[10px] font-extrabold text-[var(--ks-cyan)]">
            {AVATARS.find((a) => a.id === store.avatar)?.emoji} · Katak {store.position}/39
          </div>
        </div>
        <div className="ks-stat">
          <div>
            <div className="ks-stat-label">Portfel Xavfsizligi</div>
            <div className="ks-safety-bar mt-1">
              <div className="ks-safety-fill" style={{ width: `${store.portfolioSafety}%` }} />
            </div>
          </div>
        </div>
      </div>

      <BoardEdge
        position={store.position}
        awaitingTileClick={store.awaitingTileClick}
        phase={store.phase}
        onTileClick={handleTileClick}
      />

      {store.olaaMessage && store.phase === "board" && (
        <div className="ks-olaa-bar">
          <Image src="/game/kripto-sayohat/olaa.png" alt="Olaa" width={64} height={64} className="ks-olaa-img" unoptimized />
          <div>
            <div className="ks-olaa-name">Olaa</div>
            <div className="ks-olaa-text">{store.olaaMessage}</div>
          </div>
        </div>
      )}

      {/* Bitta modal — faqat bitta bosqich ochiladi */}
      <AnimatePresence mode="wait">
        {modalPhase === "challenge" && store.activeQuiz && (
          <motion.div key="quiz" className="ks-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="ks-modal-panel">
              <div className="flex items-center gap-3 mb-3">
                <Image src="/game/kripto-sayohat/olaa.png" alt="" width={40} height={40} unoptimized />
                <div>
                  <p className="text-[10px] text-[var(--ks-gold)] font-bold">Olaa · Akademik katak</p>
                  <p className="ks-modal-title !mb-0">{store.currentTile?.title}</p>
                </div>
              </div>
              <p className="text-sm font-semibold mb-4">{store.activeQuiz.question}</p>
              {store.activeQuiz.options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  className={`ks-option ${quizFeedback === "ok" && i === store.activeQuiz?.correctIndex ? "correct" : ""} ${quizFeedback === "bad" ? "wrong" : ""}`}
                  onClick={() => handleQuiz(i)}
                  disabled={quizFeedback !== null}
                >
                  {String.fromCharCode(65 + i)}. {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {modalPhase === "challenge" && store.activeStable && (
          <motion.div key="stable" className="ks-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="ks-modal-panel">
              <div className="flex items-center gap-3 mb-3">
                <Image src="/game/kripto-sayohat/olaa.png" alt="" width={40} height={40} unoptimized />
                <div>
                  <p className="text-[10px] text-[var(--ks-green)] font-bold">Olaa · Stablecoin</p>
                  <p className="ks-modal-title !mb-0">{store.activeStable.title}</p>
                </div>
              </div>
              <p className="text-[11px] text-[var(--ks-muted)] mb-3">{store.activeStable.olaaTip}</p>
              {store.activeStable.steps.map((step, i) => (
                <button
                  key={step.label}
                  type="button"
                  className={`ks-option ${store.stableSelected.has(i) ? "selected" : ""}`}
                  onClick={() => store.toggleStableStep(i)}
                >
                  {store.stableSelected.has(i) ? "✓ " : ""}{step.label}
                </button>
              ))}
              <button type="button" className="gplay-btn gplay-btn-sm mt-2" onClick={() => store.submitStable()}>
                Tranzaksiyani tasdiqlash →
              </button>
            </div>
          </motion.div>
        )}

        {modalPhase === "olaa" && store.activeRisk && (
          <motion.div key="risk" className="ks-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="ks-modal-panel">
              <div className="ks-risk-scene">
                <div className="ks-hacker">🎭</div>
                <p className="text-xs text-[var(--ks-red)] font-bold mt-2">Hacker-Shadow poylab turibdi!</p>
              </div>
              <p className="text-[10px] text-[var(--ks-red)] font-extrabold uppercase mb-1">Risk-Zone · {store.activeRisk.scamType}</p>
              <p className="ks-modal-title">{store.activeRisk.title}</p>
              <p className="text-xs text-[var(--ks-muted)] mb-3 p-3 bg-red-950/30 rounded-xl border border-red-500/30">
                {store.activeRisk.warning}
              </p>
              <div className="ks-olaa-bar !m-0 mb-4">
                <Image src="/game/kripto-sayohat/olaa.png" alt="Olaa" width={48} height={48} className="ks-olaa-img" unoptimized />
                <div>
                  <div className="ks-olaa-name">Olaa</div>
                  <div className="ks-olaa-text">{store.activeRisk.olaaMessage}</div>
                </div>
              </div>
              <button type="button" className="gplay-btn gplay-btn-sm mb-2" onClick={() => store.handleRiskListen()}>
                🛡️ Olaa tinglayman — {store.activeRisk.backTiles} katak orqaga
              </button>
              <button type="button" className="gplay-btn gplay-btn-sm gplay-btn-danger" onClick={() => store.handleRiskIgnore()}>
                ⚠️ E&apos;tiborsiz qoldiraman (ballar kamayadi)
              </button>
            </div>
          </motion.div>
        )}

        {modalPhase === "reward" && (
          <motion.div key="reward" className="ks-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="ks-modal-panel text-center">
              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-6xl mb-4">
                🎁
              </motion.div>
              <p className="ks-modal-title">Mukofot Sandig&apos;i!</p>
              <p className="text-xs text-[var(--ks-muted)] mb-1">{store.currentTile?.title}</p>
              <p className="text-xs text-[var(--ks-muted)] mb-4">+20 Bilim balli · +10 USDT</p>
              <button type="button" className="gplay-btn gplay-btn-sm" onClick={() => store.claimReward()}>
                Sandiqni ochish →
              </button>
            </div>
          </motion.div>
        )}

        {modalPhase === "card" && store.activeCard && (
          <motion.div key="card" className="ks-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="ks-modal-panel text-center">
              <p className="text-[10px] text-[var(--ks-muted)] mb-1">Karta uyi · {store.currentTile?.title}</p>
              <div className={`ks-game-card ${store.activeCard.type} mx-auto mb-4`}>
                <div className="text-2xl mb-2">
                  {store.activeCard.type === "bilim" ? "📘" : store.activeCard.type === "scam" ? "🪝" : "✨"}
                </div>
                {store.activeCard.title}
              </div>
              <p className="text-xs mb-4">{store.activeCard.description}</p>
              <button type="button" className="gplay-btn gplay-btn-sm" onClick={() => store.applyCard()}>
                Kartochkani ochish →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
