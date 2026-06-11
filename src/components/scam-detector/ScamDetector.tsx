"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Heart, X, Search, Clock, Zap } from "lucide-react";
import {
  pickRoundCards,
  ROUND_SIZE,
  TIMER_SECONDS,
  INITIAL_LIVES,
  speedBonus,
  comboBonus,
  performanceBadge,
} from "@/lib/scam-detector/cards";
import type { CardAnswer, GamePhase, ScamCard } from "@/lib/scam-detector/types";
import {
  loadStats,
  saveRoundResult,
  loadLeaderboard,
  averageAccuracy,
} from "@/lib/scam-detector/storage";
import { ScamDetectorCard } from "./ScamDetectorCard";
import "./scam-detector-theme.css";

export interface ScamDetectorProps {
  onComplete?: () => void;
  allowReplay?: boolean;
}

export function ScamDetector({ onComplete, allowReplay = false }: ScamDetectorProps) {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [showHowTo, setShowHowTo] = useState(false);
  const [cards, setCards] = useState<ScamCard[]>([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [combo, setCombo] = useState(0);
  const [comboMax, setComboMax] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answerTimes, setAnswerTimes] = useState<number[]>([]);
  const [lastReveal, setLastReveal] = useState<{ correct: boolean; points: number } | null>(null);
  const [basePoints, setBasePoints] = useState(0);
  const [speedBonusTotal, setSpeedBonusTotal] = useState(0);
  const [comboBonusTotal, setComboBonusTotal] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [stats, setStats] = useState({ bestScore: 0, totalGames: 0, totalCorrect: 0, totalAnswered: 0 });
  const [leaderboard, setLeaderboard] = useState<ReturnType<typeof loadLeaderboard>>([]);
  const [pathDone, setPathDone] = useState(allowReplay);
  const touchStartX = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardStartRef = useRef(Date.now());
  const processingRef = useRef(false);
  const timedOutRef = useRef(false);
  const briefingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setStats(loadStats());
    return () => {
      if (briefingTimerRef.current) clearTimeout(briefingTimerRef.current);
    };
  }, []);

  const currentCard = cards[cardIndex];
  const timerPercent = (timeLeft / TIMER_SECONDS) * 100;
  const timerColor =
    timerPercent > 50 ? "#F4B942" : timerPercent > 25 ? "#FF8C42" : "#E24B4A";

  const startRound = useCallback(() => {
    setCards(pickRoundCards());
    setCardIndex(0);
    setScore(0);
    setLives(INITIAL_LIVES);
    setTimeLeft(TIMER_SECONDS);
    setCombo(0);
    setComboMax(0);
    setCorrectCount(0);
    setWrongCount(0);
    setAnswerTimes([]);
    setBasePoints(0);
    setSpeedBonusTotal(0);
    setComboBonusTotal(0);
    setLastReveal(null);
    processingRef.current = false;
    timedOutRef.current = false;
    setPhase("briefing");
    cardStartRef.current = Date.now();

    if (briefingTimerRef.current) clearTimeout(briefingTimerRef.current);
    briefingTimerRef.current = setTimeout(() => {
      setPhase("playing");
      cardStartRef.current = Date.now();
    }, 1800);
  }, []);

  const goToComplete = useCallback(
    (finalScore: number, correct: number, wrong: number) => {
      const played = correct + wrong;
      saveRoundResult(finalScore, correct, played);
      setStats(loadStats());
      setLeaderboard(loadLeaderboard());
      setPhase("complete");
      const accuracy = played > 0 ? Math.round((correct / played) * 100) : 0;
      if (!pathDone && accuracy >= 70 && played >= 7) {
        setPathDone(true);
        onComplete?.();
      }
    },
    [onComplete, pathDone]
  );

  const processAnswer = useCallback(
    (answer: CardAnswer) => {
      if (phase !== "playing" || !currentCard || processingRef.current) return;
      processingRef.current = true;
      if (timerRef.current) clearInterval(timerRef.current);

      const elapsed = (Date.now() - cardStartRef.current) / 1000;
      const timeLeftAtAnswer = Math.max(0, TIMER_SECONDS - elapsed);
      const isCorrect = answer === currentCard.correctAnswer;

      let points = 0;
      let newCombo = combo;
      let newCorrect = correctCount;
      let newWrong = wrongCount;
      let newLives = lives;
      let newBase = basePoints;
      let newSpeed = speedBonusTotal;
      let newComboB = comboBonusTotal;

      if (isCorrect) {
        const base = 50;
        const spd = speedBonus(timeLeftAtAnswer);
        newCombo = combo + 1;
        const cmb = comboBonus(newCombo) - comboBonus(combo);
        points = base + spd + cmb;
        newCorrect += 1;
        newBase += base;
        newSpeed += spd;
        newComboB += cmb;
        setComboMax((m) => Math.max(m, newCombo));
      } else {
        newCombo = 0;
        newWrong += 1;
        newLives = lives - 1;
      }

      const newScore = score + points;
      setScore(newScore);
      setCombo(newCombo);
      setCorrectCount(newCorrect);
      setWrongCount(newWrong);
      setLives(newLives);
      setBasePoints(newBase);
      setSpeedBonusTotal(newSpeed);
      setComboBonusTotal(newComboB);
      setAnswerTimes((t) => [...t, elapsed]);
      setLastReveal({ correct: isCorrect, points });
      setPhase("reveal");

      const nextIndex = cardIndex + 1;
      const roundOver = nextIndex >= ROUND_SIZE || newLives <= 0;

      setTimeout(() => {
        if (roundOver) {
          goToComplete(newScore, newCorrect, newWrong);
        } else {
          setCardIndex(nextIndex);
          setTimeLeft(TIMER_SECONDS);
          cardStartRef.current = Date.now();
          setLastReveal(null);
          processingRef.current = false;
          timedOutRef.current = false;
          setPhase("playing");
        }
      }, isCorrect ? 2000 : 2400);
    },
    [
      phase,
      currentCard,
      combo,
      correctCount,
      wrongCount,
      lives,
      basePoints,
      speedBonusTotal,
      comboBonusTotal,
      cardIndex,
      score,
      goToComplete,
    ]
  );

  useEffect(() => {
    if (phase !== "playing") return;
    timedOutRef.current = false;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        const next = Math.max(0, t - 0.1);
        if (next <= 0 && !timedOutRef.current) {
          timedOutRef.current = true;
          if (timerRef.current) clearInterval(timerRef.current);
          const wrongAnswer: CardAnswer =
            cards[cardIndex]?.correctAnswer === "scam" ? "real" : "scam";
          processAnswer(wrongAnswer);
        }
        return next;
      });
    }, 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, cardIndex, cards, processAnswer]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (phase !== "playing") return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta < -50) processAnswer("scam");
    else if (delta > 50) processAnswer("real");
  };

  const playedTotal = correctCount + wrongCount;
  const roundAccuracy =
    playedTotal > 0 ? Math.round((correctCount / playedTotal) * 100) : 0;
  const avgTime =
    answerTimes.length > 0
      ? (answerTimes.reduce((a, b) => a + b, 0) / answerTimes.length).toFixed(1)
      : "0";
  const badge = performanceBadge(roundAccuracy);

  /* ─── INTRO ─── */
  if (phase === "intro") {
    return (
      <div className="sd-game gplay-screen rounded-b-2xl min-h-[520px]">
        <div className="sd-detective-ring mb-4">
          <motion.button
            type="button"
            onClick={startRound}
            className="sd-shield-pulse w-28 h-28 rounded-full bg-gradient-to-br from-[#1a0a0a] via-[#2d1515] to-[#1a1028] flex flex-col items-center justify-center border border-[#F4B942]/30"
            whileTap={{ scale: 0.94 }}
          >
            <Shield size={44} className="text-[#F4B942] mb-1" />
            <Search size={16} className="text-[#E24B4A]" />
          </motion.button>
        </div>

        <div className="gplay-badge">Kripto xavfsizlik</div>
        <h1 className="gplay-screen-title text-3xl sm:text-4xl mb-2">
          <span className="gold">SCAM DEDEKTIVI</span>
        </h1>
        <p className="gplay-screen-desc !mb-6">
          Sen kripto dedektivisansiz. <strong>Odamlarni scamdan himoya qil!</strong>
        </p>

        <div className="sd-intro-badge rounded-2xl px-4 py-3 mb-6 max-w-xs w-full">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-black/30 flex items-center justify-center text-xl shrink-0">
              🕵️
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-snug">
                Telegram, sayt, reklama va postlarni ko&apos;ring
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">
                Har biri uchun <span className="text-[#F4B942]">15 soniya</span> — SCAM yoki HAQIQIY
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full max-w-xs mb-6">
          {[
            { label: "Rekord", value: stats.bestScore, icon: "🏆" },
            { label: "O'rtacha", value: `${averageAccuracy(stats)}%`, icon: "🎯" },
            { label: "O'yinlar", value: stats.totalGames, icon: "📁" },
          ].map((s) => (
            <div key={s.label} className="sd-stat-pill rounded-xl py-2.5 px-1">
              <div className="text-[10px] mb-0.5">{s.icon}</div>
              <div className="text-base font-extrabold text-[#F4B942]">{s.value}</div>
              <div className="text-[8px] text-gray-500 uppercase font-bold tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={startRound}
          className="gplay-btn mb-3"
        >
          Ishni boshlash
        </button>
        <button
          type="button"
          onClick={() => setShowHowTo(true)}
          className="text-xs text-gray-500 hover:text-[#F4B942] font-bold transition-colors"
        >
          Qanday o&apos;ynash? →
        </button>

        <HowToModal show={showHowTo} onClose={() => setShowHowTo(false)} />
      </div>
    );
  }

  /* ─── BRIEFING (qisqa intro → birinchi vaziyat) ─── */
  if (phase === "briefing") {
    return (
      <div className="sd-game rounded-b-2xl min-h-[520px] flex flex-col items-center justify-center px-6 py-10 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          className="sd-briefing-flash"
        >
          <div className="w-20 h-20 rounded-2xl bg-[#E24B4A]/15 border border-[#E24B4A]/40 flex items-center justify-center mx-auto mb-5 text-4xl">
            🕵️
          </div>
          <p className="sd-case-label mb-2">Yangi ish ochildi</p>
          <h2 className="sd-title text-2xl mb-3">DALIL #{cards[0]?.id ?? 1}</h2>
          <p className="text-sm text-gray-400 max-w-[260px] mx-auto leading-relaxed">
            Haqiqiy hayotdan olingan vaziyat ekranda paydo bo&apos;ladi. Diqqat bilan o&apos;qing!
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-[#F4B942]">
            <Clock size={16} />
            <span className="text-sm font-bold">{TIMER_SECONDS} soniya taymer</span>
          </div>
        </motion.div>
        <motion.div
          className="absolute bottom-8 left-0 right-0 h-1 bg-white/5 mx-8 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="h-full bg-[#F4B942]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.8, ease: "linear" }}
          />
        </motion.div>
      </div>
    );
  }

  /* ─── COMPLETE ─── */
  if (phase === "complete") {
    return (
      <div className="sd-game rounded-b-2xl px-4 py-6 text-center">
        <p className="sd-case-label mb-2">Ish yopildi</p>
        <h2 className="sd-title text-2xl mb-4">RAUND TUGADI!</h2>

        <div className="sd-complete-ring w-32 h-32 mx-auto mb-4">
          <div className="w-full h-full rounded-full bg-[#0a0c10] flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold text-[#F4B942]">{roundAccuracy}%</span>
            <span className="text-[9px] text-gray-500 uppercase tracking-widest">aniqlik</span>
          </div>
        </div>

        <div className="space-y-2 text-sm mb-4 max-w-xs mx-auto">
          <Row label="To'g'ri javoblar" value={`${correctCount} / ${ROUND_SIZE}`} />
          <Row label="Noto'g'ri javoblar" value={String(wrongCount)} />
          <Row label="O'rtacha vaqt" value={`${avgTime}s`} />
          <Row label="Eng uzun combo" value={`x${comboMax}`} />
        </div>

        <div
          className={`inline-block px-4 py-2 rounded-xl font-extrabold text-sm mb-4 ${
            badge.tier === "gold"
              ? "bg-[#F4B942]/20 text-[#F4B942] border border-[#F4B942]/40"
              : badge.tier === "silver"
                ? "bg-gray-400/20 text-gray-300 border border-gray-400/30"
                : badge.tier === "bronze"
                  ? "bg-amber-700/20 text-amber-500 border border-amber-600/30"
                  : "bg-white/5 text-gray-400 border border-white/10"
          }`}
        >
          {badge.title}
        </div>

        <div className="sd-reveal-panel rounded-xl p-3 mb-4 text-left text-xs space-y-1 max-w-xs mx-auto">
          <Row label="Asosiy ball" value={`+${basePoints}`} small />
          <Row label="Tezlik bonusi" value={`+${speedBonusTotal}`} small />
          <Row label="Combo bonusi" value={`+${comboBonusTotal}`} small />
          <div className="border-t border-white/10 pt-2 flex justify-between font-extrabold text-[#F4B942]">
            <span>Jami</span>
            <span className="sd-score-display">{score}</span>
          </div>
        </div>

        <div className="flex gap-2 max-w-xs mx-auto mb-4">
          <button
            type="button"
            onClick={() => { setPhase("intro"); setShowLeaderboard(false); }}
            className="sd-btn-gold flex-1 py-3 rounded-xl text-sm"
          >
            YANA O&apos;YNASH
          </button>
          <button
            type="button"
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="flex-1 py-3 rounded-xl text-sm border border-[#F4B942]/30 text-[#F4B942] font-bold"
          >
            NATIJALAR
          </button>
        </div>

        {showLeaderboard && (
          <div className="text-left max-w-xs mx-auto sd-reveal-panel rounded-xl p-3">
            <h3 className="text-xs font-extrabold text-[#F4B942] mb-2 uppercase">Bu hafta top dedektivlar</h3>
            {leaderboard.length === 0 ? (
              <p className="text-[10px] text-gray-500">Hali natijalar yo&apos;q</p>
            ) : (
              leaderboard.map((e, i) => (
                <div key={e.id} className="flex justify-between text-[11px] py-1 border-b border-white/5 last:border-0">
                  <span className="text-gray-400">#{i + 1} {e.username}</span>
                  <span className="text-[#F4B942] font-bold">{e.score} ({e.accuracy}%)</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }

  /* ─── PLAYING / REVEAL ─── */
  return (
    <div className="sd-game rounded-b-2xl min-h-[560px] flex flex-col">
      {/* Detective HUD */}
      <div className="sd-hud px-3 pt-3 pb-2.5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="sd-case-label">Vaziyat {cardIndex + 1}/{ROUND_SIZE}</p>
            <div className="flex gap-1 mt-1">
              {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={i >= lives ? { scale: 0.5, opacity: 0.25 } : { scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Heart
                    size={20}
                    className={`sd-life-pip ${i < lives ? "text-[#E24B4A] fill-[#E24B4A]" : "text-gray-800"}`}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="sd-case-label">Ball</p>
            <span className="text-xl font-extrabold text-[#F4B942] sd-score-display">{score}</span>
          </div>

          <div className="text-right">
            <p className="sd-case-label">Vaqt</p>
            <span
              className="text-lg font-extrabold font-mono tabular-nums"
              style={{ color: timerColor }}
            >
              {Math.ceil(timeLeft)}s
            </span>
          </div>
        </div>

        <div className="sd-timer-track h-2.5 rounded-full overflow-hidden">
          <motion.div
            className={`sd-timer-fill h-full rounded-full ${timeLeft <= 3 ? "sd-timer-flash" : ""}`}
            style={{ width: `${timerPercent}%`, backgroundColor: timerColor, color: timerColor }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {combo >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="sd-combo-flame flex items-center justify-center gap-1.5 py-1 mt-2 rounded"
          >
            <Zap size={12} className="text-[#F4B942]" />
            <span className="text-[10px] font-extrabold text-[#F4B942] tracking-wider">
              COMBO x{combo}
            </span>
            <Zap size={12} className="text-[#F4B942]" />
          </motion.div>
        )}
      </div>

      {/* Evidence */}
      <div className="flex-1 px-3 py-3 flex flex-col justify-center min-h-0">
        <AnimatePresence mode="wait">
          {currentCard && (
            <motion.div
              key={currentCard.id + cardIndex}
              initial={{ x: 120, opacity: 0, rotateY: -8 }}
              animate={
                phase === "reveal" && lastReveal && !lastReveal.correct
                  ? { x: [0, -14, 14, -10, 10, 0], opacity: 1, rotateY: 0 }
                  : phase === "reveal" && lastReveal?.correct
                    ? { y: -12, opacity: 0.85, rotateY: 0 }
                    : { x: 0, opacity: 1, rotateY: 0 }
              }
              exit={{ x: -80, opacity: 0 }}
              transition={{ duration: phase === "reveal" ? 0.4 : 0.35, ease: "easeOut" }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <ScamDetectorCard
                card={currentCard}
                reveal={phase === "reveal"}
                correct={lastReveal?.correct}
                showScan={phase === "playing"}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "reveal" && lastReveal && currentCard && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="sd-reveal-panel mt-3 p-3 rounded-xl"
          >
            {lastReveal.correct ? (
              <p className="text-[#00D68F] font-extrabold text-sm mb-1 flex items-center gap-1.5">
                <span>✓</span> +{lastReveal.points} ball
              </p>
            ) : (
              <p className="text-[#E24B4A] font-extrabold text-sm mb-1 flex items-center gap-1.5">
                <Heart size={14} className="fill-current" /> -1 Hayot
              </p>
            )}
            <p className="text-[11px] text-gray-300 leading-relaxed">{currentCard.explanation}</p>
          </motion.div>
        )}
      </div>

      {/* Verdict buttons */}
      {phase === "playing" && (
        <div className="px-3 pb-4 pt-1">
          <div className="sd-swipe-hint mb-2.5">
            <span className="sd-swipe-arrow text-[#E24B4A]">◀ SCAM</span>
            <span>surish yoki tugma</span>
            <span className="sd-swipe-arrow right text-[#00D68F]">HAQIQIY ▶</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              type="button"
              whileTap={{ scale: 0.94, y: 2 }}
              onClick={() => processAnswer("scam")}
              className="sd-btn-scam py-4 rounded-xl text-base tracking-widest"
            >
              🚨 SCAM
            </motion.button>
            <motion.button
              type="button"
              whileTap={{ scale: 0.94, y: 2 }}
              onClick={() => processAnswer("real")}
              className="sd-btn-real py-4 rounded-xl text-base tracking-widest"
            >
              ✅ HAQIQIY
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className={`flex justify-between ${small ? "text-[11px]" : ""}`}>
      <span className="text-gray-500">{label}</span>
      <span className="font-bold text-white">{value}</span>
    </div>
  );
}

function HowToModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="sd-reveal-panel rounded-2xl p-5 max-w-sm w-full text-left border border-[#F4B942]/20"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="sd-case-label">Qo&apos;llanma</p>
            <h3 className="sd-title text-lg">Qanday o&apos;ynash?</h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Yopish">
            <X size={18} className="text-gray-500 hover:text-white" />
          </button>
        </div>
        <ul className="text-xs text-gray-300 space-y-2.5 leading-relaxed">
          <li className="flex gap-2">
            <span className="text-[#F4B942] shrink-0">01</span>
            <span>Har vaziyat <strong className="text-white">real hayot mockup</strong> ko&apos;rinishida — Telegram, brauzer, Instagram.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#F4B942] shrink-0">02</span>
            <span>Har biri uchun <strong className="text-[#F4B942]">15 soniya</strong> — vaqt tugasa xato hisoblanadi.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#E24B4A] shrink-0">03</span>
            <span>Scam bo&apos;lsa <strong className="text-[#E24B4A]">SCAM</strong> yoki chapga suring.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#00D68F] shrink-0">04</span>
            <span>Haqiqiy bo&apos;lsa <strong className="text-[#00D68F]">HAQIQIY</strong> yoki o&apos;ngga suring.</span>
          </li>
          <li className="flex gap-2">
            <span className="text-[#E24B4A] shrink-0">05</span>
            <span><strong className="text-[#E24B4A]">3 ta hayot</strong> — xato = -1. Tez javob va combo = bonus ball.</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
