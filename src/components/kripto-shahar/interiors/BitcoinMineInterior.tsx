"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { useKriptoShaharStore } from "@/lib/kripto-shahar/game-store";
import { addXp } from "@/lib/kripto-shahar/storage";

const GPU_QUESTION = {
  q: "Mining da GPU nima uchun ishlatiladi?",
  options: [
    "Hash hisoblashni tezlashtirish uchun",
    "Internet tezligini oshirish uchun",
    "Hamyon parolini saqlash uchun",
  ],
  correct: 0,
};

export function BitcoinMineInterior() {
  const { addBits, spendBits, player } = useKriptoShaharStore();
  const [hashes, setHashes] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [blockFlash, setBlockFlash] = useState(false);
  const [hashDisplay, setHashDisplay] = useState("0000...0000");
  const [gpuUnlocked, setGpuUnlocked] = useState(false);
  const [showGpuQuiz, setShowGpuQuiz] = useState(false);
  const [mineRate, setMineRate] = useState(1);

  useEffect(() => {
    const iv = setInterval(() => {
      const rnd = Math.random().toString(16).slice(2, 10).toUpperCase();
      setHashDisplay(`0000...${rnd}`);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  const mine = useCallback(() => {
    const rate = gpuUnlocked ? mineRate * 2 : mineRate;
    setHashes((h) => {
      const next = h + rate;
      if (next >= 100) {
        setBlocks((b) => b + 1);
        addBits(50);
        addXp(25);
        setBlockFlash(true);
        setTimeout(() => setBlockFlash(false), 2000);
        return next - 100;
      }
      return next;
    });
  }, [gpuUnlocked, mineRate, addBits]);

  const buyGpu = () => {
    if (gpuUnlocked) return;
    if (player.bits < 200) {
      setShowGpuQuiz(true);
      return;
    }
    if (spendBits(200)) {
      setGpuUnlocked(true);
      setMineRate(2);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 h-full">
      <div className="sm:col-span-3 ks-mine-rack rounded-xl p-4 flex flex-col">
        <p className="text-[10px] text-[#00ff88] font-extrabold uppercase tracking-widest mb-2">
          Server Rack — Bitcoin Minasi
        </p>
        <div className="flex-1 grid grid-cols-3 gap-2 mb-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="bg-black/40 border border-[#00ff88]/30 rounded-lg flex items-center justify-center text-2xl"
            >
              🖥️
            </motion.div>
          ))}
        </div>
        <div className="ks-hash-display rounded px-2 py-1.5 mb-3 truncate">
          Hash: {hashDisplay}
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={mine}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00b377] text-[#042a1f] font-extrabold text-sm uppercase tracking-wide"
        >
          ⛏️ Mine (+{gpuUnlocked ? 2 : 1} hash)
        </motion.button>
      </div>

      <div className="sm:col-span-2 space-y-3">
        <div className="ks-panel rounded-xl p-3">
          <p className="text-[10px] text-gray-500 uppercase mb-2">Statistika</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Hashlar</span>
              <span className="font-bold text-[#00ff88]">{hashes}/100</span>
            </div>
            <div className="h-2 bg-black/40 rounded-full overflow-hidden">
              <div className="h-full bg-[#00ff88] transition-all" style={{ width: `${hashes}%` }} />
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-gray-400">Bloklar</span>
              <span className="font-bold text-[#f4b942]">{blocks}</span>
            </div>
          </div>
        </div>

        <div className="ks-panel rounded-xl p-3">
          <p className="text-[10px] text-gray-500 uppercase mb-2">GPU Yangilash</p>
          <p className="text-[11px] text-gray-400 mb-2">
            {gpuUnlocked ? "✓ GPU faol — 2x tezlik" : "200 Bit — 2x hash tezligi"}
          </p>
          {!gpuUnlocked && (
            <button
              type="button"
              onClick={buyGpu}
              className="gplay-btn gplay-btn-sm w-full max-w-full py-2 text-[11px]"
            >
              GPU Sotib olish
            </button>
          )}
        </div>

        <div className="ks-panel rounded-xl p-3 text-[10px] text-gray-400 leading-relaxed">
          <p className="text-[#f4b942] font-bold mb-1">O&apos;rganish</p>
          Mining — tranzaksiyalarni tasdiqlash. Har 100 hash = 1 blok = 50 Bit mukofot.
        </div>
      </div>

      {showGpuQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
          <div className="ks-panel rounded-2xl p-4 max-w-sm w-full">
            <p className="text-sm font-bold text-white mb-3">{GPU_QUESTION.q}</p>
            {GPU_QUESTION.options.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  if (i === GPU_QUESTION.correct) {
                    setGpuUnlocked(true);
                    setMineRate(2);
                  }
                  setShowGpuQuiz(false);
                }}
                className="block w-full text-left text-[11px] py-2 px-3 rounded-lg mb-1 bg-white/5 hover:bg-[#f4b942]/20 border border-white/10"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {blockFlash && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed top-1/3 left-1/2 -translate-x-1/2 ks-panel px-6 py-4 rounded-2xl border-[#f4b942] z-40"
        >
          <p className="ks-pixel-title text-center">BLOK TOPILDI!</p>
          <p className="text-center text-[#f4b942] font-bold mt-2">+50 Bit</p>
        </motion.div>
      )}
    </div>
  );
}
