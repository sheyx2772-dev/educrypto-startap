"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import type { Block } from "@/types/blockchain-game";
import { useGameStore } from "@/lib/blockchain-zanjiri/game-store";
import { checkFieldOrder } from "@/lib/blockchain-zanjiri/game-data";
import BlockField from "./BlockField";
import { BookOpen, Check, Link2 } from "lucide-react";

interface BlockCardProps {
  block: Block;
  levelIndex: number;
  onBlockCorrect: (blockId: string) => void;
}

export default function BlockCard({ block, levelIndex, onBlockCorrect }: BlockCardProps) {
  const {
    fieldOrders,
    initFieldOrder,
    reorderFields,
    correctBlocks,
    markBlockCorrect,
  } = useGameStore();

  const [showConceptLocal, setShowConceptLocal] = useState(false);
  const [wrongAttempt, setWrongAttempt] = useState(false);

  const initialOrder = useMemo(() => block.fields.map((f) => f.id), [block.fields]);

  useEffect(() => {
    initFieldOrder(block.id, initialOrder);
  }, [block.id, initialOrder, initFieldOrder]);

  const currentOrder = fieldOrders[block.id] || initialOrder;
  const isCorrect = correctBlocks.includes(block.id);
  const canReorder = !block.isComplete && !isCorrect;

  const handleReorder = useCallback(
    (newOrder: string[]) => {
      if (!canReorder) return;
      reorderFields(block.id, newOrder);
    },
    [canReorder, block.id, reorderFields]
  );

  const handleDragEnd = useCallback(() => {
    if (!canReorder || isCorrect) return;
    const order = useGameStore.getState().fieldOrders[block.id] || initialOrder;
    const orderedFields = order.map((id) => block.fields.find((f) => f.id === id)!).filter(Boolean);

    if (checkFieldOrder(orderedFields)) {
      setWrongAttempt(false);
      markBlockCorrect(block.id);
      onBlockCorrect(block.id);
    } else {
      setWrongAttempt(true);
      setTimeout(() => setWrongAttempt(false), 400);
    }
  }, [canReorder, isCorrect, block, initialOrder, markBlockCorrect, onBlockCorrect]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: levelIndex * 0.08, type: "spring", stiffness: 200, damping: 22 }}
      className="relative"
    >
      {!block.isGenesis && (
        <div className="flex flex-col items-center mb-0.5">
          <div className={`w-0.5 h-3 rounded-full ${isCorrect ? "bz-chain-link done" : "bz-chain-link"}`} />
          <Link2 size={11} className={isCorrect ? "text-emerald-400" : "text-indigo-400"} />
        </div>
      )}

      <motion.div
        animate={wrongAttempt ? { x: [-6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-xl overflow-hidden transition-all ${
          isCorrect || block.isComplete
            ? "ring-2 ring-emerald-400/60 bg-white"
            : wrongAttempt
              ? "ring-2 ring-red-400/60 bg-white"
              : "bg-white shadow-lg shadow-black/8"
        }`}
      >
        <div
          className={`px-3 py-2 flex items-center justify-between gap-2 ${
            isCorrect || block.isComplete
              ? "bg-gradient-to-r from-emerald-400 to-green-500"
              : "bg-gradient-to-r from-indigo-500 to-violet-600"
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 ${
                isCorrect || block.isComplete ? "bg-white text-emerald-600" : "bg-duo-yellow text-secondary"
              }`}
            >
              {isCorrect || block.isComplete ? <Check size={14} /> : block.index}
            </div>
            <div className="min-w-0">
              <h3 className="text-xs font-extrabold text-white truncate">{block.title}</h3>
              <p className="text-[9px] font-bold text-white/70">
                {block.isComplete ? "Tayyor" : isCorrect ? "To'g'ri ✓" : "Bosib surib tartiblang"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowConceptLocal(!showConceptLocal)}
            className="p-1.5 rounded-lg bg-white/15 text-duo-yellow shrink-0"
          >
            <BookOpen size={13} />
          </button>
        </div>

        <AnimatePresence>
          {showConceptLocal && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <p className="px-3 py-2 text-[10px] text-amber-900 bg-amber-50 border-b border-amber-200 leading-snug">
                💡 {block.conceptUz}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="p-2.5 bg-gradient-to-b from-slate-700 to-slate-800 rounded-b-xl">
          {canReorder && (
            <p className="text-[9px] font-bold text-slate-300 text-center mb-2">
              Metall blokni bosib ushlab suring
            </p>
          )}

          {canReorder ? (
            <Reorder.Group
              axis="y"
              values={currentOrder}
              onReorder={handleReorder}
              className="flex flex-col gap-2"
            >
              {currentOrder.map((fieldId, idx) => {
                const field = block.fields.find((f) => f.id === fieldId)!;
                const dragEnabled = !field.locked;

                return (
                  <Reorder.Item
                    key={fieldId}
                    value={fieldId}
                    dragListener={dragEnabled}
                    onDragEnd={dragEnabled ? handleDragEnd : undefined}
                    className={dragEnabled ? "touch-none" : ""}
                    whileDrag={{
                      scale: 1.04,
                      boxShadow: "0 8px 28px rgba(99,102,241,0.35)",
                      zIndex: 50,
                    }}
                  >
                    <BlockField
                      field={field}
                      index={idx}
                      isCorrectPosition={false}
                      isDraggable={dragEnabled}
                    />
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          ) : (
            <div className="flex flex-col gap-2">
              {currentOrder.map((fieldId, idx) => {
                const field = block.fields.find((f) => f.id === fieldId)!;
                return (
                  <BlockField
                    key={fieldId}
                    field={field}
                    index={idx}
                    isCorrectPosition={isCorrect || block.isComplete}
                    isDraggable={false}
                  />
                );
              })}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
