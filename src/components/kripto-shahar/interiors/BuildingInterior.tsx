"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useKriptoShaharStore } from "@/lib/kripto-shahar/game-store";
import { getBuildingById } from "@/lib/kripto-shahar/buildings";
import { BitcoinMineInterior } from "./BitcoinMineInterior";
import { LessonInterior } from "./LessonInterior";

const ScamDetector = dynamic(
  () => import("@/components/scam-detector/ScamDetector").then((m) => m.ScamDetector),
  { ssr: false, loading: () => <p className="text-center text-gray-500 animate-pulse py-10">Yuklanmoqda...</p> }
);

const LESSON_BUILDINGS = [
  "city_square",
  "napp_office",
  "ethereum_lab",
  "trading_center",
  "defi_pool",
  "marketplace",
  "guild_hall",
  "secret_library",
] as const;

export function BuildingInterior() {
  const { activeInterior, exitInterior } = useKriptoShaharStore();
  if (!activeInterior) return null;

  const building = getBuildingById(activeInterior);
  if (!building) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-20 ks-interior flex flex-col"
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-black/60">
        <div>
          <p className="text-[9px] text-gray-500 uppercase tracking-widest">Bino ichida</p>
          <h2 className="text-sm font-extrabold text-[#f4b942]">
            {building.minimapIcon} {building.nameUz}
          </h2>
        </div>
        <button
          type="button"
          onClick={exitInterior}
          className="ks-panel rounded-lg p-2 hover:bg-white/10"
          aria-label="Chiqish"
        >
          <X size={18} className="text-gray-400" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {activeInterior === "bitcoin_mine" && <BitcoinMineInterior />}

        {activeInterior === "scam_detective" && (
          <div className="rounded-xl overflow-hidden border border-[#E24B4A]/30">
            <ScamDetector
              allowReplay
              onComplete={() => {
                const store = useKriptoShaharStore.getState();
                store.addBits(30);
                store.incrementQuest("minigames_played");
              }}
            />
          </div>
        )}

        {LESSON_BUILDINGS.includes(activeInterior as (typeof LESSON_BUILDINGS)[number]) && (
          <LessonInterior buildingId={activeInterior} />
        )}
      </div>
    </motion.div>
  );
}
