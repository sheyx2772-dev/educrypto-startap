"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useMarketStore } from "@/lib/kripto-koinot/store";
import { useMarketFeed } from "@/hooks/useMarketFeed";
import { CanvasContainer } from "./CanvasContainer";
import { EducationalModal } from "./EducationalModal";
import { HUDBottom, HUDTop } from "./UIOverlay";
import "./kripto-koinot-theme.css";

interface Props {
  onComplete?: () => void;
  allowReplay?: boolean;
}

export function KriptoKoinotGame({ onComplete, allowReplay = false }: Props) {
  const store = useMarketStore();
  const phase = store.phase;
  const [timers, setTimers] = useState<Record<string, number>>({});

  useMarketFeed(phase === "playing");

  useEffect(() => {
    if (allowReplay) store.setRewarded(true);
    return () => store.resetGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase === "won" && !store.pathCompleteFired && onComplete && !store.rewarded) {
      store.setRewarded(true);
      store.markPathComplete();
      setTimeout(onComplete, 2200);
    }
  }, [phase, store.pathCompleteFired, store.rewarded, onComplete, store]);

  if (phase === "intro") {
    return (
      <div className="kk-intro gplay-screen">
        <div className="gplay-badge">Orbita simulyatori</div>
        <Image
          src="/game/kripto-koinot/arena-map.png"
          alt="Kripto-Koinot"
          width={300}
          height={170}
          className="rounded-xl border-2 border-yellow-400/40 shadow-lg shadow-yellow-500/15"
          unoptimized
        />
        <h2 className="gplay-screen-title">
          <span className="white">Kripto-</span><span className="gold">Koinot</span>
        </h2>
        <p className="gplay-screen-desc">
          Har bir sayyoraning o&apos;z orbitasi bor (BTC, ETH, USDT, SOL, ADA). Pad dan sayyora
          rasmini tortib, orbitadagi <strong>qisqa nomiga</strong> mos halqaga qo&apos;ying.
          Noto&apos;g&apos;ri orbita — portlash!
        </p>
        <button type="button" onClick={() => store.startGame()} className="gplay-btn">
          Boshlash
        </button>
      </div>
    );
  }

  const playing = phase === "playing" || phase === "modal";

  return (
    <div className="relative bg-[#050810]">
      <div className="kk-game-shell">
        {playing && <HUDTop timers={timers} />}

        <div className="kk-arena-column">
          <CanvasContainer active={playing} onTimersChange={setTimers} />
          <EducationalModal />

          {phase === "won" && (
            <div className="kk-win-banner">
              Orbita barqaror! Portfel xavfsiz — +{store.playerXP} bilim ballari
            </div>
          )}

          {phase === "lost" && (
            <div className="kk-modal-backdrop">
              <div className="kk-modal border-red-500/60">
                <h3 className="text-lg font-extrabold text-red-400 mb-2">Market Crash!</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Juda ko&apos;p xato — portfel quladi. Diversifikatsiya va risk cheklovlarini qayta
                  o&apos;rganing.
                </p>
                <button type="button" onClick={() => store.startGame()} className="gplay-btn w-full max-w-full">
                  Qayta urinish
                </button>
              </div>
            </div>
          )}
        </div>

        {playing && <HUDBottom />}
      </div>
    </div>
  );
}
