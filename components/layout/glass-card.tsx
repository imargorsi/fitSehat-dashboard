"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { MagicCard } from "@/components/ui/magic-card";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function GlassCard({
  children,
  className,
  magic = true,
  bordered = true,
  stretch = true,
}: {
  children: ReactNode;
  className?: string;
  magic?: boolean;
  bordered?: boolean;
  stretch?: boolean;
}) {
  const reduced = useReducedMotion();
  const useMagic = Boolean(magic && !reduced);

  const inner = (
    <div className={cn("relative z-40 flex h-full min-h-0 flex-col rounded-[inherit]", className)}>
      {children}
    </div>
  );

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: "-28px" }}
      transition={{ duration: 0.48, ease: EASE_OUT }}
      className={cn("overflow-visible rounded-[1.75rem]", stretch && "h-full")}
    >
      {useMagic ? (
        <MagicCard className="h-full rounded-[1.75rem]">{inner}</MagicCard>
      ) : (
        <div className={cn("h-full overflow-visible rounded-[1.75rem]", bordered && "glass-panel border border-border")}>
          {inner}
        </div>
      )}
    </motion.div>
  );
}
