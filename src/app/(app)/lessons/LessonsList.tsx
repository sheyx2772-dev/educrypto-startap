"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { lessons, getYouTubeThumbnail } from "@/lib/lessons";
import { useProgress } from "@/context/ProgressContext";
import { LockIcon } from "@/components/icons/NavIcons";
import { StarterGate } from "@/components/onboarding/StarterGate";
import { useTranslation } from "@/i18n/provider";
import { getLevelTitle } from "@/i18n/localize";
import { getLocalizedLessons } from "@/i18n/content/lessons";

export function LessonsList() {
  const { t, messages, locale } = useTranslation();
  const { isUnlocked, progress, getCost, unlockLesson, canUnlock } = useProgress();
  const localizedLessons = useMemo(() => getLocalizedLessons(locale), [locale]);
  const grouped = useMemo(() => {
    const levels = Array.from(new Set(localizedLessons.map((l) => l.level))).sort((a, b) => a - b);
    return levels.map((level) => ({
      level,
      lessons: localizedLessons.filter((l) => l.level === level),
    }));
  }, [localizedLessons]);
  const passedCount = Object.values(progress.lessons).filter((l) => l.quizPassed).length;

  if (!progress.hasStarted) return <StarterGate />;

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-extrabold mb-1">{t("pages.lessons")}</h1>
      <p className="text-gray-500 text-sm mb-1">{t("lessons.flow")}</p>
      <p className="text-xs text-accent font-bold mb-6">
        {t("lessons.countBalance", { count: lessons.length, coins: progress.coins })}
      </p>

      <div className="card-neon p-4 mb-6">
        <p className="text-xs font-bold text-gray-500 mb-2">{t("lessons.pathLabel")}</p>
        <div className="flex gap-1">
          {grouped.map(({ lessons: levelLessons }, i) => {
            const done = levelLessons.every((l) => progress.lessons[l.id]?.quizPassed);
            const partial = levelLessons.some((l) => progress.lessons[l.id]?.quizPassed);
            return (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all ${
                  done ? "bg-accent neon-glow-accent" : partial ? "bg-duo-yellow neon-bar" : "bg-gray-200"
                }`}
              />
            );
          })}
        </div>
        <p className="text-[10px] text-gray-400 mt-2 font-bold">{t("lessons.completedCount", { passed: passedCount, total: lessons.length })}</p>
      </div>

      <div className="space-y-8">
        {grouped.map(({ level, lessons: levelLessons }) => (
          <section key={level}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-duo-yellow flex items-center justify-center text-sm font-extrabold text-secondary neon-badge">
                {level}
              </div>
              <div>
                <h2 className="font-extrabold text-secondary text-sm">{getLevelTitle(level, messages)}</h2>
                <p className="text-xs text-gray-400">{t("lessons.levelLessons", { n: levelLessons.length })}</p>
              </div>
            </div>

            <div className="space-y-3">
              {levelLessons.map((lesson) => {
                const unlocked = isUnlocked(lesson.id);
                const passed = progress.lessons[lesson.id]?.quizPassed;
                const cost = getCost(lesson.id);

                return unlocked ? (
                  <Link key={lesson.id} href={`/lessons/${lesson.id}`}>
                    <div className="card-neon overflow-hidden flex hover:scale-[1.01] transition-transform cursor-pointer border-l-4 border-l-duo-yellow">
                      <div className="relative w-28 h-20 shrink-0 bg-gray-200">
                        <Image src={getYouTubeThumbnail(lesson.videoId)} alt={lesson.title} fill className="object-cover" unoptimized />
                        <div className="absolute top-1 left-1 bg-secondary/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                          #{lesson.order}
                        </div>
                        {passed && (
                          <div className="absolute top-1 right-1 bg-accent text-white text-[10px] font-bold px-1 rounded">✓</div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <span className="text-white text-xl">▶</span>
                        </div>
                      </div>
                      <div className="flex-1 p-3 min-w-0 flex flex-col justify-between">
                        <h3 className="font-bold text-secondary text-sm leading-snug line-clamp-2">{lesson.title}</h3>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className="text-xs text-gray-400">+{lesson.reward} USDT</span>
                          <span className="bg-duo-yellow text-secondary text-xs font-extrabold px-3 py-1 rounded-xl neon-badge">
                            {t("lessons.start")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div key={lesson.id} className="card-neon overflow-hidden flex opacity-70 border-l-4 border-l-gray-300">
                    <div className="relative w-28 h-20 shrink-0 bg-gray-200 flex items-center justify-center">
                      <LockIcon size={32} />
                    </div>
                    <div className="flex-1 p-3 min-w-0 flex flex-col justify-between">
                      <h3 className="font-bold text-gray-400 text-sm line-clamp-2">{lesson.title}</h3>
                      <div className="flex items-center justify-between mt-1.5 gap-2">
                        <p className="text-xs text-gray-400">{cost > 0 ? `${cost} USDT` : t("lessons.prevLesson")}</p>
                        {canUnlock(lesson.id) && (
                          <button
                            onClick={() => unlockLesson(lesson.id)}
                            className="bg-accent text-white text-xs font-extrabold px-3 py-1 rounded-xl shrink-0"
                          >
                            {t("lessons.unlock")}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
