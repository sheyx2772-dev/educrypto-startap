"use client";

import { Button } from "@/components/ui/Button";
import { useTranslation } from "@/i18n/provider";

export function ReadySection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-4 bg-duo-yellow text-center">
      <h2 className="text-3xl font-extrabold text-secondary mb-4">{t("landing.readyTitle")}</h2>
      <p className="text-secondary/70 font-medium mb-8 max-w-md mx-auto">
        {t("landing.readySubtitle")}
      </p>
      <Button
        href="/onboarding"
        variant="3d-accent"
        className="!bg-white !text-secondary !shadow-[0_6px_0_#ccc]"
      >
        {t("landing.readyCta")}
      </Button>
    </section>
  );
}
