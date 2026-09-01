"use client";

import { LoveBurst } from "@/components/motion/love-burst";
import { LoveDrift } from "@/components/motion/love-drift";

export function LoveAmbience() {
  return (
    <>
      <LoveDrift />
      <LoveBurst />
    </>
  );
}
