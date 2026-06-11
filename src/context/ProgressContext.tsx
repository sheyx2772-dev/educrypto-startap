"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  type UserProgress,
  loadProgress,
  markVideoWatched,
  markGuideRead,
  passQuiz,
  failQuiz,
  tryUnlockLesson,
  isLessonUnlocked,
  canUnlockNext,
  getUnlockCost,
  activateWithPayment,
  activateWithReferral,
  sendInvite,
  setUsername,
  completePathNode,
  getPathNodeStatus,
  getPathProgressPercent,
  getFrontierLessonId,
  isLessonReviewMode,
  type PathNodeStatus,
} from "@/lib/progress";
import type { PathNode } from "@/lib/curriculum";

interface ProgressContextType {
  progress: UserProgress;
  refresh: () => void;
  watchVideo: (lessonId: string) => void;
  readGuide: (lessonId: string) => void;
  completeQuiz: (lessonId: string, reward: number, passed: boolean) => void;
  unlockLesson: (lessonId: string) => boolean;
  isUnlocked: (lessonId: string) => boolean;
  canUnlock: (lessonId: string) => boolean;
  getCost: (lessonId: string) => number;
  payToStart: (method: "click" | "payme") => void;
  inviteToStart: () => void;
  shareInvite: () => void;
  updateUsername: (name: string) => void;
  completePathNode: (node: PathNode) => void;
  getNodeStatus: (nodeId: string) => PathNodeStatus;
  pathPercent: number;
  frontierLessonId: string | null;
  isReviewMode: (lessonId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== "undefined") return loadProgress();
    return loadProgress();
  });

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const refresh = useCallback(() => setProgress(loadProgress()), []);

  const watchVideo = useCallback((lessonId: string) => {
    setProgress((p) => markVideoWatched(p, lessonId));
  }, []);

  const readGuide = useCallback((lessonId: string) => {
    setProgress((p) => markGuideRead(p, lessonId));
  }, []);

  const completeQuiz = useCallback((lessonId: string, reward: number, passed: boolean) => {
    setProgress((p) => (passed ? passQuiz(p, lessonId, reward) : failQuiz(p, lessonId)));
  }, []);

  const unlockLesson = useCallback((lessonId: string) => {
    let success = false;
    setProgress((p) => {
      const cost = getUnlockCost(lessonId);
      if (cost > 0 && !canUnlockNext(p, lessonId)) return p;
      const updated = tryUnlockLesson(p, lessonId);
      success = !!updated.lessons[lessonId]?.unlocked && !p.lessons[lessonId]?.unlocked;
      return updated;
    });
    return success;
  }, []);

  const payToStart = useCallback((method: "click" | "payme") => {
    setProgress((p) => activateWithPayment(p, method));
  }, []);

  const inviteToStart = useCallback(() => {
    setProgress((p) => activateWithReferral(p));
  }, []);

  const shareInvite = useCallback(() => {
    setProgress((p) => sendInvite(p));
  }, []);

  const updateUsername = useCallback((name: string) => {
    setProgress((p) => setUsername(p, name));
  }, []);

  const completePathNodeFn = useCallback((node: PathNode) => {
    setProgress((p) => completePathNode(p, node));
  }, []);

  const getNodeStatus = useCallback(
    (nodeId: string) => getPathNodeStatus(progress, nodeId),
    [progress]
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        refresh,
        watchVideo,
        readGuide,
        completeQuiz,
        unlockLesson,
        isUnlocked: (id) => isLessonUnlocked(progress, id),
        canUnlock: (id) => canUnlockNext(progress, id),
        getCost: getUnlockCost,
        payToStart,
        inviteToStart,
        shareInvite,
        updateUsername,
        completePathNode: completePathNodeFn,
        getNodeStatus,
        pathPercent: getPathProgressPercent(progress),
        frontierLessonId: getFrontierLessonId(progress),
        isReviewMode: (id) => isLessonReviewMode(progress, id),
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
