"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { revealItem, revealParent } from "@/lib/motion";

export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      animate="show"
      variants={reduced ? undefined : revealParent}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div className={className} variants={reduced ? undefined : revealItem}>
      {children}
    </motion.div>
  );
}
