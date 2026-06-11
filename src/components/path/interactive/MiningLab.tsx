"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  title: string;
  onComplete: () => void;
  allowReplay?: boolean;
}

export function MiningLab({ title, onComplete, allowReplay = false }: Props) {
  const [rewarded, setRewarded] = useState(allowReplay);
  const [running, setRunning] = useState(false);
  const [hashrate, setHashrate] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [progress, setProgress] = useState(0);
  const [temp, setTemp] = useState(42);
  const [foundBlock, setFoundBlock] = useState(false);
  const [verified, setVerified] = useState(0);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running && !foundBlock) {
      interval.current = setInterval(() => {
        setHashrate(() => 85 + Math.floor(Math.random() * 15));
        setTemp((t) => Math.min(78, t + Math.random() * 2));
        setProgress((p) => {
          const next = p + 4 + Math.random() * 6;
          if (next >= 100) {
            setFoundBlock(true);
            setRunning(false);
            return 100;
          }
          return next;
        });
      }, 400);
    }
    return () => { if (interval.current) clearInterval(interval.current); };
  }, [running, foundBlock]);

  const startMine = () => {
    if (blocks >= 3) return;
    setFoundBlock(false);
    setProgress(0);
    setRunning(true);
    setHashrate(0);
  };

  const verifyBlock = () => {
    const next = verified + 1;
    setVerified(next);
    setBlocks((b) => b + 1);
    setFoundBlock(false);
    setProgress(0);
    setTemp(42 + next * 3);
    if (next >= 3) {
      if (!rewarded) {
        setRewarded(true);
        onComplete();
      }
    }
  };

  const resetMining = () => {
    setRunning(false);
    setHashrate(0);
    setBlocks(0);
    setProgress(0);
    setTemp(42);
    setFoundBlock(false);
    setVerified(0);
  };

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-[#1a1a2e] shadow-xl">
      <div className="bg-[#0f0f1a] px-4 py-3 border-b border-[#2a2a4a] flex justify-between items-center">
        <div>
          <p className="text-[10px] text-[#6b7280] uppercase tracking-wider">Mining Rig v2.4</p>
          <h3 className="text-sm font-bold text-[#e2e8f0]">{title}</h3>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((g) => (
            <div key={g} className={`w-2 h-2 rounded-full ${running ? "bg-green-400 animate-pulse" : "bg-[#374151]"}`} />
          ))}
        </div>
      </div>

      <div className="bg-[#16162a] p-4">
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-[#1e1e36] rounded-xl p-3 border border-[#2d2d50]">
            <p className="text-[9px] text-[#6b7280]">Hashrate</p>
            <p className="text-lg font-mono font-bold text-green-400">{hashrate || "—"} <span className="text-[10px]">TH/s</span></p>
          </div>
          <div className="bg-[#1e1e36] rounded-xl p-3 border border-[#2d2d50]">
            <p className="text-[9px] text-[#6b7280]">Harorat</p>
            <p className={`text-lg font-mono font-bold ${temp > 70 ? "text-red-400" : "text-amber-400"}`}>{temp.toFixed(0)}°C</p>
          </div>
          <div className="bg-[#1e1e36] rounded-xl p-3 border border-[#2d2d50]">
            <p className="text-[9px] text-[#6b7280]">Bloklar</p>
            <p className="text-lg font-mono font-bold text-duo-yellow">{blocks}/3</p>
          </div>
        </div>

        <div className="bg-[#0a0a14] rounded-xl p-4 mb-4 font-mono text-[11px] border border-[#2d2d50]">
          <p className="text-[#6b7280] mb-1">$ mining --network=bitcoin --pool=educrypto</p>
          <p className="text-green-400/80">SHA-256: {running ? "calculating..." : foundBlock ? "BLOCK FOUND ✓" : "idle"}</p>
          <div className="mt-3 h-2 bg-[#1e1e36] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-600 to-green-400 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[#6b7280] mt-1">{progress.toFixed(0)}% nonce search</p>
        </div>

        <div className="flex gap-4 justify-center mb-4">
          {[0, 1, 2].map((gpu) => (
            <div key={gpu} className={`w-16 h-20 rounded-lg border-2 flex flex-col items-center justify-center ${running ? "border-green-500/50 bg-green-900/20" : "border-[#374151] bg-[#1e1e36]"}`}>
              <span className="text-2xl">🖥️</span>
              <span className="text-[8px] text-[#6b7280] mt-1">GPU {gpu + 1}</span>
              {running && <span className="text-[8px] text-green-400 animate-pulse">ACTIVE</span>}
            </div>
          ))}
        </div>

        {!foundBlock && blocks < 3 && (
          <button onClick={startMine} disabled={running} className="gplay-btn gplay-btn-sm w-full max-w-full">
            {running ? "⛏ Mayning davom etmoqda..." : "⛏ Mayningni boshlash"}
          </button>
        )}

        {foundBlock && verified < 3 && (
          <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-4 text-center">
            <p className="text-green-400 font-bold text-sm mb-2">🎉 Blok topildi! Hash: 0x{Math.random().toString(16).slice(2, 10)}...</p>
            <button onClick={verifyBlock} className="w-full py-3 rounded-xl font-bold text-sm bg-green-500 text-white">
              Blokni tasdiqlash va tarmoqqa yuborish
            </button>
          </div>
        )}

        {verified >= 3 && (
          <div className="text-center">
            <p className="text-accent font-bold">✓ 3 ta blok mayning qilindi!</p>
            {rewarded && (
              <button type="button" onClick={resetMining} className="gplay-btn gplay-btn-sm mt-3 w-full max-w-full">
                Qayta o&apos;ynash →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
