"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { careIcons, type TCareIconName } from "@/components/icons/care-icons";
import type { IconHandle } from "@animateicons/react";
import { cn } from "@/lib/utils";

export function AnimateIcon({
  name,
  size = 20,
  tone = "rose",
  className,
  playOnMount = false,
}: {
  name: TCareIconName;
  size?: number;
  tone?: "rose" | "gold" | "neon" | "violet" | "muted" | "foreground";
  className?: string;
  playOnMount?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<IconHandle>(null);
  const Icon = careIcons[name];

  useEffect(() => {
    if (reduced || !playOnMount) {
      return;
    }
    const id = window.setTimeout(() => ref.current?.startAnimation(), 320);
    return () => window.clearTimeout(id);
  }, [playOnMount, reduced, name]);

  const toneClass = {
    rose: "text-rose",
    gold: "text-gold",
    neon: "text-neon",
    violet: "text-violet",
    muted: "text-muted-foreground",
    foreground: "text-foreground",
  }[tone];

  return (
    <Icon
      ref={ref}
      size={size}
      duration={0.9}
      isAnimated={!reduced}
      className={cn("shrink-0", toneClass, className)}
    />
  );
}
