"use client";

import { useReducedMotion } from "motion/react";

import { careIcons, type TCareIconName } from "@/components/icons/care-icons";
import { cn } from "@/lib/utils";

export function UiIcon({
  name,
  size = 16,
  className,
  spin = false,
}: {
  name: TCareIconName;
  size?: number;
  className?: string;
  spin?: boolean;
}) {
  const reduced = useReducedMotion();
  const Icon = careIcons[name];

  return (
    <Icon
      size={size}
      duration={0.8}
      isAnimated={!reduced}
      className={cn("shrink-0", spin && "animate-spin", className)}
    />
  );
}
