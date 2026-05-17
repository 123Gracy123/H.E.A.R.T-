"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#F8B4C4", "#E8A0A8", "#D4A5D4", "#FFD4C4", "#C44B5C", "#F5D0D8"];

/** Soft falling heart confetti — elegant, non-overwhelming */
export function HeartSprinkles({ count = 24 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 10,
        size: 8 + Math.random() * 14,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 360,
      })),
    [count]
  );

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[5] overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute opacity-0"
          style={{
            left: `${p.x}%`,
            top: "-5%",
            fontSize: p.size,
            color: p.color,
          }}
          initial={{ y: 0, opacity: 0, rotate: p.rotate }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 0.5, 0.4, 0],
            rotate: p.rotate + 180,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          ♥
        </motion.span>
      ))}
    </motion.div>
  );
}
