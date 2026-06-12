export type AvatarType = "idle" | "happy" | "thinking" | "warning";

export type FieldId = "pixel_park" | "green_plaza";

export type BuildingId =
  | "bitcoin_mine"
  | "city_square"
  | "ethereum_lab"
  | "napp_office"
  | "trading_center"
  | "defi_pool"
  | "scam_detective"
  | "marketplace"
  | "guild_hall"
  | "secret_library";

export type GamePhase = "intro" | "avatar" | "field" | "world" | "interior";

export type CourseKey =
  | "bitcoin_basics"
  | "ethereum_basics"
  | "napp_law"
  | "trading_basics"
  | "defi_basics";

export interface BuildingDef {
  id: BuildingId;
  name: string;
  nameUz: string;
  description: string;
  tileX: number;
  tileY: number;
  width: number;
  height: number;
  color: number;
  accentColor: number;
  requiredCourse?: CourseKey;
  requiresGuild?: boolean;
  requiresLevel?: number;
  alwaysOpen?: boolean;
  minimapIcon: string;
  zone: string;
}

export interface PlayerState {
  avatarType: AvatarType;
  selectedField: FieldId;
  username: string;
  x: number;
  y: number;
  level: number;
  xp: number;
  bits: number;
  badges: string[];
  unlockedBuildings: BuildingId[];
  completedCourses: CourseKey[];
  guildId: string | null;
  visitedBuildings: BuildingId[];
  dailyQuestProgress: Record<string, number>;
}

export interface ChatMessage {
  id: string;
  username: string;
  message: string;
  zone: string;
  timestamp: number;
}

export interface QuestDef {
  id: string;
  title: string;
  reward: number;
  target: number;
  progressKey: string;
}

export interface CityMilestone {
  id: string;
  name: string;
  required: number;
  current: number;
  reward: string;
}
