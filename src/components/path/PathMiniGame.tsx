"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PathGame } from "@/lib/pathContent";
import { GAME_CHEST_SIZE, getChestImage } from "@/lib/bridgeChests";
import { PathInteractiveLab } from "./interactive/PathInteractiveLab";
import { GiftChest, ChestSparkle } from "./GiftChest";

interface PathMiniGameProps {
  game: PathGame;
  onComplete: () => void;
  allowReplay?: boolean;
  chestNodeId?: string;
}

function ReplayPanel({ onReplay }: { onReplay: () => void }) {
  return (
    <div className="card-neon p-4 text-center border-2 border-accent bg-accent/10">
      <p className="text-sm font-extrabold text-accent">🎉 G&apos;alaba!</p>
      <p className="text-[10px] text-gray-400 mt-1">Mukofot olingan — qayta o&apos;ynash mumkin</p>
      <button type="button" onClick={onReplay} className="btn-3d-primary mt-3 !text-xs !py-2">
        Qayta o&apos;ynash →
      </button>
    </div>
  );
}

export function PathMiniGame({ game, onComplete, allowReplay, chestNodeId }: PathMiniGameProps) {
  const [won, setWon] = useState(false);
  const [playKey, setPlayKey] = useState(0);

  const finish = () => {
    setWon(true);
    onComplete();
  };

  const replay = () => {
    setWon(false);
    setPlayKey((k) => k + 1);
  };

  if (won && allowReplay) {
    return <ReplayPanel onReplay={replay} />;
  }

  const key = playKey;
  const done = won && !allowReplay;

  if (game.type === "match" && game.pairs) {
    return <MatchGame key={key} pairs={game.pairs} title={game.title} onComplete={finish} done={done} />;
  }
  if (game.type === "order" && game.steps) {
    return <OrderGame key={key} steps={game.steps} title={game.title} onComplete={finish} done={done} />;
  }
  if (game.type === "tap" && game.statements) {
    return <TapGame key={key} statements={game.statements} title={game.title} onComplete={finish} done={done} />;
  }
  if (game.type === "truefalse" && game.statements) {
    return <TrueFalseGame key={key} statements={game.statements} title={game.title} onComplete={finish} done={done} />;
  }
  if (game.type === "chest" && game.statements) {
    return (
      <ChestGame
        key={key}
        statements={game.statements}
        title={game.title}
        chestSrc={getChestImage(chestNodeId ?? "p9")}
        onComplete={finish}
        done={done}
      />
    );
  }
  if (game.type === "interactive" && game.interactiveId) {
    return (
      <PathInteractiveLab
        key={key}
        labId={game.interactiveId}
        title={game.title}
        onComplete={finish}
        allowReplay={allowReplay}
      />
    );
  }
  return null;
}

