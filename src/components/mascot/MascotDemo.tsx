"use client";

import { useState } from "react";
import { EduMascot } from "./EduMascot";
import { mascotLabels, mascotMessages, type MascotState } from "@/types/mascot";

const states: MascotState[] = ["idle", "happy", "warning", "thinking", "talking"];

export function MascotDemo() {
  const [activeState, setActiveState] = useState<MascotState>("idle");

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-duo-yellow/10">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3">Shlyapa-Coin — 5 ta holat</h2>
          <p className="text-gray-500 font-medium">
            Har bir foydalanuvchi harakati uchun alohida animatsiya
          </p>
        </div>

        <div className="card-premium p-8 md:p-12">
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {states.map((state) => (
              <button
                key={state}
                onClick={() => setActiveState(state)}
                className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                  activeState === state
                    ? "bg-duo-yellow text-secondary shadow-[0_4px_0_#e6a800] scale-105"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {mascotLabels[state]}
              </button>
            ))}
          </div>

          <div className="flex justify-center min-h-[340px] items-center bg-app-bg/50 rounded-3xl py-8">
            <EduMascot
              mood={activeState}
              message={mascotMessages[activeState]}
              position="inline"
              size={220}
            />
          </div>

          {/* Thumbnail strip */}
          <div className="flex justify-center gap-4 mt-8 flex-wrap">
            {states.map((state) => (
              <button
                key={`thumb-${state}`}
                onClick={() => setActiveState(state)}
                className={`relative w-16 h-20 rounded-xl overflow-hidden transition-all border-2 ${
                  activeState === state
                    ? "border-duo-yellow scale-110 shadow-lg"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/assets/mascot/${state}.png`}
                  alt={mascotLabels[state]}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
