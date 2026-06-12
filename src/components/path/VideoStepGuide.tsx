"use client";

import { motion } from "framer-motion";
import type { PathGuide } from "@/lib/pathContent";
import { useTranslation } from "@/i18n/provider";

interface Props {
  guide: PathGuide;
  videoTitle: string;
  stepNum: number;
  totalSteps: number;
  onComplete: () => void;
}

export function VideoStepGuide({ guide, videoTitle, stepNum, totalSteps, onComplete }: Props) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      className="pvc-guide-card"
    >
      <div className="pvc-guide-icon">📖</div>
      <p className="text-[10px] font-bold text-accent uppercase tracking-wider mb-1">
        {t("path.videoGuideLabel", { n: stepNum, total: totalSteps })}
      </p>
      <h3 className="pvc-guide-title">{guide.title}</h3>
      <p className="text-[10px] text-gray-400 mb-3 font-medium">{videoTitle}</p>

      {guide.points.map((point, i) => (
        <div key={`${videoTitle}-p${i}`} className="pvc-guide-point">
          <span className="pvc-guide-point-num">{i + 1}</span>
          <span>{point}</span>
        </div>
      ))}

      <button type="button" onClick={onComplete} className="btn-3d-accent w-full mt-3 !text-sm !py-3">
        {t("path.readGuide")}
      </button>
    </motion.div>
  );
}
