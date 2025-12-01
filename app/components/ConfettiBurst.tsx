"use client";

import { motion } from "framer-motion";

interface ConfettiBurstProps {
  active: boolean;
}

const pieces = Array.from({ length: 45 }).map((_, i) => ({
  id: i,
  // posição horizontal fixa (pra evitar mismatch SSR)
  left: (i * 17) % 100,
  duration: 1.2 + (i % 5) * 0.2,
  delay: (i % 10) * 0.08,
  rotate: (i % 2 === 0 ? 1 : -1) * (10 + (i % 15)),
}));

const colors = ["#f08a3b", "#f9d48c", "#ffffff", "#c0674b", "#1f2933"];

export function ConfettiBurst({ active }: ConfettiBurstProps) {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: "-10%", opacity: 0, rotate: 0 }}
          animate={{
            y: "120%",
            opacity: [0, 1, 1, 0],
            rotate: p.rotate,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
          }}
          className="absolute w-1.5 h-3 rounded-[3px]"
          style={{
            left: `${p.left}%`,
            backgroundColor: colors[p.id % colors.length],
          }}
        />
      ))}
    </div>
  );
}
