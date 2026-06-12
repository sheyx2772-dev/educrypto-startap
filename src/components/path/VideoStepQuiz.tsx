"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PathQuizQ } from "@/lib/pathContent";
import { useTranslation } from "@/i18n/provider";

const LETTERS = ["A", "B", "C", "D"];

interface Props {
  question: PathQuizQ;
  questionNum: number;
  totalQuestions: number;
  questionKey: string;
  onCorrect: () => void;
}

export function VideoStepQuiz({ question, questionNum, totalQuestions, questionKey, onCorrect }: Props) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<"ok" | "bad" | null>(null);
  const onCorrectRef = useRef(onCorrect);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    onCorrectRef.current = onCorrect;
  }, [onCorrect]);

  useEffect(() => {
    setSelected(null);
    setFeedback(null);
  }, [questionKey]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const pick = (index: number) => {
    if (feedback !== null) return;
    setSelected(index);
    const isCorrect = index === question.correctIndex;
    setFeedback(isCorrect ? "ok" : "bad");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      if (isCorrect) {
        onCorrectRef.current();
      } else {
        setSelected(null);
        setFeedback(null);
      }
    }, isCorrect ? 600 : 800);
  };

  return (
    <motion.div
      key={questionKey}
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      className="pvc-quiz-card"
    >
      <span className="pvc-quiz-badge">
        🎯 {t("path.videoPhases.test")} {questionNum}/{totalQuestions}
      </span>
      <p className="pvc-quiz-question">{question.question}</p>

      {question.options.map((opt, i) => {
        let cls = "pvc-quiz-option";
        if (selected === i) {
          cls += feedback === "ok" ? " correct" : feedback === "bad" ? " wrong" : " selected";
        }
        return (
          <button
            key={`${questionKey}-${i}`}
            type="button"
            className={cls}
            disabled={feedback !== null}
            onClick={() => pick(i)}
          >
            <span className="pvc-quiz-option-letter">{LETTERS[i]}</span>
            <span>{opt}</span>
          </button>
        );
      })}

      {feedback === "ok" && (
        <p className="pvc-quiz-feedback ok">✓ {t("path.correct")}</p>
      )}
      {feedback === "bad" && (
        <p className="pvc-quiz-feedback bad">✗ {t("path.wrong")}</p>
      )}
    </motion.div>
  );
}
