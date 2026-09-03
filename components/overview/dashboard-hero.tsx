"use client";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { BrandLogo } from "@/components/layout/brand-logo";
import { GlassCard } from "@/components/layout/glass-card";
import { EyebrowAccent, H3, Muted, P } from "@/components/ui/typography";
import { APP_TAGLINE } from "@/lib/app-copy";

export function DashboardHero({ dateLabel }: { dateLabel: string }) {
  return (
    <GlassCard
      tilt={false}
      className="relative mx-auto flex w-full max-w-md flex-col p-5 sm:max-w-none sm:p-6 lg:min-h-[20rem] lg:p-8"
    >
      <div className="pointer-events-none absolute -top-20 right-[-2.5rem] size-56 rounded-full bg-neon/10 blur-3xl sm:size-72" />
      <div className="pointer-events-none absolute -bottom-24 left-[-1.5rem] size-48 rounded-full bg-rose/10 blur-3xl sm:size-64" />
      <div className="relative grid h-full flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center lg:gap-10">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <BrandLogo size="lg" animate priority className="mb-4" />
          <P className="max-w-md text-muted-foreground">{APP_TAGLINE}</P>
        </div>
        <div className="flex min-h-0 flex-col items-center justify-center gap-4 rounded-[1.25rem] border border-white/25 bg-card/30 px-4 py-5 text-center backdrop-blur-sm sm:px-6 lg:items-start lg:text-left">
          <EyebrowAccent>{dateLabel}</EyebrowAccent>
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-muted/40">
              <AnimateIcon name="activity" size={20} tone="neon" playOnMount={false} />
            </span>
            <div className="min-w-0 space-y-1">
              <H3>Your health dashboard</H3>
              <Muted>
                Track fuel, movement, and check-ins in one place. Small consistent steps add up.
              </Muted>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
