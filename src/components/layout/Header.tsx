"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/i18n/provider";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-lg border-b-2 border-duo-yellow/30 shadow-sm">
      <nav className="flex justify-between items-center py-3 px-6 md:px-10 max-w-7xl mx-auto gap-3">
        <Link href="/" className="flex items-center gap-3 group min-w-0">
          <Image
            src="/assets/mascot/icon.png"
            alt="EduCrypto"
            width={44}
            height={44}
            className="rounded-2xl shadow-md group-hover:scale-105 transition-transform shrink-0"
            unoptimized
          />
          <span className="text-xl md:text-2xl font-extrabold text-secondary truncate">{t("common.appName")}</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-secondary/70">
          <Link href="#features" className="hover:text-secondary transition-colors">
            {t("nav.features")}
          </Link>
          <Link href="#onboarding" className="hover:text-secondary transition-colors">
            {t("nav.howItWorks")}
          </Link>
          <Link href="#mascot" className="hover:text-secondary transition-colors">
            {t("nav.mascot")}
          </Link>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <LanguageSwitcher compact />
          <Button href="/onboarding" variant="3d-primary" className="!py-2.5 !px-6 !text-sm">
            {t("nav.login")}
          </Button>
        </div>
      </nav>
    </header>
  );
}
