"use client";

import { CountUp } from "@/components/motion/count-up";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { ProgressRing } from "@/components/motion/progress-ring";
import { GlassCard } from "@/components/layout/glass-card";
import type { TGlow } from "@/lib/glow.utils";

export function GlowCard({
  glow,
  streak,
}: {
  glow: TGlow;
  streak: number;
}) {
  return (
    <GlassCard className="relative flex h-full min-h-0 flex-col justify-center overflow-hidden p-4 sm:min-h-[20rem] sm:p-6 lg:min-h-[24rem] lg:p-8">
      <div className="pointer-events-none absolute -top-16 right-8 size-48 rounded-full bg-rose/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 size-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="flex h-full flex-col items-center justify-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
        <div className="relative shrink-0">
          <ProgressRing value={glow.score} className="size-24 sm:size-32" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
              <CountUp value={glow.score} />
            </p>
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Glow</p>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Today&apos;s glow, Love</p>
          <h2 className="font-heading text-xl font-semibold tracking-tight sm:text-2xl">{glow.label}</h2>
          <p className="text-sm leading-6 text-muted-foreground">{glow.caption}</p>
          {streak > 0 ? (
            <div className="flex items-center justify-center gap-1.5 text-sm text-rose sm:justify-start">
              <AnimateIcon name="heart" size={20} tone="rose" playOnMount />
              {streak} day streak, Precious
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">A soft start still counts, Guddi.</p>
          )}
        </div>
        <AnimateIcon name="watch" size={56} tone="rose" playOnMount className="hidden shrink-0 2xl:block" />
      </div>
    </GlassCard>
  );
}
