import type { PlanetDef } from "./types";

export const PLACEABLE_PLANETS: PlanetDef[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC",
    mass: 100,
    stability: 95,
    correctRing: 1,
    marketCap: 1_200_000_000_000,
    image: "/game/kripto-koinot/planets/btc.png",
    imageCrop: 0.82,
    themeColor: "#fbbf24",
    glowColor: "#f59e0b",
    eduTitle: "BTC noto'g'ri orbitada",
    eduBody:
      "Bitcoin — bozor gravitatsiyasining markazi. Uni tashqi innovatsiya orbitasiga qo'ysangiz, portfel muvozanati buziladi va tizim qulashi mumkin.",
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH",
    mass: 75,
    stability: 82,
    correctRing: 2,
    marketCap: 400_000_000_000,
    image: "/game/kripto-koinot/planets/eth.png",
    imageCrop: 0.8,
    themeColor: "#a78bfa",
    glowColor: "#8b5cf6",
    eduTitle: "ETH orbita xatosi",
    eduBody:
      "Ethereum smart-kontrakt va DeFi qatlami — moliyaviy tizimlar orbitasida bo'lishi kerak. Juda ichki yoki juda tashqi orbita xavfli.",
  },
  {
    id: "usdt",
    name: "Tether",
    symbol: "USDT",
    mass: 60,
    stability: 90,
    correctRing: 2,
    marketCap: 95_000_000_000,
    image: "/game/kripto-koinot/planets/usdt.png",
    imageCrop: 0.78,
    themeColor: "#2dd4bf",
    glowColor: "#14b8a6",
    eduTitle: "Stablecoin peg buzildi",
    eduBody:
      "USDT barqarorlik uchun moliyaviy orbitada turishi kerak. Noto'g'ri joylashuv peg xavfini oshiradi — diversifikatsiya qoidasini eslang!",
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL",
    mass: 45,
    stability: 70,
    correctRing: 3,
    marketCap: 80_000_000_000,
    image: "/game/kripto-koinot/planets/sol.png",
    imageCrop: 0.8,
    themeColor: "#4ade80",
    glowColor: "#22c55e",
    eduTitle: "SOL tezlik vs barqarorlik",
    eduBody:
      "Yuqori tezlikli tarmoqlar innovatsiya orbitasida. Ichki fundamental orbitaga qo'yilsa, gravitatsiya ziddiyati portfelni portlatadi.",
  },
  {
    id: "ada",
    name: "Cardano",
    symbol: "ADA",
    mass: 35,
    stability: 78,
    correctRing: 3,
    marketCap: 25_000_000_000,
    image: "/game/kripto-koinot/planets/ada.png",
    imageCrop: 0.8,
    themeColor: "#38bdf8",
    glowColor: "#0ea5e9",
    eduTitle: "ADA ilmiy gravitatsiya",
    eduBody:
      "Cardano tadqiqotga asoslangan altcoin — tashqi innovatsiya halqasida. Noto'g'ri orbita = ortiqcha xavf va Market Crash.",
  },
];

export const FAILED_PLANET: PlanetDef = {
  id: "luna",
  name: "Terra Luna",
  symbol: "LUNC",
  mass: 15,
  stability: 5,
  correctRing: 3,
  isFailed: true,
  marketCap: 500_000_000,
  image: "/game/kripto-koinot/planets/luna-crash.png",
  imageCrop: 0.85,
  themeColor: "#f87171",
  glowColor: "#ef4444",
  eduTitle: "Failed Altcoin: LUNA",
  eduBody:
    "LUNA/UST peg buzilishi — haqiqiy Market Crash misoli. Qora tuynuk zonasiga yaqin altcoinlar yutiladi. Faqat yo'qotishga tayyor pul bilan ishlang!",
};

export const PLACEMENT_DEADLINE_MS = 60_000;
export const PLANETS_TO_WIN = PLACEABLE_PLANETS.length;
