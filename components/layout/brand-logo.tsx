"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export const BRAND_LOGO_SRC = "/logo.png";
export const BRAND_LOGO_SIZE = 1254;

const SIZE_CLASS = {
  mark: "w-14 lg:w-16",
  card: "w-44 sm:w-52",
  hero: "w-[min(92vw,26rem)] sm:w-[30rem]",
} as const;

export function BrandLogo({
  size = "hero",
  float = true,
  className,
  priority = false,
}: {
  size?: keyof typeof SIZE_CLASS;
  float?: boolean;
  className?: string;
  priority?: boolean;
}) {
  const reduced = useReducedMotion();
  const shouldFloat = Boolean(float && !reduced);

  return (
    <motion.div
      className={cn("relative mx-auto", SIZE_CLASS[size], className)}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={
        shouldFloat
          ? { opacity: 1, y: [0, -12, 0] }
          : { opacity: 1, y: 0 }
      }
      transition={
        shouldFloat
          ? { opacity: { duration: 0.5 }, y: { duration: 5.6, repeat: Infinity, ease: "easeInOut" } }
          : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <Image
        src={BRAND_LOGO_SRC}
        alt={APP_NAME}
        width={BRAND_LOGO_SIZE}
        height={BRAND_LOGO_SIZE}
        priority={priority}
        quality={95}
        sizes={
          size === "hero"
            ? "(max-width: 640px) 92vw, 30rem"
            : size === "card"
              ? "13rem"
              : "4rem"
        }
        className="relative h-auto w-full bg-transparent select-none mix-blend-lighten [filter:none]"
      />
    </motion.div>
  );
}
