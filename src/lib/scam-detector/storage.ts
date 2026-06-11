import type { GameStats, LeaderboardEntry } from "./types";

const STATS_KEY = "educrypto_scam_detector_stats";
const LEADERBOARD_KEY = "educrypto_scam_detector_leaderboard";

const DEFAULT_STATS: GameStats = {
  bestScore: 0,
  totalGames: 0,
  totalCorrect: 0,
  totalAnswered: 0,
};

export function loadStats(): GameStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    return raw ? { ...DEFAULT_STATS, ...JSON.parse(raw) } : DEFAULT_STATS;
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveRoundResult(
  score: number,
  correct: number,
  total: number,
  username = "Dedektiv"
): void {
  if (typeof window === "undefined") return;
  const stats = loadStats();
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;

  const updated: GameStats = {
    bestScore: Math.max(stats.bestScore, score),
    totalGames: stats.totalGames + 1,
    totalCorrect: stats.totalCorrect + correct,
    totalAnswered: stats.totalAnswered + total,
  };
  localStorage.setItem(STATS_KEY, JSON.stringify(updated));

  const entries = loadLeaderboard();
  const entry: LeaderboardEntry = {
    id: crypto.randomUUID(),
    username,
    score,
    accuracy,
    playedAt: Date.now(),
  };
  entries.push(entry);
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recent = entries.filter((e) => e.playedAt >= weekAgo);
  recent.sort((a, b) => b.score - a.score);
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(recent.slice(0, 50)));
}

export function loadLeaderboard(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LEADERBOARD_KEY);
    const entries: LeaderboardEntry[] = raw ? JSON.parse(raw) : [];
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return entries
      .filter((e) => e.playedAt >= weekAgo)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  } catch {
    return [];
  }
}

export function averageAccuracy(stats: GameStats): number {
  if (stats.totalAnswered === 0) return 0;
  return Math.round((stats.totalCorrect / stats.totalAnswered) * 100);
}
