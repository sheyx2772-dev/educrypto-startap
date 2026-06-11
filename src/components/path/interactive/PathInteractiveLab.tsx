"use client";

import dynamic from "next/dynamic";
import type { InteractiveLabId } from "@/lib/pathContent";
import { BlockchainLab } from "./BlockchainLab";
import { MythLab } from "./MythLab";
import { MiningLab } from "./MiningLab";
import { WalletLab } from "./WalletLab";
import { PaymentLab } from "./PaymentLab";
import { AILab } from "./AILab";
import { TangaLab } from "./TangaLab";
import { AssetLab } from "./AssetLab";

const KriptoShaharLab = dynamic(
  () => import("@/components/kripto-shahar/KriptoShaharLab").then((m) => m.KriptoShaharLab),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-[#f4b942]/30 bg-[#06080d] p-8 text-center">
        <p className="text-4xl mb-2 animate-bounce">🏙️</p>
        <p className="text-xs font-bold text-[#f4b942]">Kripto Shahar yuklanmoqda...</p>
      </div>
    ),
  }
);

const KriptoSayohatLab = dynamic(
  () => import("@/components/kripto-sayohat/KriptoSayohatLab").then((m) => m.KriptoSayohatLab),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-cyan-500/30 bg-[#0a1628] p-8 text-center">
        <p className="text-4xl mb-2 animate-bounce">🗺️</p>
        <p className="text-xs font-bold text-cyan-400">Kripto-Sayohat yuklanmoqda...</p>
      </div>
    ),
  }
);

const KriptoKoinotLab = dynamic(
  () => import("@/components/kripto-koinot/KriptoKoinotLab").then((m) => m.KriptoKoinotLab),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-indigo-500/30 bg-[#060a14] p-8 text-center">
        <p className="text-4xl mb-2 animate-bounce">🪐</p>
        <p className="text-xs font-bold text-indigo-400">Kripto-Koinot yuklanmoqda...</p>
      </div>
    ),
  }
);

const KriptoSotibOlLab = dynamic(
  () => import("@/components/kripto-sotib-ol/KriptoSotibOlLab").then((m) => m.KriptoSotibOlLab),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-indigo-500/30 bg-[#060a12] p-8 text-center">
        <p className="text-4xl mb-2 animate-bounce">🛒</p>
        <p className="text-xs font-bold text-indigo-400">Kripto-Sotib Ol yuklanmoqda...</p>
      </div>
    ),
  }
);

interface PathInteractiveLabProps {
  labId: InteractiveLabId;
  title: string;
  onComplete: () => void;
  allowReplay?: boolean;
}

export function PathInteractiveLab({ labId, title, onComplete, allowReplay }: PathInteractiveLabProps) {
  const props = { title, onComplete, allowReplay: allowReplay ?? false };

  switch (labId) {
    case "blockchain":
      return <BlockchainLab {...props} />;
    case "myth":
      return <MythLab {...props} allowReplay={allowReplay ?? false} />;
    case "mining":
      return <MiningLab {...props} />;
    case "wallet":
      return <WalletLab {...props} />;
    case "payment":
      return <PaymentLab {...props} />;
    case "ai":
      return <AILab {...props} />;
    case "tanga":
      return <TangaLab {...props} />;
    case "asset":
      return <AssetLab {...props} />;
    case "kripto-shahar":
      return <KriptoShaharLab {...props} allowReplay={allowReplay ?? true} />;
    case "kripto-sayohat":
      return <KriptoSayohatLab {...props} allowReplay={allowReplay ?? true} />;
    case "kripto-koinot":
      return <KriptoKoinotLab {...props} allowReplay={allowReplay ?? true} />;
    case "kripto-sotib-ol":
      return <KriptoSotibOlLab {...props} allowReplay={allowReplay ?? true} />;
    default:
      return null;
  }
}
