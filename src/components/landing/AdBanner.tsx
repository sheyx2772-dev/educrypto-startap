"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sponsorAds, categoryLabels } from "@/lib/ads";

export function AdBanner() {
  const [active, setActive] = useState(0);
  const ad = sponsorAds[active];

  useEffect(() => {
    const timer = setInterval(() => setActive((i) => (i + 1) % sponsorAds.length), 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-10 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-duo-yellow/70">Reklama</span>
            <h2 className="text-xl font-extrabold text-white">Hamkorlar va sponsorlar</h2>
          </div>
          <span className="text-xs text-gray-400 font-bold">{active + 1}/{sponsorAds.length}</span>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={ad.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="ad-banner-neon rounded-3xl overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-video md:aspect-auto md:min-h-[220px] bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${ad.videoId}?rel=0&modestbranding=1&autoplay=0`}
                  title={ad.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="p-5 flex flex-col justify-between" style={{ borderLeft: `3px solid ${ad.color}` }}>
                <div>
                  <span
                    className="text-[10px] font-extrabold uppercase px-2 py-1 rounded-full"
                    style={{ background: `${ad.color}22`, color: ad.color }}
                  >
                    {categoryLabels[ad.category]}
                  </span>
                  <p className="text-lg font-extrabold text-white mt-3 leading-snug">{ad.brand}</p>
                  <p className="text-sm text-gray-400 mt-1">{ad.title}</p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <button
                    className="text-xs font-extrabold px-4 py-2 rounded-xl transition-all"
                    style={{ background: ad.color, color: "#2C3E50" }}
                  >
                    {ad.cta}
                  </button>
                  <div className="flex gap-1.5">
                    {sponsorAds.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === active ? "bg-duo-yellow w-5" : "bg-gray-600"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {sponsorAds.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                i === active ? "bg-duo-yellow text-secondary neon-badge" : "bg-white/10 text-gray-400"
              }`}
            >
              {s.brand}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
