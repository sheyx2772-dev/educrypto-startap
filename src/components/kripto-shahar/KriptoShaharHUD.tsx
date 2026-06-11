"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { BUILDINGS, MAP_WIDTH, MAP_HEIGHT, getBuildingById } from "@/lib/kripto-shahar/buildings";
import { getQuestDisplay, useKriptoShaharStore } from "@/lib/kripto-shahar/game-store";

const AVATAR_IMG: Record<string, string> = {
  idle: "/game/kripto-shahar/mascot-idle.png",
  happy: "/game/kripto-shahar/mascot-happy.png",
  thinking: "/game/kripto-shahar/mascot-thinking.png",
  warning: "/game/kripto-shahar/mascot-warning.png",
};

export function KriptoShaharHUD() {
  const {
    player,
    nearBuilding,
    showEnterPrompt,
    enterBlockedReason,
    chatMessages,
    tryEnterBuilding,
    sendChat,
    phase,
  } = useKriptoShaharStore();

  const [chatInput, setChatInput] = useState("");
  const [showQuests, setShowQuests] = useState(true);
  const quests = getQuestDisplay();
  const building = nearBuilding ? getBuildingById(nearBuilding) : null;

  const minimapPlayerX = (player.x / (MAP_WIDTH * 32)) * 100;
  const minimapPlayerY = (player.y / (MAP_HEIGHT * 32)) * 100;

  if (phase === "interior") return null;

  return (
    <>
      {/* Top HUD — faqat yuqori qirra, markaz canvas uchun bo'sh */}
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-auto flex items-start justify-between gap-2 p-2">
        <div className="ks-panel rounded-lg px-2.5 py-1.5 flex items-center gap-2 min-w-0">
          <Image
            src={AVATAR_IMG[player.avatarType] ?? AVATAR_IMG.idle}
            alt="Shlyapa"
            width={32}
            height={32}
            className="rounded-full"
            unoptimized
          />
          <div className="min-w-0">
            <p className="text-[11px] font-extrabold text-white truncate">{player.username}</p>
            <p className="text-[9px] text-gray-400">
              Lv.{player.level} · <span className="ks-hud-bit">{player.bits} Bit</span>
            </p>
          </div>
        </div>

        <div className="ks-panel ks-minimap rounded-lg p-1.5 w-[88px] h-[72px] relative shrink-0">
          <p className="text-[7px] text-gray-500 mb-0.5 text-center">MINIMAP</p>
          <div className="relative w-full h-[52px] bg-[#0d1820] rounded overflow-hidden">
            {BUILDINGS.map((b) => (
              <span
                key={b.id}
                className="absolute text-[6px] -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${((b.tileX + b.width / 2) / MAP_WIDTH) * 100}%`,
                  top: `${((b.tileY + b.height / 2) / MAP_HEIGHT) * 100}%`,
                }}
                title={b.nameUz}
              >
                {b.minimapIcon}
              </span>
            ))}
            <span
              className="absolute w-2 h-2 bg-[#00ff88] rounded-full border border-white -translate-x-1/2 -translate-y-1/2 shadow-[0_0_6px_#00ff88]"
              style={{ left: `${minimapPlayerX}%`, top: `${minimapPlayerY}%` }}
            />
          </div>
          <p className="text-[7px] text-center text-[#00d68f] mt-0.5">siz</p>
        </div>
      </div>

      {!showEnterPrompt && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10 pointer-events-none ks-drag-hint px-3 py-1.5 rounded-full text-[9px] text-gray-400 flex items-center gap-1.5">
          <span className="text-[#f4b942]">👆</span>
          Shlyapaga bosib suring
        </div>
      )}

      {/* Enter prompt */}
      <AnimatePresence>
        {showEnterPrompt && building && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-36 left-1/2 -translate-x-1/2 z-10 pointer-events-auto"
          >
            <button
              type="button"
              onClick={tryEnterBuilding}
              className="ks-enter-prompt px-4 py-2.5 rounded-xl text-sm font-extrabold text-white"
            >
              {building.nameUz} — Kirish
            </button>
            {enterBlockedReason && (
              <p className="text-center text-[10px] text-[#e24b4a] mt-1 font-bold bg-black/70 px-2 py-1 rounded">
                🔒 {enterBlockedReason}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom: chat + quests */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none p-2 space-y-2">
        <div className="ks-panel rounded-lg p-2 max-h-[72px] overflow-y-auto pointer-events-auto">
          {chatMessages.slice(-4).map((m) => (
            <p key={m.id} className="text-[9px] leading-relaxed">
              <span className="text-[#f4b942] font-bold">{m.username}:</span>{" "}
              <span className="text-gray-300">{m.message}</span>
            </p>
          ))}
        </div>
        <form
          className="flex gap-1 pointer-events-auto"
          onSubmit={(e) => {
            e.preventDefault();
            sendChat(chatInput);
            setChatInput("");
          }}
        >
          <input
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Xabar yozing... (50m radius)"
            className="ks-chat-input flex-1 rounded-lg px-2 py-1.5 text-[11px] text-white outline-none focus:border-[#f4b942]/50"
            maxLength={120}
          />
          <button type="submit" className="gplay-btn gplay-btn-sm !max-w-none !w-auto !rounded-lg px-3 py-1.5 text-[10px]">
            ↵
          </button>
        </form>

        <button
          type="button"
          onClick={() => setShowQuests(!showQuests)}
          className="ks-panel w-full rounded-lg px-2 py-1.5 text-left pointer-events-auto"
        >
          <p className="text-[9px] font-extrabold text-[#f4b942] uppercase tracking-wider">
            Kunlik vazifalar {showQuests ? "▼" : "▶"}
          </p>
          {showQuests && (
            <ul className="mt-1 space-y-0.5">
              {quests.slice(0, 3).map((q) => (
                <li key={q.id} className="text-[9px] text-gray-400 flex justify-between">
                  <span className={q.done ? "line-through text-[#00d68f]" : ""}>{q.title}</span>
                  <span className="text-[#f4b942]">+{q.reward}</span>
                </li>
              ))}
            </ul>
          )}
        </button>
      </div>
    </>
  );
}
