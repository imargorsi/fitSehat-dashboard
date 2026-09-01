"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { GlassCard } from "@/components/layout/glass-card";
import { CARE_NOTES, nextCareNoteIndex, personalizeNote } from "@/lib/care-notes";

export function QuoteHero({
  name,
  periodLabel,
  dateLabel,
}: {
  name: string;
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

  const quote = personalizeNote(CARE_NOTES[index] ?? CARE_NOTES[0], name);

  return (
    <GlassCard className="relative grid min-h-0 overflow-hidden p-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-10 sm:p-9 lg:min-h-[24rem] lg:p-12">
      <div className="pointer-events-none absolute -top-28 right-[-4rem] size-80 rounded-full bg-rose/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 size-72 rounded-full bg-gold/10 blur-3xl" />
      <BrandLogo
        size="card"
        className="relative mx-auto w-28 shrink-0 sm:mx-0 sm:w-40 lg:w-52"
        priority
      />
      <div className="relative mt-6 flex min-w-0 flex-col justify-center gap-5 text-center sm:mt-0 sm:text-left">
        <div className="space-y-1">
          <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">{dateLabel}</p>
          <p className="text-sm text-muted-foreground">{periodLabel}</p>
        </div>
        <div className="relative min-h-[4.5rem] sm:min-h-[7rem]">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading mx-auto max-w-4xl text-[1.5rem] leading-[1.15] font-semibold tracking-tight sm:mx-0 sm:text-4xl lg:text-[2.75rem]"
            >
              {quote}
            </motion.p>
          </AnimatePresence>
        </div>
        <p className="font-note relative">Proud of you, {name.trim() || "love"}</p>
      </div>
    </GlassCard>
  );
}
