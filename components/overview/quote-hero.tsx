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
      className="hero-panel relative flex h-full min-h-0 flex-col overflow-hidden p-4 sm:p-5 lg:min-h-[24rem] lg:p-6"
    >
      <div className="pointer-events-none absolute -top-24 right-[-3rem] size-72 rounded-full bg-rose/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-[-2rem] size-64 rounded-full bg-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-y-8 right-0 w-32 bg-[radial-gradient(ellipse_at_center,oklch(0.42_0.04_155/0.22),transparent_70%)] sm:w-44" />

      <div className="relative grid h-full flex-1 gap-6 lg:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)] lg:items-stretch lg:gap-8">
        <div className="flex flex-col items-center justify-center gap-4 px-2 text-center lg:px-3">
          <BrandLogo size="card" className="mx-auto w-40 sm:w-44 lg:w-48" priority float={false} />
          <div className="space-y-2">
            <p className="text-[0.62rem] tracking-[0.24em] text-muted-foreground uppercase sm:text-[0.68rem]">
              Health • Fitness • Glow
            </p>
            <p className="text-sm font-medium text-foreground/90 sm:text-base">Stronger • Happier • You</p>
            <AnimateIcon name="heart" size={18} tone="rose" playOnMount className="mx-auto" />
          </div>
        </div>

        <div className="flex h-full min-h-0 min-w-0 flex-col lg:min-h-[18rem]">
          <div className="shrink-0">
            <p className="text-[0.62rem] tracking-[0.22em] text-neon uppercase sm:text-xs">{dateLabel}</p>
          </div>

          <div className="flex min-h-[7rem] flex-1 items-center py-4 sm:min-h-[8rem] sm:py-5 lg:min-h-[9rem]">
            <div className="w-full">
              <div className="flex items-start gap-2 sm:gap-3">
                <span aria-hidden className="hero-quote-mark shrink-0">
                  “
                </span>
                <div className="min-w-0 flex-1">
                  <HeroQuoteRotator
                    quotes={CARE_NOTES}
                    className="text-[1.15rem] leading-[1.22] sm:text-[1.55rem] lg:text-[1.95rem]"
                  />
                  <span aria-hidden className="hero-quote-underline" />
                </div>
              </div>
            </div>
          </div>

          <div className="hero-proud-card shrink-0 flex items-start gap-3 rounded-[1.25rem] border border-border/50 bg-card/30 px-4 py-3.5 backdrop-blur-sm sm:px-5 sm:py-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-rose/25 bg-rose/10">
              <AnimateIcon name="heart" size={20} tone="rose" playOnMount />
            </span>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-[0.62rem] tracking-[0.22em] text-neon uppercase sm:text-xs">
                Proud of you, {nick}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                You&apos;re showing up for yourself, and that is something to be proud of.
              </p>
            </div>
            <span aria-hidden className="hidden shrink-0 text-2xl text-rose/70 sm:block">
              ♡
            </span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
