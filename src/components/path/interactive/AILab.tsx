"use client";

import { useState } from "react";

interface Props {
  title: string;
  onComplete: () => void;
}

const CHATS = [
  {
    prompt: "Bitcoin narxi ertaga 100% oshadi — kafolat!",
    responses: [
      { text: "Ha, albatta sotib oling!", safe: false },
      { text: "Bunday kafolat berib bo'lmaydi. O'zingiz tadqiq qiling (DYOR).", safe: true },
      { text: "Mening botim 100x beradi, link bosing", safe: false },
    ],
  },
  {
    prompt: "USDT stablecoin nima?",
    responses: [
      { text: "Barqaror qiymatli kripto tanga, 1$ ga bog'langan", safe: true },
      { text: "Bepul pul beradigan tanga", safe: false },
      { text: "Faqat o'yin uchun", safe: false },
    ],
  },
  {
    prompt: "Kripto solig'i haqida maslahat",
    responses: [
      { text: "Soliq to'lamasdan yashirishingiz mumkin", safe: false },
      { text: "Mahalliy qonunlarga rioya qiling, hujjat saqlang", safe: true },
      { text: "Soliq yo'q deb o'ylang", safe: false },
    ],
  },
  {
    prompt: "Xavfsiz hamyon tanlash",
    responses: [
      { text: "Telegram bot eng yaxshisi", safe: false },
      { text: "NAPP litsenziyali va rasmiy saytli hamyon tanlang", safe: true },
      { text: "Seed phrase ni chatda ulashing", safe: false },
    ],
  },
];

export function AILab({ title, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const current = CHATS[index];

  const pick = (i: number, safe: boolean) => {
    setSelected(i);
    setTimeout(() => {
      if (safe) {
        const next = score + 1;
        setScore(next);
        setSelected(null);
        if (index + 1 >= CHATS.length) {
          if (next >= 3) onComplete();
          else { setIndex(0); setScore(0); }
        } else {
          setIndex((x) => x + 1);
        }
      } else {
        setSelected(null);
      }
    }, 800);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm">🤖</div>
          <div>
            <p className="text-[10px] text-white/70">EduCrypto AI Assistant</p>
            <h3 className="text-sm font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>

      <div className="bg-[#f0f2f5] p-4 min-h-[320px]">
        <div className="bg-white rounded-2xl rounded-tl-sm p-3 mb-4 shadow-sm max-w-[85%]">
          <p className="text-xs text-secondary">{current.prompt}</p>
        </div>

        <p className="text-[10px] text-gray-500 mb-2">Xavfsiz javobni tanlang (AI ham xato qilishi mumkin!):</p>
        <div className="space-y-2">
          {current.responses.map((r, i) => (
            <button
              key={r.text}
              onClick={() => pick(i, r.safe)}
              disabled={selected !== null}
              className={`w-full text-left p-3 rounded-2xl rounded-tr-sm text-xs transition-all ${
                selected === i
                  ? r.safe ? "bg-green-100 border-2 border-green-400" : "bg-red-100 border-2 border-red-400"
                  : "bg-white shadow-sm hover:bg-violet-50"
              }`}
            >
              {r.text}
            </button>
          ))}
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-4">{index + 1}/{CHATS.length} · Xavfsiz javoblar: {score}</p>
      </div>
    </div>
  );
}
