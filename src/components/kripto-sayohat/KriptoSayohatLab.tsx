"use client";

import dynamic from "next/dynamic";

const KriptoSayohatGame = dynamic(
  () => import("./KriptoSayohatGame").then((m) => m.KriptoSayohatGame),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-b-2xl bg-[#0a1628] p-10 text-center min-h-[400px] flex flex-col items-center justify-center">
        <p className="text-5xl mb-3 animate-bounce">🗺️</p>
        <p className="text-sm text-cyan-400 font-bold animate-pulse">Kripto-Sayohat yuklanmoqda...</p>
      </div>
    ),
  }
);

interface Props {
  title: string;
  onComplete: () => void;
  allowReplay?: boolean;
}

export function KriptoSayohatLab({ title, onComplete, allowReplay }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-cyan-500/30 shadow-2xl shadow-cyan-900/20">
      <div className="relative bg-gradient-to-r from-[#0c2d4a] via-[#0a3d5c] to-[#0c2d4a] px-4 py-3.5 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_30%,rgba(0,229,255,0.4),transparent_60%)]" />
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-lg">
            🗺️
          </div>
          <div>
            <p className="text-[10px] text-cyan-300 font-extrabold uppercase tracking-widest">
              Kripto-Sayohat — Global Edition
            </p>
            <h3 className="text-sm font-extrabold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <KriptoSayohatGame onComplete={onComplete} allowReplay={allowReplay} />
    </div>
  );
}
