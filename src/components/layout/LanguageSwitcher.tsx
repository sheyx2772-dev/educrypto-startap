"use client";

import { LOCALES, LOCALE_FLAGS, LOCALE_LABELS, type Locale } from "@/i18n/config";
import { useTranslation } from "@/i18n/provider";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useTranslation();

  return (
    <label className={`flex items-center gap-1.5 ${compact ? "" : "shrink-0"}`}>
      {!compact && (
        <span className="text-[9px] font-bold text-gray-400 uppercase hidden sm:inline">
          {t("common.language")}
        </span>
      )}
      <select
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
        className="text-[10px] font-extrabold text-secondary bg-white border-2 border-duo-yellow/40 rounded-lg px-2 py-1.5 focus:outline-none focus:border-duo-yellow cursor-pointer max-w-[110px]"
        aria-label={t("common.language")}
      >
        {LOCALES.map((code) => (
          <option key={code} value={code}>
            {LOCALE_FLAGS[code]} {LOCALE_LABELS[code]}
          </option>
        ))}
      </select>
    </label>
  );
}
