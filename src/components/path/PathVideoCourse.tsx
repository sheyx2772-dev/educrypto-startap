"use client";

import { useState } from "react";
import { VideoPlayer } from "@/components/lessons/VideoPlayer";
import type { PathVideoStep } from "@/lib/pathVideoSteps";

interface PathVideoCourseProps {
  steps: PathVideoStep[];
  onComplete: () => void;
}

export function PathVideoCourse({ steps, onComplete }: PathVideoCourseProps) {
  const [current, setCurrent] = useState(0);
  const [watched, setWatched] = useState<Set<number>>(new Set());
  const step = steps[current];
  const allDone = watched.size >= steps.length;

  const markWatched = () => {
    const next = new Set(watched);
    next.add(current);
    setWatched(next);
    if (current + 1 < steps.length) {
      setCurrent(current + 1);
    } else if (next.size >= steps.length) {
      onComplete();
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-duo-yellow/40 shadow-lg bg-white">
      <div className="bg-gradient-to-r from-[#2C3E50] to-[#1a252f] px-4 py-3 flex justify-between items-center">
        <div>
          <p className="text-[10px] text-duo-yellow font-bold uppercase tracking-wider">6 bosqichli video dars</p>
          <p className="text-xs text-white/80">Video {current + 1} / {steps.length}</p>
        </div>
        <span className="text-xs font-extrabold text-duo-yellow">{watched.size}/{steps.length} ✓</span>
      </div>

      <div className="flex gap-1 px-3 pt-3">
        {steps.map((s, i) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setCurrent(i)}
            className={`flex-1 h-1.5 rounded-full transition-all ${watched.has(i) ? "bg-accent" : i === current ? "bg-duo-yellow" : "bg-gray-200"}`}
          />
        ))}
      </div>

      <div className="p-4">
        <h3 className="text-sm font-extrabold text-secondary mb-1">{step.title}</h3>
        <p className="text-[10px] text-gray-500 mb-3">{step.tip}</p>
        <VideoPlayer videoId={step.videoId} title={step.title} />
        <button onClick={markWatched} className="btn-3d-primary w-full mt-4 !text-sm !py-3">
          {current + 1 < steps.length ? `✓ Ko'rdim — Video ${current + 2} →` : "✓ Barcha videolarni ko'rdim — Testga →"}
        </button>
      </div>
    </div>
  );
}
