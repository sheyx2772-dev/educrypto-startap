"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/lib/lessonContent";

interface LessonQuizProps {
  questions: QuizQuestion[];
  reward: number;
  onPass: () => void;
  onFail: () => void;
  disabled: boolean;
  practiceMode?: boolean;
}

export function LessonQuiz({ questions, reward, onPass, onFail, disabled, practiceMode }: LessonQuizProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correct, setCorrect] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleAnswer = () => {
    if (selected === null) return;
    const isCorrect = selected === q.correctIndex;
    const newCorrect = correct + (isCorrect ? 1 : 0);
    setCorrect(newCorrect);
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelected(null);
      if (current + 1 < questions.length) {
        setCurrent(current + 1);
      } else {
        setFinished(true);
        const passed = newCorrect >= Math.ceil(questions.length * 0.7);
        if (!practiceMode) {
          if (passed) onPass();
          else onFail();
        }
      }
    }, 1500);
  };

  if (disabled) {
    return (
      <div className="card-neon p-6 text-center opacity-60">
        <span className="text-3xl">🔒</span>
        <p className="text-sm text-gray-500 mt-2">Avval videoni to&apos;liq ko&apos;ring va qo&apos;llanmani o&apos;qing</p>
      </div>
    );
  }

  if (finished) {
    const passed = correct >= Math.ceil(questions.length * 0.7);
    return (
      <div className={`card-neon p-6 text-center border-2 ${passed ? "border-accent" : "border-warning"}`}>
        <span className="text-4xl">{passed ? "🎉" : "😔"}</span>
        <p className="font-extrabold text-secondary mt-2">
          {passed ? "Tabriklaymiz! Testdan o'tdingiz!" : "Testdan o'ta olmadingiz"}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {correct}/{questions.length} to&apos;g&apos;ri javob
        </p>
        {!passed && !practiceMode && (
          <p className="text-xs text-warning mt-3 font-semibold">
            Videoni qayta ko&apos;ring va qo&apos;llanmani takrorlang
          </p>
        )}
        {practiceMode && (
          <button
            onClick={() => { setCurrent(0); setCorrect(0); setFinished(false); setSelected(null); }}
            className="btn-3d-accent mt-3 !text-xs !py-2 w-full"
          >
            Qayta yechish
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="card-neon p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-extrabold text-secondary flex items-center gap-2">
          <span className="neon-glow-yellow text-lg">❓</span> Test
          {practiceMode && <span className="text-[10px] font-bold text-accent">(qayta)</span>}
        </h3>
        <span className="text-xs font-bold text-gray-400">
          {current + 1}/{questions.length}
          {!practiceMode && ` · +${reward} USDT`}
        </span>
      </div>

      <div className="h-1.5 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-duo-yellow rounded-full"
          animate={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <p className="font-semibold text-secondary mb-4 text-sm leading-relaxed">{q.question}</p>

      <div className="space-y-2 mb-4">
        {q.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => !showResult && setSelected(i)}
            className={`w-full text-left p-3 rounded-xl text-sm font-medium transition-all border-2 ${
              showResult
                ? i === q.correctIndex
                  ? "border-accent bg-accent/10 text-accent"
                  : i === selected
                    ? "border-warning bg-warning/10 text-warning"
                    : "border-gray-100 opacity-50"
                : selected === i
                  ? "border-duo-yellow bg-duo-yellow/10 scale-[1.02]"
                  : "border-gray-100 hover:border-duo-yellow/50"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gray-500 mb-3 italic"
          >
            {q.explanation}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        onClick={handleAnswer}
        disabled={selected === null || showResult}
        className="btn-3d-primary w-full !text-sm !py-3 disabled:opacity-40"
      >
        Javob berish
      </button>
    </div>
  );
}
