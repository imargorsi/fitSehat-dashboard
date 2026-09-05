"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";

import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function PageFade({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      className={cn(className)}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
