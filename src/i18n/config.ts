export const LOCALES = ["uz", "ru", "en", "kk", "ky", "tg"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "uz";
export const LOCALE_STORAGE_KEY = "educrypto_locale";

export const LOCALE_LABELS: Record<Locale, string> = {
  uz: "O'zbek",
  ru: "Русский",
  en: "English",
  kk: "Қазақ",
  ky: "Кыргызча",
  tg: "Тоҷикӣ",
};

export const LOCALE_FLAGS: Record<Locale, string> = {
  uz: "🇺🇿",
  ru: "🇷🇺",
  en: "🇬🇧",
  kk: "🇰🇿",
  ky: "🇰🇬",
  tg: "🇹🇯",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function localeToBcp47(locale: Locale): string {
  const map: Record<Locale, string> = {
    uz: "uz-UZ",
    ru: "ru-RU",
    en: "en-US",
    kk: "kk-KZ",
    ky: "ky-KG",
    tg: "tg-TJ",
  };
  return map[locale];
}
