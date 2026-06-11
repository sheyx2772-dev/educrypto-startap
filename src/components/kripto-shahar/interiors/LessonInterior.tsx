"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BuildingId } from "@/lib/kripto-shahar/types";
import { getLessonForBuilding } from "@/lib/kripto-shahar/interior-lessons";
import { useKriptoShaharStore } from "@/lib/kripto-shahar/game-store";

type Step = "intro" | "quiz" | "feedback" | "complete";

export function LessonInterior({ buildingId }: { buildingId: BuildingId }) {
  const { completeInteriorLesson } = useKriptoShaharStore();
  const lesson = getLessonForBuilding(buildingId);

  const [step, setStep] = useState<Step>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastFeedback, setLastFeedback] = useState("");
  const [reward, setReward] = useState<{ bits: number; xp: number; leveledUp: boolean } | null>(null);
  const [showRetry, setShowRetry] = useState(false);

  if (!lesson) {
    return (
      <p className="text-center text-gray-500 py-10 text-sm">
        Bu bino uchun dars hali tayyorlanmagan.
      </p>
    );
  }

  const question = lesson.questions[qIndex];
  const totalQ = lesson.questions.length;
  const passNeeded = Math.ceil(totalQ / 2);

  const handleAnswer = (optionIdx: number) => {
    const isCorrect = optionIdx === question.correct;
    if (isCorrect) setCorrectCount((c) => c + 1);
    setLastFeedback(isCorrect ? `✓ To'g'ri! ${question.explain}` : `✗ Noto'g'ri. ${question.explain}`);
    setStep("feedback");
  };

  const nextAfterFeedback = () => {
    if (qIndex + 1 < totalQ) {
      setQIndex((i) => i + 1);
      setStep("quiz");
      return;
    }

    const passed = correctCount >= passNeeded;
    if (passed) {
      const result = completeInteriorLesson(buildingId);
      setReward(result);
      setShowRetry(false);
      setStep("complete");
    } else {
      setShowRetry(true);
      setStep("intro");
      setQIndex(0);
      setCorrectCount(0);
      setLastFeedback("");
    }
  };

  return (
    <div className="max-w-md mx-auto py-4 px-2">
      <AnimatePresence mode="wait">
        {step === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <div className="text-5xl mb-3">{lesson.emoji}</div>
            <h3 className="text-lg font-extrabold text-[#f4b942] mb-2">{lesson.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{lesson.description}</p>
            <ul className="text-left text-[11px] text-gray-500 space-y-2 mb-6 max-w-xs mx-auto">
              {lesson.introTips.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="text-[#f4b942]">▸</span> {t}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setQIndex(0);
                setCorrectCount(0);
                setShowRetry(false);
                setStep("quiz");
              }}
              className="gplay-btn gplay-btn-sm !max-w-none px-8 py-3 rounded-xl text-sm font-extrabold"
            >
              O&apos;rganishni boshlash
            </button>
          </motion.div>
        )}

        {step === "quiz" && question && (
          <motion.div
            key={`quiz-${qIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-[10px] text-gray-500 mb-2 text-center">
              Savol {qIndex + 1} / {totalQ}
            </p>
            <p className="text-sm font-bold text-white mb-4 text-center">{question.q}</p>
            <div className="space-y-2">
              {question.options.map((opt, i) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleAnswer(i)}
                  className="w-full text-left text-[12px] py-3 px-4 rounded-xl bg-white/5 hover:bg-[#f4b942]/15 border border-white/10 transition-colors"
                >
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === "feedback" && (
          <motion.div
            key="feedback"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-sm text-gray-300 mb-5 leading-relaxed">{lastFeedback}</p>
            <button
              type="button"
              onClick={nextAfterFeedback}
              className="gplay-btn gplay-btn-sm !max-w-none px-6 py-2.5 rounded-xl text-xs font-extrabold"
            >
              {qIndex + 1 < totalQ ? "Keyingi savol →" : "Natijani ko'rish"}
            </button>
          </motion.div>
        )}

        {step === "complete" && reward && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="ks-pixel-title mb-3">DARS TUGADI!</h3>
            <p className="text-sm text-[#00d68f] font-bold mb-1">+{reward.bits} Bit</p>
            <p className="text-xs text-gray-400 mb-1">+{reward.xp} XP</p>
            {reward.leveledUp && (
              <p className="text-xs text-[#f4b942] font-bold mb-3">⭐ Yangi daraja!</p>
            )}
            <p className="text-[11px] text-gray-500 mb-5">
              Endi boshqa binolarga boring yoki vazifalarni davom eting.
            </p>
            <button
              type="button"
              onClick={() => useKriptoShaharStore.getState().exitInterior()}
              className="gplay-btn gplay-btn-sm !max-w-none px-8 py-3 rounded-xl text-sm font-extrabold"
            >
              Maydonga qaytish
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {step === "intro" && showRetry && (
        <p className="text-center text-[#e24b4a] text-[11px] mt-4">
          Yetarli to&apos;g&apos;ri javob yo&apos;q. Qayta urinib ko&apos;ring.
        </p>
      )}
    </div>
  );
}
