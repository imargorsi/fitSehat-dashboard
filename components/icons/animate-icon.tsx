"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

import { appIcons, type TAppIconName } from "@/components/icons/app-icons";
import type { IconHandle } from "@animateicons/react";
import { cn } from "@/lib/utils";

export function AnimateIcon({
  name,
  size = 20,
  tone = "rose",
  className,
  playOnMount = false,
}: {
  name: TAppIconName;
  size?: number;
  tone?: "rose" | "gold" | "neon" | "violet" | "onPrimary" | "muted" | "foreground";
  className?: string;
  playOnMount?: boolean;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<IconHandle>(null);
  const Icon = appIcons[name];

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
    onPrimary: "text-neon-foreground",
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
