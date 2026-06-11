"use client";

import type { ReactNode } from "react";
import { Hash, Clock, ArrowRightLeft, Layers, Zap, GitBranch, Lock } from "lucide-react";
import type { BlockField as BlockFieldType } from "@/types/blockchain-game";

interface BlockFieldProps {
  field: BlockFieldType;
  index: number;
  isCorrectPosition: boolean;
  isDraggable: boolean;
}

const FIELD_ICONS: Record<string, ReactNode> = {
  hash: <Hash size={14} />,
  nonce: <Zap size={14} />,
  timestamp: <Clock size={14} />,
  transaction: <ArrowRightLeft size={14} />,
  prev_hash: <GitBranch size={14} />,
  merkle_root: <Layers size={14} />,
};

const METAL_CLASS: Record<string, string> = {
  hash: "bz-metal-hash",
  nonce: "bz-metal-nonce",
  timestamp: "bz-metal-timestamp",
  transaction: "bz-metal-transaction",
  prev_hash: "bz-metal-prev_hash",
  merkle_root: "bz-metal-merkle_root",
};

export default function BlockField({
  field,
  index,
  isCorrectPosition,
  isDraggable,
}: BlockFieldProps) {
  const metalType = METAL_CLASS[field.type] || METAL_CLASS.hash;
  const locked = field.locked || !isDraggable;

  return (
    <div
      className={`bz-metal-block ${isCorrectPosition ? "bz-metal-success" : metalType} ${
        locked ? "bz-metal-locked" : ""
      } ${!locked && isDraggable ? "bz-metal-draggable cursor-grab active:cursor-grabbing touch-none" : ""}`}
      title={field.description}
    >
      <div className="bz-metal-shine" aria-hidden />
      <div className="bz-metal-edge" aria-hidden />

      <div className="bz-metal-face flex items-center gap-2 px-2.5 py-2.5">
        <span className="bz-metal-index shrink-0">{index + 1}</span>

        <div className="bz-metal-icon shrink-0">
          {locked ? <Lock size={13} /> : FIELD_ICONS[field.type]}
        </div>

        <div className="flex-1 min-w-0">
          <div className="bz-metal-text text-[9px] font-extrabold uppercase tracking-wide truncate">
            {field.label}
          </div>
          <div className="bz-metal-sub text-[11px] font-mono font-bold truncate">
            {field.value}
          </div>
        </div>

        {isCorrectPosition && (
          <span className="bz-metal-text text-sm font-extrabold shrink-0 drop-shadow-md">✓</span>
        )}

        {!locked && isDraggable && !isCorrectPosition && (
          <span className="bz-metal-sub text-[11px] shrink-0 select-none opacity-70">⠿</span>
        )}
      </div>
    </div>
  );
}
