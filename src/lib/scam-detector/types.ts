export type CardType = "telegram" | "website" | "ad" | "post";
export type CardAnswer = "scam" | "real";
export type GamePhase = "intro" | "briefing" | "playing" | "reveal" | "complete";

export interface TelegramContent {
  username: string;
  displayName?: string;
  verified?: boolean;
  message: string;
  time?: string;
}

export interface WebsiteContent {
  url: string;
  title: string;
  preview: string;
  badge?: string;
}

export interface AdContent {
  headline: string;
  body: string;
  cta?: string;
  brand?: string;
  watermark?: string;
}

export interface PostContent {
  username: string;
  caption: string;
  likes: string;
  comments?: string;
  imageEmoji?: string;
}

export interface ScamCard {
  id: number;
  type: CardType;
  correctAnswer: CardAnswer;
  explanation: string;
  telegram?: TelegramContent;
  website?: WebsiteContent;
  ad?: AdContent;
  post?: PostContent;
}

export interface GameStats {
  bestScore: number;
  totalGames: number;
  totalCorrect: number;
  totalAnswered: number;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  score: number;
  accuracy: number;
  playedAt: number;
}

export interface RoundResult {
  score: number;
  correct: number;
  wrong: number;
  accuracy: number;
  avgTimeSec: number;
  comboMax: number;
  basePoints: number;
  speedBonus: number;
  comboBonus: number;
}
