"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { VideoPlayer } from "./VideoPlayer";
import { StudyGuide } from "./StudyGuide";
import { LessonQuiz } from "./LessonQuiz";
import { CoinCelebration } from "./CoinCelebration";
import { useProgress } from "@/context/ProgressContext";
import { getLocalizedLessonGuide, getLocalizedLessonQuiz } from "@/i18n/content/lessonTemplates";
import { getLocalizedLesson } from "@/i18n/content/lessons";
import { lessons, type Lesson } from "@/lib/lessons";
import { LockIcon } from "@/components/icons/NavIcons";
import { StarterGate } from "@/components/onboarding/StarterGate";
import { useTranslation } from "@/i18n/provider";
import { getLevelTitle } from "@/i18n/localize";

interface LessonFlowProps {
  lesson: Lesson;
}

type Step = "video" | "guide" | "quiz" | "done";

function DonePanel({
  lesson,
  nextLesson,
  isUnlocked,
  canUnlock,
  unlockLesson,
  getCost,
}: {
  lesson: Lesson;
  nextLesson: Lesson | null;
  isUnlocked: (id: string) => boolean;
  canUnlock: (id: string) => boolean;
  unlockLesson: (id: string) => boolean;
  getCost: (id: string) => number;
}) {
  return (
    <div className="card-neon p-6 text-center border-2 border-accent">
      <span className="text-4xl">🏆</span>
      <p className="font-extrabold text-secondary mt-2">Darslik tugallandi!</p>
      <p className="text-sm text-accent font-bold mt-1">+{lesson.reward} USDT qo&apos;shildi</p>

      {nextLesson ? (
        <div className="mt-4 p-4 bg-duo-yellow/10 rounded-2xl">
          <p className="text-xs text-gray-500 mb-2">Keyingi darslik:</p>
          <p className="text-sm font-bold text-secondary mb-3">{nextLesson.title}</p>
          {isUnlocked(nextLesson.id) ? (
            <Link href={`/lessons/${nextLesson.id}`} className="btn-3d-primary !text-sm inline-block">
              Davom etish →
            </Link>
          ) : (
            <button
              onClick={() => {
                if (unlockLesson(nextLesson.id)) {
                  window.location.href = `/lessons/${nextLesson.id}`;
                }
              }}
              disabled={!canUnlock(nextLesson.id)}
              className="btn-3d-accent !text-sm w-full disabled:opacity-40"
            >
              {canUnlock(nextLesson.id)
                ? `Ochish (${getCost(nextLesson.id)} USDT)`
                : `Kerak: ${getCost(nextLesson.id)} USDT`}
            </button>
          )}
        </div>
      ) : (
        <p className="text-xs text-gray-400 mt-3">Barcha darsliklar tugatildi!</p>
      )}
    </div>
  );
}

