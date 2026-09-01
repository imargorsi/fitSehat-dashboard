"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { EASE_OUT } from "@/lib/motion";

export function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
