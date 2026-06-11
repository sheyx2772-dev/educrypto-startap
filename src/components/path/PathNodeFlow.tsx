"use client";

import { useState } from "react";
import Link from "next/link";
import { type PathNode } from "@/lib/curriculum";
import { getPathContent } from "@/lib/pathContent";
import { useProgress } from "@/context/ProgressContext";
import { StudyGuide } from "@/components/lessons/StudyGuide";
import { PathMiniGame } from "./PathMiniGame";
import { PathVideoCourse } from "./PathVideoCourse";
import { NappCertificate } from "./NappCertificate";
import { CoinCelebration } from "@/components/lessons/CoinCelebration";
import { LockIcon } from "@/components/icons/NavIcons";
import { InviteIcon } from "@/components/icons/FeatureIcons";

type LearnStep = "guide" | "quiz" | "done";

interface PathNodeFlowProps {
  node: PathNode;
}

export function PathNodeFlow({ node }: PathNodeFlowProps) {
  const { progress, getNodeStatus, completePathNode, shareInvite } = useProgress();
  const status = getNodeStatus(node.id);
  const content = getPathContent(node);
  const isDemo = node.type === "demo";
  const isGift = node.type === "gift";
  const [step, setStep] = useState<LearnStep>("guide");
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [guideDone, setGuideDone] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [showCert, setShowCert] = useState(false);

  if (status === "locked") {
    return (
      <div className="px-4 py-10 text-center">
        <div className="card-neon p-8 max-w-sm mx-auto">
          <LockIcon size={48} />
          <h2 className="font-extrabold text-secondary mt-4">Bosqich qulflangan</h2>
          <p className="text-sm text-gray-500 mt-2">Avval oldingi tilla taxtachani tugating</p>
          <Link href="/dashboard" className="btn-3d-primary mt-4 inline-block !text-sm">← Ko&apos;priqqa qaytish</Link>
        </div>
      </div>
    );
  }

  const isTangaTop =
    isDemo && content.game.type === "interactive" && content.game.interactiveId === "tanga";
  const isBlockchainZanjiri =
    isDemo && content.game.type === "interactive" && content.game.interactiveId === "blockchain";
  const isScamDetector =
    isDemo && content.game.type === "interactive" && content.game.interactiveId === "myth";
  const isKriptoShahar =
    (isDemo || node.id === "p12") &&
    content.game.type === "interactive" &&
    content.game.interactiveId === "kripto-shahar";
  const isKriptoSayohat =
    isDemo && content.game.type === "interactive" && content.game.interactiveId === "kripto-sayohat";
  const isKriptoKoinot =
    isDemo && content.game.type === "interactive" && content.game.interactiveId === "kripto-koinot";
  const isKriptoSotibOl =
    (isDemo || node.id === "p1") &&
    content.game.type === "interactive" &&
    content.game.interactiveId === "kripto-sotib-ol";
  const isGiftChest = isGift && content.game.type === "chest";

  if (progress.pathCompleted[node.id] && !isDemo && !isGiftChest) {
    return (
      <div className="px-4 py-8 text-center">
        <div className="card-neon p-6 border-2 border-accent">
          <span className="text-4xl">{isDemo ? "🎮" : "✓"}</span>
          <h2 className="font-extrabold text-secondary mt-2">{node.title} — tugallandi!</h2>
          <p className="text-sm text-accent font-bold">+{node.reward} USDT olindi</p>
          {node.certificateKey && progress.certificates[node.certificateKey] && (
            <button onClick={() => setShowCert(true)} className="btn-3d-accent mt-4 !text-sm">
              Sertifikatni ko&apos;rish
            </button>
          )}
          <Link href="/dashboard" className="block mt-4 text-sm text-gray-400 hover:text-secondary">← Ko&apos;priqqa</Link>
        </div>
        {node.certificateKey && (
          <NappCertificate certKey={node.certificateKey} username={progress.username} show={showCert} onClose={() => setShowCert(false)} />
        )}
      </div>
    );
  }

  const finishNode = () => {
    completePathNode(node);
    setCelebrate(true);
    if (node.certificateKey) setShowCert(true);
    if (!isDemo) setStep("done");
  };

  const handleQuizSubmit = () => {
    const correct = content.quiz.filter((q, i) => quizAnswers[i] === q.correctIndex).length;
    const threshold = Math.ceil(content.quiz.length * 0.7);
    if (correct >= threshold) {
      finishNode();
    } else {
      setQuizAnswers({});
      setStep("guide");
      setGuideDone(false);
    }
  };

  const handleGameComplete = () => {
    finishNode();
  };

  const inviteLink = typeof window !== "undefined"
    ? `${window.location.origin}/onboarding?ref=${progress.inviteCode}`
    : `/onboarding?ref=${progress.inviteCode}`;

  const handleShareInvite = async () => {
    shareInvite();
    try {
      await navigator.clipboard.writeText(inviteLink);
    } catch {
      /* clipboard blocked */
    }
  };

  /* ─── Demo taxtacha: faqat o'yin ─── */
  if (isDemo) {
    const pathDone = progress.pathCompleted[node.id];
    return (
      <div className="px-4 py-4 pb-4 max-w-full overflow-x-hidden">
        <CoinCelebration show={celebrate} amount={node.reward} onDone={() => setCelebrate(false)} />

        <Link href="/dashboard" className="text-sm font-bold text-gray-500 hover:text-secondary mb-3 inline-block">← Crypto ko&apos;prik yo&apos;li</Link>

        <div className="bg-gradient-to-r from-violet-600 to-indigo-700 rounded-2xl p-4 mb-4 text-white">
          <p className="text-[10px] opacity-80 uppercase font-bold">
            {isTangaTop ? "Tanga Top" : isBlockchainZanjiri ? "Blokchain Zanjiri" : isScamDetector ? "Scam Dedektivi" : isKriptoSayohat ? "Kripto-Sayohat" : isKriptoKoinot ? "Kripto-Koinot" : isKriptoSotibOl ? "Kripto-Sotib Ol" : isKriptoShahar ? "Kripto Shahar" : "Demo taxtacha"}
          </p>
          <h1 className="text-lg font-extrabold">{node.title}</h1>
          <p className="text-xs opacity-90 mt-1">{content.game.title}</p>
          <p className="text-[10px] mt-2 text-duo-yellow font-bold">
            {pathDone ? "✓ Mukofot olingan — qayta o'ynash mumkin" : `+${node.reward} USDT`}
          </p>
        </div>

        {!pathDone && (
          <p className="text-[10px] text-gray-500 mb-2 text-center">Vazifani to&apos;g&apos;ri bajaring — USDT mukofot olasiz</p>
        )}
        <PathMiniGame
          game={content.game}
          onComplete={pathDone ? () => {} : handleGameComplete}
          allowReplay={pathDone}
        />
      </div>
    );
  }

  /* ─── Sovg'a sandig'i: tugagandan keyin qayta ochish ─── */
  if (isGiftChest && progress.pathCompleted[node.id]) {
    return (
      <div className="px-4 py-4 pb-4 max-w-full overflow-x-hidden">
        <Link href="/dashboard" className="text-sm font-bold text-gray-500 hover:text-secondary mb-3 inline-block">← Crypto ko&apos;prik yo&apos;li</Link>
        <div className="bg-gradient-to-r from-red-600 to-rose-700 rounded-2xl p-4 mb-4 text-white">
          <p className="text-[10px] opacity-80 uppercase font-bold">Mukofot sandig&apos;i</p>
          <h1 className="text-lg font-extrabold">{node.title}</h1>
          <p className="text-[10px] mt-2 text-duo-yellow font-bold">✓ Mukofot olingan — qayta o&apos;ynash mumkin</p>
        </div>
        <PathMiniGame game={content.game} onComplete={() => {}} allowReplay />
      </div>
    );
  }

  /* ─── O'quv taxtachasi: video/qo'llanma + test ─── */
  const steps: LearnStep[] = ["guide", "quiz", "done"];
  const hasVideo = Boolean(content.videoSteps?.length);

  const stepLabels: Record<LearnStep, string> = {
    guide: hasVideo ? "6 Video" : "O'qing",
    quiz: "Test",
    done: "Tugadi",
  };

  return (
    <div className="px-4 py-4 pb-4 max-w-full overflow-x-hidden">
      <CoinCelebration show={celebrate} amount={node.reward} onDone={() => setCelebrate(false)} />
      {node.certificateKey && (
        <NappCertificate certKey={node.certificateKey} username={progress.username} show={showCert} onClose={() => setShowCert(false)} />
      )}

      <Link href="/dashboard" className="text-sm font-bold text-gray-500 hover:text-secondary mb-3 inline-block">← Crypto ko&apos;prik yo&apos;li</Link>

      <div className="flex gap-1 mb-4">
        {steps.map((s) => {
          const active = step === s;
          const done =
            (s === "guide" && guideDone) ||
            (s === "quiz" && step === "done") ||
            (s === "done" && step === "done");
          return (
            <div key={s} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-1.5 rounded-full ${done ? "bg-accent" : active ? "bg-duo-yellow neon-bar" : "bg-gray-200"}`} />
              <span className={`text-[9px] font-bold ${active ? "text-secondary" : "text-gray-400"}`}>{stepLabels[s]}</span>
            </div>
          );
        })}
      </div>

      <h1 className="text-lg font-extrabold text-secondary mb-1">{node.title}</h1>
      <p className="text-xs text-gray-400 mb-2">{node.description} · +{node.reward} USDT</p>

      {node.lessonId && !hasVideo && (
        <Link href={`/lessons/${node.lessonId}`} className="card-neon p-3 mb-4 flex items-center justify-between border-l-4 border-l-duo-yellow">
          <span className="text-xs font-bold text-secondary">📹 To&apos;liq video darslik</span>
          <span className="text-duo-yellow">→</span>
        </Link>
      )}

      {step === "guide" && content.videoSteps && (
        <PathVideoCourse
          steps={content.videoSteps}
          onComplete={() => { setGuideDone(true); setStep("quiz"); }}
        />
      )}

      {step === "guide" && !content.videoSteps && (
        <>
          {isGift && (
            <div className="card-neon p-4 mb-4 border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-3">
                <InviteIcon size={32} />
                <p className="text-xs font-extrabold text-secondary">Do&apos;stni taklif qiling!</p>
              </div>
              <button onClick={handleShareInvite} className="btn-3d-accent w-full !text-xs !py-2.5">
                Havolani nusxalash →
              </button>
            </div>
          )}
          <StudyGuide
            sections={content.guide}
            onComplete={() => { setGuideDone(true); setStep("quiz"); }}
            completed={guideDone}
          />
        </>
      )}

      {step === "quiz" && (
        <div className="card-neon p-4 mb-4">
          <h3 className="font-extrabold text-secondary text-sm mb-1">Tekshiruv savollari</h3>
          <p className="text-[10px] text-gray-400 mb-3">Simple Bitcoin uslubi — qisqa savollar, 70% dan oshiq kerak</p>
          <div className="space-y-4">
            {content.quiz.map((q, qi) => (
              <div key={qi}>
                <p className="text-xs font-bold text-secondary mb-2">{q.question}</p>
                <div className="space-y-1.5">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => setQuizAnswers({ ...quizAnswers, [qi]: oi })}
                      className={`w-full text-left text-xs p-2.5 rounded-xl font-medium transition-all ${
                        quizAnswers[qi] === oi ? "bg-duo-yellow/30 border-2 border-duo-yellow" : "bg-gray-50"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleQuizSubmit}
            disabled={Object.keys(quizAnswers).length < content.quiz.length}
            className="btn-3d-primary w-full mt-4 !text-sm disabled:opacity-40"
          >
            Tekshirish
          </button>
        </div>
      )}

      {step === "done" && (
        <div className="card-neon p-6 text-center border-2 border-accent">
          <span className="text-4xl">{isGift ? "🎁" : node.type === "certificate" ? "🏆" : "⭐"}</span>
          <p className="font-extrabold text-secondary mt-2">Bosqich tugallandi!</p>
          <p className="text-sm text-gray-500 mt-1">Keyingi demo taxtachada o&apos;yinni bajaring</p>
          <Link href="/dashboard" className="btn-3d-primary mt-4 inline-block !text-sm">Ko&apos;priqqa qaytish →</Link>
        </div>
      )}
    </div>
  );
}
