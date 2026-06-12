"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useProgress } from "@/context/ProgressContext";
import { useTranslation } from "@/i18n/provider";
import { NavHomeIcon, NavLessonsIcon, NavShopIcon, NavProfileIcon, CoinIcon } from "@/components/icons/NavIcons";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progress } = useProgress();
  const { t } = useTranslation();
  const hideNav = pathname === "/onboarding" || pathname.startsWith("/games/");

  const navItems = [
    { href: "/dashboard", label: t("nav.home"), Icon: NavHomeIcon },
    { href: "/lessons", label: t("nav.lessons"), Icon: NavLessonsIcon },
    { href: "/marketplace", label: t("nav.shop"), Icon: NavShopIcon },
    { href: "/profile", label: t("nav.profile"), Icon: NavProfileIcon },
  ];

  const pageTitles: Record<string, string> = {
    "/dashboard": t("pages.dashboard"),
    "/lessons": t("pages.lessons"),
    "/marketplace": t("pages.marketplace"),
    "/profile": t("pages.profile"),
    "/onboarding": t("pages.onboarding"),
  };
  const headerTitle =
    pageTitles[pathname] ??
    (pathname.startsWith("/games/kripto-shahar") ? t("pages.kriptoShahar") :
     pathname.startsWith("/path") ? t("pages.path") :
     pathname.startsWith("/lessons") ? t("pages.lesson") : t("common.appName"));

  const isFullScreenGame = pathname.startsWith("/games/");

  return (
    <div className={`app-shell bg-app-bg flex flex-col shadow-2xl ${isFullScreenGame ? "app-shell--fullscreen" : ""}`}>
      {!isFullScreenGame && (
        <header className="app-header-bar app-header-safe px-4 pb-3 flex items-center justify-between sticky top-0 z-30 shrink-0 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Image src="/assets/mascot/icon.png" alt="EduCrypto" width={36} height={36} className="rounded-xl neon-avatar shrink-0" unoptimized />
            <span className="font-extrabold text-secondary text-sm truncate">{headerTitle}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher compact />
            {!hideNav && (
              <div className="coin-badge-neon flex items-center gap-1.5 px-3 py-1.5 rounded-full font-extrabold text-sm">
                <CoinIcon size={18} />
                <span className="text-secondary">{progress.coins}</span>
              </div>
            )}
          </div>
        </header>
      )}

      <main className={`flex-1 min-h-0 overflow-x-hidden overflow-y-auto ${hideNav || isFullScreenGame ? "" : "app-main-with-nav"}`}>
        {children}
      </main>

      {!hideNav && (
        <nav className="app-bottom-nav" aria-label={t("nav.mainNav")}>
          <div className="app-bottom-nav-inner">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`app-nav-link ${isActive ? "bg-white/90 scale-105 shadow-md neon-nav-active" : "hover:bg-white/40"}`}
                >
                  <item.Icon active={isActive} size={24} />
                  <span className={isActive ? "text-secondary" : "text-secondary/60"}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
