import type { BuildingId, CourseKey, PlayerState, AvatarType, FieldId } from "./types";
import { BUILDINGS, COURSE_LABELS } from "./buildings";

const STORAGE_KEY = "educrypto_kripto_shahar";

const DEFAULT_PLAYER: PlayerState = {
  avatarType: "idle",
  selectedField: "pixel_park",
  username: "Dedektiv",
  x: 13 * 32,
  y: 9 * 32,
  level: 1,
  xp: 0,
  bits: 50,
  badges: [],
  unlockedBuildings: ["city_square", "scam_detective", "marketplace"],
  completedCourses: [],
  guildId: null,
  visitedBuildings: [],
  dailyQuestProgress: {},
};

export function loadPlayerState(): PlayerState {
  if (typeof window === "undefined") return { ...DEFAULT_PLAYER };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PLAYER };
    const parsed = JSON.parse(raw) as Partial<PlayerState>;
    const legacyAvatar: Record<string, AvatarType> = {
      suit_m: "idle",
      suit_f: "happy",
      teen: "thinking",
      elder: "warning",
    };
    if (parsed.avatarType && legacyAvatar[parsed.avatarType as string]) {
      parsed.avatarType = legacyAvatar[parsed.avatarType as string];
    }
    const validFields: FieldId[] = ["pixel_park", "green_plaza"];
    if ((parsed.selectedField as string) === "city_block") {
      parsed.selectedField = "green_plaza";
    }
    if (!parsed.selectedField || !validFields.includes(parsed.selectedField as FieldId)) {
      parsed.selectedField = "pixel_park";
    }
    return { ...DEFAULT_PLAYER, ...parsed };
  } catch {
    return { ...DEFAULT_PLAYER };
  }
}

export function savePlayerState(state: Partial<PlayerState>) {
  if (typeof window === "undefined") return;
  const current = loadPlayerState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...state }));
}

export function canEnterBuilding(
  buildingId: BuildingId,
  player: PlayerState
): { allowed: boolean; reason?: string } {
  const building = BUILDINGS.find((b) => b.id === buildingId);
  if (!building) return { allowed: false, reason: "Bino topilmadi" };

  if (building.alwaysOpen) return { allowed: true };

  if (building.requiresGuild && !player.guildId) {
    return { allowed: false, reason: "Guild a'zosi bo'lishingiz kerak" };
  }

  if (building.requiresLevel && player.level < building.requiresLevel) {
    return {
      allowed: false,
      reason: `Daraja ${building.requiresLevel} kerak (hozir: ${player.level})`,
    };
  }

  if (building.requiredCourse && !player.completedCourses.includes(building.requiredCourse)) {
    return {
      allowed: false,
      reason: `${COURSE_LABELS[building.requiredCourse]} kursini tugating`,
    };
  }

  return { allowed: true };
}

export function addBits(amount: number): number {
  const player = loadPlayerState();
  const bits = player.bits + amount;
  savePlayerState({ bits });
  return bits;
}

export function addXp(amount: number): { level: number; leveledUp: boolean } {
  const player = loadPlayerState();
  let xp = player.xp + amount;
  let level = player.level;
  let leveledUp = false;
  const xpNeeded = level * 100;
  if (xp >= xpNeeded) {
    xp -= xpNeeded;
    level += 1;
    leveledUp = true;
  }
  savePlayerState({ xp, level });
  return { level, leveledUp };
}

export function visitBuilding(buildingId: BuildingId) {
  const player = loadPlayerState();
  const visited = player.visitedBuildings.includes(buildingId)
    ? player.visitedBuildings
    : [...player.visitedBuildings, buildingId];
  savePlayerState({ visitedBuildings: visited });
}

export function completeCourse(course: CourseKey) {
  const player = loadPlayerState();
  if (player.completedCourses.includes(course)) return;
  const completedCourses = [...player.completedCourses, course];
  const badges = [...player.badges];
  const badgeMap: Record<CourseKey, string> = {
    bitcoin_basics: "btc_hat",
    ethereum_basics: "eth_shirt",
    napp_law: "napp_tie",
    trading_basics: "trader_suit",
    defi_basics: "defi_hoodie",
  };
  if (!badges.includes(badgeMap[course])) badges.push(badgeMap[course]);
  savePlayerState({ completedCourses, badges });
}

export function setSelectedField(field: FieldId) {
  savePlayerState({ selectedField: field });
}

/** Path progress dan kurslarni sinxronlash */
export function syncCoursesFromPath(pathCompleted: Record<string, boolean>) {
  const mapping: [string, CourseKey][] = [
    ["p5", "bitcoin_basics"],
    ["p7", "ethereum_basics"],
    ["p10", "napp_law"],
    ["p22", "trading_basics"],
    ["p19", "defi_basics"],
  ];
  const player = loadPlayerState();
  const completed = [...player.completedCourses];
  for (const [nodeId, course] of mapping) {
    if (pathCompleted[nodeId] && !completed.includes(course)) {
      completed.push(course);
    }
  }
  if (completed.length !== player.completedCourses.length) {
    savePlayerState({ completedCourses: completed });
  }
}
