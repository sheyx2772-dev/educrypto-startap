"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { useKriptoShaharStore } from "@/lib/kripto-shahar/game-store";
import { syncCoursesFromPath } from "@/lib/kripto-shahar/storage";
import type { AvatarType, FieldId } from "@/lib/kripto-shahar/types";
import { CITY_MILESTONES } from "@/lib/kripto-shahar/quests";
import { FIELDS } from "@/lib/kripto-shahar/fields";
import { createKriptoShaharGame } from "./phaser/createGame";
import { KriptoShaharHUD } from "./KriptoShaharHUD";
import { BuildingInterior } from "./interiors/BuildingInterior";
import "./kripto-shahar-theme.css";

const AVATARS: { type: AvatarType; label: string; img: string; desc: string }[] = [
  { type: "idle", label: "Shlyapa Standart", img: "/game/kripto-shahar/mascot-idle.png", desc: "Kripto yangi boshlovchi" },
  { type: "happy", label: "Shlyapa Xursand", img: "/game/kripto-shahar/mascot-happy.png", desc: "Muvaffaqiyatli treyder" },
  { type: "thinking", label: "Shlyapa O'qimchi", img: "/game/kripto-shahar/mascot-thinking.png", desc: "Tahlilchi dedektiv" },
  { type: "warning", label: "Shlyapa Ehtiyot", img: "/game/kripto-shahar/mascot-warning.png", desc: "Scam ovchisi" },
];

export interface KriptoShaharGameProps {
  onComplete?: () => void;
  allowReplay?: boolean;
  embedded?: boolean;
}

