"use client";

import Link from "next/link";
import { useProgress } from "@/context/ProgressContext";
import { STARTER_COINS, STARTER_PRICE_SUM } from "@/lib/progress";
import { PaymentIcon, InviteIcon, ClickPayIcon } from "@/components/icons/FeatureIcons";
import { CoinIcon } from "@/components/icons/NavIcons";

export function StarterGate() {
  const { payToStart, inviteToStart, shareInvite, progress } = useProgress();

  const inviteLink = typeof window !== "undefined"
    ? `${window.location.origin}/onboarding?ref=${progress.inviteCode}`
    : `/onboarding?ref=${progress.inviteCode}`;

  const handleCopy = async () => {
    shareInvite();
    await navigator.clipboard.writeText(inviteLink);
  };

  return (
    <div className="px-4 py-8">
      <div className="card-neon p-6 max-w-sm mx-auto text-center">
        <div className="w-16 h-16 rounded-2xl bg-duo-yellow/15 flex items-center justify-center mx-auto mb-4 neon-badge">
          <PaymentIcon size={44} />
        </div>
        <h2 className="font-extrabold text-secondary text-xl mb-2">Darslikni boshlash</h2>
        <p className="text-sm text-gray-500 mb-4">
          {STARTER_COINS} USDT ({STARTER_PRICE_SUM.toLocaleString()} so&apos;m) to&apos;lang yoki do&apos;stingizni taklif qiling
        </p>

        <div className="coin-badge-neon flex items-center justify-center gap-2 py-2 rounded-xl mb-4">
          <CoinIcon size={20} />
          <span className="font-extrabold text-secondary">{STARTER_COINS} USDT</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button onClick={() => payToStart("click")} className="card-neon p-3 flex flex-col items-center gap-1 hover:scale-[1.02] transition-transform">
            <ClickPayIcon brand="click" size={32} />
            <span className="text-[10px] font-extrabold">Click</span>
          </button>
          <button onClick={() => payToStart("payme")} className="card-neon p-3 flex flex-col items-center gap-1 hover:scale-[1.02] transition-transform">
            <ClickPayIcon brand="payme" size={32} />
            <span className="text-[10px] font-extrabold">Payme</span>
          </button>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <InviteIcon size={28} />
            <span className="text-xs font-bold text-accent">Do&apos;stni taklif qilish = +{STARTER_COINS} USDT</span>
          </div>
          <button onClick={handleCopy} className="btn-3d-accent w-full !text-xs !py-2 mb-2">
            Havolani nusxalash
          </button>
          <button onClick={inviteToStart} className="text-xs font-bold text-gray-500 hover:text-secondary">
            Do&apos;st qo&apos;shildi →
          </button>
        </div>

        <Link href="/onboarding" className="block mt-4 text-xs text-gray-400 hover:text-secondary">
          To&apos;liq ro&apos;yxatdan o&apos;tish →
        </Link>
      </div>
    </div>
  );
}