function MatchGame({ pairs, title, onComplete, done }: { pairs: { term: string; def: string }[]; title: string; onComplete: () => void; done: boolean }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const defs = [...pairs].sort(() => Math.random() - 0.5);

  const handleDef = (def: string, term: string) => {
    if (selected === term) {
      const next = new Set(matched);
      next.add(term);
      setMatched(next);
      setSelected(null);
      if (next.size === pairs.length) onComplete();
    } else {
      setSelected(null);
    }
  };

  return (
    <div className="card-neon p-4">
      <h3 className="font-extrabold text-secondary text-sm mb-1">{title}</h3>
      <p className="text-[10px] text-gray-400 mb-3">Atamani tanlang, keyin to&apos;g&apos;ri ta&apos;rifni bosing</p>
      {done ? (
        <p className="text-accent font-bold text-center">✓ Moslashtirish tugadi!</p>
      ) : (
        <>
          <div className="flex flex-wrap gap-2 mb-3">
            {pairs.map((p) => (
              <button
                key={p.term}
                onClick={() => setSelected(p.term)}
                disabled={matched.has(p.term)}
                className={`text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                  matched.has(p.term) ? "bg-accent/20 text-accent line-through" :
                  selected === p.term ? "bg-duo-yellow text-secondary neon-badge" : "bg-gray-100 text-secondary"
                }`}
              >
                {p.term}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {defs.map((p) => (
              <button
                key={p.def}
                onClick={() => handleDef(p.def, p.term)}
                disabled={matched.has(p.term) || !selected}
                className="w-full text-left text-xs p-2 rounded-lg bg-gray-50 hover:bg-duo-yellow/20 font-medium disabled:opacity-40"
              >
                {p.def}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function OrderGame({ steps, title, onComplete, done }: { steps: string[]; title: string; onComplete: () => void; done: boolean }) {
  const [order, setOrder] = useState<number[]>([]);

  const tap = (i: number) => {
    if (order.includes(i)) return;
    const next = [...order, i];
    setOrder(next);
    if (next.length === steps.length) {
      const correct = next.every((v, idx) => v === idx);
      if (correct) onComplete();
      else setTimeout(() => setOrder([]), 600);
    }
  };

  return (
    <div className="card-neon p-4">
      <h3 className="font-extrabold text-secondary text-sm mb-1">{title}</h3>
      <p className="text-[10px] text-gray-400 mb-3">To&apos;g&apos;ri ketma-ketlikda bosing (1→2→3)</p>
      {done ? (
        <p className="text-accent font-bold text-center">✓ To&apos;g&apos;ri tartib!</p>
      ) : (
        <div className="space-y-2">
          {steps.map((s, i) => (
            <button
              key={s}
              onClick={() => tap(i)}
              className={`w-full text-left text-xs p-3 rounded-xl font-bold transition-all ${
                order.includes(i) ? "bg-accent/20 text-accent border-2 border-accent" : "bg-gray-50 text-secondary"
              }`}
            >
              {order.includes(i) ? `${order.indexOf(i) + 1}. ` : ""}{s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TapGame({ statements, title, onComplete, done }: { statements: { text: string; correct: boolean }[]; title: string; onComplete: () => void; done: boolean }) {
  const [tapped, setTapped] = useState(0);

  const handleTap = (correct: boolean) => {
    if (correct) {
      const next = tapped + 1;
      setTapped(next);
      if (next >= statements.filter((s) => s.correct).length) onComplete();
    }
  };

  return (
    <div className="card-neon p-4 text-center">
      <h3 className="font-extrabold text-secondary text-sm mb-3">{title}</h3>
      {done ? (
        <p className="text-4xl animate-bounce">🎁</p>
      ) : (
        <div className="space-y-2">
          {statements.map((s) => (
            <button key={s.text} onClick={() => handleTap(s.correct)} className="w-full btn-3d-primary !text-xs !py-3">
              {s.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TrueFalseGame({ statements, title, onComplete, done }: { statements: { text: string; correct: boolean }[]; title: string; onComplete: () => void; done: boolean }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);

  const current = statements[index];

  const answer = (userSaysTrue: boolean) => {
    const isCorrect = userSaysTrue === current.correct;
    const newScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(newScore);
    setFeedback(isCorrect ? "ok" : "bad");
    setTimeout(() => {
      setFeedback(null);
      if (index + 1 >= statements.length) {
        const passed = newScore >= Math.ceil(statements.length * 0.7);
        if (passed) onComplete();
        else { setIndex(0); setScore(0); }
      } else {
        setIndex((i) => i + 1);
      }
    }, 700);
  };

  return (
    <div className="card-neon p-4">
      <h3 className="font-extrabold text-secondary text-sm mb-1">{title}</h3>
      <p className="text-[10px] text-gray-400 mb-3">Simple Bitcoin uslubi — haqiqat yoki mif? ({index + 1}/{statements.length})</p>
      {done ? (
        <p className="text-accent font-bold text-center">✓ Tekshiruv o&apos;yini tugadi!</p>
      ) : (
        <>
          <p className="text-sm font-semibold text-secondary mb-4 leading-relaxed">{current.text}</p>
          <div className="flex gap-2">
            <button onClick={() => answer(true)} disabled={feedback !== null} className="flex-1 btn-3d-accent !text-xs !py-3 disabled:opacity-50">
              ✓ Haqiqat
            </button>
            <button onClick={() => answer(false)} disabled={feedback !== null} className="flex-1 btn-3d-primary !text-xs !py-3 disabled:opacity-50">
              ✗ Mif
            </button>
          </div>
          {feedback === "ok" && <p className="text-xs text-accent font-bold mt-2 text-center">To&apos;g&apos;ri!</p>}
          {feedback === "bad" && <p className="text-xs text-warning font-bold mt-2 text-center">Noto&apos;g&apos;ri — qayta urinib ko&apos;ring</p>}
        </>
      )}
    </div>
  );
}

function ChestGame({
  statements,
  title,
  chestSrc,
  onComplete,
  done,
}: {
  statements: { text: string; correct: boolean }[];
  title: string;
  chestSrc: string;
  onComplete: () => void;
  done: boolean;
}) {
  const [phase, setPhase] = useState<"idle" | "sparkle" | "reveal">("idle");

  const handleOpen = () => {
    if (phase !== "idle" || done) return;
    setPhase("sparkle");
    setTimeout(() => setPhase("reveal"), 500);
    setTimeout(() => onComplete(), 1600);
  };

  const hint = statements[0]?.text ?? "Sandiqni bosing!";

  return (
    <div className="card-neon p-6 text-center path-chest-game">
      <h3 className="font-extrabold text-secondary text-sm mb-4">{title}</h3>
      {done ? (
        <div>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl mb-2"
          >
            🎁
          </motion.p>
          <p className="text-accent font-extrabold">Sovg&apos;a ochildi!</p>
        </div>
      ) : (
        <>
          <div className="path-chest-stage">
            <ChestSparkle active={phase === "sparkle" || phase === "reveal"} />
            <GiftChest
              src={chestSrc}
              size={GAME_CHEST_SIZE}
              breathing={phase === "idle"}
              onClick={handleOpen}
              noBg
            />
            <AnimatePresence>
              {phase === "reveal" && (
                <motion.div
                  className="path-chest-gift-pop"
                  initial={{ opacity: 0, y: 24, scale: 0.4 }}
                  animate={{ opacity: 1, y: -72, scale: 1 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <span className="text-5xl">🎁</span>
                  <span className="path-chest-gift-glow" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="text-xs font-bold text-secondary mb-1 mt-2">
            {phase === "idle" ? hint : phase === "sparkle" ? "✨ Zar taralmoqda..." : "Sovg&apos;a chiqmoqda!"}
          </p>
          {phase === "idle" && (
            <p className="text-[10px] text-gray-400">Sandiqchani bosing — ichidan sovg&apos;a chiqadi</p>
          )}
        </>
      )}
    </div>
  );
}
