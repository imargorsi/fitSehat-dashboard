"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { BrandLogo } from "@/components/layout/brand-logo";
import { GlassCard } from "@/components/layout/glass-card";
import { CARE_NOTES, nextCareNoteIndex, petNameFor } from "@/lib/care-notes";
import { splitQuoteHighlight } from "@/lib/quote.utils";
import { EASE_OUT } from "@/lib/motion";

export function QuoteHero({
  periodLabel,
  dateLabel,
}: {
  name?: string;
  periodLabel: string;
  dateLabel: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => nextCareNoteIndex(current, CARE_NOTES.length));
    }, 7000);
    return () => window.clearInterval(id);
  }, []);

  const nick = petNameFor(dateLabel);
  const quote = CARE_NOTES[index] ?? CARE_NOTES[0];
  const { lead, accent } = splitQuoteHighlight(quote);

  return (
    <GlassCard
      tilt={false}
      className="hero-panel relative min-h-0 overflow-hidden p-4 sm:p-5 lg:min-h-[24rem] lg:p-6"
    >
      <div className="pointer-events-none absolute -top-24 right-[-3rem] size-72 rounded-full bg-rose/14 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-[-2rem] size-64 rounded-full bg-gold/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-y-8 right-0 w-32 bg-[radial-gradient(ellipse_at_center,oklch(0.42_0.04_155/0.22),transparent_70%)] sm:w-44" />

      <div className="relative grid gap-5 lg:grid-cols-[minmax(11rem,15rem)_minmax(0,1fr)] lg:items-stretch lg:gap-6">
        <div className="hero-logo-panel flex flex-col items-center justify-center gap-3 rounded-[1.5rem] border border-border/50 bg-card/35 px-4 py-5 text-center backdrop-blur-sm sm:px-5 sm:py-6">
          <BrandLogo size="card" className="mx-auto w-28 sm:w-32" priority float={false} />
          <div className="space-y-1.5">
            <p className="text-[0.62rem] tracking-[0.24em] text-muted-foreground uppercase sm:text-[0.68rem]">
              Health • Fitness • Glow
            </p>
            <p className="text-sm text-foreground/90">Stronger • Happier • You</p>
            <AnimateIcon name="heart" size={18} tone="rose" playOnMount className="mx-auto" />
          </div>
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-5 sm:gap-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-muted/35">
                <AnimateIcon name="calendar" size={18} tone="rose" playOnMount />
              </span>
              <div className="min-w-0 space-y-1 pt-0.5">
                <p className="text-[0.62rem] tracking-[0.22em] text-neon uppercase sm:text-xs">
                  {dateLabel}
                </p>
                <p className="text-base font-medium text-foreground sm:text-lg">
                  {periodLabel} <span className="text-rose">♥</span>
                </p>
              </div>
            </div>

            <div className="relative min-h-[5.5rem] sm:min-h-[6.5rem] lg:min-h-[7.5rem]">
              <span aria-hidden className="hero-quote-mark">
                “
              </span>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={reduced ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                  className="relative z-10 max-w-3xl pt-3 pl-1"
                >
                  <p className="font-heading text-[1.35rem] leading-[1.18] font-semibold tracking-tight sm:text-[1.85rem] lg:text-[2.35rem]">
                    <span className="text-foreground">{lead}</span>
                    {accent ? <span className="text-neon"> {accent}</span> : null}
                  </p>
                  <span aria-hidden className="hero-quote-underline" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="hero-proud-card flex items-start gap-3 rounded-[1.25rem] border border-border/50 bg-card/30 px-4 py-3.5 backdrop-blur-sm sm:px-5 sm:py-4">
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
