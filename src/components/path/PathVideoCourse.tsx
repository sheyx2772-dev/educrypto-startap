"use client";

import { useEffect, useRef, useState } from "react";
import { PathVideoPlayer } from "./PathVideoPlayer";
import type { EnrichedVideoStep } from "@/lib/pathContent";
import { VideoStepGuide } from "./VideoStepGuide";
import { VideoStepQuiz } from "./VideoStepQuiz";
import "../../styles/path-video-course.css";
import { useTranslation } from "@/i18n/provider";

type Phase = "video" | "guide" | "quiz";

interface PathVideoCourseProps {
  steps: EnrichedVideoStep[];
  onComplete: () => void;
}

export function PathVideoCourse({ steps, onComplete }: PathVideoCourseProps) {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState<Phase>("video");
  const [quizIndex, setQuizIndex] = useState(0);
  const [finishedSteps, setFinishedSteps] = useState<Set<number>>(new Set());
  const [watchRatio, setWatchRatio] = useState(0);
  const quizIndexRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    quizIndexRef.current = quizIndex;
  }, [quizIndex]);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    setWatchRatio(0);
  }, [current]);

  const step = steps[current];
  const halfWatched = watchRatio >= 0.5;
  const total = steps.length;

  const afterVideo = () => setPhase("guide");

  const afterGuide = () => {
    setQuizIndex(0);
    setPhase("quiz");
  };

  const afterQuizQuestion = () => {
    const nextQuiz = quizIndexRef.current + 1;
    if (nextQuiz < 3) {
      setQuizIndex(nextQuiz);
      return;
    }

    const vid = currentRef.current;
    setFinishedSteps((done) => {
      const next = new Set(done);
      next.add(vid);
      return next;
    });
    setQuizIndex(0);

    if (vid + 1 < total) {
      setCurrent(vid + 1);
      setPhase("video");
    } else {
      onComplete();
    }
  };

  const goToStep = (i: number) => {
    if (i > current && !finishedSteps.has(i - 1) && i !== 0) return;
    setCurrent(i);
    setPhase(finishedSteps.has(i) ? "video" : "video");
    setQuizIndex(0);
  };

  return (
    <div className="pvc-root">
      <div className="pvc-header">
        <div className="flex justify-between items-start">
          <div>
            <p className="pvc-header-title">{total} {t("path.videoCourse")}</p>
            <p className="pvc-header-sub">{t("path.videoProgress", { n: current + 1, total })}</p>
          </div>
          <span className="pvc-header-count">{finishedSteps.size}/{total} ✓</span>
        </div>
        <div className="pvc-phase-pills">
          <span className={`pvc-phase-pill ${phase === "video" ? "active" : "done"}`}>
            📹 {t("path.videoPhases.video")}
          </span>
          <span className={`pvc-phase-pill ${phase === "guide" ? "active" : phase === "quiz" ? "done" : ""}`}>
            📖 {t("path.videoPhases.guide")}
          </span>
          <span className={`pvc-phase-pill ${phase === "quiz" ? "active" : ""}`}>
            🎯 {t("path.videoPhases.test")} {phase === "quiz" ? `${quizIndex + 1}/3` : ""}
          </span>
        </div>
      </div>

      <div className="pvc-progress-dots">
        {steps.map((s, i) => (
          <button
            key={s.step}
            type="button"
            onClick={() => goToStep(i)}
            className={`pvc-dot ${finishedSteps.has(i) ? "done" : i === current ? "current" : ""}`}
            aria-label={`Video ${i + 1}`}
          />
        ))}
      </div>

      <div className="pvc-body">
        {phase === "video" && (
          <>
            <h3 className="text-sm font-extrabold text-secondary mb-1">{step.title}</h3>
            <p className="text-[10px] text-gray-500 mb-3">{step.tip}</p>
            <PathVideoPlayer
              videoId={step.videoId}
              title={step.title}
              onWatchProgress={setWatchRatio}
            />
            <div className="pvc-watch-bar-wrap">
              <div className="pvc-watch-bar" style={{ width: `${Math.min(100, Math.round(watchRatio * 100))}%` }} />
            </div>
            <p className="pvc-watch-hint">
              {halfWatched
                ? t("path.watchDone")
                : t("path.watchProgressPct", { pct: Math.min(50, Math.round(watchRatio * 100)) })}
            </p>
            <button
              type="button"
              onClick={afterVideo}
              disabled={!halfWatched}
              className={`btn-3d-primary w-full mt-2 !text-sm !py-3 ${!halfWatched ? "pvc-btn-locked" : ""}`}
            >
              {halfWatched ? `✓ ${t("path.watchedVideo")}` : `🔒 ${t("path.lockVideo")}`}
            </button>
          </>
        )}

        {phase === "guide" && (
          <VideoStepGuide
            guide={step.guide}
            videoTitle={step.title}
            stepNum={current + 1}
            totalSteps={total}
            onComplete={afterGuide}
          />
        )}

        {phase === "quiz" && (
          <VideoStepQuiz
            key={`${current}-${quizIndex}`}
            questionKey={`${current}-${quizIndex}-${step.quiz[quizIndex].question}`}
            question={step.quiz[quizIndex]}
            questionNum={quizIndex + 1}
            totalQuestions={3}
            onCorrect={afterQuizQuestion}
          />
        )}
      </div>
    </div>
  );
}
