"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { formatUsd } from "@/lib/kripto-sotib-ol/market";
import type { StallProduct } from "@/lib/kripto-sotib-ol/types";

const LOGO = "/game/kripto-sotib-ol/savatcha-logo.png";

interface Props {
  selected: StallProduct | null;
  shake: boolean;
  onOpenCheckout: () => void;
}

export const PaymentCenter = forwardRef<HTMLDivElement, Props>(
  function PaymentCenter({ selected, shake, onOpenCheckout }, ref) {
    return (
      <div
        ref={ref}
        className={`kso-payment-center ${selected ? "active" : ""} ${shake ? "shake" : ""}`}
      >
        <div className="kso-payment-logo-wrap">
          <Image
            src={LOGO}
            alt="Savatcha"
            width={80}
            height={80}
            className="kso-payment-logo"
            unoptimized
            priority
          />
        </div>
        <p className="kso-payment-title">Tranzaksiya Markazi</p>
        {selected ? (
          <div className="mt-3 w-full">
            <div className="flex justify-center mb-2">
              <Image
                src={selected.image}
                alt={selected.nameUz}
                width={80}
                height={60}
                className="object-contain drop-shadow-lg"
                unoptimized
              />
            </div>
            <p className="kso-payment-product">{selected.nameUz}</p>
            <p className="kso-payment-price">
              {formatUsd(selected.priceUsd)}
              {selected.gasUsd ? ` + $${selected.gasUsd} gas` : ""}
            </p>
            <p className="kso-payment-hint">
              Kassada kripto tanlang va hisoblang
            </p>
            <button type="button" className="gplay-btn gplay-btn-sm mt-3" onClick={onOpenCheckout}>
              Kassani ochish
            </button>
          </div>
        ) : (
          <p className="kso-payment-desc">
            Pastdagi rastadan narsani bu yerga torting yoki bosing — keyin kripto miqdorini kiriting
          </p>
        )}
      </div>
    );
  }
);
