"use client";

import dynamic from "next/dynamic";

const KriptoKoinotGame = dynamic(
  () => import("./KriptoKoinotGame").then((m) => m.KriptoKoinotGame),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-b-2xl bg-[#060a14] p-10 text-center min-h-[400px] flex flex-col items-center justify-center">
        <p className="text-5xl mb-3 animate-bounce">🪐</p>
        <p className="text-sm text-cyan-400 font-bold animate-pulse">Kripto-Koinot yuklanmoqda...</p>
      </div>
    ),
  }
);

interface Props {
  title: string;
  onComplete: () => void;
  allowReplay?: boolean;
}

export function KriptoKoinotLab({ title, onComplete, allowReplay }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl shadow-indigo-900/20">
      <div className="relative bg-gradient-to-r from-[#0c1030] via-[#12183f] to-[#0c1030] px-4 py-3.5 overflow-hidden">
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.5),transparent_60%)]" />
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-lg">
            🪐
          </div>
          <div>
            <p className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-widest">
              Kripto-Koinot — Physics Sandbox
            </p>
            <h3 className="text-sm font-extrabold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <KriptoKoinotGame onComplete={onComplete} allowReplay={allowReplay} />
    </div>
  );
}
