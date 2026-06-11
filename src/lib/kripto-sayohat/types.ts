export type TileType = "start" | "educational" | "stablecoin" | "risk" | "reward" | "card";

export type TileZone = "start" | "blue" | "green" | "red" | "gold" | "card";

export type AvatarId = "coder" | "vr_girl" | "analyst" | "btc_knight" | "eth_guard";

export type GamePhase =
  | "avatar"
  | "board"
  | "challenge"
  | "card"
  | "olaa"
  | "reward"
  | "won";

export type CardType = "bilim" | "scam" | "imkoniyat";

export interface BoardTile {
  id: number;
  type: TileType;
  zone: TileZone;
  title: string;
  icon: string;
  challengeId: string;
  /** Faqat card kataklar uchun */
  cardType?: CardType;
}

export interface QuizChallenge {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  xp: number;
  olaaTip: string;
}

export interface StablecoinChallenge {
  id: string;
  title: string;
  steps: { label: string; correct: boolean }[];
  xp: number;
  olaaTip: string;
}

export interface RiskChallenge {
  id: string;
  title: string;
  scamType: string;
  warning: string;
  olaaMessage: string;
  ignorePenalty: { xp: number; safety: number };
  backTiles: number;
}

export interface GameCard {
  type: CardType;
  title: string;
  description: string;
  xp?: number;
  safety?: number;
  penalty?: number;
}

export interface PlayerState {
  avatar: AvatarId | null;
  position: number;
  knowledgePoints: number;
  portfolioSafety: number;
  level: number;
  usdtBalance: number;
  tilesCompleted: number;
  cardsDrawn: number;
}

export const WIN_TILE = 39;
export const MIN_TILES_TO_WIN = 18;
export const XP_PER_LEVEL = 50;
