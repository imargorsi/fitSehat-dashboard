"use client";

import { BrandLogo } from "@/components/layout/brand-logo";
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
    <div className="relative flex flex-col items-center text-center">
      <EyebrowAccent>{dateLabel}</EyebrowAccent>
      <BrandLogo size="hero" animate priority className="mt-2 mb-2 sm:mt-4 sm:mb-4" />
      <P className="max-w-xl px-2 text-pretty text-muted-foreground">{APP_TAGLINE}</P>
      <Badge className="mt-2 h-8 rounded-full border-0 bg-neon/10 px-3.5 text-neon sm:mt-4">
        Score <CountUp value={glow.score} /> · {glow.label}
      </Badge>
    </div>
  );
}
