"use client";

import { motion, useReducedMotion } from "motion/react";

import { CareLottie } from "@/components/motion/care-lottie";
import { EASE_OUT } from "@/lib/motion";

export function EmptyNote({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className="flex flex-col items-center gap-2 py-10 text-center"
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
    >
      <CareLottie name="letter" size={56} />
      <p className="font-heading text-lg font-semibold tracking-tight">{title}</p>
      <p className="max-w-sm text-sm leading-6 text-muted-foreground">{body}</p>
    </motion.div>
  );
}
