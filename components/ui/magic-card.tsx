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

export function MagicCard({
  children,
  className,
  gradientSize = FITSEHAT_MAGIC_CARD.gradientSize,
  gradientColor = FITSEHAT_MAGIC_CARD.gradientColor,
  gradientOpacity = FITSEHAT_MAGIC_CARD.gradientOpacity,
  gradientFrom = FITSEHAT_MAGIC_CARD.gradientFrom,
  gradientTo = FITSEHAT_MAGIC_CARD.gradientTo,
}: {
  children?: ReactNode;
  className?: string;
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
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

  const frameBackground = useMotionTemplate`
    linear-gradient(var(--color-card) 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom} 0%,
      ${gradientTo} 32%,
      color-mix(in oklch, white 40%, transparent) 62%,
      color-mix(in oklch, white 30%, transparent) 100%
    ) border-box
  `;

  const magicBorder = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom} 0%,
      ${gradientTo} 35%,
      color-mix(in oklch, white 45%, transparent) 70%,
      transparent 100%
    )
  `;

  const surfaceGlow = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 72%
    )
  `;

  return (
    <motion.div
      className={cn(
        "group relative isolate rounded-[inherit] border border-transparent",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => reset("leave")}
      onPointerEnter={() => reset("enter")}
      style={{ background: frameBackground }}
    >
      {/* Base white outline — stays on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] border border-white/30"
      />

      {/* Magic UI border highlight — follows cursor and brightens the rim */}
      <motion.div
        aria-hidden
        suppressHydrationWarning
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          padding: "2px",
          background: magicBorder,
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
        }}
      />

      <div className="absolute inset-px z-20 overflow-hidden rounded-[inherit] bg-card" />

      <motion.div
        suppressHydrationWarning
        className="pointer-events-none absolute inset-px z-30 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: surfaceGlow,
          opacity: gradientOpacity,
        }}
      />

      <div className="relative z-40 h-full overflow-hidden rounded-[inherit]">{children}</div>
    </motion.div>
  );
}
