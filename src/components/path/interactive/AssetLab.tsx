"use client";

import { useState } from "react";

interface Props {
  title: string;
  onComplete: () => void;
}

const PROJECTS = [
  { name: "Bitcoin", symbol: "BTC", type: "coin", chain: "Bitcoin", legit: true, site: "bitcoin.org", warn: "" },
  { name: "Ethereum", symbol: "ETH", type: "coin", chain: "Ethereum", legit: true, site: "ethereum.org", warn: "" },
  { name: "USDT", symbol: "USDT", type: "token", chain: "Ethereum", legit: true, site: "tether.to", warn: "" },
  { name: "Shitcoin XYZ", symbol: "SHIT", type: "token", chain: "BSC", legit: false, site: "telegram-scam.io", warn: "⚠️ Whitepaper yo'q, jamoa yashirin" },
  { name: "SafeMoon Clone", symbol: "SAFE", type: "token", chain: "BSC", legit: false, site: "random-ico.com", warn: "⚠️ Rug pull xavfi yuqori" },
  { name: "Uniswap", symbol: "UNI", type: "token", chain: "Ethereum", legit: true, site: "uniswap.org", warn: "" },
];

type Phase = "explore" | "classify" | "decide";

export function AssetLab({ title, onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>("explore");
  const [viewed, setViewed] = useState<Set<string>>(new Set());
  const [classify, setClassify] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const viewProject = (name: string) => {
    const next = new Set(viewed);
    next.add(name);
    setViewed(next);
    if (next.size >= PROJECTS.length) setPhase("classify");
  };

  const setType = (name: string, type: string) => {
    const proj = PROJECTS.find((p) => p.name === name);
    if (!proj || proj.type !== type) return;
    setClassify({ ...classify, [name]: type });
    if (Object.keys({ ...classify, [name]: type }).length >= 6) setPhase("decide");
  };

  const toggleInvest = (name: string, legit: boolean) => {
    const proj = PROJECTS.find((p) => p.name === name);
    if (!proj) return;
    if (!legit && proj.legit) return;
    if (legit && !proj.legit) return;
    const next = new Set(selected);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    setSelected(next);
    const legitOnes = PROJECTS.filter((p) => p.legit).map((p) => p.name);
    if (legitOnes.every((n) => next.has(n)) && PROJECTS.filter((p) => !p.legit).every((p) => !next.has(p.name))) {
      onComplete();
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-xl bg-white">
      <div className="bg-gradient-to-r from-violet-700 to-indigo-800 px-4 py-3 text-white">
        <p className="text-[10px] opacity-70 uppercase font-bold">Yangi aktivlar — Tadqiq markazi</p>
        <h3 className="text-sm font-extrabold">{title}</h3>
        <div className="flex gap-2 mt-2 text-[9px]">
          {(["explore", "classify", "decide"] as Phase[]).map((p) => (
            <span key={p} className={`px-2 py-0.5 rounded-full ${phase === p ? "bg-duo-yellow text-secondary" : "bg-white/20"}`}>
              {p === "explore" ? "1. O'rganish" : p === "classify" ? "2. Tasnif" : "3. Tanlov"}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 max-h-[420px] overflow-y-auto">
        {phase === "explore" && (
          <>
            <p className="text-xs text-gray-500 mb-3">Har bir loyihani oching — sayt, ogohlantirish, turi:</p>
            <div className="space-y-2">
              {PROJECTS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => viewProject(p.name)}
                  className={`w-full text-left p-3 rounded-xl border-2 transition-all ${viewed.has(p.name) ? "border-accent bg-accent/5" : "border-gray-100 hover:border-violet-300"}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-secondary text-xs">{p.name}</span>
                      <span className="text-[10px] text-gray-400 ml-2">{p.symbol}</span>
                      <p className="text-[10px] text-blue-500">{p.site}</p>
                      {p.warn && <p className="text-[10px] text-red-500">{p.warn}</p>}
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${p.legit ? "bg-accent/20 text-accent" : "bg-red-100 text-red-600"}`}>
                      {p.legit ? "Ishonchli" : "Xavfli"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2">{viewed.size}/{PROJECTS.length} ko&apos;rildi</p>
          </>
        )}

        {phase === "classify" && (
          <>
            <p className="text-xs text-gray-500 mb-3">Coin (o&apos;z blokcheyni) yoki Token (boshqa tarmoqda)?</p>
            {PROJECTS.map((p) => (
              <div key={p.name} className="flex items-center justify-between p-2 mb-2 bg-gray-50 rounded-xl">
                <span className="text-xs font-bold">{p.symbol}</span>
                <div className="flex gap-1">
                  {["coin", "token"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setType(p.name, t)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-bold ${classify[p.name] === t ? "bg-violet-600 text-white" : "bg-white border"}`}
                    >
                      {t === "coin" ? "Coin" : "Token"}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {phase === "decide" && (
          <>
            <p className="text-xs text-gray-500 mb-3">Faqat ISHONCHLI loyihalarni tanlang (DYOR):</p>
            {PROJECTS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => toggleInvest(p.name, p.legit)}
                className={`w-full text-left p-3 mb-2 rounded-xl border-2 text-xs font-bold ${selected.has(p.name) ? "border-accent bg-accent/10" : "border-gray-100"}`}
              >
                {selected.has(p.name) ? "✓ " : ""}{p.name} ({p.symbol})
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