export function LessonFlow({ lesson: rawLesson }: LessonFlowProps) {
  const { locale, messages } = useTranslation();
  const lesson = useMemo(() => getLocalizedLesson(rawLesson, locale), [rawLesson, locale]);
  const guide = useMemo(() => getLocalizedLessonGuide(lesson, locale), [lesson, locale]);
  const quiz = useMemo(() => getLocalizedLessonQuiz(lesson, locale), [lesson, locale]);
  const {
    progress,
    watchVideo,
    readGuide,
    completeQuiz,
    unlockLesson,
    isUnlocked,
    canUnlock,
    getCost,
    isReviewMode,
    frontierLessonId,
  } = useProgress();

  const lp = progress.lessons[lesson.id];
  const reviewMode = isReviewMode(lesson.id);
  const isFrontier = frontierLessonId === lesson.id;
  const isCompleted = lp?.quizPassed ?? false;
  /** Tugallangan oxirgi bosqich — faqat «Keyingi darslik» paneli */
  const frontierDone = isFrontier && isCompleted;

  const resolveStep = (): Step => {
    if (frontierDone) return "done";
    if (lp?.quizPassed) return "video";
    if (lp?.guideRead) return "quiz";
    if (lp?.videoWatched) return "guide";
    return "video";
  };

  const [step, setStep] = useState<Step>(resolveStep);
  const [celebrate, setCelebrate] = useState(false);
  const [celebrateAmount, setCelebrateAmount] = useState(0);

  const currentIndex = lessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  if (!progress.hasStarted) return <StarterGate />;

  if (!isUnlocked(lesson.id)) {
    const cost = getCost(lesson.id);
    const prevPassed = prevLesson ? progress.lessons[prevLesson.id]?.quizPassed : true;
    return (
      <div className="px-4 py-10 text-center">
        <div className="card-neon p-8 mx-auto max-w-sm">
          <LockIcon size={48} />
          <h2 className="font-extrabold text-secondary mt-4 mb-2">Darslik qulflangan</h2>
          {!prevPassed && prevLesson ? (
            <p className="text-sm text-gray-500 mb-4">
              Avval &quot;{prevLesson.title}&quot; testidan o&apos;ting
            </p>
          ) : (
            <p className="text-sm text-gray-500 mb-4">
              Ochish narxi: <span className="font-extrabold text-accent">{cost} USDT</span>
            </p>
          )}
          {prevPassed && canUnlock(lesson.id) && (
            <button onClick={() => unlockLesson(lesson.id)} className="btn-3d-primary !text-sm w-full">
              Ochish ({cost} USDT)
            </button>
          )}
          <Link href="/lessons" className="block mt-4 text-sm text-gray-400 hover:text-secondary">
            ← Darsliklar ro&apos;yxati
          </Link>
        </div>
      </div>
    );
  }

  const handleVideoComplete = () => {
    if (!lp?.videoWatched) watchVideo(lesson.id);
    setStep("guide");
  };

  const handleGuideComplete = () => {
    if (!lp?.guideRead) readGuide(lesson.id);
    setStep("quiz");
  };

  const handleQuizPass = () => {
    completeQuiz(lesson.id, lesson.reward, true);
    setCelebrateAmount(lesson.reward);
    setCelebrate(true);
    setStep("done");
  };

  const handleQuizFail = () => {
    completeQuiz(lesson.id, 0, false);
    setStep("video");
  };

  const steps: { key: Step; label: string }[] = [
    { key: "video", label: "Video" },
    { key: "guide", label: "Qo'llanma" },
    { key: "quiz", label: "Test" },
    ...(isCompleted ? [{ key: "done" as Step, label: "Tugadi" }] : []),
  ];

  const canJumpTo = (s: Step) => {
    if (reviewMode) return true;
    if (s === "video") return true;
    if (s === "guide") return lp?.videoWatched;
    if (s === "quiz") return lp?.videoWatched && lp?.guideRead;
    if (s === "done") return isCompleted;
    return false;
  };

  return (
    <div className="px-4 py-4 pb-8">
      <CoinCelebration show={celebrate} amount={celebrateAmount} onDone={() => setCelebrate(false)} />

      <Link href="/lessons" className="inline-flex items-center gap-1 text-sm font-bold text-gray-500 hover:text-secondary mb-3">
        ← Barcha darsliklar
      </Link>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-xs font-extrabold bg-duo-yellow text-secondary px-3 py-1 rounded-full">
          #{lesson.order} / {lessons.length}
        </span>
        <span className="text-xs font-bold text-gray-400">{getLevelTitle(lesson.level, messages)}</span>
        {reviewMode && (
          <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full">
            Qayta ko&apos;rish
          </span>
        )}
      </div>

      <h1 className="text-lg font-extrabold text-secondary mb-4 leading-snug">{lesson.title}</h1>

      {/* Bosqich tanlash — tugallangan oxirgi bosqichda yashiriladi */}
      {!frontierDone && (
        <div className="flex gap-1 mb-5">
          {steps.map((s) => {
            const active = step === s.key;
            const done =
              (s.key === "video" && lp?.videoWatched) ||
              (s.key === "guide" && lp?.guideRead) ||
              (s.key === "quiz" && lp?.quizPassed) ||
              s.key === "done";
            const jumpable = canJumpTo(s.key);
            return (
              <button
                key={s.key}
                type="button"
                disabled={!jumpable && !reviewMode}
                onClick={() => jumpable && setStep(s.key)}
                className={`flex-1 flex flex-col items-center gap-1 ${jumpable || reviewMode ? "cursor-pointer" : "cursor-default opacity-50"}`}
              >
                <div className={`w-full h-1.5 rounded-full ${done ? "bg-accent" : active ? "bg-duo-yellow" : "bg-gray-200"}`} />
                <span className={`text-[10px] font-bold ${active ? "text-secondary" : "text-gray-400"}`}>{s.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* REVIEW MODE — video, qo'llanma, test ustma-ust */}
      {reviewMode && (
        <div className="space-y-8">
          <section>
            <p className="text-xs font-extrabold text-gray-400 uppercase mb-3">▶ Video</p>
            <VideoPlayer videoId={lesson.videoId} title={lesson.title} />
          </section>

          <section>
            <p className="text-xs font-extrabold text-gray-400 uppercase mb-3">📖 Qo&apos;llanma</p>
            <StudyGuide sections={guide} onComplete={() => {}} completed />
          </section>

          <section>
            <p className="text-xs font-extrabold text-gray-400 uppercase mb-3">❓ Test</p>
            <LessonQuiz
              questions={quiz}
              reward={lesson.reward}
              onPass={() => {}}
              onFail={() => {}}
              disabled={false}
              practiceMode
            />
          </section>

        </div>
      )}

      {/* FRONTIER — ketma-ket: faqat joriy bosqich */}
      {!reviewMode && frontierDone && (
        <DonePanel
          lesson={lesson}
          nextLesson={nextLesson}
          isUnlocked={isUnlocked}
          canUnlock={canUnlock}
          unlockLesson={unlockLesson}
          getCost={getCost}
        />
      )}

      {!reviewMode && isFrontier && !frontierDone && (
        <>
          {step === "video" && (
            <div className="mb-4">
              <VideoPlayer videoId={lesson.videoId} title={lesson.title} />
              <button onClick={handleVideoComplete} className="btn-3d-primary w-full mt-4 !text-sm !py-3">
                {lp?.videoWatched ? "Qo&apos;llanmaga o&apos;tish →" : "✓ Videoni to'liq ko'rdim"}
              </button>
            </div>
          )}

          {step === "guide" && (
            <StudyGuide
              sections={guide}
              onComplete={handleGuideComplete}
              completed={lp?.guideRead ?? false}
            />
          )}

          {step === "quiz" && (
            <LessonQuiz
              questions={quiz}
              reward={lesson.reward}
              onPass={handleQuizPass}
              onFail={handleQuizFail}
              disabled={!lp?.videoWatched || !lp?.guideRead}
            />
          )}
        </>
      )}
    </div>
  );
}
