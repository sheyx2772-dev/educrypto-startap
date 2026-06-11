"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { EduMascot } from "@/components/mascot/EduMascot";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Yellow gradient hero background */}
      <div className="absolute inset-0 bg-gradient-to-br from-duo-yellow/30 via-background to-accent/10 -z-10" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-duo-yellow/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md border-2 border-duo-yellow/40 mb-6">
              <Image src="/assets/mascot/icon.png" alt="" width={28} height={28} className="rounded-lg" unoptimized />
              <span className="text-sm font-bold text-secondary">
                NAPP tasdiqlangan platforma
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary mb-6 leading-[1.1]">
              <span className="text-duo-yellow drop-shadow-sm">Crypto</span>ni{" "}
              o&apos;yin orqali o&apos;rganing!
            </h1>

            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-medium">
              Bitcoin, Ethereum, stablecoin va boshqa coinlarni o&apos;rganing.
              Mukofot yig&apos;ing va elektronika sotib oling.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button href="/onboarding" variant="3d-primary" className="!text-center">
                Boshlash
              </Button>
              <Button href="/dashboard" variant="3d-accent" className="!text-center !text-sm">
                Ilovaga kirish →
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-6">
              {[
                { num: "5", label: "Bosqich" },
                { num: "73", label: "Crypto darslik" },
                { num: "1000", label: "USDT mukofot" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-extrabold text-secondary">{stat.num}</p>
                  <p className="text-xs text-gray-400 font-semibold">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Phone mockup frame */}
            <div className="relative w-[280px] md:w-[320px]">
              <div className="rounded-[2.5rem] border-4 border-secondary bg-duo-yellow p-2 shadow-2xl">
                <div className="rounded-[2rem] bg-white overflow-hidden">
                  <div className="bg-duo-yellow px-4 py-3 flex justify-between items-center border-b-4 border-primary-dark">
                    <span className="font-extrabold text-sm">Crypto o&apos;rganing</span>
                    <span className="coin-badge !text-xs">🪙 1050</span>
                  </div>
                  <div className="p-6 flex flex-col items-center gap-4 bg-app-bg min-h-[340px]">
                    <EduMascot mood="happy" position="inline" size={120} showBubble={false} />
                    <div className="flex gap-1">
                      <span className="text-xl">⭐</span>
                      <span className="text-xl opacity-30">⭐</span>
                      <span className="text-xl opacity-30">⭐</span>
                    </div>
                    <div className="flex flex-col gap-3 w-full mt-2">
                      {["🪙", "Ξ", "✓"].map((icon, i) => (
                        <div
                          key={i}
                          className={`w-16 h-16 rounded-full bg-duo-yellow flex items-center justify-center text-xl font-bold shadow-[0_4px_0_#e6a800] ${
                            i === 0 ? "ml-0" : i === 1 ? "ml-auto" : "mx-auto"
                          }`}
                        >
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-secondary border-t-2 border-duo-yellow/30 py-2 flex justify-around px-2">
                    {["Bosh", "Dars", "Do'kon", "Profil"].map((label) => (
                      <span key={label} className="text-[8px] font-extrabold text-duo-yellow/70 uppercase">{label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
