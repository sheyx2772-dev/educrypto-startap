"use client";

import { motion, AnimatePresence } from "framer-motion";
import { EduMascot } from "@/components/mascot/EduMascot";
import { SparkleBurst } from "./SparkleBurst";

interface CoinCelebrationProps {
  show: boolean;
  amount: number;
  message?: string;
  onDone?: () => void;
}

export function CoinCelebration({ show, amount, message, onDone }: CoinCelebrationProps) {
  return (
    <>
      <SparkleBurst show={show} />
      <AnimatePresence onExitComplete={onDone}>
        {show && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onDone}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 mx-6 text-center max-w-sm shadow-2xl border-4 border-duo-yellow"
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <EduMascot mood="happy" message={message ?? `Ura! +${amount} USDT yutdingiz!`} position="inline" size={150} />
              <motion.p
                className="text-3xl font-extrabold text-accent mt-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: 3, duration: 0.5 }}
              >
                +{amount} USDT
              </motion.p>
              <button onClick={onDone} className="btn-3d-primary mt-6 !text-sm !py-3 !px-8">
                Ajoyib!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
