"use client";

import { motion, useReducedMotion } from "motion/react";

import { CareLottie } from "@/components/motion/care-lottie";
import { CareTicker } from "@/components/layout/care-ticker";
import { revealItem, revealParent } from "@/lib/motion";

export function OverviewGreeting({
  periodLabel,
  displayTitle,
  accent,
  subline,
  dateLabel,
  name,
}: {
  periodLabel: string;
  displayTitle: string;
  accent: string;
  subline: string;
  dateLabel: string;
  name: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="flex items-start gap-3"
      initial={reduced ? false : "hidden"}
      animate="show"
      variants={reduced ? undefined : revealParent}
    >
      <motion.div variants={reduced ? undefined : revealItem}>
        <CareLottie name="letter" size={52} className="mt-0.5" />
      </motion.div>
      <div className="min-w-0 space-y-2">
        <motion.p variants={reduced ? undefined : revealItem} className="text-sm tracking-widest text-muted-foreground uppercase">
          {dateLabel}
        </motion.p>
        <motion.p variants={reduced ? undefined : revealItem} className="text-sm text-muted-foreground">
          {periodLabel}
        </motion.p>
        <motion.h1
          variants={reduced ? undefined : revealItem}
          className="font-heading text-2xl leading-tight font-semibold tracking-tight sm:text-3xl lg:text-4xl"
        >
          {displayTitle}
        </motion.h1>
        <motion.p variants={reduced ? undefined : revealItem} className="font-note">
          {accent}
        </motion.p>
        <motion.div variants={reduced ? undefined : revealItem}>
          <CareTicker name={name} />
        </motion.div>
        <motion.p variants={reduced ? undefined : revealItem} className="max-w-lg text-base leading-7 text-muted-foreground">
          {subline}
        </motion.p>
      </div>
    </motion.div>
  );
}
