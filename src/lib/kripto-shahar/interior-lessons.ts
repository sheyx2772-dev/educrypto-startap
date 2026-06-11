import type { BuildingId, CourseKey } from "./types";

export interface LessonQuestion {
  q: string;
  options: string[];
  correct: number;
  explain: string;
}

export interface InteriorLesson {
  buildingId: BuildingId;
  title: string;
  emoji: string;
  description: string;
  introTips: string[];
  questions: LessonQuestion[];
  bitReward: number;
  xpReward: number;
  courseKey?: CourseKey;
}

export const INTERIOR_LESSONS: Partial<Record<BuildingId, InteriorLesson>> = {
  city_square: {
    buildingId: "city_square",
    title: "Maktab — Kripto Asoslari",
    emoji: "🏛️",
    description: "Blockchain va Bitcoin haqida qisqa dars.",
    introTips: [
      "Blockchain — o'zgarmas yozuvlar zanjiri",
      "Bitcoin — markazlashmagan pul tizimi",
      "Hamyon — kalitlarni saqlash vositasi",
    ],
    questions: [
      {
        q: "Blockchainda ma'lumot qanday saqlanadi?",
        options: ["Bloklar zanjirida", "Bitta serverda", "Email orqali"],
        correct: 0,
        explain: "Har bir blok oldingi blok hashiga bog'langan.",
      },
      {
        q: "Bitcoin kim tomonidan boshqariladi?",
        options: ["Markaziy bank", "Hech kim — tarmoq a'zolari", "Faqat Satoshi"],
        correct: 1,
        explain: "Bitcoin markazlashmagan — konsensus tarmoqda.",
      },
    ],
    bitReward: 20,
    xpReward: 15,
  },
  napp_office: {
    buildingId: "napp_office",
    title: "NAPP Bank — Qonunchilik",
    emoji: "🏢",
    description: "O'zbekistonda kripto tartibga solish asoslari.",
    introTips: [
      "NAPP — Virtual aktivlar provayderlarini nazorat qiladi",
      "VASP — litsenziya olish majburiy",
      "KYC — mijozni tanish talabi",
    ],
    questions: [
      {
        q: "VASP nima?",
        options: [
          "Virtual aktivlar provayderi",
          "Video o'yin platformasi",
          "Valyuta ayirboshlash banki",
        ],
        correct: 0,
        explain: "VASP kripto xizmatlar ko'rsatuvchi tashkilot.",
      },
      {
        q: "NAPP nima uchun kerak?",
        options: ["O'yin yaratish", "Kripto bozorini tartibga solish", "Mining qilish"],
        correct: 1,
        explain: "NAPP investorlarni himoya qiladi.",
      },
    ],
    bitReward: 25,
    xpReward: 20,
    courseKey: "napp_law",
  },
  ethereum_lab: {
    buildingId: "ethereum_lab",
    title: "Bank — Smart Kontraktlar",
    emoji: "🏦",
    description: "Ethereum va smart kontrakt asoslari.",
    introTips: [
      "Smart kontrakt — avtomatik shartnoma kodi",
      "ETH — Ethereum tarmoq tokeni",
      "Gas — tranzaksiya to'lovi",
    ],
    questions: [
      {
        q: "Smart kontrakt nima?",
        options: [
          "Qog'oz shartnoma",
          "Blokcheynda ishlaydigan dastur",
          "Bank krediti",
        ],
        correct: 1,
        explain: "Shartlar bajarilganda avtomatik ishlaydi.",
      },
      {
        q: "Gas fee nima uchun to'lanadi?",
        options: ["Reklama uchun", "Tarmoq resurslari uchun", "Soliq uchun"],
        correct: 1,
        explain: "Miner/validatorlar ish haqi oladi.",
      },
    ],
    bitReward: 25,
    xpReward: 20,
    courseKey: "ethereum_basics",
  },
  trading_center: {
    buildingId: "trading_center",
    title: "Do'kon — Trading",
    emoji: "🏪",
    description: "Kripto savdo asoslari va xavfsizlik.",
    introTips: [
      "Spot — hozirgi narxda sotib olish",
      "Limit order — belgilangan narxda",
      "2FA — hisobni himoya qilish",
    ],
    questions: [
      {
        q: "Limit buyurtma nima?",
        options: [
          "Darhol bozor narxida",
          "Faqat belgilangan narxda",
          "Bepul token olish",
        ],
        correct: 1,
        explain: "Narx yetganda avtomatik bajariladi.",
      },
      {
        q: "P2P savdoda nima muhim?",
        options: ["Tez internet", "Ishonchli escrow va KYC", "Ko'p follower"],
        correct: 1,
        explain: "Firibgarlikdan himoyalanish kerak.",
      },
    ],
    bitReward: 20,
    xpReward: 15,
    courseKey: "trading_basics",
  },
  defi_pool: {
    buildingId: "defi_pool",
    title: "Uy — DeFi Asoslari",
    emoji: "🏠",
    description: "Likvidlik hovuzi va yield farming.",
    introTips: [
      "DeFi — markazsiz moliya",
      "Likvidlik — savdo uchun token zaxirasi",
      "APY — yillik daromad foizi",
    ],
    questions: [
      {
        q: "Likvidlik hovuzi nima?",
        options: [
          "Suv hovuzi",
          "Savdo uchun tokenlar zaxirasi",
          "Bank omonati",
        ],
        correct: 1,
        explain: "Foydalanuvchilar token qo'shib yield oladi.",
      },
      {
        q: "Impermanent Loss nima?",
        options: [
          "Doimiy yo'qotish",
          "Narx o'zgarishidan keladigan vaqtinchalik farq",
          "Komissiya",
        ],
        correct: 1,
        explain: "Token narxlari farq qilganda yuzaga keladi.",
      },
    ],
    bitReward: 20,
    xpReward: 15,
    courseKey: "defi_basics",
  },
  marketplace: {
    buildingId: "marketplace",
    title: "Bitcoin Shop",
    emoji: "🛒",
    description: "Kripto bozor va xavfsiz xarid qoidalari.",
    introTips: [
      "Faqat rasmiy saytlardan xarid qiling",
      "Phishing havolalardan ehtiyot bo'ling",
      "Hamyon manzilini ikki marta tekshiring",
    ],
    questions: [
      {
        q: "Phishing nima?",
        options: [
          "Baliq ovlash",
          "Soxta sayt orqali ma'lumot o'g'irlash",
          "Mining usuli",
        ],
        correct: 1,
        explain: "Firibgarlar haqiqiy sayt ko'rinishini yaratadi.",
      },
    ],
    bitReward: 15,
    xpReward: 10,
  },
  guild_hall: {
    buildingId: "guild_hall",
    title: "Ofis — Guild Tizimi",
    emoji: "⚔️",
    description: "Jamoa bilan o'rganish va vazifalar.",
    introTips: [
      "Guild — birgalikda o'rganish guruhi",
      "Haftalik vazifalar — qo'shimcha Bit",
      "Reyting — faol a'zolar uchun",
    ],
    questions: [
      {
        q: "Guildning asosiy foydasi?",
        options: ["Bepul BTC", "Jamoa bilan o'rganish", "Reklama ko'rish"],
        correct: 1,
        explain: "Birgalikda vazifalar osonroq bajariladi.",
      },
    ],
    bitReward: 15,
    xpReward: 10,
  },
  secret_library: {
    buildingId: "secret_library",
    title: "Bank 2 — Master Daraja",
    emoji: "📚",
    description: "Ilg'or kripto bilimlari.",
    introTips: [
      "Cold wallet — offline saqlash",
      "Multi-sig — ko'p imzo himoyasi",
      "DYOR — o'zingiz tadqiq qiling",
    ],
    questions: [
      {
        q: "Cold wallet afzalligi?",
        options: [
          "Tezroq tranzaksiya",
          "Internetdan uzilgan — xavfsizroq",
          "Bepul token",
        ],
        correct: 1,
        explain: "Hackerlar onlayn kira olmaydi.",
      },
    ],
    bitReward: 30,
    xpReward: 25,
  },
};

export function getLessonForBuilding(id: BuildingId): InteriorLesson | null {
  return INTERIOR_LESSONS[id] ?? null;
}
