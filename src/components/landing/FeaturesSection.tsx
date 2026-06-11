import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { VideoLessonIcon, TaskIcon, ShieldIcon, MarketIcon } from "@/components/icons/FeatureIcons";

const features = [
  {
    title: "Video darsliklar",
    description: "AI yordamchisi Shlyapa-Coin bilan interaktiv video darslar. Savollaringizga ovozli javob oling.",
    Icon: VideoLessonIcon,
    color: "border-l-duo-yellow",
    href: "/lessons",
  },
  {
    title: "Mikro-vazifalar",
    description: "Qisqa vazifalarni bajaring va stablecoin mukofotlarini yig'ing. O'rganish o'yin bilan birga.",
    Icon: TaskIcon,
    color: "border-l-accent",
    href: "/dashboard",
  },
  {
    title: "Xavfsizlik",
    description: "NAPP qoidalariga mos KYC va xavfli kripto-aktivlar haqida ogohlantirishlar. OneID integratsiyasi.",
    Icon: ShieldIcon,
    color: "border-l-warning",
    href: "/onboarding",
  },
  {
    title: "Marketplace",
    description: "Yig'ilgan stablecoinlarni elektronika mahsulotlariga almashtiring. Click, Payme, Uzcard.",
    Icon: MarketIcon,
    color: "border-l-duo-yellow",
    href: "/marketplace",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold mb-3">Asosiy imkoniyatlar</h2>
          <p className="text-gray-500 max-w-lg mx-auto font-medium">
            Bitcoin, Ethereum, stablecoin va boshqa crypto coinlar uchun ta&apos;lim platformasi
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className={`card-neon border-l-4 ${feature.color} hover:scale-[1.02] transition-transform cursor-pointer h-full`}>
                <div className="mb-4">
                  <feature.Icon size={44} />
                </div>
                <h3 className="text-xl font-extrabold mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">{feature.description}</p>
                <span className="inline-block mt-4 text-accent font-bold text-sm">Ko&apos;rish →</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
