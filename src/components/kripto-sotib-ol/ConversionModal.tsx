"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ASSET_META, formatUsd, getRate } from "@/lib/kripto-sotib-ol/market";
import type { MarketRate, StallProduct } from "@/lib/kripto-sotib-ol/types";
import { CryptoCalculator } from "./CryptoCalculator";

interface Props {
  product: StallProduct;
  rates: MarketRate[];
  lastMessage: string;
  onSubmit: (amount: number) => void;
  onClose: () => void;
}

export function ConversionModal({ product, rates, lastMessage, onSubmit, onClose }: Props) {
  const [input, setInput] = useState("");
  const rate = getRate(rates, product.payWith);
  const sym = ASSET_META[product.payWith].symbol;
  const gas = product.gasUsd ?? 0;

  const appendDigit = (d: string) => {
    if (d === "0" && input === "0") return;
    if (input.length >= 14) return;
    setInput((prev) => (prev === "0" ? d : prev + d));
  };

  const appendDot = () => {
    if (input.includes(".")) return;
    setInput((prev) => (prev ? prev + "." : "0."));
  };

  const clearAll = () => setInput("");
  const backspace = () => setInput((prev) => prev.slice(0, -1));

  const handleSubmit = () => {
    const val = parseFloat(input);
    if (!Number.isFinite(val) || val <= 0) return;
    onSubmit(val);
  };

  const isFail = lastMessage && !lastMessage.includes("muvaffaqiyatli");

  return (
    <div className="kso-modal-backdrop" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="kso-modal kso-modal-calc"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="kso-modal-header">
          <Image
            src="/game/kripto-sotib-ol/savatcha-hero.png"
            alt="Kassa"
            width={36}
            height={36}
            className="kso-modal-logo"
            unoptimized
          />
          <div>
            <p className="kso-modal-brand">Kripto-Kassa</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Image
                src={product.image}
                alt={product.nameUz}
                width={32}
                height={28}
                className="object-contain"
                unoptimized
              />
              <h3 className="kso-modal-title">{product.nameUz}</h3>
            </div>
          </div>
        </div>

        <div className="kso-modal-info">
          <span>{formatUsd(product.priceUsd)}</span>
          {gas > 0 && <span>+ {formatUsd(gas)} gas</span>}
          <span className="kso-modal-rate">1 {sym} = {formatUsd(rate)}</span>
        </div>

        <CryptoCalculator
          display={input}
          suffix={sym}
          onDigit={appendDigit}
          onDot={appendDot}
          onClear={clearAll}
          onBackspace={backspace}
          onSubmit={handleSubmit}
          canSubmit={!!input && parseFloat(input) > 0}
        />

        {lastMessage && (
          <p className={isFail ? "kso-tx-fail" : "kso-tx-ok"}>{lastMessage}</p>
        )}

        <button type="button" className="kso-calc-close" onClick={onClose}>
          Bekor qilish
        </button>
      </motion.div>
    </div>
  );
}
