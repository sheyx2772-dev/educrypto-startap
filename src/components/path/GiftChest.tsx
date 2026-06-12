"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  src: string;
  size?: number;
  breathing?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  /** Qora fonli PNG ni oq fonda shaffof qilish */
  noBg?: boolean;
}

export function GiftChest({ src, size = 56, breathing = true, onClick, className = "", disabled, noBg }: Props) {
  const breatheClass = breathing ? " path-chest-breathe" : "";
  const img = (
    <Image
      src={src}
      alt="Mukofot sandig'i"
      width={size}
      height={size}
      className={`path-chest-img${noBg ? " path-chest-img-nobg" : ""}`}
      unoptimized
      draggable={false}
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className={`path-chest-visual${breatheClass} ${className}`}
      >
        {img}
      </button>
    );
  }

  return <div className={`path-chest-visual${breatheClass} ${className}`}>{img}</div>;
}

interface SparkleProps {
  active: boolean;
}

export function ChestSparkle({ active }: SparkleProps) {
  if (!active) return null;

  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    angle: (i / 18) * 360,
    dist: 28 + (i % 5) * 10,
    delay: (i % 6) * 0.03,
    size: 4 + (i % 3) * 2,
  }));

  return (
    <div className="path-chest-sparkle-wrap" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="path-chest-sparkle"
          style={{ width: p.size, height: p.size }}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [1, 1, 0],
            scale: [0, 1.4, 0.2],
            x: Math.cos((p.angle * Math.PI) / 180) * p.dist,
            y: Math.sin((p.angle * Math.PI) / 180) * p.dist,
          }}
          transition={{ duration: 0.7, delay: p.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
