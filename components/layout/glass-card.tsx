"use client";

import type { ReactNode } from "react";

import { TiltSpotlight } from "@/components/motion/tilt-spotlight";

export function GlassCard({
  children,
  className,
  tilt = true,
  magic = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  magic?: boolean;
}) {
  return (
    <TiltSpotlight className={className} tilt={tilt} magic={magic}>
      {children}
    </TiltSpotlight>
  );
}
