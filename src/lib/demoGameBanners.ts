import { pathContentById } from "./pathContentData";
import type { InteractiveLabId } from "./pathContent";

export interface DemoBannerConfig {
  src: string;
  light?: boolean;
  contain?: boolean;
  noBg?: boolean;
}

/** Har bir dars demo taxtachasi uchun alohida banner (ustunlik beriladi) */
const LESSON_DEMO_BANNERS: Record<string, DemoBannerConfig> = {
  p6: { src: "/game/kripto-koinot/blackhole.png" },
  p13: { src: "/game/kripto-sayohat/cards.png" },
  p32: { src: "/game/kripto-koinot/arena-map.png" },
  p33: { src: "/game/kripto-shahar/v2/office.png" },
  p35: { src: "/game/kripto-shahar/campus.png" },
  p37: { src: "/game/kripto-shahar/crypto-house.png" },
  p8: { src: "/game/tanga/wallet-demo-banner.png", light: true, contain: true, noBg: true },
  p4: { src: "/game/kripto-shahar/v2/vault.png" },
  p14: { src: "/game/kripto-shahar/btc-tree.png" },
  p19: { src: "/game/kripto-shahar/crypto-house.png" },
  p22: { src: "/game/kripto-shahar/campus.png" },
  p23: { src: "/game/kripto-shahar/bank-pedestals.png" },
  p24: { src: "/game/kripto-shahar/shop-blue.png" },
  p27: { src: "/game/kripto-shahar/flower-purple.png" },
  p30: { src: "/game/kripto-shahar/cryptocars.png" },
  p31: { src: "/game/kripto-shahar/crypto-bank.png" },
  p36: { src: "/game/kripto-koinot/planets/luna-crash.png" },
};

/** Umumiy interaktiv o'yin bannerlari (dars bo'yicha maxsus yo'q bo'lsa) */
const INTERACTIVE_BANNERS: Record<InteractiveLabId, string> = {
  "kripto-sotib-ol": "/game/kripto-sotib-ol/savatcha-hero.png",
  "kripto-sayohat": "/game/kripto-sayohat/board-full.png",
  tanga: "/game/tanga/coins/btc.png",
  blockchain: "/game/blockchain/mascot.png",
  myth: "/game/kripto-sayohat/board-bg.png",
  mining: "/game/kripto-shahar/mine-entrance.png",
  wallet: "/game/tanga/wallet-demo-banner.png",
  payment: "/game/kripto-shahar/crypto-bank.png",
  ai: "/game/kripto-shahar/v2/field-city.png",
  asset: "/game/kripto-shahar/bitcoin-shop.png",
  "kripto-shahar": "/game/kripto-shahar/island-bg.png",
  "kripto-koinot": "/game/kripto-koinot/koinot-demo-banner.png",
};

const DEFAULT_BANNER = "/game/kripto-sayohat/cards.png";

export function getDemoBannerConfig(parentLessonId: string | undefined): DemoBannerConfig {
  if (parentLessonId && LESSON_DEMO_BANNERS[parentLessonId]) {
    return LESSON_DEMO_BANNERS[parentLessonId];
  }

  if (!parentLessonId) return { src: DEFAULT_BANNER };

  const content = pathContentById[parentLessonId];
  const game = content?.game;

  if (game?.type === "interactive" && game.interactiveId) {
    return { src: INTERACTIVE_BANNERS[game.interactiveId] ?? DEFAULT_BANNER };
  }

  return { src: DEFAULT_BANNER };
}
