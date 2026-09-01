"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { hoverLift, SPRING_SNUG, tapScale } from "@/lib/motion";

export function Press({
  children,
  className,
  lift = true,
}: {
  children: ReactNode;
  className?: string;
  lift?: boolean;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileTap={reduced ? undefined : tapScale}
      whileHover={reduced || !lift ? undefined : hoverLift}
      transition={SPRING_SNUG}
    >
      {children}
    </motion.div>
  );
}
