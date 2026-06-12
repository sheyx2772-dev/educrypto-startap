"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { VideoLessonIcon, TaskIcon, ShieldIcon, MarketIcon } from "@/components/icons/FeatureIcons";
import { useTranslation } from "@/i18n/provider";

const featureKeys = [
  { key: "video" as const, Icon: VideoLessonIcon, color: "border-l-duo-yellow", href: "/lessons" },
  { key: "tasks" as const, Icon: TaskIcon, color: "border-l-accent", href: "/dashboard" },
  { key: "security" as const, Icon: ShieldIcon, color: "border-l-warning", href: "/onboarding" },
  { key: "market" as const, Icon: MarketIcon, color: "border-l-duo-yellow", href: "/marketplace" },
];

export function FeaturesSection() {
  const { t, messages } = useTranslation();

  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3">{t("landing.featuresTitle")}</h2>
          <p className="text-gray-500 max-w-lg mx-auto font-medium">
            {t("landing.featuresSubtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {featureKeys.map(({ key, Icon, color, href }) => {
            const feature = messages.landing.features[key];
            return (
              <Link key={key} href={href}>
                <Card className={`card-neon border-l-4 ${color} hover:scale-[1.02] transition-transform cursor-pointer h-full`}>
                  <div className="mb-4">
                    <Icon size={44} />
                  </div>
                  <h3 className="text-xl font-extrabold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{feature.desc}</p>
                  <span className="inline-block mt-4 text-accent font-bold text-sm">{t("landing.featureView")}</span>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
