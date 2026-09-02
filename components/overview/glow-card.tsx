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
import { streakCaption } from "@/lib/app-copy";
import type { TGlow } from "@/lib/glow.utils";

export function GlowCard({
  glow,
  streak,
}: {
  glow: TGlow;
  streak: number;
}) {
  return (
    <GlassCard className="relative flex h-full min-h-0 flex-col justify-center p-5 sm:min-h-[20rem] sm:p-6 lg:min-h-[24rem] lg:p-6">
      <div className="pointer-events-none absolute -top-16 right-8 size-48 rounded-full bg-neon/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 size-40 rounded-full bg-gold/10 blur-3xl" />
      <div className="flex h-full flex-col items-center justify-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
        <div className="relative flex shrink-0 flex-col items-center gap-2">
          <div className="relative size-24 sm:size-32">
            <ProgressRing value={glow.score} className="size-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <MetricGlow>
                <CountUp value={glow.score} />
              </MetricGlow>
            </div>
          </div>
          <Caption className="tracking-[0.12em]">Daily score</Caption>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <Eyebrow>Today&apos;s progress</Eyebrow>
          <H2>{glow.label}</H2>
          <Muted>{glow.caption}</Muted>
          {streak > 0 ? (
            <Accent className="flex items-center justify-center gap-1.5 sm:justify-start">
              <AnimateIcon name="activity" size={20} tone="neon" playOnMount={false} />
              {streakCaption(streak)}
            </Accent>
          ) : (
            <Muted>Log today to start a streak.</Muted>
          )}
        </div>
        <AnimateIcon name="watch" size={56} tone="neon" playOnMount={false} className="hidden shrink-0 2xl:block" />
      </div>
    </GlassCard>
  );
}