export function KriptoShaharGame({ onComplete, embedded = false }: KriptoShaharGameProps) {
  const phaserRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<ReturnType<typeof createKriptoShaharGame> | null>(null);
  const { progress } = useProgress();

  const {
    phase,
    setPhase,
    initPlayer,
    setAvatar,
    player,
    pathCompleteFired,
    markPathComplete,
    showEnterPrompt,
    tryEnterBuilding,
    selectedField,
    setField,
  } = useKriptoShaharStore();

  useEffect(() => {
    initPlayer(progress.username || "O'yinchi");
    syncCoursesFromPath(progress.pathCompleted);
  }, [initPlayer, progress.username, progress.pathCompleted]);

  useEffect(() => {
    if (phase !== "world" || !phaserRef.current) return;

    const parent = phaserRef.current;
    const frame = requestAnimationFrame(() => {
      gameRef.current?.destroy(true);
      gameRef.current = createKriptoShaharGame(parent);
    });

    return () => {
      cancelAnimationFrame(frame);
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, [phase, selectedField]);

  useEffect(() => {
    if (pathCompleteFired || !onComplete) return;
    const visited = player.visitedBuildings.length;
    if (visited >= 2 && player.bits >= 80) {
      markPathComplete();
      onComplete();
    }
  }, [player.visitedBuildings.length, player.bits, pathCompleteFired, onComplete, markPathComplete]);

  const startWorld = useCallback(() => {
    setPhase("world");
  }, [setPhase]);

  const selectAvatar = (type: AvatarType) => {
    setAvatar(type);
    setPhase("field");
  };

  const selectField = (field: FieldId) => {
    setField(field);
    startWorld();
  };

  /* ─── INTRO ─── */
  if (phase === "intro") {
    return (
      <div className={`ks-game gplay-screen ${embedded ? "min-h-[480px] rounded-b-2xl" : "min-h-[calc(100vh-80px)]"}`}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-4"
        >
          <Image
            src="/game/kripto-shahar/mascot-idle.png"
            alt="Shlyapa maskot"
            width={120}
            height={120}
            className="mx-auto drop-shadow-[0_8px_24px_rgba(244,185,66,0.45)]"
            unoptimized
          />
        </motion.div>
        <div className="gplay-badge">Pixels uslubida MMO</div>
        <h1 className="gplay-screen-title mb-2">
          <span className="gold">KRIPTO SHAHAR</span>
        </h1>
        <p className="gplay-screen-desc !mb-4">
          O&apos;z Kripto Karyerangni qur! O&apos;qib, o&apos;ynab, boshqa o&apos;yinchilar bilan kripto dunyosini kashf qiling.
        </p>

        <div className="gplay-card mb-6 text-left">
          <p className="gplay-card-label">Shahar rivojlanishi</p>
          {CITY_MILESTONES.slice(0, 1).map((m) => (
            <div key={m.id}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-gray-400">{m.name}</span>
                <span className="text-[#f4b942]">{m.current}/{m.required}</span>
              </div>
              <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#f4b942]"
                  style={{ width: `${(m.current / m.required) * 100}%` }}
                />
              </div>
              <p className="text-[9px] text-gray-600 mt-1">Yana {m.required - m.current} o&apos;yinchi kerak!</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setPhase("avatar")}
          className="gplay-btn mb-3"
        >
          O&apos;yinni boshlash
        </button>
        <p className="text-[9px] text-gray-600">Shlyapani bosib suring · Bino yonida kirish · Chat pastda</p>
      </div>
    );
  }

  /* ─── AVATAR SELECT ─── */
  if (phase === "avatar") {
    return (
      <div className={`ks-game px-4 py-6 ${embedded ? "min-h-[480px] rounded-b-2xl" : "min-h-[calc(100vh-80px)]"}`}>
        <h2 className="ks-pixel-title text-center mb-2">SHLYAPA TANLANG</h2>
        <p className="text-center text-xs text-gray-500 mb-5">Shlyapa-Coin maskotingizni tanlang</p>
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {AVATARS.map((a) => (
            <motion.button
              key={a.type}
              type="button"
              whileTap={{ scale: 0.95 }}
              onClick={() => selectAvatar(a.type)}
              className={`ks-avatar-card rounded-xl p-3 text-center ${player.avatarType === a.type ? "selected" : ""}`}
            >
              <Image src={a.img} alt={a.label} width={72} height={72} className="mx-auto mb-2" unoptimized />
              <p className="text-[11px] font-extrabold text-white">{a.label}</p>
              <p className="text-[9px] text-gray-500 mt-0.5">{a.desc}</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  /* ─── FIELD SELECT ─── */
  if (phase === "field") {
    return (
      <div className={`ks-game px-4 py-6 ${embedded ? "min-h-[480px] rounded-b-2xl" : "min-h-[calc(100vh-80px)]"}`}>
        <h2 className="ks-pixel-title text-center mb-2">MAYDON TANLANG</h2>
        <p className="text-center text-xs text-gray-500 mb-5">2 ta maydondan birini tanlang</p>
        <div className="space-y-3 max-w-sm mx-auto">
          {FIELDS.map((f) => (
            <motion.button
              key={f.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => selectField(f.id)}
              className={`ks-avatar-card w-full rounded-xl overflow-hidden text-left ${selectedField === f.id ? "selected" : ""}`}
            >
              <div className="relative h-28 bg-[#0a1018] overflow-hidden">
                <Image
                  src={f.preview}
                  alt={f.name}
                  fill
                  className="object-cover opacity-90"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <p className="absolute bottom-2 left-3 text-sm font-extrabold text-[#f4b942]">{f.name}</p>
              </div>
              <p className="px-3 py-2 text-[10px] text-gray-400">{f.description}</p>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  /* ─── WORLD + INTERIOR ─── */
  const worldHeight = embedded ? 520 : "calc(100vh - 120px)";

  return (
    <div
      className={`ks-game relative overflow-hidden ${embedded ? "rounded-b-2xl" : ""}`}
      style={{ height: worldHeight, minHeight: 480 }}
    >
      <div ref={phaserRef} className="ks-phaser-wrap absolute inset-0 z-[5]" />
      <KriptoShaharHUD />
      <BuildingInterior />

      {phase === "world" && showEnterPrompt && (
        <button
          type="button"
          onClick={tryEnterBuilding}
          className="absolute bottom-36 right-3 z-30 gplay-btn gplay-btn-sm !max-w-none !w-auto !rounded-full px-4 py-3 text-[11px] pointer-events-auto"
          aria-label="Kirish"
        >
          🚪 Kirish
        </button>
      )}
    </div>
  );
}
