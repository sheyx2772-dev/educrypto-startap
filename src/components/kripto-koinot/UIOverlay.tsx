"use client";

import { useMemo } from "react";
import { useMarketStore } from "@/lib/kripto-koinot/store";
import { PLACEABLE_PLANETS } from "@/lib/kripto-koinot/planets";

interface Props {
  timers: Record<string, number>;
}

function useHudData(timers: Record<string, number>) {
  const xp = useMarketStore((s) => s.playerXP);
  const safety = useMarketStore((s) => s.portfolioSafetyScore);
  const volatility = useMarketStore((s) => s.marketVolatility);
  const stability = useMarketStore((s) => s.orbitalStability);
  const placedCount = useMarketStore((s) => s.placedCount);
  const gravityForce = useMarketStore((s) => s.gravityForce);
  const damping = useMarketStore((s) => s.damping);
  const setGravityForce = useMarketStore((s) => s.setGravityForce);
  const setDamping = useMarketStore((s) => s.setDamping);
  const planetStates = useMarketStore((s) => s.planetStates);

  const feedPoints = useMemo(() => {
    const pts: number[] = [];
    let v = volatility;
    for (let i = 0; i < 16; i++) {
      v += Math.sin(i * 0.7) * 0.08 + (Math.random() - 0.5) * 0.05;
      pts.push(Math.max(0.05, Math.min(0.95, v)));
    }
    return pts;
  }, [volatility]);

  const pathD = feedPoints
    .map((p, i) => {
      const x = (i / (feedPoints.length - 1)) * 100;
      const y = 20 - p * 16;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  const minTimer = Math.min(
    ...PLACEABLE_PLANETS.map((p) => {
      const st = planetStates[p.id];
      if (!st || st.placed || st.exploded || st.consumed) return 999;
      return timers[p.id] ?? 60;
    })
  );

  return {
    xp,
    safety,
    volatility,
    stability,
    placedCount,
    gravityForce,
    damping,
    setGravityForce,
    setDamping,
    pathD,
    minTimer,
  };
}

function InlineStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className={`kk-stat kk-stat-${color}`}>
      <span className="kk-stat-label">{label}</span>
      <span className="kk-stat-value">{value}</span>
    </div>
  );
}

/** Tepa qator — barcha asosiy ko'rsatkichlar */
export function HUDTop({ timers }: Props) {
  const d = useHudData(timers);
  return (
    <header className="kk-hud-top">
      <InlineStat label="Bilim" value={String(d.xp)} color="cyan" />
      <InlineStat label="Xavfsizlik" value={`${d.safety.toFixed(1)}/10`} color="emerald" />
      <InlineStat label="Orbita" value={`${Math.round(d.stability)}%`} color="amber" />
      <span className="kk-stat-sep" />
      {d.minTimer < 999 && (
        <div className="kk-stat kk-stat-timer">
          <span className="kk-stat-label">Vaqt</span>
          <span className={`kk-timer ${d.minTimer <= 15 ? "urgent" : ""}`}>
            {Math.floor(d.minTimer / 60)}:{String(d.minTimer % 60).padStart(2, "0")}
          </span>
        </div>
      )}
      <span className="kk-stat-sep" />
      <div className="kk-stat kk-stat-feed">
        <span className="kk-stat-label">Bozor</span>
        <svg viewBox="0 0 100 20" className="kk-feed-svg">
          <path
            d={d.pathD}
            className="kk-feed-line"
            stroke={d.volatility > 0.5 ? "#fb7185" : "#34d399"}
            strokeWidth="2.5"
          />
        </svg>
        <span className="kk-stat-sub">{(d.volatility * 100).toFixed(0)}%</span>
      </div>
      <span className="kk-stat-placed">{d.placedCount}/5</span>
    </header>
  );
}

/** Pastki qator — fizika + yo'riqnoma */
export function HUDBottom() {
  const gravityForce = useMarketStore((s) => s.gravityForce);
  const damping = useMarketStore((s) => s.damping);
  const setGravityForce = useMarketStore((s) => s.setGravityForce);
  const setDamping = useMarketStore((s) => s.setDamping);

  return (
    <footer className="kk-hud-bottom">
      <div className="kk-physics-inline">
        <span className="kk-stat-label">Fizika</span>
        <label>
          <span>Grav</span>
          <input
            type="range"
            min="0.0004"
            max="0.0016"
            step="0.0001"
            value={gravityForce}
            onChange={(e) => setGravityForce(parseFloat(e.target.value))}
          />
        </label>
        <label>
          <span>Damp</span>
          <input
            type="range"
            min="0.005"
            max="0.05"
            step="0.005"
            value={damping}
            onChange={(e) => setDamping(parseFloat(e.target.value))}
          />
        </label>
      </div>
      <div className="kk-hint-bar">
        <span className="kk-hint-main">
          Sayyora rasmini mos <b>orbita nomiga</b> torting →
        </span>
        {PLACEABLE_PLANETS.map((p) => (
          <span key={p.id} style={{ color: p.themeColor }}>
            <b>{p.symbol}</b>
          </span>
        ))}
      </div>
    </footer>
  );
}
