"use client";

import { motion, useReducedMotion } from "motion/react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import type { TCareIconName } from "@/components/icons/care-icons";
import { H3, Muted } from "@/components/ui/typography";
import { EASE_OUT } from "@/lib/motion";

export function EmptyNote({
  title,
  body,
  icon = "heart",
  tone = "rose",
}: {
  title: string;
  body: string;
  icon?: TCareIconName;
  tone?: "rose" | "gold" | "neon" | "muted";
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center gap-3 py-8 text-center"
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      <span className="flex size-14 items-center justify-center rounded-[1.25rem] border border-border/50 bg-muted/20">
        <AnimateIcon name={icon} size={28} tone={tone} playOnMount />
      </span>
      <H3>{title}</H3>
      <Muted className="max-w-sm">{body}</Muted>
    </motion.div>
  );
}
