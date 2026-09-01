"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { LOVE_BURST_EVENT } from "@/lib/love-motion.utils";
import { EASE_OUT } from "@/lib/motion";

type TParticle = {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  rotate: number;
  scale: number;
  delay: number;
  glyph: string;
  tone: "rose" | "gold" | "neon";
};

const tones = {
  rose: "text-rose",
  gold: "text-gold",
  neon: "text-neon",
} as const;

function makeBurst(): TParticle[] {
  const glyphs = ["♥", "♡", "✦", "•"];
  return Array.from({ length: 22 }, (_, index) => {
    const startX = 38 + Math.random() * 24;
    const startY = 58 + Math.random() * 12;
    return {
      id: Date.now() + index,
      startX,
      startY,
      endX: startX + (Math.random() - 0.5) * 34,
      endY: startY - 18 - Math.random() * 28,
      rotate: Math.random() * 360,
      scale: 0.45 + Math.random() * 0.75,
      delay: index * 0.018,
      glyph: glyphs[index % glyphs.length] ?? "♥",
      tone: (["rose", "gold", "neon"] as const)[index % 3],
    };
  });
}

export function LoveBurst() {
  const reduced = useReducedMotion();
  const [particles, setParticles] = useState<TParticle[]>([]);

  useEffect(() => {
    if (reduced) {
      return;
    }

    const handler = () => {
      setParticles(makeBurst());
      window.setTimeout(() => setParticles([]), 2600);
    };

    window.addEventListener(LOVE_BURST_EVENT, handler);
    return () => window.removeEventListener(LOVE_BURST_EVENT, handler);
  }, [reduced]);

  if (reduced) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[65] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            initial={{
              opacity: 0,
              left: `${particle.startX}vw`,
              top: `${particle.startY}vh`,
              scale: 0,
              rotate: particle.rotate,
            }}
            animate={{
              opacity: [0, 1, 1, 0],
              left: `${particle.endX}vw`,
              top: `${particle.endY}vh`,
              scale: particle.scale,
              rotate: particle.rotate + 140,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 2.1,
              delay: particle.delay,
              ease: EASE_OUT,
            }}
            className={`absolute text-lg leading-none sm:text-xl ${tones[particle.tone]}`}
          >
            {particle.glyph}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
