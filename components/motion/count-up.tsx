"use client";

import { useEffect } from "react";
import { animate } from "motion";
import { motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

import { formatInt } from "@/lib/number.utils";

export function CountUp({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const count = useMotionValue(0);
  const label = useTransform(count, (latest) => formatInt(Math.round(latest)));

  useEffect(() => {
    if (reduced) {
      count.set(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (next) => {
        count.set(next);
      },
    });
    return () => controls.stop();
  }, [value, reduced, count]);

  return <motion.span className={className}>{label}</motion.span>;
}
