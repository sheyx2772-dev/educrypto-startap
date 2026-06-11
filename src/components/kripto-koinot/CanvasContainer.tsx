"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Matter from "matter-js";
import {
  computeArenaLayout,
  createArenaBodies,
  createExplosionFragments,
  createPlanetBody,
  getPlanetOrbitAtPosition,
  isInBlackHole,
  isOnPad,
  lockPlanetToOrbit,
  stepOrbitalMotion,
  type PlanetBodyMeta,
} from "@/lib/kripto-koinot/engine";
import { FAILED_PLANET, PLACEABLE_PLANETS, PLACEMENT_DEADLINE_MS } from "@/lib/kripto-koinot/planets";
import {
  createExplosionFX,
  drawBlackHole,
  drawCosmosBackground,
  drawDockingPad,
  drawFragments,
  drawMarketSun,
  drawPlanetExplosion,
  drawPlanetEllipsoid,
  drawPlanetOrbits,
  drawSunOrbit,
  type ExplosionFX,
} from "@/lib/kripto-koinot/renderer";
import { useMarketStore } from "@/lib/kripto-koinot/store";

const FRAGMENT_LIFETIME = 1200;

interface Props {
  active: boolean;
  onTimersChange?: (timers: Record<string, number>) => void;
}

function getMeta(body: Matter.Body): PlanetBodyMeta | null {
  return (body as Matter.Body & { meta?: PlanetBodyMeta }).meta ?? null;
}

