"use client";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { BrandLogo } from "@/components/layout/brand-logo";
import { GlassCard } from "@/components/layout/glass-card";
import { HeroQuoteRotator } from "@/components/overview/hero-quote-rotator";
import { CARE_NOTES, petNameFor } from "@/lib/care-notes";

export function QuoteHero({ dateLabel }: { dateLabel: string }) {
  const nick = petNameFor(dateLabel);

  return (
    <GlassCard
      tilt={false}
      className="hero-panel relative mx-auto flex w-full max-w-md flex-col overflow-hidden p-3 sm:max-w-none sm:p-5 lg:min-h-[24rem] lg:p-6"
    >
      <div className="pointer-events-none absolute -top-20 right-[-2.5rem] size-56 rounded-full bg-rose/14 blur-3xl sm:-top-24 sm:right-[-3rem] sm:size-72" />
      <div className="pointer-events-none absolute -bottom-24 left-[-1.5rem] size-48 rounded-full bg-gold/12 blur-3xl sm:-bottom-28 sm:left-[-2rem] sm:size-64" />
      <div className="pointer-events-none absolute inset-y-6 right-0 hidden w-32 bg-[radial-gradient(ellipse_at_center,oklch(0.42_0.04_155/0.22),transparent_70%)] sm:block sm:inset-y-8 sm:w-44" />

      <div className="relative grid h-full flex-1 gap-4 sm:gap-5 lg:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)] lg:items-stretch lg:gap-8">
        <div className="flex items-center justify-center px-1 lg:px-2">
          <BrandLogo size="card" className="w-28 sm:w-36 lg:w-44" priority float />
        </div>

        <div className="flex min-h-0 min-w-0 flex-col items-center text-center lg:min-h-[18rem] lg:justify-between">
          <p className="shrink-0 text-[0.62rem] tracking-[0.22em] text-neon uppercase sm:text-xs">{dateLabel}</p>

          <div className="flex w-full max-w-xl flex-col items-center justify-center px-1 py-3 sm:py-4 lg:py-5">
            <span aria-hidden className="hero-quote-mark">
              “
            </span>
            <HeroQuoteRotator
              quotes={CARE_NOTES}
              className="text-center text-[1.05rem] leading-[1.28] sm:text-[1.45rem] sm:leading-[1.22] lg:text-[1.85rem]"
            />
            <span aria-hidden className="hero-quote-underline mx-auto" />
          </div>

          <div className="hero-proud-card flex w-full max-w-sm flex-col items-center gap-2.5 rounded-[1.15rem] border border-border/50 bg-card/30 px-3.5 py-3 text-center backdrop-blur-sm sm:max-w-md sm:gap-3 sm:rounded-[1.25rem] sm:px-4 sm:py-3.5 lg:max-w-none">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-rose/25 bg-rose/10 sm:size-11">
              <AnimateIcon name="heart" size={20} tone="rose" playOnMount />
            </span>
            <div className="min-w-0 space-y-1">
              <p className="text-[0.62rem] tracking-[0.22em] text-neon uppercase sm:text-xs">
                Proud of you, {nick}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                You&apos;re showing up for yourself, and that is something to be proud of.
              </p>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
