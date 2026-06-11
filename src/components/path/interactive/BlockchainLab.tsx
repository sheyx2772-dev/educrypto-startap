"use client";

import dynamic from "next/dynamic";

const BlockchainGame = dynamic(
  () => import("@/components/blockchain-zanjiri/BlockchainGame").then((m) => m.BlockchainGame),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-b-2xl overflow-hidden bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a] p-10 text-center">
        <div className="w-12 h-12 rounded-2xl bg-duo-yellow/20 border border-duo-yellow/30 mx-auto mb-3 animate-pulse flex items-center justify-center">
          <span className="text-xl">⛓️</span>
        </div>
        <p className="text-sm text-gray-400 font-bold animate-pulse">Blokchain Zanjiri yuklanmoqda...</p>
      </div>
    ),
  }
);

interface Props {
  title: string;
  onComplete: () => void;
  allowReplay?: boolean;
}

export function BlockchainLab({ title, onComplete, allowReplay }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border-2 border-indigo-500/20 shadow-2xl shadow-indigo-500/10">
      <div className="relative bg-gradient-to-r from-indigo-700 via-violet-700 to-purple-800 px-4 py-3.5 overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_50%,rgba(255,200,0,0.3),transparent_60%)]" />
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-lg backdrop-blur-sm">
            ⛓️
          </div>
          <div>
            <p className="text-[10px] text-duo-yellow font-extrabold uppercase tracking-widest">
              Blokchain Zanjiri — Demo
            </p>
            <h3 className="text-sm font-extrabold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <BlockchainGame onComplete={onComplete} allowReplay={allowReplay} />
    </div>
  );
}
