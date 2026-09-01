"use client";

import { useRef } from "react";
import { LottieSvg, type LottieHandle } from "lottie-react";
import { useReducedMotion } from "motion/react";

import heart from "@/lib/lottie/heart.json";
import letter from "@/lib/lottie/letter.json";
import watch from "@/lib/lottie/watch.json";
import { cn } from "@/lib/utils";

const animations = {
  heart,
  letter,
  watch,
} as const;

export type TCareLottieName = keyof typeof animations;

export function CareLottie({
  name,
  className,
  size = 56,
}: {
  name: TCareLottieName;
  className?: string;
  size?: number;
}) {
  const reduced = useReducedMotion();
  const lottieRef = useRef<LottieHandle>(null);

  return (
    <LottieSvg
      as="span"
      lottieRef={lottieRef}
      src={animations[name]}
      loop={false}
      autoplay={!reduced}
      aria-hidden
      className={cn("inline-block shrink-0", className)}
      style={{ width: size, height: size }}
      onPointerDown={() => {
        if (!reduced) {
          lottieRef.current?.play();
        }
      }}
    />
  );
}
