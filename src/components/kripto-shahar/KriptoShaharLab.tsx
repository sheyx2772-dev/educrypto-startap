"use client";

import dynamic from "next/dynamic";

const KriptoShaharGame = dynamic(
  () => import("./KriptoShaharGame").then((m) => m.KriptoShaharGame),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-b-2xl p-10 text-center min-h-[480px] flex flex-col items-center justify-center bg-[#06080d]">
        <div className="text-5xl mb-3 animate-bounce">🏙️</div>
        <p className="ks-pixel-title text-[9px] mb-2">KRIPTO SHAHAR</p>
        <p className="text-sm text-gray-500 font-bold animate-pulse">Shahar yuklanmoqda...</p>
      </div>
    ),
  }
);

interface Props {
  title: string;
  onComplete: () => void;
  allowReplay?: boolean;
}

export function KriptoShaharLab({ title, onComplete, allowReplay }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-[#f4b942]/25 shadow-2xl shadow-amber-900/20">
      <div className="relative bg-gradient-to-r from-[#1a1408] via-[#2a2010] to-[#1a1028] px-4 py-3 overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_50%,rgba(244,185,66,0.35),transparent_55%)]" />
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#f4b942]/15 border border-[#f4b942]/40 flex items-center justify-center text-lg">
            🏙️
          </div>
          <div>
            <p className="text-[10px] text-[#00d68f] font-extrabold uppercase tracking-widest">
              Kripto Shahar — MMO
            </p>
            <h3 className="text-sm font-extrabold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <KriptoShaharGame onComplete={onComplete} allowReplay={allowReplay} embedded />
    </div>
  );
}
