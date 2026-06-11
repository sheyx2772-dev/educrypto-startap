"use client";

import { useMarketStore } from "@/lib/kripto-koinot/store";

const REASON_LABEL: Record<string, string> = {
  wrong_orbit: "Noto'g'ri orbita — sayyora portladi!",
  black_hole: "Qora tuynuk yutdi — Market Crash!",
  timeout: "Vaqt tugadi — sayyora yo'qoldi!",
  market_crash: "Bozor qulashi!",
};

export function EducationalModal() {
  const modal = useMarketStore((s) => s.activeModal);
  const dismiss = useMarketStore((s) => s.dismissModal);
  const phase = useMarketStore((s) => s.phase);

  if (!modal || phase !== "modal") return null;

  return (
    <div className="kk-modal-backdrop" onClick={dismiss}>
      <div className="kk-modal" onClick={(e) => e.stopPropagation()}>
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-red-400 mb-1">
          {REASON_LABEL[modal.reason] ?? "Ogohlantirish"}
        </p>
        <h3 className="text-base font-extrabold text-white mb-2">{modal.title}</h3>
        <p className="text-sm text-gray-300 leading-relaxed mb-4">{modal.body}</p>
        <button type="button" onClick={dismiss} className="gplay-btn gplay-btn-sm w-full max-w-full">
          Tushundim — davom etish
        </button>
      </div>
    </div>
  );
}
