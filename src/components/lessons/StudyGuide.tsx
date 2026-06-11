"use client";

import { motion } from "framer-motion";
import type { GuideSection } from "@/lib/lessonContent";

interface StudyGuideProps {
  sections: GuideSection[];
  onComplete: () => void;
  completed: boolean;
}

export function StudyGuide({ sections, onComplete, completed }: StudyGuideProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-lg neon-glow-accent">📖</div>
        <h3 className="font-extrabold text-secondary">Qo&apos;llanma</h3>
        {completed && <span className="text-xs font-bold text-accent ml-auto">✓ O&apos;qildi</span>}
      </div>

      {sections.map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card-neon p-4"
        >
          <h4 className="font-bold text-secondary text-sm mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-duo-yellow text-xs font-extrabold flex items-center justify-center">
              {i + 1}
            </span>
            {section.title}
          </h4>
          <ul className="space-y-2">
            {section.points.map((point, j) => (
              <li key={j} className="text-sm text-gray-600 flex gap-2 leading-relaxed">
                <span className="text-accent font-bold shrink-0">•</span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}

      {!completed && (
        <button onClick={onComplete} className="btn-3d-accent w-full !text-sm !py-3">
          Qo&apos;llanmani o&apos;qidim → Testga o&apos;tish
        </button>
      )}
    </div>
  );
}
