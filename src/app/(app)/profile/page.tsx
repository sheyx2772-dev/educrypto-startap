"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useProgress } from "@/context/ProgressContext";
import { lessons } from "@/lib/lessons";
import { resetProgress, STARTER_COINS } from "@/lib/progress";
import { getLeaderboard, calcXp } from "@/lib/leaderboard";
import { NavProfileIcon, CoinIcon } from "@/components/icons/NavIcons";
import { InviteIcon, TrophyIcon } from "@/components/icons/FeatureIcons";
import { certificateMeta } from "@/lib/pathContent";

export default function ProfilePage() {
  const { progress, refresh, shareInvite, inviteToStart, updateUsername } = useProgress();
  const [copied, setCopied] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(progress.username);

  const passedCount = Object.values(progress.lessons).filter((l) => l.quizPassed).length;
  const xp = calcXp(progress.coins, passedCount);
  const leaderboard = getLeaderboard(progress.coins, passedCount, progress.username);
  const myRank = leaderboard.find((u) => u.isCurrentUser)?.rank ?? 0;

  const inviteLink = typeof window !== "undefined"
    ? `${window.location.origin}/onboarding?ref=${progress.inviteCode}`
    : `/onboarding?ref=${progress.inviteCode}`;

  const handleCopy = async () => {
    shareInvite();
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const rankClass = (rank: number) => {
    if (rank === 1) return "rank-gold text-secondary";
    if (rank === 2) return "rank-silver text-secondary";
    if (rank === 3) return "rank-bronze text-white";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div className="px-4 py-6 pb-4 max-w-full overflow-x-hidden">
      {/* Hero */}
      <div className="profile-hero-neon rounded-3xl p-6 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-duo-yellow/10 rounded-full blur-2xl" />
        <div className="relative flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl bg-duo-yellow/20 flex items-center justify-center neon-badge shrink-0">
            <NavProfileIcon active size={48} />
          </div>
          <div className="flex-1 min-w-0">
            {editingName ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => { updateUsername(name); setEditingName(false); }}
                className="bg-white/10 border border-duo-yellow/40 rounded-lg px-2 py-1 text-white font-extrabold text-lg w-full focus:outline-none"
              />
            ) : (
              <h1 className="text-xl font-extrabold truncate cursor-pointer" onClick={() => setEditingName(true)}>
                {progress.username}
              </h1>
            )}
            <p className="text-duo-yellow text-sm font-bold">#{myRank} reyting · {xp} XP</p>
            <div className="flex items-center gap-1 mt-1">
              <CoinIcon size={16} />
              <span className="font-extrabold text-accent">{progress.coins} USDT</span>
            </div>
          </div>
          <div className="text-center shrink-0">
            <TrophyIcon size={36} />
            <p className="text-[10px] font-bold text-duo-yellow mt-1">TOP {myRank}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { val: progress.coins, label: "USDT" },
            { val: passedCount, label: "Dars" },
            { val: progress.invitesSent, label: "Taklif" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xl font-extrabold text-duo-yellow">{s.val}</p>
              <p className="text-[10px] text-gray-400 font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NAPP Certificates */}
      <div className="mb-6">
        <h2 className="font-extrabold text-secondary mb-3 flex items-center gap-2 text-sm">
          <TrophyIcon size={22} /> NAPP sertifikatlar
        </h2>
        <div className="space-y-2">
          {(["beginner", "advanced", "ai"] as const).map((key) => {
            const earned = progress.certificates?.[key];
            const meta = certificateMeta[key];
            return (
              <div
                key={key}
                className={`card-neon p-4 flex items-center gap-3 ${earned ? "border-2 border-duo-yellow neon-badge" : "opacity-50"}`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl ${earned ? "rank-gold" : "bg-gray-200"}`}>
                  {earned ? "🏆" : "🔒"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-secondary truncate">{meta.title}</p>
                  <p className="text-[10px] text-gray-400">{earned ? meta.level : "Bosqichga yetganda ochiladi"}</p>
                </div>
                {earned && (
                  <Link href="/dashboard" className="text-xs font-extrabold text-accent shrink-0">
                    Ko&apos;rish
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Invite */}
      <div className="card-neon p-5 mb-6 border-2 border-accent/30">
        <div className="flex items-center gap-3 mb-3">
          <InviteIcon size={40} />
          <div>
            <h2 className="font-extrabold text-secondary text-sm">Do&apos;stlarni taklif qiling</h2>
            <p className="text-xs text-gray-400">Har bir do&apos;st uchun +{STARTER_COINS} USDT mukofot</p>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 mb-3 flex items-center justify-between gap-2">
          <code className="text-xs font-bold text-secondary truncate">{progress.inviteCode}</code>
          <button onClick={handleCopy} className="text-xs font-extrabold text-accent shrink-0 px-3 py-1.5 bg-accent/10 rounded-lg">
            {copied ? "✓" : "Nusxalash"}
          </button>
        </div>
        {!progress.hasStarted && (
          <button onClick={inviteToStart} className="btn-3d-accent w-full !text-xs !py-2.5">
            Do&apos;st qo&apos;shildi — {STARTER_COINS} USDT olish
          </button>
        )}
      </div>

      {/* Leaderboard */}
      <div className="mb-6">
        <h2 className="font-extrabold text-secondary mb-3 flex items-center gap-2">
          <TrophyIcon size={24} /> Reyting
        </h2>
        <div className="space-y-2">
          {leaderboard.slice(0, 8).map((user, i) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`card-neon p-3 flex items-center gap-3 ${user.isCurrentUser ? "border-2 border-duo-yellow neon-badge" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 ${rankClass(user.rank)}`}>
                {user.rank}
              </div>
              <div className="w-9 h-9 rounded-xl bg-duo-yellow/20 flex items-center justify-center text-xs font-extrabold text-secondary shrink-0">
                {user.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm truncate ${user.isCurrentUser ? "text-accent" : "text-secondary"}`}>
                  {user.name} {user.isCurrentUser && "(Siz)"}
                </p>
                <p className="text-[10px] text-gray-400">{user.lessonsPassed} dars · {user.xp} XP</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-extrabold text-accent text-sm">{user.coins}</p>
                <p className="text-[9px] text-gray-400">USDT</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Status cards */}
      <div className="space-y-2 mb-6">
        {[
          { label: "KYC holati", value: progress.hasStarted ? "Tasdiqlangan" : "Kutilmoqda", ok: progress.hasStarted },
          { label: "OneID", value: progress.hasStarted ? "Ulangan" : "—", ok: progress.hasStarted },
          { label: "NAPP", value: "Mos keladi", ok: true },
          { label: "To'lov", value: progress.paymentMethod?.toUpperCase() ?? "—", ok: !!progress.paymentMethod },
        ].map((item) => (
          <div key={item.label} className="card-neon p-3 flex justify-between items-center">
            <span className="font-semibold text-sm">{item.label}</span>
            <span className={`font-bold text-sm ${item.ok ? "text-accent" : "text-gray-400"}`}>{item.value}</span>
          </div>
        ))}
      </div>

      <div className="card-neon p-4 flex items-center gap-3">
        <Image src="/assets/mascot/idle.png" alt="" width={48} height={48} className="rounded-xl neon-avatar" unoptimized />
        <div>
          <p className="font-bold text-sm">Shlyapa-Coin yordamchisi</p>
          <p className="text-xs text-gray-400">{lessons.length} darslik · {passedCount} tugatildi</p>
        </div>
      </div>

      <button onClick={() => { resetProgress(); refresh(); }} className="mt-6 w-full text-xs text-gray-400 hover:text-warning">
        Progressni qayta boshlash
      </button>
      <Link href="/" className="block text-center mt-3 text-sm text-gray-400 hover:text-secondary">
        ← Marketing sahifasiga
      </Link>
    </div>
  );
}
