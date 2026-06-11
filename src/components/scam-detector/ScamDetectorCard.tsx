"use client";

import type { CardType, ScamCard } from "@/lib/scam-detector/types";

interface Props {
  card: ScamCard;
  reveal?: boolean;
  correct?: boolean;
  showScan?: boolean;
}

const TYPE_LABELS: Record<CardType, string> = {
  telegram: "Telegram",
  website: "Sayt",
  ad: "Reklama",
  post: "Instagram",
};

const AVATAR_GRADIENTS = [
  "from-sky-400 to-blue-600",
  "from-violet-500 to-purple-700",
  "from-rose-400 to-red-600",
  "from-emerald-400 to-teal-600",
  "from-amber-400 to-orange-600",
];

function avatarGradient(seed: string) {
  let n = 0;
  for (let i = 0; i < seed.length; i++) n += seed.charCodeAt(i);
  return AVATAR_GRADIENTS[n % AVATAR_GRADIENTS.length];
}

export function ScamDetectorCard({ card, reveal, correct, showScan = true }: Props) {
  const borderClass = reveal
    ? correct
      ? "ring-2 ring-[#00D68F] shadow-[0_0_32px_rgba(0,214,143,0.5)]"
      : "ring-2 ring-[#E24B4A] shadow-[0_0_32px_rgba(226,75,74,0.5)]"
    : "ring-1 ring-[#F4B942]/25";

  const stampLabel = reveal
    ? correct
      ? card.correctAnswer === "scam"
        ? "SCAM ✓"
        : "HAQIQIY ✓"
      : "XATO!"
    : "";

  return (
    <div className="sd-evidence-wrap">
      <div className={`sd-evidence-folder overflow-hidden relative ${borderClass}`}>
        <span className="sd-evidence-tab">Dalil #{card.id}</span>
        <div className="flex items-center justify-between px-3 pt-5 pb-2">
          <span className={`sd-type-badge sd-type-${card.type}`}>
            {TYPE_LABELS[card.type]}
          </span>
          <span className="text-[8px] text-gray-500 font-mono tracking-wider">CASE FILE</span>
        </div>

        <div className="mx-2 mb-2 rounded-lg overflow-hidden relative">
          {showScan && !reveal && <div className="sd-scan-line" aria-hidden />}

          {card.type === "telegram" && card.telegram && (
            <TelegramMockup card={card} />
          )}
          {card.type === "website" && card.website && (
            <BrowserMockup card={card} />
          )}
          {card.type === "ad" && card.ad && (
            <InstagramAdMockup card={card} />
          )}
          {card.type === "post" && card.post && (
            <InstagramPostMockup card={card} />
          )}

          {reveal && stampLabel && (
            <div
              className={`sd-stamp show ${correct ? (card.correctAnswer === "scam" ? "scam" : "real") : "scam"}`}
            >
              {stampLabel}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TelegramMockup({ card }: { card: ScamCard }) {
  const tg = card.telegram!;
  const name = tg.displayName ?? tg.username;
  const initial = name[0]?.toUpperCase() ?? "?";
  const grad = avatarGradient(tg.username);

  return (
    <div className="sd-tg-app">
      <div className="sd-tg-header">
        <span className="sd-tg-back">‹</span>
        <div className={`sd-tg-avatar bg-gradient-to-br ${grad}`}>{initial}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="text-[13px] font-semibold text-white truncate">{name}</span>
            {tg.verified && <span className="sd-tg-verified">✓</span>}
          </div>
          <span className="text-[11px] text-[#6ab2f2]/80">@{tg.username}</span>
        </div>
        <span className="text-gray-500 text-sm">⋮</span>
      </div>
      <div className="sd-tg-chat">
        <div className="sd-tg-bubble">
          <p>{tg.message}</p>
          <div className="sd-tg-meta">
            {tg.time && <span className="sd-tg-time">{tg.time}</span>}
            <span className="sd-tg-checks">✓✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrowserMockup({ card }: { card: ScamCard }) {
  const site = card.website!;
  const isSuspicious =
    site.badge?.includes("Nusxa") ||
    site.url.includes("-official") ||
    site.url.includes("bit.ly") ||
    !site.url.includes(".");

  return (
    <div className="sd-browser">
      <div className="sd-browser-chrome">
        <div className="sd-browser-dots">
          <span /><span /><span />
        </div>
        <div className="sd-browser-tabs">
          <div className="sd-browser-tab active">{site.title.slice(0, 18)}…</div>
          <div className="sd-browser-tab">Yangi tab</div>
        </div>
        <div className="sd-browser-nav">
          <div className="sd-browser-nav-btn">‹</div>
          <div className="sd-browser-nav-btn">›</div>
          <div className="sd-browser-nav-btn">↻</div>
          <div className="sd-browser-url">
            <span className={`sd-browser-lock ${isSuspicious ? "warn" : "safe"}`}>
              {isSuspicious ? "⚠" : "🔒"}
            </span>
            <span className="truncate">{site.url}</span>
          </div>
        </div>
      </div>
      <div className="sd-browser-page">
        <div className="sd-browser-hero">🌐</div>
        {site.badge && <span className="sd-browser-badge">{site.badge}</span>}
        <h4 className="sd-browser-title">{site.title}</h4>
        <p className="sd-browser-preview">{site.preview}</p>
      </div>
    </div>
  );
}

function InstagramAdMockup({ card }: { card: ScamCard }) {
  const ad = card.ad!;
  const brand = ad.brand ?? "sponsor";
  const grad = avatarGradient(brand);

  return (
    <div className="sd-ig">
      <div className="sd-ig-topbar">
        <span className="text-white text-lg">📷</span>
        <span className="sd-ig-logo">Instagram</span>
        <span className="text-white text-sm">✉</span>
      </div>
      <div className="sd-ig-post-header">
        <div className="sd-ig-avatar-ring">
          <div className={`sd-ig-avatar-inner bg-gradient-to-br ${grad}`}>
            {brand[0]?.toUpperCase()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-white truncate">{brand}</div>
          <div className="sd-ig-sponsored">Sponsored</div>
        </div>
        <span className="text-white text-sm">⋯</span>
      </div>
      <div className="sd-ig-media relative">
        <span className="sd-ig-ad-label">{ad.watermark ?? "REKLAMA"}</span>
        <span className="sd-ig-media-emoji">📢</span>
        <div className="sd-ig-ad-headline absolute bottom-0 left-0 right-0 z-[2]">
          <h4>{ad.headline}</h4>
          <p>{ad.body}</p>
        </div>
      </div>
      <div className="sd-ig-actions">
        <div className="sd-ig-actions-left">
          <span>♡</span>
          <span>💬</span>
          <span>↗</span>
        </div>
        <span>🔖</span>
      </div>
      {ad.cta && <div className="sd-ig-cta-pill">{ad.cta}</div>}
    </div>
  );
}

function InstagramPostMockup({ card }: { card: ScamCard }) {
  const post = card.post!;
  const grad = avatarGradient(post.username);

  return (
    <div className="sd-ig">
      <div className="sd-ig-topbar">
        <span className="text-white text-lg">📷</span>
        <span className="sd-ig-logo">Instagram</span>
        <span className="text-white text-sm">✉</span>
      </div>
      <div className="sd-ig-post-header">
        <div className="sd-ig-avatar-ring">
          <div className={`sd-ig-avatar-inner bg-gradient-to-br ${grad}`}>
            {post.username[0]?.toUpperCase()}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-white">@{post.username}</div>
        </div>
        <span className="text-white text-sm">⋯</span>
      </div>
      <div className="sd-ig-media">
        <span className="sd-ig-media-emoji">{post.imageEmoji ?? "📸"}</span>
      </div>
      <div className="sd-ig-actions">
        <div className="sd-ig-actions-left">
          <span>❤️</span>
          <span>💬</span>
          <span>↗</span>
        </div>
        <span>🔖</span>
      </div>
      <div className="sd-ig-likes">{post.likes} likes</div>
      <div className="sd-ig-caption">
        <strong>@{post.username}</strong>
        {post.caption}
      </div>
      {post.comments && (
        <div className="px-3 pb-3 text-[12px] text-gray-500">View all {post.comments} comments</div>
      )}
    </div>
  );
}
