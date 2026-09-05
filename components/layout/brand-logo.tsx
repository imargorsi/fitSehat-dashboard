"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SIZE_PX = {
  nav: 28,
  sm: 40,
  md: 72,
  lg: 112,
  hero: 148,
  display: 196,
} as const;

export function BrandLogo({
  size = "md",
  animate = false,
  priority = false,
  className,
}: {
  size?: keyof typeof SIZE_PX;
  animate?: boolean;
  priority?: boolean;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const px = SIZE_PX[size];
  const isHero = size === "hero";

  return (
    <motion.div
      className={cn("relative shrink-0", isHero && "size-28 sm:size-[9.25rem]", className)}
      style={isHero ? undefined : { width: px, height: px }}
      initial={animate && !reduced ? { opacity: 0, y: 8, scale: 0.96 } : false}
      animate={animate && !reduced ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src="/logo.png"
        alt={APP_NAME}
        width={px}
        height={px}
        priority={priority}
        className="size-full object-contain"
      />
    </motion.div>
  );
}
