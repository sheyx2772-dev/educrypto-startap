"use client";

import dynamic from "next/dynamic";

const ScamDetector = dynamic(
  () => import("@/components/scam-detector/ScamDetector").then((m) => m.ScamDetector),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-b-2xl p-10 text-center min-h-[400px] flex flex-col items-center justify-center bg-[#0a0c10]">
        <div className="w-14 h-14 rounded-2xl bg-[#E24B4A]/20 border border-[#E24B4A]/40 mx-auto mb-3 animate-pulse flex items-center justify-center text-2xl">
          🛡️
        </div>
        <p className="text-sm text-gray-500 font-bold animate-pulse">Scam Dedektivi yuklanmoqda...</p>
      </div>
    ),
  }
);

interface Props {
  title: string;
  onComplete: () => void;
  allowReplay?: boolean;
}

export function MythLab({ title, onComplete, allowReplay }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-[#E24B4A]/25 shadow-2xl shadow-red-900/20">
      <div className="relative bg-gradient-to-r from-[#1a0a0a] via-[#2d1010] to-[#1a1028] px-4 py-3 overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_70%_50%,rgba(226,75,74,0.35),transparent_55%)]" />
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#E24B4A]/20 border border-[#E24B4A]/40 flex items-center justify-center text-lg">
            🛡️
          </div>
          <div>
            <p className="text-[10px] text-[#F4B942] font-extrabold uppercase tracking-widest">
              Scam Dedektivi
            </p>
            <h3 className="text-sm font-extrabold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <ScamDetector onComplete={onComplete} allowReplay={allowReplay} />
    </div>
  );
}
