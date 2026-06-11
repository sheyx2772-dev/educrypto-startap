"use client";

import { useState } from "react";

interface Props {
  title: string;
  onComplete: () => void;
}

const SCENARIOS = [
  {
    task: "Xalqaro pul o'tkazmasi — 500$ AQShga",
    options: [
      { label: "Bank SWIFT (3-5 kun, $25 komissiya)", correct: false },
      { label: "USDT stablecoin (15 daqiqa, $1)", correct: true },
      { label: "Noma'lum Telegram exchanger", correct: false },
    ],
  },
  {
    task: "Kundalik do'konda kichik to'lov",
    options: [
      { label: "Click / Payme (litsenziyali)", correct: true },
      { label: "Qora bozor USDT sotuvchi", correct: false },
      { label: "Naqd pul — har doim yomon", correct: false },
    ],
  },
  {
    task: "Onlayn xizmat uchun mikroto'lov",
    options: [
      { label: "Lightning Network (tez, arzon)", correct: true },
      { label: "Nomsiz sayt orqali karta", correct: false },
      { label: "P2P noma'lum shaxs", correct: false },
    ],
  },
  {
    task: "Biznes uchun barqaror to'lov qabul qilish",
    options: [
      { label: "NAPP litsenziyali kripto operator", correct: true },
      { label: "Instagram DM orqali USDT", correct: false },
      { label: "Offshore noma'lum platforma", correct: false },
    ],
  },
];

export function PaymentLab({ title, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shake, setShake] = useState(false);

  const current = SCENARIOS[index];

  const choose = (correct: boolean) => {
    if (correct) {
      const next = score + 1;
      setScore(next);
      if (index + 1 >= SCENARIOS.length) {
        if (next >= 3) onComplete();
        else { setIndex(0); setScore(0); }
      } else {
        setIndex((i) => i + 1);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className={`rounded-2xl overflow-hidden border-2 border-[#2C3E50] shadow-xl transition-transform ${shake ? "animate-shake" : ""}`}>
      <div className="bg-[#1a1a2e] px-4 py-3 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-gray-400">Buzuvchi to&apos;lovlar — Demo</p>
          <h3 className="text-sm font-bold text-white">{title}</h3>
        </div>
        <span className="text-xs font-bold text-duo-yellow">{index + 1}/{SCENARIOS.length}</span>
      </div>

      <div className="bg-white p-4">
        <div className="bg-duo-yellow/10 border-l-4 border-duo-yellow p-3 rounded-r-xl mb-4">
          <p className="text-xs font-bold text-secondary">{current.task}</p>
          <p className="text-[10px] text-gray-500 mt-1">Qonuniy va xavfsiz yo&apos;lni tanlang. Qora kanallarga KIRMANG!</p>
        </div>

        <div className="space-y-2">
          {current.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => choose(opt.correct)}
              className={`w-full text-left p-4 rounded-xl border-2 text-xs font-medium transition-all hover:scale-[1.01] ${
                opt.correct
                  ? "border-gray-200 bg-gray-50 hover:border-accent hover:bg-accent/5"
                  : "border-gray-200 bg-gray-50 hover:border-red-300 hover:bg-red-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-4 justify-center text-[10px]">
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-accent rounded-full" /> Qonuniy</div>
          <div className="flex items-center gap-1"><span className="w-3 h-3 bg-red-400 rounded-full" /> Xavfli kanal</div>
        </div>
        <p className="text-center text-[10px] text-gray-400 mt-2">To&apos;g&apos;ri: {score}/{SCENARIOS.length}</p>
      </div>
    </div>
  );
}
