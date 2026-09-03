"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent,
  type ReactNode,
} from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";

import { FITSEHAT_MAGIC_CARD } from "@/lib/magic-card-theme";
import { cn } from "@/lib/utils";

type TResetReason = "enter" | "leave" | "global" | "init";

const RIM_MASK =
  "linear-gradient(var(--foreground) 0 0) content-box, linear-gradient(var(--foreground) 0 0)";

export function MagicCard({
  children,
  className,
  gradientSize = FITSEHAT_MAGIC_CARD.gradientSize,
  gradientColor = FITSEHAT_MAGIC_CARD.gradientColor,
  gradientFrom = FITSEHAT_MAGIC_CARD.gradientFrom,
  gradientTo = FITSEHAT_MAGIC_CARD.gradientTo,
}: {
  children?: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
  const gradientSizeRef = useRef(gradientSize);

  useEffect(() => {
    gradientSizeRef.current = gradientSize;
  }, [gradientSize]);

  const reset = useCallback(
    (reason: TResetReason = "leave") => {
      if (reason === "enter") {
        return;
      }
      const off = -gradientSizeRef.current;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY]
  );

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - rect.left);
      mouseY.set(event.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset("init");
  }, [reset]);

  useEffect(() => {
    const handleGlobalPointerOut = (event: globalThis.PointerEvent) => {
      if (!event.relatedTarget) {
        reset("global");
      }
    };
    const handleBlur = () => reset("global");
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") {
        reset("global");
      }
    };

    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);

  const magicBorder = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom} 0%,
      ${gradientTo} 35%,
      transparent 72%
    )
  `;

  const surfaceGlow = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `;

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-border bg-card backdrop-blur-xl",
        "glass-chrome",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => reset("leave")}
      onPointerEnter={() => reset("enter")}
    >
      <motion.div
        aria-hidden
        suppressHydrationWarning
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          padding: "1px",
          background: magicBorder,
          WebkitMask: RIM_MASK,
          WebkitMaskComposite: "xor",
          mask: RIM_MASK,
          maskComposite: "exclude",
        }}
      />
      <motion.div
        aria-hidden
        suppressHydrationWarning
        className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-70"
        style={{ background: surfaceGlow }}
      />
      {children}
    </motion.div>
  );
}
