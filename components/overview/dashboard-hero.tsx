"use client";

import { BrandLogo } from "@/components/layout/brand-logo";
import { GlassCard } from "@/components/layout/glass-card";
import { CountUp } from "@/components/motion/count-up";
import { Badge } from "@/components/ui/badge";
import { EyebrowAccent, P } from "@/components/ui/typography";
import { APP_TAGLINE } from "@/lib/app-copy";
import type { TGlow } from "@/lib/glow.utils";

export function DashboardHero({
  dateLabel,
  glow,
}: {
  dateLabel: string;
  glow: TGlow;
}) {
  return (
    <GlassCard
      magic={false}
      bordered={false}
      stretch={false}
      className="relative overflow-visible px-4 py-2 sm:px-6 sm:py-3 lg:px-8"
    >
      <div className="pointer-events-none absolute -top-28 right-[-3rem] size-72 rounded-full bg-neon/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-[-2rem] size-56 rounded-full bg-rose/10 blur-3xl" />
      <div className="relative flex flex-col items-center text-center">
        <EyebrowAccent>{dateLabel}</EyebrowAccent>
        <BrandLogo size="hero" animate priority className="mt-2 mb-2 sm:mt-4 sm:mb-4" />
        <P className="max-w-xl px-2 text-pretty text-muted-foreground">{APP_TAGLINE}</P>
        <Badge variant="outline" className="mt-2 h-8 rounded-full border-neon/25 bg-neon/10 px-3.5 text-neon sm:mt-4">
          Score <CountUp value={glow.score} /> · {glow.label}
        </Badge>
      </div>
    </GlassCard>
  );
}
