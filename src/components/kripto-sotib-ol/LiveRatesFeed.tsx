"use client";

import { motion, AnimatePresence } from "framer-motion";
import { formatUsd } from "@/lib/kripto-sotib-ol/market";
import type { MarketRate } from "@/lib/kripto-sotib-ol/types";

interface Props {
  rates: MarketRate[];
}

export function LiveRatesFeed({ rates }: Props) {
  return (
    <div className="kso-rates-ticker">
      <span className="text-[9px] font-extrabold text-[var(--kso-muted)] uppercase tracking-wider mr-1 self-center">
        Live
      </span>
      <AnimatePresence mode="popLayout">
        {rates.map((r) => (
          <motion.div
            key={r.asset}
            layout
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`kso-rate-chip ${r.change24h >= 0 ? "up" : "down"}`}
          >
            <span style={{ color: r.color }}>{r.symbol}</span>
            <span className="text-white">{formatUsd(r.usd)}</span>
            <span className="text-[9px] opacity-70">
              {r.change24h >= 0 ? "▲" : "▼"}
              {Math.abs(r.change24h).toFixed(1)}%
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
