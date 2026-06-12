"use client";

import Image from "next/image";
import { LockIcon } from "@/components/icons/NavIcons";
import { BRIDGE_CERT_SIZE, getCertConfig } from "@/lib/bridgeCerts";
import { BRIDGE_CHEST_SIZE, getChestImage } from "@/lib/bridgeChests";
import { getDemoBannerConfig } from "@/lib/demoGameBanners";
import { GiftChest } from "./GiftChest";

interface BridgePlankProps {
  nodeId: string;
  title: string;
  section: string;
  type: string;
  status: "locked" | "active" | "completed";
  parentLessonId?: string;
}

export function BridgePlank({ nodeId, title, section, type, status, parentLessonId }: BridgePlankProps) {
  const locked = status === "locked";
  const done = status === "completed";
  const active = status === "active";

  if (type === "demo") {
    const bannerCfg = getDemoBannerConfig(parentLessonId);
    const imgClass = [
      "path-demo-banner-img",
      bannerCfg.contain && "path-demo-banner-contain",
      bannerCfg.noBg && "path-demo-banner-nobg",
    ]
      .filter(Boolean)
      .join(" ");
    return (
      <div className={`path-node-demo ${locked ? "path-node-dimmed" : ""} ${active ? "path-demo-active" : ""}`}>
        <div className={`path-demo-banner${bannerCfg.light ? " path-demo-banner-light" : ""}`}>
          <Image
            src={bannerCfg.src}
            alt={title}
            fill
            sizes="220px"
            className={imgClass}
            unoptimized
          />
          {locked && (
            <div className="path-lock-overlay">
              <LockIcon size={22} />
            </div>
          )}
        </div>
        <div className="path-demo-footer">
          <p className="path-node-title">{title}</p>
          {!locked && active && <p className="path-node-cta">O&apos;ynash →</p>}
          {done && <p className="path-node-done">✓ Tugadi</p>}
        </div>
      </div>
    );
  }

  if (type === "gift") {
    return (
      <div
        className={`path-chest-only ${locked ? "path-node-dimmed" : ""} ${active ? "path-chest-active" : ""} ${done ? "path-chest-done" : ""}`}
        aria-label={title}
      >
        <GiftChest src={getChestImage(nodeId)} size={BRIDGE_CHEST_SIZE} breathing noBg />
      </div>
    );
  }

  if (type === "certificate") {
    const cert = getCertConfig(nodeId);
    return (
      <div
        className={`path-cert-only ${locked ? "path-node-dimmed" : ""} ${active ? "path-cert-active" : ""} ${done ? "path-cert-done" : ""}`}
        aria-label={title}
      >
        <GiftChest src={cert.src} size={BRIDGE_CERT_SIZE} breathing noBg={cert.noBg} />
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
