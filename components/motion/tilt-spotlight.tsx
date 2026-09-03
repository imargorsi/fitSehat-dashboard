"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";

import { MagicCard } from "@/components/ui/magic-card";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function TiltSpotlight({
  children,
  className,
  tilt = true,
  magic = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  magic?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(40);
  const opacity = useMotionValue(0);
  const spot = useMotionTemplate`radial-gradient(22rem circle at ${x}% ${y}%, var(--spot-fill), transparent 64%)`;
  const showSpot = Boolean(tilt && !reduced);
  const useMagic = Boolean(magic && !reduced);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (!showSpot || event.pointerType === "touch") {
      return;
    }
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    x.set(((event.clientX - rect.left) / rect.width) * 100);
    y.set(((event.clientY - rect.top) / rect.height) * 100);
    opacity.set(1);
  }

  function onLeave() {
    opacity.set(0);
  }

  const panel = (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "glass-panel relative flex h-full min-h-0 flex-col rounded-[inherit] bg-transparent shadow-none",
        /* MagicCard owns the visible outline — avoid a second inset border that clips corners */
        useMagic ? "border-0" : "border border-white/30"
      )}
    >
      {showSpot ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
          style={{ background: spot, opacity }}
        />
      ) : null}
      <div className={cn("relative z-10 flex min-h-0 flex-1 flex-col", className)}>{children}</div>
    </div>
  );

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: "-28px" }}
      transition={{ duration: 0.42, ease: EASE_OUT }}
      className="h-full rounded-[1.75rem]"
    >
      {useMagic ? (
        <MagicCard className="h-full rounded-[1.75rem]">{panel}</MagicCard>
      ) : (
        panel
      )}
    </motion.div>
  );
}
