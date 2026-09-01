"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { EASE_OUT } from "@/lib/motion";

type TDrift = {
  id: number;
  x: number;
  y: number;
  size: number;
  glyph: string;
  tone: "rose" | "gold" | "neon";
};

const tones = {
  rose: "text-rose/80",
  gold: "text-gold/75",
  neon: "text-neon/70",
} as const;

function spawnDrift(): TDrift {
  const glyphs = ["♥", "♡", "✦"];
  return {
    id: Date.now() + Math.floor(Math.random() * 1000),
    x: 8 + Math.random() * 84,
    y: 72 + Math.random() * 18,
    size: 14 + Math.random() * 16,
    glyph: glyphs[Math.floor(Math.random() * glyphs.length)] ?? "♥",
    tone: (["rose", "gold", "neon"] as const)[Math.floor(Math.random() * 3)],
  };
}

export function LoveDrift() {
  const reduced = useReducedMotion();
  const [items, setItems] = useState<TDrift[]>([]);

  useEffect(() => {
    if (reduced) {
      return;
    }

    let timeout = 0;

    const schedule = () => {
      const wait = 9000 + Math.floor(Math.random() * 7000);
      timeout = window.setTimeout(() => {
        const batch = Array.from({ length: 1 + Math.floor(Math.random() * 2) }, () => spawnDrift());
        setItems(batch);
        window.setTimeout(() => setItems([]), 3200);
        schedule();
      }, wait);
    };

    schedule();
    return () => window.clearTimeout(timeout);
  }, [reduced]);

  if (reduced) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[35] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {items.map((item) => (
          <motion.span
            key={item.id}
            initial={{ opacity: 0, left: `${item.x}%`, top: `${item.y}%`, scale: 0.6 }}
            animate={{
              opacity: [0, 0.85, 0.85, 0],
              top: `${item.y - 22}%`,
              scale: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: EASE_OUT }}
            className={`absolute text-sm leading-none ${tones[item.tone]}`}
            style={{ fontSize: item.size }}
          >
            {item.glyph}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
