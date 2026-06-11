import type { PadBounds, PlanetDef, PlanetOrbit } from "./types";

export interface ExplosionFX {
  x: number;
  y: number;
  themeColor: string;
  glowColor: string;
  born: number;
  particles: { angle: number; speed: number; size: number; rot: number }[];
}

export function drawCosmosBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cx: number,
  cy: number,
  time: number
) {
  const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(width, height) * 0.7);
  neb.addColorStop(0, "rgba(59, 130, 246, 0.18)");
  neb.addColorStop(0.35, "rgba(99, 102, 241, 0.1)");
  neb.addColorStop(0.7, "rgba(15, 23, 42, 0.6)");
  neb.addColorStop(1, "#030712");
  ctx.fillStyle = neb;
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < 140; i++) {
    const sx = ((i * 173 + 41) % 997) / 997 * width;
    const sy = ((i * 97 + 13) % 991) / 991 * height;
    const tw = 0.55 + Math.sin(time * 0.002 + i * 1.7) * 0.45;
    ctx.fillStyle = `rgba(255,255,255,${0.15 + tw * 0.35})`;
    ctx.beginPath();
    ctx.arc(sx, sy, 0.6 + (i % 4) * 0.35, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Quyosh atrofidagi asosiy gravitatsiya halqasi */
export function drawSunOrbit(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  time: number
) {
  const pulse = 0.7 + Math.sin(time * 0.002) * 0.2;
  ctx.save();
  ctx.shadowColor = "rgba(251, 191, 36, 0.8)";
  ctx.shadowBlur = 16;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(251, 191, 36, ${pulse})`;
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 10]);
  ctx.lineDashOffset = -time * 0.03;
  ctx.stroke();
  ctx.restore();
  ctx.setLineDash([]);
}

/** Har bir sayyora uchun katta alohida orbita + qisqa nom (BTC, ETH…) */
export function drawPlanetOrbits(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  orbits: PlanetOrbit[],
  placedIds: Set<string>,
  time: number,
  scale: number
) {
  const fontSize = Math.max(13, scale * 14);

  orbits.forEach((orbit, idx) => {
    const placed = placedIds.has(orbit.planetId);
    const rot = time * 0.00032 * (idx + 1);
    const lineAlpha = placed ? 0.2 : 0.1 + Math.sin(time * 0.002 + idx) * 0.04;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    ctx.beginPath();
    ctx.arc(0, 0, orbit.radius, 0, Math.PI * 2);
    ctx.strokeStyle = orbit.themeColor;
    ctx.globalAlpha = lineAlpha;
    ctx.lineWidth = placed ? 1.4 : 1.1;
    ctx.setLineDash([10, 14]);
    ctx.lineDashOffset = -time * 0.02 * (idx + 1);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.setLineDash([]);

    const lx = Math.cos(orbit.labelAngle) * orbit.radius;
    const ly = Math.sin(orbit.labelAngle) * orbit.radius;

    const sym = orbit.symbol;
    ctx.font = `bold ${fontSize}px system-ui`;
    const tw = ctx.measureText(sym).width;
    const padX = 8;
    const padY = 5;
    const bw = tw + padX * 2;
    const bh = fontSize + padY * 2;

    ctx.save();
    ctx.translate(lx, ly);
    ctx.rotate(-rot);

    ctx.fillStyle = placed ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.65)";
    ctx.strokeStyle = orbit.themeColor;
    ctx.globalAlpha = placed ? 0.85 : 0.7;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 6);
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = placed ? 0.95 : 0.8;
    ctx.fillStyle = orbit.themeColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(sym, 0, 0);
    ctx.restore();

    if (!placed) {
      const arrowA = orbit.labelAngle + 0.12;
      const ax = Math.cos(arrowA) * orbit.radius;
      const ay = Math.sin(arrowA) * orbit.radius;
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = orbit.glowColor;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax - 7, ay - 2.5);
      ctx.lineTo(ax - 7, ay + 2.5);
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  });
}

export function drawMarketSun(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  time: number
) {
  const pulse = 1 + Math.sin(time * 0.002) * 0.06;

  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2 + time * 0.0006;
    const len = r * (1.55 + Math.sin(time * 0.003 + i * 0.8) * 0.25) * pulse;
    const x1 = x + Math.cos(a) * r * 0.7;
    const y1 = y + Math.sin(a) * r * 0.7;
    const x2 = x + Math.cos(a) * len;
    const y2 = y + Math.sin(a) * len;
    const ray = ctx.createLinearGradient(x1, y1, x2, y2);
    ray.addColorStop(0, "rgba(253, 224, 71, 0.55)");
    ray.addColorStop(1, "rgba(251, 191, 36, 0)");
    ctx.strokeStyle = ray;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  const corona = ctx.createRadialGradient(x, y, r * 0.2, x, y, r * 1.65 * pulse);
  corona.addColorStop(0, "rgba(254, 249, 195, 0.95)");
  corona.addColorStop(0.25, "rgba(250, 204, 21, 0.75)");
  corona.addColorStop(0.55, "rgba(245, 158, 11, 0.35)");
  corona.addColorStop(1, "rgba(245, 158, 11, 0)");
  ctx.fillStyle = corona;
  ctx.beginPath();
  ctx.arc(x, y, r * 1.65 * pulse, 0, Math.PI * 2);
  ctx.fill();

  const core = ctx.createRadialGradient(x - r * 0.2, y - r * 0.25, 0, x, y, r);
  core.addColorStop(0, "#fffef5");
  core.addColorStop(0.35, "#fde047");
  core.addColorStop(0.75, "#f59e0b");
  core.addColorStop(1, "#b45309");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "rgba(255, 251, 235, 0.5)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(x, y, r * 0.88, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = "#1c1917";
  ctx.font = `bold ${Math.max(9, r * 0.2)}px system-ui`;
  ctx.textAlign = "center";
  ctx.fillText("₿", x, y + r * 0.1);

  ctx.fillStyle = "rgba(254, 243, 199, 0.95)";
  ctx.font = `bold ${Math.max(10, r * 0.19)}px system-ui`;
  ctx.fillText("MARKET GRAVITY", x, y + r + 16);
}

/**
 * BlackHolePainter (Flutter) → Canvas port
 * 25s aylanish, neon accretion disk, event horizon
 */
export function drawBlackHole(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  time: number
) {
  const ROTATION_MS = 25000;
  const t = (time % ROTATION_MS) / ROTATION_MS;
  const rotation = t * Math.PI * 2;
  const pulse = 0.95 + 0.05 * Math.sin(t * Math.PI * 2);
  const radius = r;

  ctx.save();

  // 1. Outer Glow
  const outerGlow = ctx.createRadialGradient(x, y, 0, x, y, radius * 1.8);
  outerGlow.addColorStop(0, "rgba(34, 211, 238, 0.4)");
  outerGlow.addColorStop(0.55, "rgba(168, 85, 247, 0.25)");
  outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = outerGlow;
  ctx.beginPath();
  ctx.arc(x, y, radius * 1.75 * pulse, 0, Math.PI * 2);
  ctx.fill();

  // 2. Accretion Disk (sweep / conic gradient)
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(1, 0.6);
  const diskR = radius * 1.1;
  if (typeof ctx.createConicGradient === "function") {
    const disk = (ctx as CanvasRenderingContext2D & {
      createConicGradient: (a: number, x: number, y: number) => CanvasGradient;
    }).createConicGradient(rotation, 0, 0);
    disk.addColorStop(0, "rgba(0,0,0,0)");
    disk.addColorStop(0.2, "rgba(103, 232, 249, 0.95)");
    disk.addColorStop(0.5, "rgba(192, 132, 252, 0.9)");
    disk.addColorStop(0.8, "rgba(45, 212, 191, 0.95)");
    disk.addColorStop(1, "rgba(103, 232, 249, 0.95)");
    ctx.fillStyle = disk;
    ctx.beginPath();
    ctx.arc(0, 0, diskR, 0, Math.PI * 2);
    ctx.fill();
  } else {
    drawSweepDiskFallback(ctx, 0, 0, diskR, rotation);
  }
  ctx.restore();

  // 3. Inner Disk
  const innerDisk = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.95);
  innerDisk.addColorStop(0, "rgba(255, 255, 255, 0.9)");
  innerDisk.addColorStop(0.35, "rgba(34, 211, 238, 0.8)");
  innerDisk.addColorStop(0.65, "rgba(168, 85, 247, 0.6)");
  innerDisk.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = innerDisk;
  ctx.beginPath();
  ctx.ellipse(x, y, radius * 0.95, radius * 0.95 * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 4. Event Horizon
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.ellipse(x, y, radius * 0.55, radius * 0.55 * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 5. Core
  const core = ctx.createRadialGradient(x, y, 0, x, y, radius * 0.6);
  core.addColorStop(0, "#000000");
  core.addColorStop(1, "rgba(0, 0, 0, 0.9)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.ellipse(x, y, radius * 0.48, radius * 0.48 * 0.6, 0, 0, Math.PI * 2);
  ctx.fill();

  // 6. Particle Effects
  for (let i = 0; i < 28; i++) {
    const angle = rotation * (1 + i * 0.1) + i * 0.3;
    const dist = radius * (0.7 + (i % 5) * 0.08);
    const px = x + Math.cos(angle) * dist * pulse;
    const py = y + Math.sin(angle) * dist * 0.6;
    const particleSize = 2 + (i % 3);
    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
    ctx.beginPath();
    ctx.arc(px, py, particleSize, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();

  // CRASH ZONE yorlig'i
  ctx.fillStyle = "#fb7185";
  ctx.font = `bold ${Math.max(10, radius * 0.2)}px system-ui`;
  ctx.textAlign = "center";
  ctx.fillText("CRASH ZONE", x, y - radius * 1.85);
  ctx.fillStyle = "rgba(248, 113, 113, 0.75)";
  ctx.font = `${Math.max(8, radius * 0.14)}px system-ui`;
  ctx.fillText("ACTIVE", x, y - radius * 1.55);
}

function drawSweepDiskFallback(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  diskR: number,
  rotation: number
) {
  const segments = 36;
  const colors = [
    "rgba(0,0,0,0)",
    "rgba(103, 232, 249, 0.95)",
    "rgba(192, 132, 252, 0.9)",
    "rgba(45, 212, 191, 0.95)",
    "rgba(103, 232, 249, 0.95)",
  ];
  for (let i = 0; i < segments; i++) {
    const a0 = rotation + (i / segments) * Math.PI * 2;
    const a1 = rotation + ((i + 1) / segments) * Math.PI * 2;
    const ci = Math.floor((i / segments) * (colors.length - 1));
    ctx.fillStyle = colors[ci] ?? colors[1];
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, diskR, a0, a1);
    ctx.closePath();
    ctx.fill();
  }
}

export function createExplosionFX(
  x: number,
  y: number,
  themeColor: string,
  glowColor: string
): ExplosionFX {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    angle: (i / 24) * Math.PI * 2 + Math.random() * 0.4,
    speed: 2 + Math.random() * 5,
    size: 3 + Math.random() * 8,
    rot: Math.random() * Math.PI,
  }));
  return { x, y, themeColor, glowColor, born: performance.now(), particles };
}

export function drawPlanetExplosion(ctx: CanvasRenderingContext2D, fx: ExplosionFX, time: number) {
  const age = time - fx.born;
  if (age > 1400) return false;

  const t = age / 1400;
  const expand = 1 + t * 3.5;

  ctx.save();
  ctx.globalAlpha = 1 - t * 0.85;
  const flash = ctx.createRadialGradient(fx.x, fx.y, 0, fx.x, fx.y, 30 * expand);
  flash.addColorStop(0, "rgba(255,255,255,0.9)");
  flash.addColorStop(0.2, fx.glowColor + "cc");
  flash.addColorStop(0.5, fx.themeColor + "66");
  flash.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = flash;
  ctx.beginPath();
  ctx.arc(fx.x, fx.y, 35 * expand, 0, Math.PI * 2);
  ctx.fill();

  for (let ring = 0; ring < 3; ring++) {
    ctx.strokeStyle = fx.themeColor;
    ctx.lineWidth = 3 - ring;
    ctx.beginPath();
    ctx.arc(fx.x, fx.y, (20 + ring * 18) * expand, 0, Math.PI * 2);
    ctx.stroke();
  }

  for (const p of fx.particles) {
    const dist = p.speed * age * 0.08;
    const px = fx.x + Math.cos(p.angle) * dist;
    const py = fx.y + Math.sin(p.angle) * dist;
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(p.rot + age * 0.01);
    ctx.fillStyle = fx.themeColor;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  }

  ctx.fillStyle = "#fff";
  ctx.font = `bold ${Math.max(11, 14 - t * 4)}px system-ui`;
  ctx.textAlign = "center";
  ctx.fillText("PORTLASH!", fx.x, fx.y - 20 * expand);
  ctx.restore();
  return true;
}

export function drawDockingPad(
  ctx: CanvasRenderingContext2D,
  pad: PadBounds,
  height: number,
  time: number
) {
  const { left, top, width, height: padH } = pad;

  ctx.save();
  const panel = ctx.createLinearGradient(left, top, left + width, top + padH);
  panel.addColorStop(0, "rgba(8, 47, 73, 0.85)");
  panel.addColorStop(0.5, "rgba(12, 74, 110, 0.55)");
  panel.addColorStop(1, "rgba(8, 47, 73, 0.35)");
  ctx.fillStyle = panel;
  ctx.fillRect(left, top, width, padH);

  ctx.strokeStyle = "rgba(34, 211, 238, 0.65)";
  ctx.lineWidth = 2;
  ctx.shadowColor = "rgba(34, 211, 238, 0.5)";
  ctx.shadowBlur = 10;
  ctx.strokeRect(left + 1, top + 1, width - 2, padH - 2);
  ctx.shadowBlur = 0;

  ctx.strokeStyle = "rgba(34, 211, 238, 0.2)";
  ctx.lineWidth = 1;
  const gridStep = 22;
  for (let gx = left + gridStep; gx < left + width; gx += gridStep) {
    ctx.beginPath();
    ctx.moveTo(gx, top + 8);
    ctx.lineTo(gx, top + padH - 8);
    ctx.stroke();
  }
  for (let gy = top + gridStep; gy < top + padH; gy += gridStep) {
    ctx.beginPath();
    ctx.moveTo(left + 8, gy);
    ctx.lineTo(left + width - 8, gy);
    ctx.stroke();
  }

  const scanY = top + 12 + ((time * 0.04) % (padH - 24));
  const scan = ctx.createLinearGradient(left, scanY - 8, left, scanY + 8);
  scan.addColorStop(0, "rgba(34, 211, 238, 0)");
  scan.addColorStop(0.5, "rgba(34, 211, 238, 0.25)");
  scan.addColorStop(1, "rgba(34, 211, 238, 0)");
  ctx.fillStyle = scan;
  ctx.fillRect(left + 4, scanY - 8, width - 8, 16);

  ctx.fillStyle = "#67e8f9";
  ctx.font = "bold 10px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("BO'SH PAD", left + width / 2, top + 16);
  ctx.fillStyle = "rgba(165, 243, 252, 0.75)";
  ctx.font = "8px system-ui";
  ctx.fillText("Sayyorani tanlang va orbitaga torting", left + width / 2, height - 8);
  ctx.restore();
}

/** Qiyshiq ellipsoid — 3D sayyora */
export function drawPlanetEllipsoid(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  def: PlanetDef,
  x: number,
  y: number,
  radius: number,
  time: number,
  tilt = 0.32
) {
  const rx = radius * 1.18;
  const ry = radius * (0.78 - tilt * 0.08);
  const wobble = Math.sin(time * 0.0012 + x * 0.01) * 0.04;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(wobble);

  const glow = ctx.createRadialGradient(0, 0, ry * 0.3, 0, 0, rx * 1.45);
  glow.addColorStop(0, def.glowColor + "55");
  glow.addColorStop(0.6, def.glowColor + "22");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.ellipse(0, 0, rx * 1.35, ry * 1.35, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
  ctx.clip();

  const cropH = img.height * def.imageCrop;
  const aspect = img.width / cropH;
  const drawW = rx * 2.1;
  const drawH = drawW / aspect;
  ctx.drawImage(img, 0, 0, img.width, cropH, -drawW / 2, -drawH / 2 + ry * 0.05, drawW, drawH);

  const shade = ctx.createLinearGradient(-rx, -ry, rx, ry);
  shade.addColorStop(0, "rgba(255,255,255,0.28)");
  shade.addColorStop(0.35, "rgba(255,255,255,0.05)");
  shade.addColorStop(0.7, "rgba(0,0,0,0)");
  shade.addColorStop(1, "rgba(0,0,0,0.45)");
  ctx.fillStyle = shade;
  ctx.fillRect(-rx, -ry, rx * 2, ry * 2);

  const spec = ctx.createRadialGradient(-rx * 0.35, -ry * 0.4, 0, -rx * 0.35, -ry * 0.4, rx * 0.9);
  spec.addColorStop(0, "rgba(255,255,255,0.45)");
  spec.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = spec;
  ctx.fillRect(-rx, -ry, rx * 2, ry * 2);

  ctx.restore();
}

export function drawFragments(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.fillRect(x - size, y - size, size * 2, size * 2);
}
