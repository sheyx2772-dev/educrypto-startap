"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SparkleBurst } from "@/components/lessons/SparkleBurst";
import { certificateMeta } from "@/lib/pathContent";

interface NappCertificateProps {
  certKey: "beginner" | "advanced" | "ai";
  username: string;
  show: boolean;
  onClose: () => void;
}

export function NappCertificate({ certKey, username, show, onClose }: NappCertificateProps) {
  const ref = useRef<HTMLDivElement>(null);
  const meta = certificateMeta[certKey];
  const date = new Date().toLocaleDateString("uz-UZ", { year: "numeric", month: "long", day: "numeric" });

  const handleDownload = () => {
    const el = ref.current;
    if (!el) return;
    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${meta.title}</title>
      <style>body{font-family:Georgia,serif;text-align:center;padding:40px;background:#fffdf5}
      .cert{border:8px double #ffd700;padding:40px;max-width:700px;margin:0 auto}
      h1{color:#2c3e50;font-size:28px}h2{color:#48c9a3;font-size:18px}
      .seal{width:80px;height:80px;border-radius:50%;background:#ffd700;margin:20px auto;line-height:80px;font-size:32px}
      </style></head><body>${el.innerHTML}</body></html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `NAPP-${certKey}-sertifikat.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w || !ref.current) return;
    w.document.write(`<html><head><title>${meta.title}</title></head><body>${ref.current.innerHTML}</body></html>`);
    w.document.close();
    w.print();
  };

  return (
    <>
      <SparkleBurst show={show} />
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border-4 border-duo-yellow max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.5, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-center mb-4">
                <motion.span
                  className="text-5xl block"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: 3, duration: 0.5 }}
                >
                  🏆
                </motion.span>
                <p className="text-xs font-bold text-accent uppercase mt-2">NAPP tasdiqlangan</p>
              </div>

              <div ref={ref} className="cert-print-area border-4 border-double border-duo-yellow rounded-2xl p-5 bg-gradient-to-b from-duo-yellow/10 to-white text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">O&apos;zbekiston Respublikasi</p>
                <h2 className="text-lg font-extrabold text-secondary mt-2">{meta.title}</h2>
                <p className="text-xs text-accent font-bold mt-1">{meta.subtitle}</p>
                <div className="w-16 h-16 rounded-full bg-duo-yellow mx-auto my-4 flex items-center justify-center text-2xl neon-badge">✓</div>
                <p className="text-sm text-gray-600">Bu sertifikat</p>
                <p className="text-xl font-extrabold text-secondary my-2">{username}</p>
                <p className="text-xs text-gray-500">nomiga {meta.level} darajada beriladi</p>
                <p className="text-[10px] text-gray-400 mt-4">{date}</p>
                <p className="text-[9px] text-gray-300 mt-2">EduCrypto · NAPP mos keladi</p>
              </div>

              <div className="flex gap-2 mt-4">
                <button onClick={handleDownload} className="btn-3d-primary flex-1 !text-xs !py-2.5">
                  Yuklab olish
                </button>
                <button onClick={handlePrint} className="btn-3d-accent flex-1 !text-xs !py-2.5">
                  PDF (chop)
                </button>
              </div>
              <button onClick={onClose} className="w-full text-center text-xs text-gray-400 mt-3 hover:text-secondary">
                Yopish
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
