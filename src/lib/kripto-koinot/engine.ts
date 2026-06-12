import Matter from "matter-js";
import { PLACEABLE_PLANETS } from "./planets";
import type { ArenaConfig, OrbitRing, PadBounds, PlanetDef, PlanetOrbit } from "./types";

export const ARENA_BASE_W = 1100;
export const ARENA_BASE_H = 620;

export interface ArenaLayout {
  width: number;
  height: number;
  center: { x: number; y: number };
  blackHole: { x: number; y: number; radius: number };
  padOrigin: { x: number; y: number };
  pad: PadBounds;
  padWidth: number;
  sunRadius: number;
  planetRadius: number;
  rings: OrbitRing[];
  planetOrbits: PlanetOrbit[];
  sunOrbitRadius: number;
  uniformScale: number;
}

/** Orbita radiuslari — bir-biridan aniq ajratilgan */
const PLANET_ORBIT_RADIUS: Record<string, number> = {
  btc: 0.52,
  eth: 0.66,
  usdt: 0.78,
  sol: 0.9,
  ada: 0.99,
};

const PLANET_LABEL_ANGLE: Record<string, number> = {
  btc: -Math.PI / 2,
  eth: -0.4,
  usdt: 0.55,
  sol: 1.2,
  ada: 2.4,
};

export function computePlanetOrbits(maxRadius: number, tolerance: number): PlanetOrbit[] {
  return PLACEABLE_PLANETS.map((p) => ({
    planetId: p.id,
    symbol: p.symbol,
    name: p.name,
    radius: maxRadius * (PLANET_ORBIT_RADIUS[p.id] ?? 0.5),
    tolerance,
    themeColor: p.themeColor,
    glowColor: p.glowColor,
    correctRing: p.correctRing,
    labelAngle: PLANET_LABEL_ANGLE[p.id] ?? 0,
  }));
}

/** Maydon o'lchamiga mos — quyosh, orbita, sayyora masshtabini hisoblaydi */
export function computeArenaLayout(width: number, height: number): ArenaLayout {
  const padWidth = Math.max(130, Math.min(175, width * 0.16));
  const bhReserve = Math.max(110, Math.min(170, width * 0.15));
  const playW = width - padWidth - bhReserve;
  const center = {
    x: padWidth + playW * 0.46,
    y: height * 0.5,
  };

  const maxRadius = Math.min(
    center.x - padWidth - 6,
    width - bhReserve - center.x - 4,
    height * 0.54
  );

  const rings: OrbitRing[] = [
    {
      id: 1,
      radius: maxRadius * 0.36,
      tolerance: maxRadius * 0.11,
      label: "Orbita 1",
      labelUz: "Fundamental bloklar",
    },
    {
      id: 2,
      radius: maxRadius * 0.62,
      tolerance: maxRadius * 0.11,
      label: "Orbita 2",
      labelUz: "Moliyaviy tizimlar",
    },
    {
      id: 3,
      radius: maxRadius * 0.9,
      tolerance: maxRadius * 0.11,
      label: "Orbita 3",
      labelUz: "Innovatsiyalar",
    },
  ];

  const orbitTolerance = maxRadius * 0.14;
  const planetOrbits = computePlanetOrbits(maxRadius, orbitTolerance);

  return {
    width,
    height,
    center,
    blackHole: {
      x: width - bhReserve * 0.52,
      y: center.y,
      radius: Math.max(72, maxRadius * 0.42),
    },
    padOrigin: { x: padWidth * 0.5, y: height * 0.2 },
    pad: {
      left: 6,
      top: 28,
      width: padWidth - 12,
      height: height - 52,
      centerX: padWidth * 0.5,
    },
    padWidth,
    sunRadius: Math.max(54, maxRadius * 0.28),
    sunOrbitRadius: maxRadius * 0.2,
    planetRadius: Math.max(32, maxRadius * 0.12),
    rings,
    planetOrbits,
    uniformScale: maxRadius / 188,
  };
}

/** Qaysi sayyora orbitasiga yaqin — snap uchun */
export function getPlanetOrbitAtPosition(
  x: number,
  y: number,
  center: { x: number; y: number },
  orbits: PlanetOrbit[]
): PlanetOrbit | null {
  const dist = Math.hypot(x - center.x, y - center.y);
  let best: PlanetOrbit | null = null;
  let bestDiff = Infinity;
  for (const orbit of orbits) {
    const diff = Math.abs(dist - orbit.radius);
    if (diff < orbit.tolerance && diff < bestDiff) {
      best = orbit;
      bestDiff = diff;
    }
  }
  return best;
}

export function isInBlackHole(
  x: number,
  y: number,
  blackHole: { x: number; y: number; radius: number }
): boolean {
  // Event horizon (Flutter: radius * 0.55)
  return Math.hypot(x - blackHole.x, y - blackHole.y) < blackHole.radius * 0.58;
}

