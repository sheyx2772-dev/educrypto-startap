"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import { onboardingSteps } from "@/lib/design-tokens";
import { PhoneIcon, KycIcon, VideoLessonIcon, TaskIcon, MarketIcon } from "@/components/icons/FeatureIcons";
import { useTranslation } from "@/i18n/provider";

const stepIconMap: Record<string, ComponentType<{ size?: number }>> = {
  user: PhoneIcon,
  id: KycIcon,
  video: VideoLessonIcon,
  tasks: TaskIcon,
  gift: MarketIcon,
};

export function OnboardingFlow() {
  const { t } = useTranslation();

  return (
    <section id="onboarding" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold mb-3">{t("landing.userJourney")}</h2>
        <p className="text-gray-500 mb-12 font-medium">
          {t("landing.userJourneyDesc")}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mb-10">
          {onboardingSteps.map((step, index) => {
            const Icon = stepIconMap[step.icon] ?? PhoneIcon;
            return (
              <div key={step.id} className="flex flex-col md:flex-row items-center flex-1">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-3xl bg-duo-yellow/15 flex items-center justify-center shadow-[0_6px_0_#e6a80033] border-2 border-duo-yellow/30 mb-3 neon-badge">
                    <Icon size={40} />
                  </div>
                  <span className="text-xs font-extrabold text-secondary uppercase tracking-wider max-w-[100px]">
                    {step.label}
                  </span>
                </div>
                {index < onboardingSteps.length - 1 && (
                  <div className="hidden md:block flex-1 h-1 bg-duo-yellow/40 mx-3 rounded-full mt-[-28px] neon-bar" />
                )}
              </div>
            );
          })}
        </div>

        <Link href="/onboarding" className="btn-3d-primary inline-block !text-base">
          {t("landing.startNow")}
        </Link>
      </div>
    </section>
  );
}