export function CanvasContainer({ active, onTimersChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});
  const fragmentsRef = useRef<{ body: Matter.Body; born: number }[]>([]);
  const explosionsRef = useRef<ExplosionFX[]>([]);
  const draggingRef = useRef<string | null>(null);

  const [arenaSize, setArenaSize] = useState({ width: 0, height: 0 });

  const planetPlaced = useMarketStore((s) => s.planetPlaced);
  const planetCrashed = useMarketStore((s) => s.planetCrashed);

  const handleResize = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const w = wrap.clientWidth;
    const h = wrap.clientHeight;
    if (w < 50 || h < 50) return;
    setArenaSize({ width: Math.floor(w), height: Math.floor(h) });
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [handleResize]);

  useEffect(() => {
    const all = [...PLACEABLE_PLANETS, FAILED_PLANET];
    all.forEach((p) => {
      const img = new Image();
      img.src = p.image;
      imagesRef.current[p.id] = img;
    });
  }, []);

  useEffect(() => {
    if (!active || arenaSize.width < 50 || arenaSize.height < 50) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = arenaSize;
    const layout = computeArenaLayout(width, height);
    explosionsRef.current = [];

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0, scale: 0 } });
    engineRef.current = engine;
    const world = engine.world;

    const { walls, sun, blackHoleBody } = createArenaBodies(
      {
        width,
        height,
        center: layout.center,
        blackHole: layout.blackHole,
        padOrigin: layout.padOrigin,
        pad: layout.pad,
      },
      layout.sunRadius
    );
    Matter.World.add(world, [...walls, sun, blackHoleBody]);

    const planetBodies: Matter.Body[] = [];
    const now = Date.now();
    const pad = layout.pad;
    const slotH = (pad.height - 50) / PLACEABLE_PLANETS.length;

    PLACEABLE_PLANETS.forEach((def, i) => {
      const body = createPlanetBody(
        def,
        pad.centerX,
        pad.top + 36 + slotH * i + slotH * 0.5,
        layout.planetRadius,
        now
      );
      planetBodies.push(body);
    });

    const failedBody = createPlanetBody(
      FAILED_PLANET,
      layout.blackHole.x - layout.blackHole.radius * 2.4,
      layout.blackHole.y,
      layout.planetRadius * 0.85,
      now
    );
    planetBodies.push(failedBody);

    Matter.World.add(world, planetBodies);

    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.15, render: { visible: false } },
    });
    Matter.World.add(world, mouseConstraint);

    const triggerExplosion = (body: Matter.Body, meta: PlanetBodyMeta) => {
      const { x, y } = body.position;
      explosionsRef.current.push(
        createExplosionFX(x, y, meta.def.themeColor, meta.def.glowColor)
      );
      createExplosionFragments(world, x, y, meta.def.themeColor, 16, layout.uniformScale);
      Matter.World.remove(world, body);
    };

    Matter.Events.on(mouseConstraint, "startdrag", (e) => {
      const body = (e as unknown as { body?: Matter.Body }).body;
      if (body?.label?.startsWith("planet-")) {
        const meta = getMeta(body);
        if (meta && !meta.locked) draggingRef.current = meta.planetId;
      }
    });

    Matter.Events.on(mouseConstraint, "enddrag", (e) => {
      const body = (e as unknown as { body?: Matter.Body }).body;
      draggingRef.current = null;
      if (!body || !body.label?.startsWith("planet-")) return;
      const meta = getMeta(body);
      if (!meta || meta.locked || meta.def.isFailed) return;

      const targetOrbit = getPlanetOrbitAtPosition(
        body.position.x,
        body.position.y,
        layout.center,
        layout.planetOrbits
      );
      const storePhase = useMarketStore.getState().phase;
      if (storePhase !== "playing") return;
      if (!targetOrbit) return;

      if (targetOrbit.planetId !== meta.planetId) {
        triggerExplosion(body, meta);
        planetCrashed(meta.planetId, "wrong_orbit");
        return;
      }

      meta.placed = true;
      meta.locked = true;
      lockPlanetToOrbit(body, layout.center, targetOrbit, meta);
      planetPlaced(meta.planetId);
    });

    const timerInterval = setInterval(() => {
      const t: Record<string, number> = {};
      const storeStates = useMarketStore.getState().planetStates;
      const elapsed = Date.now() - now;
      for (const def of PLACEABLE_PLANETS) {
        const st = storeStates[def.id];
        if (!st || st.placed || st.exploded || st.consumed) continue;
        t[def.id] = Math.max(0, Math.ceil((PLACEMENT_DEADLINE_MS - elapsed) / 1000));
      }
      onTimersChange?.(t);
    }, 500);

    Matter.Events.on(engine, "beforeUpdate", () => {
      const storePhase = useMarketStore.getState().phase;
      if (storePhase !== "playing") return;

      const elapsed = Date.now() - now;

      for (const body of planetBodies) {
        if (!world.bodies.includes(body)) continue;
        const meta = getMeta(body);
        if (!meta) continue;

        if (meta.locked && meta.assignedOrbit) {
          stepOrbitalMotion(body, layout.center, meta);
          continue;
        }

        if (meta.def.isFailed) {
          const bhx = layout.blackHole.x - body.position.x;
          const bhy = layout.blackHole.y - body.position.y;
          const bhd = Math.hypot(bhx, bhy) || 1;
          Matter.Body.applyForce(body, body.position, {
            x: (bhx / bhd) * 0.003,
            y: (bhy / bhd) * 0.003,
          });
          if (isInBlackHole(body.position.x, body.position.y, layout.blackHole)) {
            if (!useMarketStore.getState().planetStates[meta.planetId]?.consumed) {
              triggerExplosion(body, meta);
              planetCrashed(meta.planetId, "market_crash");
            }
          }
          continue;
        }

        if (isOnPad(body.position.x, body.position.y, layout.pad)) {
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
          continue;
        }

        if (!meta.placed && elapsed > PLACEMENT_DEADLINE_MS) {
          const bhx = layout.blackHole.x - body.position.x;
          const bhy = layout.blackHole.y - body.position.y;
          const bhd = Math.hypot(bhx, bhy) || 1;
          Matter.Body.applyForce(body, body.position, {
            x: (bhx / bhd) * 0.012,
            y: (bhy / bhd) * 0.012,
          });
          if (isInBlackHole(body.position.x, body.position.y, layout.blackHole)) {
            triggerExplosion(body, meta);
            planetCrashed(meta.planetId, "timeout");
          }
          continue;
        }

        if (isInBlackHole(body.position.x, body.position.y, layout.blackHole)) {
          triggerExplosion(body, meta);
          planetCrashed(meta.planetId, "black_hole");
        }
      }

      fragmentsRef.current = fragmentsRef.current.filter((f) => {
        if (Date.now() - f.born > FRAGMENT_LIFETIME) {
          Matter.World.remove(world, f.body);
          return false;
        }
        return true;
      });
    });

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let animId = 0;

    const draw = () => {
      if (!ctx) return;
      const time = performance.now();
      ctx.clearRect(0, 0, width, height);

      const placedIds = new Set<string>();
      for (const body of planetBodies) {
        const meta = getMeta(body);
        if (meta?.locked) placedIds.add(meta.planetId);
      }

      drawCosmosBackground(ctx, width, height, layout.center.x, layout.center.y, time);
      drawDockingPad(ctx, layout.pad, height, time);
      drawSunOrbit(ctx, layout.center.x, layout.center.y, layout.sunOrbitRadius, time);
      drawPlanetOrbits(
        ctx,
        layout.center.x,
        layout.center.y,
        layout.planetOrbits,
        placedIds,
        time,
        layout.uniformScale
      );
      drawMarketSun(ctx, layout.center.x, layout.center.y, layout.sunRadius, time);
      drawBlackHole(ctx, layout.blackHole.x, layout.blackHole.y, layout.blackHole.radius, time);

      explosionsRef.current = explosionsRef.current.filter((fx) =>
        drawPlanetExplosion(ctx, fx, time)
      );

      for (const body of world.bodies) {
        if (!body.label?.startsWith("planet-") && body.label !== "fragment") continue;
        const meta = getMeta(body);
        const r = body.circleRadius ?? layout.planetRadius;

        if (body.label === "fragment") {
          drawFragments(ctx, body.position.x, body.position.y, 4 * layout.uniformScale, "#fbbf24");
          continue;
        }

        const img = meta ? imagesRef.current[meta.planetId] : null;
        if (img?.complete && meta) {
          drawPlanetEllipsoid(ctx, img, meta.def, body.position.x, body.position.y, r, time);
        }
      }

      Matter.Engine.update(engine, 1000 / 60);
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(timerInterval);
      Matter.Events.off(mouseConstraint, "startdrag");
      Matter.Events.off(mouseConstraint, "enddrag");
      Matter.Events.off(engine, "beforeUpdate");
      Matter.World.clear(world, false);
      Matter.Engine.clear(engine);
      engineRef.current = null;
      fragmentsRef.current = [];
      explosionsRef.current = [];
    };
  }, [active, arenaSize, planetPlaced, planetCrashed, onTimersChange]);

  return (
    <div ref={wrapRef} className="kk-arena-wrap">
      <canvas ref={canvasRef} className="kk-canvas" />
    </div>
  );
}
