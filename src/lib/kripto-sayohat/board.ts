import type { BoardTile, CardType } from "./types";

/** Rasmdagi karta uylari — faqat shu kataklarga tushganda karta ochiladi */
const CARD_HOUSES: Record<number, { cardType: CardType; title: string }> = {
  8: { cardType: "bilim", title: "Bilim Kartasi" },
  17: { cardType: "scam", title: "Scam/Risk Kartasi" },
  26: { cardType: "imkoniyat", title: "Imkoniyat Kartasi" },
  35: { cardType: "bilim", title: "Bilim Kartasi II" },
};

const EDU_TOPICS = [
  "Blockchain Asoslari",
  "Kriptovalyuta Turlari",
  "Consensus Algoritmlar",
  "Aqlli Shartnomalar",
  "DeFi Asoslari",
  "NFT Tushunchasi",
  "Web3 Kirish",
  "Hash va Kriptografiya",
  "Decentralizatsiya",
  "Mining Asoslari",
  "Hamyon Xavfsizligi",
  "Blok Strukturasi",
  "Peer-to-Peer Tarmoq",
  "Token Standartlari",
  "Gas Fee Tushunchasi",
  "Layer 2 Yechimlar",
  "CBDC va Fiat",
  "Kripto Tarixi",
];

const STABLE_TASKS = [
  "Stablecoin P2P Savdo",
  "Xavfsiz Tranzaksiya",
  "Stablecoin Likvidlik",
  "USDT Bridge Simulyatsiya",
  "P2P Xavfsizlik Tekshiruvi",
  "Likvidlik Pool",
  "Stablecoin Audit",
  "Cross-chain Transfer",
];

const RISK_ZONES = [
  "Phishing Email",
  "Fake Airdrop",
  "Rug Pull Alert",
  "Telegram-bot Scam",
  "Noma'lum APK",
  "Pump & Dump",
  "Fake Support",
  "Seed Phrase So'rovi",
];

/** 40 ta katak — doiraviy blockchain yo'li */
export function buildBoard(): BoardTile[] {
  const tiles: BoardTile[] = [
    { id: 0, type: "start", zone: "start", title: "START", icon: "🚀", challengeId: "start" },
  ];

  let eduIdx = 0;
  let stableIdx = 0;
  let riskIdx = 0;

  for (let i = 1; i < 40; i++) {
    const cardHouse = CARD_HOUSES[i];
    if (cardHouse) {
      tiles.push({
        id: i,
        type: "card",
        zone: "card",
        title: cardHouse.title,
        icon: cardHouse.cardType === "bilim" ? "📘" : cardHouse.cardType === "scam" ? "🪝" : "✨",
        challengeId: `card-${i}`,
        cardType: cardHouse.cardType,
      });
      continue;
    }
    if (i % 10 === 0) {
      tiles.push({
        id: i,
        type: "reward",
        zone: "gold",
        title: "Mukofot Sandig'i",
        icon: "🎁",
        challengeId: `reward-${i}`,
      });
      continue;
    }
    if (i % 7 === 0) {
      tiles.push({
        id: i,
        type: "risk",
        zone: "red",
        title: RISK_ZONES[riskIdx % RISK_ZONES.length],
        icon: "🪝",
        challengeId: `risk-${riskIdx++}`,
      });
      continue;
    }
    if (i % 4 === 0) {
      tiles.push({
        id: i,
        type: "stablecoin",
        zone: "green",
        title: STABLE_TASKS[stableIdx % STABLE_TASKS.length],
        icon: "₮",
        challengeId: `stable-${stableIdx++}`,
      });
      continue;
    }
    tiles.push({
      id: i,
      type: "educational",
      zone: "blue",
      title: EDU_TOPICS[eduIdx % EDU_TOPICS.length],
      icon: "📘",
      challengeId: `edu-${eduIdx++}`,
    });
  }

  return tiles;
}

export const BOARD_TILES = buildBoard();
