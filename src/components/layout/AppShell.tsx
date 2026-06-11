"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useProgress } from "@/context/ProgressContext";
import { NavHomeIcon, NavLessonsIcon, NavShopIcon, NavProfileIcon, CoinIcon } from "@/components/icons/NavIcons";

const navItems = [
  { href: "/dashboard", label: "Bosh", Icon: NavHomeIcon },
  { href: "/lessons", label: "Darslik", Icon: NavLessonsIcon },
  { href: "/marketplace", label: "Do'kon", Icon: NavShopIcon },
  { href: "/profile", label: "Profil", Icon: NavProfileIcon },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { progress } = useProgress();
  const hideNav = pathname === "/onboarding" || pathname.startsWith("/games/");

  const pageTitles: Record<string, string> = {
    "/dashboard": "Crypto ko'prik yo'li",
    "/lessons": "Video darsliklar",
    "/marketplace": "Do'kon",
    "/profile": "Profil",
    "/onboarding": "Ro'yxatdan o'tish",
  };
  const headerTitle =
    pageTitles[pathname] ??
    (pathname.startsWith("/games/kripto-shahar") ? "Kripto Shahar" :
     pathname.startsWith("/path") ? "Ko'prik yo'li" :
     pathname.startsWith("/lessons") ? "Video darslik" : "EduCrypto");

  const isFullScreenGame = pathname.startsWith("/games/");

  return (
    <div className={`app-shell bg-app-bg flex flex-col shadow-2xl ${isFullScreenGame ? "app-shell--fullscreen" : ""}`}>
      {!isFullScreenGame && (
        <header className="app-header-bar app-header-safe px-4 pb-3 flex items-center justify-between sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Image src="/assets/mascot/icon.png" alt="EduCrypto" width={36} height={36} className="rounded-xl neon-avatar shrink-0" unoptimized />
            <span className="font-extrabold text-secondary text-sm truncate">{headerTitle}</span>
          </div>
          {!hideNav && (
            <div className="coin-badge-neon flex items-center gap-1.5 px-3 py-1.5 rounded-full font-extrabold text-sm shrink-0">
              <CoinIcon size={18} />
              <span className="text-secondary">{progress.coins}</span>
            </div>
          )}
        </header>
      )}

      <main className={`flex-1 min-h-0 overflow-x-hidden overflow-y-auto ${hideNav || isFullScreenGame ? "" : "app-main-with-nav"}`}>
        {children}
      </main>

      {!hideNav && (
        <nav className="app-bottom-nav" aria-label="Asosiy navigatsiya">
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
