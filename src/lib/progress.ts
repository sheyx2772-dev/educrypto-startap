import { lessons } from "./lessons";
import { pathNodes, type PathNode } from "./curriculum";
import { PATH_UNLOCK_ALL } from "./pathConfig";

export const STARTER_COINS = 10;
export const STARTER_PRICE_SUM = 10000;

export interface LessonProgress {
  unlocked: boolean;
  videoWatched: boolean;
  guideRead: boolean;
  quizPassed: boolean;
  quizAttempts: number;
}

export interface UserProgress {
  coins: number;
  lessons: Record<string, LessonProgress>;
  pathCompleted: Record<string, boolean>;
  certificates: Record<string, boolean>;
  hasStarted: boolean;
  username: string;
  inviteCode: string;
  invitesSent: number;
  referralClaimed: boolean;
  paymentMethod?: "click" | "payme";
}

const STORAGE_KEY = "educrypto_progress";

function generateInviteCode(): string {
  return "EDU" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

function defaultLessonProgress(id: string, hasStarted: boolean): LessonProgress {
  return {
    unlocked: id === "1" && hasStarted,
    videoWatched: false,
    guideRead: false,
    quizPassed: false,
    quizAttempts: 0,
  };
}

function createInitialProgress(): UserProgress {
  const initial: UserProgress = {
    coins: 0,
    lessons: {},
    pathCompleted: {},
    certificates: {},
    hasStarted: false,
    username: "Crypto o'quvchi",
    inviteCode: generateInviteCode(),
    invitesSent: 0,
    referralClaimed: false,
  };
  lessons.forEach((l) => {
    initial.lessons[l.id] = defaultLessonProgress(l.id, false);
  });
  return initial;
}

function migrateProgress(parsed: Partial<UserProgress>): UserProgress {
  const base = createInitialProgress();
  const hasStarted = parsed.hasStarted ?? ((parsed.coins ?? 0) > 0 || Object.values(parsed.lessons ?? {}).some((l) => l?.quizPassed));
  return {
    coins: parsed.coins ?? 0,
    lessons: { ...base.lessons, ...parsed.lessons },
    pathCompleted: parsed.pathCompleted ?? {},
    certificates: parsed.certificates ?? {},
    hasStarted,
    username: parsed.username ?? base.username,
    inviteCode: parsed.inviteCode ?? base.inviteCode,
    invitesSent: parsed.invitesSent ?? 0,
    referralClaimed: parsed.referralClaimed ?? hasStarted,
    paymentMethod: parsed.paymentMethod,
  };
}

export type PathNodeStatus = "locked" | "active" | "completed";

export function getPathNodeStatus(progress: UserProgress, nodeId: string): PathNodeStatus {
  const node = pathNodes.find((n) => n.id === nodeId);
  if (!node) return "locked";

  if (progress.pathCompleted[nodeId]) return "completed";

  // Tahrirlash: barcha taxtachalar vaqtincha ochiq (darsliklar alohida qulflanadi)
  if (PATH_UNLOCK_ALL) return "active";

  if (!progress.hasStarted) return "locked";
  if (node.order === 1) return "active";
  const prev = pathNodes.find((n) => n.order === node.order - 1);
  if (prev && progress.pathCompleted[prev.id]) return "active";
  return "locked";
}

export function isPathNodeUnlocked(progress: UserProgress, nodeId: string): boolean {
  return getPathNodeStatus(progress, nodeId) !== "locked";
}

export function completePathNode(progress: UserProgress, node: PathNode): UserProgress {
  if (!isPathNodeUnlocked(progress, node.id) || progress.pathCompleted[node.id]) return progress;
  const updated: UserProgress = {
    ...progress,
    coins: progress.coins + node.reward,
    pathCompleted: { ...progress.pathCompleted, [node.id]: true },
    certificates: { ...progress.certificates },
  };
  if (node.certificateKey) {
    updated.certificates[node.certificateKey] = true;
  }
  saveProgress(updated);
  return updated;
}

export function getActivePathNode(progress: UserProgress): PathNode | undefined {
  return pathNodes.find((n) => getPathNodeStatus(progress, n.id) === "active");
}

export function getPathProgressPercent(progress: UserProgress): number {
  const done = pathNodes.filter((n) => progress.pathCompleted[n.id]).length;
  return Math.round((done / pathNodes.length) * 100);
}

export function getUnlockCost(lessonId: string): number {
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson || lesson.order === 1) return 0;
  return Math.max(5, Math.floor(lesson.reward * 0.5));
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return createInitialProgress();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialProgress();
    const parsed = JSON.parse(raw) as Partial<UserProgress>;
    const migrated = migrateProgress(parsed);
    lessons.forEach((l) => {
      if (!migrated.lessons[l.id]) {
        migrated.lessons[l.id] = defaultLessonProgress(l.id, migrated.hasStarted);
      }
    });
    if (migrated.hasStarted && migrated.lessons["1"]) {
      migrated.lessons["1"].unlocked = true;
    }
    return migrated;
  } catch {
    return createInitialProgress();
  }
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isLessonUnlocked(progress: UserProgress, lessonId: string): boolean {
  if (!progress.hasStarted) return false;
  return progress.lessons[lessonId]?.unlocked ?? false;
}

