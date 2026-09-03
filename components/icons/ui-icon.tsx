"use client";

import { useReducedMotion } from "motion/react";

import { appIcons, type TAppIconName } from "@/components/icons/app-icons";
import { cn } from "@/lib/utils";

export function UiIcon({
  name,
  size = 16,
  className,
  spin = false,
}: {
  name: TAppIconName;
  size?: number;
  className?: string;
  spin?: boolean;
}) {
  const reduced = useReducedMotion();
  const Icon = appIcons[name];

  return (
    <Icon
      size={size}
      duration={0.8}
      isAnimated={!reduced}
      className={cn("shrink-0 text-current", spin && "animate-spin", className)}
    />
  );
}
