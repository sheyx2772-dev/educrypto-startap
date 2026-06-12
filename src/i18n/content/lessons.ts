import type { Locale } from "../config";
import { lessons as uzLessons, type Lesson } from "@/lib/lessons";

export interface LessonText {
  title: string;
  description: string;
  category?: string;
  duration?: string;
}

type LessonTextMap = Record<string, LessonText>;

/** Category labels per locale */
const categories: Record<Locale, Record<string, string>> = {
  uz: {
    Qonuniyat: "Qonuniyat", Binance: "Binance", Bitcoin: "Bitcoin", Treyding: "Treyding",
    Asoslar: "Asoslar", Amaliyot: "Amaliyot", Tahlil: "Tahlil", Psixologiya: "Psixologiya",
    Strategiya: "Strategiya", Professional: "Professional", Futures: "Futures",
    Web3: "Web3", Ethereum: "Ethereum", Yangiliklar: "Yangiliklar", Stablecoin: "Stablecoin", DeFi: "DeFi",
  },
  ru: {
    Qonuniyat: "Законодательство", Binance: "Binance", Bitcoin: "Bitcoin", Treyding: "Трейдинг",
    Asoslar: "Основы", Amaliyot: "Практика", Tahlil: "Анализ", Psixologiya: "Психология",
    Strategiya: "Стратегия", Professional: "Профессиональный", Futures: "Фьючерсы",
    Web3: "Web3", Ethereum: "Ethereum", Yangiliklar: "Новости", Stablecoin: "Stablecoin", DeFi: "DeFi",
  },
  en: {
    Qonuniyat: "Regulation", Binance: "Binance", Bitcoin: "Bitcoin", Treyding: "Trading",
    Asoslar: "Basics", Amaliyot: "Practice", Tahlil: "Analysis", Psixologiya: "Psychology",
    Strategiya: "Strategy", Professional: "Professional", Futures: "Futures",
    Web3: "Web3", Ethereum: "Ethereum", Yangiliklar: "News", Stablecoin: "Stablecoin", DeFi: "DeFi",
  },
  kk: {
    Qonuniyat: "Заңнама", Binance: "Binance", Bitcoin: "Bitcoin", Treyding: "Трейдинг",
    Asoslar: "Негіздер", Amaliyot: "Практика", Tahlil: "Талдау", Psixologiya: "Психология",
    Strategiya: "Стратегия", Professional: "Кәсіби", Futures: "Фьючерстер",
    Web3: "Web3", Ethereum: "Ethereum", Yangiliklar: "Жаңалықтар", Stablecoin: "Stablecoin", DeFi: "DeFi",
  },
  ky: {
    Qonuniyat: "Мыйзам", Binance: "Binance", Bitcoin: "Bitcoin", Treyding: "Трейдинг",
    Asoslar: "Негиздер", Amaliyot: "Практика", Tahlil: "Талдоо", Psixologiya: "Психология",
    Strategiya: "Стратегия", Professional: "Кесиптик", Futures: "Фьючерстер",
    Web3: "Web3", Ethereum: "Ethereum", Yangiliklar: "Жаңылыктар", Stablecoin: "Stablecoin", DeFi: "DeFi",
  },
  tg: {
    Qonuniyat: "Қонунгузорӣ", Binance: "Binance", Bitcoin: "Bitcoin", Treyding: "Трейдинг",
    Asoslar: "Асосҳо", Amaliyot: "Амалиёт", Tahlil: "Таҳлил", Psixologiya: "Психология",
    Strategiya: "Стратегия", Professional: "Касбӣ", Futures: "Фьючерсҳо",
    Web3: "Web3", Ethereum: "Ethereum", Yangiliklar: "Хабарҳо", Stablecoin: "Stablecoin", DeFi: "DeFi",
  },
};

const durationLabels: Record<Locale, { min: string; short: string }> = {
  uz: { min: "daqiqa", short: "Short" },
  ru: { min: "мин", short: "Short" },
  en: { min: "min", short: "Short" },
  kk: { min: "мин", short: "Short" },
  ky: { min: "мүн", short: "Short" },
  tg: { min: "дақ", short: "Short" },
};

function localizeDuration(d: string, locale: Locale): string {
  if (d === "Short") return durationLabels[locale].short;
  return d.replace(/daqiqa/g, durationLabels[locale].min);
}

/** Lesson title + description translations (generated from uz baseline). */
import { lessonTextsRu } from "./lessons/ru";
import { lessonTextsEn } from "./lessons/en";
import { lessonTextsKk } from "./lessons/kk";
import { lessonTextsKy } from "./lessons/ky";
import { lessonTextsTg } from "./lessons/tg";

const lessonTextByLocale: Record<Locale, LessonTextMap | null> = {
  uz: null,
  ru: lessonTextsRu,
  en: lessonTextsEn,
  kk: lessonTextsKk,
  ky: lessonTextsKy,
  tg: lessonTextsTg,
};

export function getLocalizedLesson(lesson: Lesson, locale: Locale): Lesson {
  if (locale === "uz") return lesson;
  const map = lessonTextByLocale[locale];
  const text = map?.[lesson.id];
  const cat = categories[locale][lesson.category] ?? lesson.category;
  if (!text) {
    return { ...lesson, category: cat, duration: localizeDuration(lesson.duration, locale) };
  }
  return {
    ...lesson,
    title: text.title,
    description: text.description,
    category: text.category ?? cat,
    duration: text.duration ? localizeDuration(text.duration, locale) : localizeDuration(lesson.duration, locale),
  };
}

export function getLocalizedLessons(locale: Locale): Lesson[] {
  return uzLessons.map((l) => getLocalizedLesson(l, locale));
}
