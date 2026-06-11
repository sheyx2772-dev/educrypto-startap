import { HeroSection } from "@/components/landing/HeroSection";
import { AdBanner } from "@/components/landing/AdBanner";
import { OnboardingFlow } from "@/components/landing/OnboardingFlow";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { MascotDemo } from "@/components/mascot/MascotDemo";
import { Button } from "@/components/ui/Button";

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

      <section className="py-16 px-4 bg-duo-yellow text-center">
        <h2 className="text-3xl font-extrabold text-secondary mb-4">Tayyormisiz?</h2>
        <p className="text-secondary/70 font-medium mb-8 max-w-md mx-auto">
          Bugun birinchi crypto mukofotingizni yutib oling!
        </p>
        <Button
          href="/onboarding"
          variant="3d-accent"
          className="!bg-white !text-secondary !shadow-[0_6px_0_#ccc]"
        >
          Bepul boshlash
        </Button>
      </section>
    </>
  );
}
