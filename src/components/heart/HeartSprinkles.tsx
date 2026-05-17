"use client";

<<<<<<< HEAD
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

const COLORS = [
  "#F8B4C4",
  "#E8A0A8",
  "#D4A5D4",
  "#FFD4C4",
  "#C44B5C",
  "#F5D0D8",
  "#E8D4E8",
];

function MiniHeart({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      style={{ color }}
    >
      <path
        fill="currentColor"
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      />
    </svg>
  );
}

/** Soft falling heart confetti — pastel, elegant, fades naturally */
export function HeartSprinkles({ count = 28 }: { count?: number }) {
  const reduceMotion = useReducedMotion();

=======
import { motion } from "framer-motion";
import { useMemo } from "react";

const COLORS = ["#F8B4C4", "#E8A0A8", "#D4A5D4", "#FFD4C4", "#C44B5C", "#F5D0D8"];

/** Soft falling heart confetti — elegant, non-overwhelming */
export function HeartSprinkles({ count = 24 }: { count?: number }) {
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
<<<<<<< HEAD
        x: 4 + Math.random() * 92,
        delay: Math.random() * 10,
        duration: 14 + Math.random() * 12,
        size: 10 + Math.random() * 16,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        drift: (Math.random() - 0.5) * 40,
        rotate: Math.random() * 360,
        opacityPeak: 0.35 + Math.random() * 0.25,
=======
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 10,
        size: 8 + Math.random() * 14,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 360,
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
      })),
    [count]
  );

<<<<<<< HEAD
  if (reduceMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: "-4%" }}
          initial={{ y: 0, x: 0, opacity: 0, rotate: p.rotate }}
          animate={{
            y: ["0vh", "105vh"],
            x: [0, p.drift, p.drift * 0.6, 0],
            opacity: [0, p.opacityPeak, p.opacityPeak * 0.7, 0],
            rotate: [p.rotate, p.rotate + 120, p.rotate + 200],
=======
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
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
<<<<<<< HEAD
            ease: "easeInOut",
          }}
        >
          <MiniHeart size={p.size} color={p.color} />
        </motion.div>
      ))}
    </div>
=======
            ease: "linear",
          }}
        >
          ♥
        </motion.span>
      ))}
    </motion.div>
>>>>>>> 2c23014c87d77df49277e0f174bd9b36a880cce3
  );
}
