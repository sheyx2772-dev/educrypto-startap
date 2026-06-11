export type OrbitRingId = 1 | 2 | 3;

export type GamePhase = "intro" | "playing" | "modal" | "won" | "lost";

export type CrashReason = "wrong_orbit" | "black_hole" | "timeout" | "market_crash";

export interface PlanetDef {
  id: string;
  name: string;
  symbol: string;
  mass: number;
  stability: number;
  correctRing: OrbitRingId;
  image: string;
  marketCap: number;
  isFailed?: boolean;
  /** Rasm pastidagi yozuvni kesib tashlash (0–1, faqat sayyora qismi) */
  imageCrop: number;
  themeColor: string;
  glowColor: string;
  eduTitle: string;
  eduBody: string;
}

export interface OrbitRing {
  id: OrbitRingId;
  radius: number;
  tolerance: number;
  label: string;
  labelUz: string;
}

/** Har bir kripto sayyoraning o'ziga xos orbita yo'li */
export interface PlanetOrbit {
  planetId: string;
  symbol: string;
  name: string;
  radius: number;
  tolerance: number;
  themeColor: string;
  glowColor: string;
  correctRing: OrbitRingId;
  /** Orbita yorlig'i joyi (radian) */
  labelAngle: number;
}

export interface PadBounds {
  left: number;
  top: number;
  width: number;
  height: number;
  centerX: number;
}

export interface ArenaConfig {
  width: number;
  height: number;
  center: { x: number; y: number };
  blackHole: { x: number; y: number; radius: number };
  padOrigin: { x: number; y: number };
  pad: PadBounds;
}

export interface PlanetRuntimeState {
  id: string;
  placed: boolean;
  locked: boolean;
  exploded: boolean;
  consumed: boolean;
  spawnTime: number;
  deadlineMs: number;
}

export interface EducationalModalData {
  planetId: string;
  title: string;
  body: string;
  reason: CrashReason;
}
