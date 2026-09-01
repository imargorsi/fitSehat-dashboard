"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";

import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function TiltSpotlight({
  children,
  className,
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(50);
  const y = useMotionValue(40);
  const opacity = useMotionValue(0);
  const spot = useMotionTemplate`radial-gradient(22rem circle at ${x}% ${y}%, var(--spot-fill), transparent 64%)`;
  const showSpot = Boolean(tilt && !reduced);

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

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: "-28px" }}
      transition={{ duration: 0.42, ease: EASE_OUT }}
      className="h-full"
    >
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="glass-panel relative h-full overflow-hidden rounded-[1.75rem] border border-border/35"
      >
        {showSpot ? (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: spot, opacity }}
          />
        ) : null}
        <div className={cn("relative z-10 h-full", className)}>{children}</div>
      </div>
    </motion.div>
  );
}
