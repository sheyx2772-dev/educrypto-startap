import { HeroSection } from "@/components/landing/HeroSection";
import { AdBanner } from "@/components/landing/AdBanner";
import { OnboardingFlow } from "@/components/landing/OnboardingFlow";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { MascotDemo } from "@/components/mascot/MascotDemo";
import { ReadySection } from "@/components/landing/ReadySection";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <AdBanner />
      <OnboardingFlow />
      <FeaturesSection />
      <section id="mascot">
        <MascotDemo />
      </section>

      <ReadySection />
    </>
  );
}
