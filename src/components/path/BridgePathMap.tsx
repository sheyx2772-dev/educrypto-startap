"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { EduMascot } from "@/components/mascot/EduMascot";
import { useProgress } from "@/context/ProgressContext";
import { pathNodes } from "@/lib/curriculum";
import { getPathProgressPercent } from "@/lib/progress";
import { CoinIcon } from "@/components/icons/NavIcons";
import { StarterGate } from "@/components/onboarding/StarterGate";
import { BridgePlank } from "./BridgePlank";

export function BridgePathMap() {
  const { progress, getNodeStatus } = useProgress();
  const pct = getPathProgressPercent(progress);
  const completed = pathNodes.filter((n) => progress.pathCompleted[n.id]).length;

  if (!progress.hasStarted) return <StarterGate />;

  return (
    <div className="px-4 py-5 pb-4 bg-white min-h-full overflow-x-hidden">
      {/* Sodda header */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-extrabold text-secondary">Crypto ko&apos;prik yo&apos;li</h1>
        <p className="text-xs text-gray-400 mt-1">Dars + demo taxtachalar · Yog&apos;och → Tilla</p>

        <div className="flex justify-center mt-4 mb-3">
          <EduMascot mood="happy" position="inline" size={110} showBubble={false} />
        </div>

        <div className="flex items-center justify-center gap-2 coin-badge-neon inline-flex px-4 py-2 rounded-full">
          <CoinIcon size={18} />
          <span className="font-extrabold text-secondary">{progress.coins} USDT</span>
        </div>

        <div className="mt-4 px-2 max-w-xs mx-auto">
          <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1">
            <span>Progress</span>
            <span>{completed}/{pathNodes.length}</span>
          </div>
          <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-duo-yellow rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Yo'l xaritasi — oq fon */}
      <div className="flex flex-col items-center gap-3 w-full max-w-full overflow-x-hidden px-1">
        {pathNodes.map((node, index) => {
          const status = getNodeStatus(node.id);
          const offset = index % 2 === 0 ? "-translate-x-2 sm:-translate-x-4" : "translate-x-2 sm:translate-x-4";

          const plank = (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.02, 0.5) }}
              className={`w-full flex justify-center ${offset}`}
            >
              <BridgePlank
                title={node.title}
                section={node.section}
                type={node.type}
                status={status}
              />
            </motion.div>
          );

          if (status !== "locked") {
            return (
              <Link key={node.id} href={`/path/${node.id}`} className="block w-full max-w-[240px]">
                {plank}
              </Link>
            );
          }
          return (
            <div key={node.id} className="w-full max-w-[240px] flex justify-center">
              {plank}
            </div>
          );
        })}
      </div>
    </div>
  );
}
