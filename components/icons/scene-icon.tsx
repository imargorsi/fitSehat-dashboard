"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { sceneIconClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function SceneIcon({
  src,
  alt = "",
  delay = 0,
  className,
}: {
  src: string;
  alt?: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={cn("relative", sceneIconClass, className)}
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="size-full origin-bottom"
        animate={reduced ? undefined : { y: [0, -5, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 3.8, delay: delay + 0.45, repeat: Infinity, ease: "easeInOut" }
        }
        whileHover={reduced ? undefined : { scale: 1.12, rotate: -8, y: -10 }}
        whileTap={reduced ? undefined : { scale: 0.96, rotate: 0 }}
      >
        <Image
          src={src}
          alt={alt}
          width={192}
          height={192}
          className="pointer-events-none size-full object-contain object-center select-none"
        />
      </motion.div>
    </motion.div>
  );
}