/** Hozir ishlanayotgan (oxirgi ochilgan) darslik */
export function getFrontierLessonId(progress: UserProgress): string | null {
  if (!progress.hasStarted) return null;
  const inProgress = lessons.find(
    (l) => progress.lessons[l.id]?.unlocked && !progress.lessons[l.id]?.quizPassed
  );
  if (inProgress) return inProgress.id;
  const unlocked = lessons.filter((l) => progress.lessons[l.id]?.unlocked);
  return unlocked.length > 0 ? unlocked[unlocked.length - 1].id : null;
}

/** Oldingi ochilgan darsliklar — video, qo'llanma, test ustma-ust erkin ko'rish */
export function isLessonReviewMode(progress: UserProgress, lessonId: string): boolean {
  const frontierId = getFrontierLessonId(progress);
  if (!frontierId || frontierId === lessonId) return false;
  const lesson = lessons.find((l) => l.id === lessonId);
  const frontier = lessons.find((l) => l.id === frontierId);
  if (!lesson || !frontier || !progress.lessons[lessonId]?.unlocked) return false;
  return lesson.order < frontier.order;
}

export function canUnlockNext(progress: UserProgress, nextLessonId: string): boolean {
  const cost = getUnlockCost(nextLessonId);
  return progress.coins >= cost;
}

export function activateWithPayment(progress: UserProgress, method: "click" | "payme"): UserProgress {
  if (progress.hasStarted) return progress;
  const updated: UserProgress = {
    ...progress,
    hasStarted: true,
    coins: progress.coins + STARTER_COINS,
    paymentMethod: method,
    referralClaimed: true,
    lessons: {
      ...progress.lessons,
      "1": { ...progress.lessons["1"], unlocked: true },
    },
  };
  saveProgress(updated);
  return updated;
}

export function activateWithReferral(progress: UserProgress): UserProgress {
  if (progress.hasStarted || progress.referralClaimed) return progress;
  const updated: UserProgress = {
    ...progress,
    hasStarted: true,
    coins: progress.coins + STARTER_COINS,
    referralClaimed: true,
    invitesSent: progress.invitesSent + 1,
    lessons: {
      ...progress.lessons,
      "1": { ...progress.lessons["1"], unlocked: true },
    },
  };
  saveProgress(updated);
  return updated;
}

export function sendInvite(progress: UserProgress): UserProgress {
  const updated = { ...progress, invitesSent: progress.invitesSent + 1 };
  saveProgress(updated);
  return updated;
}

export function setUsername(progress: UserProgress, username: string): UserProgress {
  const updated = { ...progress, username };
  saveProgress(updated);
  return updated;
}

export function tryUnlockLesson(progress: UserProgress, lessonId: string): UserProgress {
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson || !progress.hasStarted) return progress;
  const prev = lessons.find((l) => l.order === lesson.order - 1);
  if (prev && !progress.lessons[prev.id]?.quizPassed) return progress;
  const cost = getUnlockCost(lessonId);
  if (progress.coins < cost || progress.lessons[lessonId]?.unlocked) return progress;
  const updated = { ...progress, coins: progress.coins - cost };
  updated.lessons = {
    ...updated.lessons,
    [lessonId]: { ...updated.lessons[lessonId], unlocked: true },
  };
  saveProgress(updated);
  return updated;
}

export function markVideoWatched(progress: UserProgress, lessonId: string): UserProgress {
  const updated = { ...progress };
  updated.lessons = {
    ...updated.lessons,
    [lessonId]: { ...updated.lessons[lessonId], videoWatched: true },
  };
  saveProgress(updated);
  return updated;
}

export function markGuideRead(progress: UserProgress, lessonId: string): UserProgress {
  const updated = { ...progress };
  updated.lessons = {
    ...updated.lessons,
    [lessonId]: { ...updated.lessons[lessonId], guideRead: true },
  };
  saveProgress(updated);
  return updated;
}

export function passQuiz(progress: UserProgress, lessonId: string, reward: number): UserProgress {
  const alreadyPassed = progress.lessons[lessonId]?.quizPassed;
  const updated = { ...progress, coins: alreadyPassed ? progress.coins : progress.coins + reward };
  updated.lessons = {
    ...updated.lessons,
    [lessonId]: {
      ...updated.lessons[lessonId],
      quizPassed: true,
      quizAttempts: (updated.lessons[lessonId]?.quizAttempts ?? 0) + 1,
    },
  };
  saveProgress(updated);
  return updated;
}

export function failQuiz(progress: UserProgress, lessonId: string): UserProgress {
  const updated = { ...progress };
  updated.lessons = {
    ...updated.lessons,
    [lessonId]: {
      ...updated.lessons[lessonId],
      videoWatched: false,
      guideRead: false,
      quizAttempts: (updated.lessons[lessonId]?.quizAttempts ?? 0) + 1,
    },
  };
  saveProgress(updated);
  return updated;
}

export function resetProgress(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
