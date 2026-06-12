"use client";

import Image from "next/image";
import { useState } from "react";
import { useProgress } from "@/context/ProgressContext";
import { products } from "@/lib/products";
import { CoinIcon } from "@/components/icons/NavIcons";
import { useTranslation } from "@/i18n/provider";

export default function MarketplacePage() {
  const { t } = useTranslation();
  const { progress } = useProgress();
  const [selected, setSelected] = useState<number | null>(null);
  const selectedProduct = products.find((p) => p.id === selected);

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold">{t("marketplace.title")}</h1>
          <p className="text-gray-500 text-sm">{t("marketplace.productCount", { n: products.length })}</p>
        </div>
        <div className="coin-badge-neon flex items-center gap-1.5 px-3 py-2 rounded-full">
          <CoinIcon size={18} />
          <span className="font-extrabold text-secondary text-sm">{progress.coins}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {products.map((item) => {
          const canBuy = progress.coins >= item.price;
          return (
            <div
              key={item.id}
              className={`card-neon overflow-hidden transition-all hover:scale-[1.02] ${canBuy ? "border border-accent/20" : ""}`}
            >
              <div className="relative h-32 bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 200px"
                  className="object-cover"
                />
                <span className="absolute top-2 left-2 text-[9px] font-extrabold bg-secondary/80 text-white px-2 py-0.5 rounded-full uppercase">
                  {item.tag}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-secondary text-xs leading-snug line-clamp-2">{item.name}</h3>
                <p className="text-accent font-extrabold text-sm my-1.5">{item.price} USDT</p>
                <button
                  disabled={!canBuy}
                  onClick={() => canBuy && setSelected(item.id)}
                  className="btn-3d-primary !py-1.5 !px-3 !text-[10px] w-full disabled:opacity-40"
                >
                  {canBuy ? t("marketplace.buy") : t("marketplace.notEnough")}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedProduct && (
        <div className="card-neon p-5 border-2 border-accent mb-6">
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <Image src={selectedProduct.image} alt={selectedProduct.name} fill sizes="80px" className="object-cover" />
            </div>
            <div>
              <h3 className="font-extrabold text-secondary">{selectedProduct.name}</h3>
              <p className="text-accent font-bold">{selectedProduct.price} USDT</p>
              <p className="text-xs text-gray-500 mt-1">{t("marketplace.delivery")}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            {["Click", "Payme", "Uzcard"].map((p) => (
              <span key={p} className="text-xs bg-duo-yellow/20 px-3 py-1.5 rounded-lg font-bold text-secondary neon-badge">{p}</span>
            ))}
          </div>
          <button onClick={() => setSelected(null)} className="mt-3 text-xs text-gray-400 hover:text-secondary w-full text-center">
            {t("common.close")}
          </button>
        </div>
      )}
    </div>
  );
}
