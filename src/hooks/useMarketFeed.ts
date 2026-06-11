"use client";

import { useEffect } from "react";
import { useMarketStore } from "@/lib/kripto-koinot/store";

/** Mock WebSocket — bozor volatilligini real vaqtga o'xshash yangilaydi */
export function useMarketFeed(enabled: boolean) {
  const setVolatility = useMarketStore((s) => s.setVolatility);
  const updateMasses = useMarketStore((s) => s.updateMassesFromVolatility);

  useEffect(() => {
    if (!enabled) return;

    let base = 0.35;
    const tick = () => {
      base += (Math.random() - 0.5) * 0.12;
      base = Math.max(0.1, Math.min(0.85, base));
      setVolatility(base);
      updateMasses();
    };

    tick();
    const id = setInterval(tick, 2200);
    return () => clearInterval(id);
  }, [enabled, setVolatility, updateMasses]);
}