export function isOnPad(x: number, y: number, pad: PadBounds): boolean {
  return (
    x >= pad.left &&
    x <= pad.left + pad.width &&
    y >= pad.top &&
    y <= pad.top + pad.height
  );
}

export interface PlanetBodyMeta {
  planetId: string;
  def: PlanetDef;
  placed: boolean;
  locked: boolean;
  spawnTime: number;
  orbitAngle: number;
  orbitSpeed: number;
  assignedOrbit: PlanetOrbit | null;
}

export function createPlanetBody(
  def: PlanetDef,
  x: number,
  y: number,
  radius: number,
  spawnTime: number
): Matter.Body {
  const body = Matter.Bodies.circle(x, y, radius, {
    restitution: 0.35,
    friction: 0.05,
    frictionAir: 0.018,
    density: def.mass / 800,
    label: `planet-${def.id}`,
  });
  (body as Matter.Body & { meta: PlanetBodyMeta }).meta = {
    planetId: def.id,
    def,
    placed: false,
    locked: false,
    spawnTime,
    orbitAngle: 0,
    orbitSpeed: 0.018,
    assignedOrbit: null,
  };
  return body;
}

export function lockPlanetToOrbit(
  body: Matter.Body,
  center: { x: number; y: number },
  orbit: PlanetOrbit,
  meta: PlanetBodyMeta
) {
  meta.assignedOrbit = orbit;
  meta.orbitAngle = Math.atan2(body.position.y - center.y, body.position.x - center.x);
  meta.orbitSpeed = 0.014 + orbit.correctRing * 0.004;
  const x = center.x + Math.cos(meta.orbitAngle) * orbit.radius;
  const y = center.y + Math.sin(meta.orbitAngle) * orbit.radius;
  Matter.Body.setPosition(body, { x, y });
  Matter.Body.setVelocity(body, {
    x: -Math.sin(meta.orbitAngle) * meta.orbitSpeed * orbit.radius,
    y: Math.cos(meta.orbitAngle) * meta.orbitSpeed * orbit.radius,
  });
  body.frictionAir = 0;
}

/** Orbita bo'ylab qat'iy aylanish */
export function stepOrbitalMotion(
  body: Matter.Body,
  center: { x: number; y: number },
  meta: PlanetBodyMeta
) {
  const orbit = meta.assignedOrbit;
  if (!orbit) return;
  meta.orbitAngle += meta.orbitSpeed;
  const x = center.x + Math.cos(meta.orbitAngle) * orbit.radius;
  const y = center.y + Math.sin(meta.orbitAngle) * orbit.radius;
  Matter.Body.setPosition(body, { x, y });
  Matter.Body.setVelocity(body, {
    x: -Math.sin(meta.orbitAngle) * meta.orbitSpeed * orbit.radius,
    y: Math.cos(meta.orbitAngle) * meta.orbitSpeed * orbit.radius,
  });
}

export function createExplosionFragments(
  world: Matter.World,
  x: number,
  y: number,
  color: string,
  count = 12,
  sizeScale = 1
): Matter.Body[] {
  const fragments: Matter.Body[] = [];
  for (let i = 0; i < count; i++) {
    const size = (8 + Math.random() * 12) * sizeScale;
    const frag = Matter.Bodies.rectangle(
      x + (Math.random() - 0.5) * 40 * sizeScale,
      y + (Math.random() - 0.5) * 40 * sizeScale,
      size,
      size,
      {
        restitution: 0.6,
        frictionAir: 0.04,
        render: { fillStyle: color },
        label: "fragment",
      }
    );
    const angle = Math.random() * Math.PI * 2;
    const force = 0.04 + Math.random() * 0.06;
    Matter.Body.applyForce(frag, frag.position, {
      x: Math.cos(angle) * force,
      y: Math.sin(angle) * force,
    });
    fragments.push(frag);
    Matter.World.add(world, frag);
  }
  return fragments;
}

export function createArenaBodies(arena: ArenaConfig, sunRadius: number) {
  const wallOpts = { isStatic: true, render: { visible: false } };
  const { width, height, center, blackHole } = arena;

  const walls = [
    Matter.Bodies.rectangle(width / 2, -20, width, 40, wallOpts),
    Matter.Bodies.rectangle(width / 2, height + 20, width, 40, wallOpts),
    Matter.Bodies.rectangle(-20, height / 2, 40, height, wallOpts),
    Matter.Bodies.rectangle(width + 20, height / 2, 40, height, wallOpts),
  ];

  const sun = Matter.Bodies.circle(center.x, center.y, sunRadius, {
    isStatic: true,
    isSensor: true,
    label: "sun",
    render: { fillStyle: "#fbbf24" },
  });

  const blackHoleBody = Matter.Bodies.circle(blackHole.x, blackHole.y, blackHole.radius, {
    isStatic: true,
    isSensor: true,
    label: "black-hole",
    render: { fillStyle: "#0a0a12" },
  });

  return { walls, sun, blackHoleBody };
}
