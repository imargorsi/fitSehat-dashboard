"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export function ProgressRing({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const rawId = useId();
  const gradientId = `glow-ring-${rawId.replace(/:/g, "")}`;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, value));
  const offset = circumference * (1 - clamped / 100);

  return (
    <svg viewBox="0 0 100 100" className={cn("size-32 -rotate-90", className)} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--neon)" />
          <stop offset="100%" stopColor="var(--rose)" />
        </linearGradient>
      </defs>
      <circle
        cx="50"
        cy="50"
        r={radius}
        className="fill-none stroke-[color-mix(in_oklch,var(--neon)_16%,transparent)]"
        strokeWidth="8"
      />
      <motion.circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: reduced ? offset : circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: reduced ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
