"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ASSET_META, formatUsd } from "@/lib/kripto-sotib-ol/market";
import type { StallProduct } from "@/lib/kripto-sotib-ol/types";

interface Props {
  products: StallProduct[];
  purchasedIds: Set<string>;
  selectedId: string | null;
  onSelect: (p: StallProduct) => void;
  onDragToCenter: (p: StallProduct) => void;
  paymentCenterRef: React.RefObject<HTMLDivElement | null>;
}

export function StallGrid({
  products,
  purchasedIds,
  selectedId,
  onSelect,
  onDragToCenter,
  paymentCenterRef,
}: Props) {
  const draggingRef = useRef<string | null>(null);

  const hitPaymentCenter = (x: number, y: number) => {
    const el = paymentCenterRef.current;
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  return (
    <div className="kso-stall-section">
      <p className="kso-section-label">🛒 Kripto-Rasta — sotiladigan narsalar</p>
      <div className="kso-stall">
        {products.map((p) => {
          const bought = purchasedIds.has(p.id);
          const sym = ASSET_META[p.payWith].symbol;
          return (
            <motion.div
              key={p.id}
              drag={!bought}
              dragSnapToOrigin
              dragElastic={0.15}
              whileDrag={{ scale: 1.06, zIndex: 10, cursor: "grabbing" }}
              onDragStart={() => { draggingRef.current = p.id; }}
              onDragEnd={(_e, info) => {
                if (draggingRef.current === p.id && hitPaymentCenter(info.point.x, info.point.y)) {
                  onDragToCenter(p);
                }
                draggingRef.current = null;
              }}
              onClick={() => !bought && onSelect(p)}
              className={`kso-stall-item ${selectedId === p.id ? "selected" : ""} ${bought ? "bought" : ""}`}
            >
              {bought && (
                <span className="absolute top-2 right-2 z-10 text-[9px] font-extrabold text-[var(--kso-green)] bg-black/60 px-1.5 py-0.5 rounded">
                  ✓
                </span>
              )}
              <div className="kso-stall-img-wrap">
                <Image
                  src={p.image}
                  alt={p.nameUz}
                  width={120}
                  height={90}
                  className="kso-stall-img"
                  unoptimized
                />
              </div>
              <div className="kso-stall-name">{p.nameUz}</div>
              <div className="kso-stall-price">{formatUsd(p.priceUsd)}</div>
              <div className="kso-stall-pay">
                To&apos;lov: {sym}
                {p.gasUsd ? ` + $${p.gasUsd} gas` : ""}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
