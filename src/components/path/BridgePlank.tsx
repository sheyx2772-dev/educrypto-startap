"use client";

import { LockIcon } from "@/components/icons/NavIcons";
import { TrophyIcon } from "@/components/icons/FeatureIcons";

interface BridgePlankProps {
  title: string;
  section: string;
  type: string;
  status: "locked" | "active" | "completed";
}

export function BridgePlank({ title, section, type, status }: BridgePlankProps) {
  const locked = status === "locked";
  const done = status === "completed";
  const active = status === "active";

  if (type === "demo") {
    return (
      <div className={`path-node-demo ${locked ? "path-node-dimmed" : ""} ${active ? "path-demo-active" : ""}`}>
        <div className="path-demo-icon">
          <span className="text-2xl">🎮</span>
          {locked && <div className="path-lock-overlay"><LockIcon size={20} /></div>}
        </div>
        <div className="path-node-label">
          <p className="path-node-section">{section}</p>
          <p className="path-node-title">{title}</p>
          {!locked && active && <p className="path-node-cta">Demo →</p>}
          {done && <p className="path-node-done">✓ Demo</p>}
        </div>
      </div>
    );
  }

  if (type === "gift") {
    return (
      <div className={`path-node-gift ${locked ? "path-node-dimmed" : ""}`}>
        <div className="path-gift-wrap">
          <div className="path-gift-lid" />
          <div className="path-gift-box">
            <span className="text-2xl">🎁</span>
            {locked && <div className="path-lock-overlay"><LockIcon size={20} /></div>}
          </div>
        </div>
        <div className="path-node-label">
          <p className="path-node-section">{section}</p>
          <p className="path-node-title">{title}</p>
          {!locked && active && <p className="path-node-cta">Ochish →</p>}
          {done && <p className="path-node-done">✓ Olingan</p>}
        </div>
      </div>
    );
  }

  if (type === "certificate") {
    return (
      <div className={`path-node-cert ${locked ? "path-node-dimmed" : ""}`}>
        <div className="path-cert-scroll">
          <TrophyIcon size={locked ? 22 : 28} />
          <span className="path-cert-badge">NAPP</span>
          {locked && <div className="path-lock-overlay"><LockIcon size={20} /></div>}
        </div>
        <div className="path-node-label">
          <p className="path-node-section">{section}</p>
          <p className="path-node-title">{title}</p>
          {!locked && active && <p className="path-node-cta">Olish →</p>}
          {done && <p className="path-node-done">✓ Sertifikat</p>}
        </div>
      </div>
    );
  }

  const surfaceClass = done ? "path-brick-gold" : "path-brick-wood";
  const dimClass = locked ? "path-node-dimmed" : active ? "path-brick-active" : "";

  return (
    <div className={`path-node-lesson ${surfaceClass} ${dimClass}`}>
      {locked && (
        <div className="path-lock-badge">
          <LockIcon size={18} />
        </div>
      )}
      <div className="path-node-label px-1">
        <p className="path-node-section">{section}</p>
        <p className="path-node-title">{title}</p>
        {active && <p className="path-node-cta">Davom →</p>}
        {done && <span className="path-check">✓</span>}
      </div>
    </div>
  );
}
