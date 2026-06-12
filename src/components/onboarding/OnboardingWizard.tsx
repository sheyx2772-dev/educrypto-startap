"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { EduMascot } from "@/components/mascot/EduMascot";
import { Button } from "@/components/ui/Button";
import { useProgress } from "@/context/ProgressContext";
import { STARTER_COINS, STARTER_PRICE_SUM } from "@/lib/progress";
import { PhoneIcon, KycIcon, OneIdIcon, PaymentIcon, InviteIcon, ClickPayIcon } from "@/components/icons/FeatureIcons";
import { CoinIcon } from "@/components/icons/NavIcons";
import type { MascotState } from "@/types/mascot";
import { useTranslation } from "@/i18n/provider";
import { getDefaultUsername } from "@/i18n/localize";

export function OnboardingWizard() {
  const router = useRouter();
  const { t, messages, locale } = useTranslation();
  const defaultUsername = getDefaultUsername(locale, messages);
  const { payToStart, inviteToStart, shareInvite, updateUsername, progress } = useProgress();

  const steps = [
    { id: 1, title: t("onboarding.step1Title"), description: t("onboarding.step1Desc"), mascot: "idle" as MascotState, field: "phone", Icon: PhoneIcon },
    { id: 2, title: t("onboarding.step2Title"), description: t("onboarding.step2Desc"), mascot: "thinking" as MascotState, field: "kyc", Icon: KycIcon },
    { id: 3, title: t("onboarding.step3Title"), description: t("onboarding.step3Desc"), mascot: "happy" as MascotState, field: "oneid", Icon: OneIdIcon },
    { id: 4, title: t("onboarding.step4Title"), description: t("onboarding.step4Desc"), mascot: "happy" as MascotState, field: "starter", Icon: PaymentIcon },
  ];
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [fullName, setFullName] = useState(
    progress.username && progress.username !== defaultUsername ? progress.username : ""
  );
  const [copied, setCopied] = useState(false);
  const current = steps[step];

  const inviteLink = typeof window !== "undefined"
    ? `${window.location.origin}/onboarding?ref=${progress.inviteCode}`
    : `/onboarding?ref=${progress.inviteCode}`;

  const handleCopyInvite = async () => {
    shareInvite();
    await navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNext = () => {
    if (step === 0 && fullName.trim()) {
      updateUsername(fullName.trim());
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else if (progress.hasStarted) {
      router.push("/dashboard");
    }
  };

  const persistName = () => {
    if (fullName.trim()) updateUsername(fullName.trim());
  };

  const handlePayment = (method: "click" | "payme") => {
    persistName();
    payToStart(method);
    router.push("/dashboard");
  };

  const handleInviteStart = () => {
    persistName();
    inviteToStart();
    router.push("/dashboard");
  };

  return (
    <div className="px-4 py-6 min-h-[calc(100vh-120px)] flex flex-col">
      <div className="flex gap-2 mb-8">
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={`h-3 flex-1 rounded-full transition-all ${i <= step ? "bg-duo-yellow neon-bar" : "bg-gray-200"}`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          className="card-neon p-6 flex-1 flex flex-col"
        >
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-duo-yellow/15 flex items-center justify-center neon-badge">
              <current.Icon size={44} />
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <EduMascot mood={current.mascot} position="inline" size={110} showBubble={false} />
          </div>

          <h2 className="text-2xl font-extrabold text-secondary mb-3 text-center">{current.title}</h2>
          <p className="text-gray-500 text-center mb-6 leading-relaxed text-sm">{current.description}</p>

          {current.field === "phone" && (
            <div className="space-y-3 mb-6">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t("onboarding.fullName")}
                autoComplete="name"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-duo-yellow focus:outline-none transition-colors neon-badge"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("onboarding.phone")}
                autoComplete="tel"
                className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg font-medium focus:border-duo-yellow focus:outline-none transition-colors neon-badge"
              />
              <p className="text-[10px] text-gray-400 text-center">
                {t("onboarding.fullNameHint")}
              </p>
            </div>
          )}

          {current.field === "kyc" && (
            <div className="bg-accent/10 border-2 border-accent/30 rounded-2xl p-4 mb-6">
              <p className="text-sm font-semibold text-secondary">{t("onboarding.step2Badge")}</p>
              <p className="text-xs text-gray-500 mt-1">{t("onboarding.step2Privacy")}</p>
            </div>
          )}

          {current.field === "oneid" && (
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-2xl border-2 border-duo-yellow flex items-center justify-center bg-white shadow-lg neon-badge">
                <OneIdIcon size={56} />
              </div>
            </div>
          )}

          {current.field === "starter" && !progress.hasStarted && (
            <div className="space-y-4 mb-4">
              <div className="coin-badge-neon flex items-center justify-center gap-2 py-3 rounded-2xl">
                <CoinIcon size={24} />
                <span className="font-extrabold text-secondary text-lg">{STARTER_COINS} {t("onboarding.starterCoins")}</span>
                <span className="text-xs text-gray-500">= {STARTER_PRICE_SUM.toLocaleString()} so&apos;m</span>
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase text-center">{t("onboarding.payVia")}</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handlePayment("click")}
                  className="card-neon p-4 flex flex-col items-center gap-2 hover:scale-[1.02] transition-transform neon-badge"
                >
                  <ClickPayIcon brand="click" size={40} />
                  <span className="text-xs font-extrabold text-secondary">Click</span>
                  <span className="text-[10px] text-gray-400">{STARTER_PRICE_SUM.toLocaleString()} so&apos;m</span>
                </button>
                <button
                  onClick={() => handlePayment("payme")}
                  className="card-neon p-4 flex flex-col items-center gap-2 hover:scale-[1.02] transition-transform neon-badge"
                >
                  <ClickPayIcon brand="payme" size={40} />
                  <span className="text-xs font-extrabold text-secondary">Payme</span>
                  <span className="text-[10px] text-gray-400">{STARTER_PRICE_SUM.toLocaleString()} so&apos;m</span>
                </button>
              </div>

              <div className="flex items-center gap-3 my-2">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs font-bold text-gray-400">{t("onboarding.or")}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase text-center">{t("onboarding.inviteTitle")}</p>
              <div className="card-neon p-4 border-2 border-accent/30">
                <div className="flex items-center gap-3 mb-3">
                  <InviteIcon size={36} />
                  <div>
                    <p className="text-sm font-extrabold text-secondary">+{STARTER_COINS} {t("onboarding.inviteReward")}</p>
                    <p className="text-xs text-gray-400">{t("onboarding.inviteDesc")}</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyInvite}
                  className="btn-3d-accent w-full !text-xs !py-2.5 mb-2"
                >
                  {copied ? t("common.copied") : t("onboarding.copyInvite")}
                </button>
                <button
                  onClick={handleInviteStart}
                  className="w-full text-xs font-bold text-accent hover:underline"
                >
                  {t("onboarding.inviteDone")}
                </button>
              </div>
            </div>
          )}

          {current.field !== "starter" && (
            <div className="mt-auto">
              <Button
                variant="3d-primary"
                fullWidth
                onClick={handleNext}
                className="!text-base"
                disabled={current.field === "phone" && !fullName.trim()}
              >
                {t("common.continue")}
              </Button>
            </div>
          )}

          {current.field === "starter" && progress.hasStarted && (
            <div className="mt-auto">
              <Button variant="3d-primary" fullWidth onClick={() => router.push("/dashboard")} className="!text-base">
                {t("onboarding.goDashboard")}
              </Button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <p className="text-center text-xs text-gray-400 mt-4">
        {t("common.step")} {step + 1} / {steps.length}
      </p>
    </div>
  );
}
