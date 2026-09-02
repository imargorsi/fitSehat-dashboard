"use client";

import { CountUp } from "@/components/motion/count-up";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { ProgressRing } from "@/components/motion/progress-ring";
import { GlassCard } from "@/components/layout/glass-card";
import {
  Accent,
  Caption,
  Eyebrow,
  H2,
  MetricGlow,
  Muted,
} from "@/components/ui/typography";
import type { TGlow } from "@/lib/glow.utils";

export function GlowCard({
  glow,
  streak,
}: {
  glow: TGlow;
  streak: number;
}) {
  return (
    <GlassCard className="relative flex h-full min-h-0 flex-col justify-center overflow-hidden p-5 sm:min-h-[20rem] sm:p-6 lg:min-h-[24rem] lg:p-6">
      <div className="pointer-events-none absolute -top-16 right-8 size-48 rounded-full bg-rose/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 size-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="flex h-full flex-col items-center justify-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
        <div className="relative shrink-0">
          <ProgressRing value={glow.score} className="size-24 sm:size-32" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <MetricGlow>
              <CountUp value={glow.score} />
            </MetricGlow>
            <Caption>Glow</Caption>
          </div>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <Eyebrow>Today&apos;s glow, Love</Eyebrow>
          <H2>{glow.label}</H2>
          <Muted>{glow.caption}</Muted>
          {streak > 0 ? (
            <Accent className="flex items-center justify-center gap-1.5 sm:justify-start">
              <AnimateIcon name="heart" size={20} tone="rose" playOnMount />
              {streak} day streak, Precious
            </Accent>
          ) : (
            <Muted>A soft start still counts, Guddi.</Muted>
          )}
        </div>
        <AnimateIcon name="watch" size={56} tone="rose" playOnMount className="hidden shrink-0 2xl:block" />
      </div>
    </GlassCard>
  );
}
