"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const KriptoShaharGame = dynamic(
  () => import("@/components/kripto-shahar/KriptoShaharGame").then((m) => m.KriptoShaharGame),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#06080d]">
        <div className="text-6xl mb-4 animate-bounce">🏙️</div>
        <p className="text-[#f4b942] font-extrabold text-sm animate-pulse">Kripto Shahar yuklanmoqda...</p>
      </div>
    ),
  }
);

export default function KriptoShaharPage() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-[#06080d]">
      <Link
        href="/dashboard"
        className="absolute top-2 left-2 z-50 text-[10px] font-bold text-gray-500 hover:text-[#f4b942] bg-black/60 px-2 py-1 rounded-lg border border-white/10"
      >
        ← Ko&apos;priq
      </Link>
      <KriptoShaharGame />
    </div>
  );
}
