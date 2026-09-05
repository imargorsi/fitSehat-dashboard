"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { CountUp } from "@/components/motion/count-up";
import { Caption, Metric, MetricCompact, Percent, StatHint, Unit } from "@/components/ui/typography";
import { GlassCard } from "@/components/layout/glass-card";
import { cn } from "@/lib/utils";
import { clampPercent } from "@/lib/number.utils";

export type TStatTone = "neon" | "rose" | "gold" | "violet";

export function GlowIcon({
  children,
  tone = "neon",
}: {
  children: ReactNode;
  tone?: TStatTone;
}) {
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-2xl sm:size-10",
        tone === "neon" && "bg-neon/15 text-neon shadow-glow",
        tone === "rose" && "bg-rose/15 text-rose",
        tone === "gold" && "bg-gold/15 text-gold",
        tone === "violet" && "bg-violet/15 text-violet"
      )}
    >
      {children}
    </div>
  );
}

export function NeonMeter({
  value,
  max,
  tone = "neon",
}: {
  value: number;
  max: number;
  tone?: TStatTone;
}) {
  const reduced = useReducedMotion();
  const percent = clampPercent(value, max);

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
      <motion.div
        className={cn(
          "h-full rounded-full",
          tone === "neon" && "bg-brand",
          tone === "rose" && "bg-rose",
          tone === "gold" && "bg-gold",
          tone === "violet" && "bg-violet"
        )}
        initial={{ width: reduced ? `${percent}%` : "0%" }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function StatCard({
  icon,
  tone,
  label,
  value,
  countTo,
  suffix,
  unit,
  hint,
  meter,
  footer,
  compact = false,
  scene = false,
}: {
  icon: ReactNode;
  tone?: TStatTone;
  label: string;
  value?: string;
  countTo?: number;
  suffix?: string;
  unit?: string;
  hint?: string;
  meter?: { value: number; max: number };
  footer?: ReactNode;
  compact?: boolean;
  scene?: boolean;
}) {
  const MetricTag = compact ? MetricCompact : Metric;
  const metric = (
    <MetricTag>
      {countTo != null ? <CountUp value={countTo} /> : value}
      {suffix ? <Unit>{suffix}</Unit> : null}
      {unit ? <Unit className="ml-1 sm:ml-1.5">{unit}</Unit> : null}
    </MetricTag>
  );

  if (scene && !compact) {
    return (
      <GlassCard
        magic={false}
        bordered={false}
        elevated
        surfaceClassName="stat-surface"
        className="flex h-full min-w-0 flex-col justify-between gap-3 overflow-hidden p-4 sm:p-5 lg:min-h-[12.75rem] lg:gap-4 lg:p-6"
      >
        <div className="flex min-w-0 items-center gap-4">
          <div className="order-1 shrink-0 lg:order-2">{icon}</div>
          <div className="order-2 min-w-0 flex-1 space-y-1.5 lg:order-1">
            <div className="flex flex-wrap items-center gap-2">
              <Caption>{label}</Caption>
              {meter ? <Percent>{clampPercent(meter.value, meter.max)}%</Percent> : null}
            </div>
            {metric}
            {footer}
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-1.5">{meter ? <NeonMeter value={meter.value} max={meter.max} /> : null}</div>
          <StatHint className="line-clamp-2 min-h-10 lg:min-h-12">{hint ?? "\u00a0"}</StatHint>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard
      magic
      className={cn(
        "flex h-full min-w-0 flex-col",
        compact ? "gap-3 p-4" : "gap-3 p-4 sm:gap-4 sm:p-6"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <GlowIcon tone={tone}>{icon}</GlowIcon>
        {meter ? <Percent>{clampPercent(meter.value, meter.max)}%</Percent> : null}
      </div>
      <div className="space-y-1">
        <Caption>{label}</Caption>
        {metric}
      </div>
      {footer}
      {meter ? <NeonMeter value={meter.value} max={meter.max} tone={tone} /> : null}
      {hint ? (
        <StatHint className={compact ? "line-clamp-1" : "line-clamp-2 sm:line-clamp-3"}>{hint}</StatHint>
      ) : null}
    </GlassCard>
  );
}

export function MealDots({ logged }: { logged: Iterable<string> }) {
  const set = logged instanceof Set ? logged : new Set(logged);
  const meals = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
  const reduced = useReducedMotion();
  const onClass = {
    Breakfast: "bg-neon shadow-glow",
    Lunch: "bg-rose shadow-glow",
    Dinner: "bg-gold shadow-glow",
    Snack: "bg-violet shadow-glow",
  } as const;

  return (
    <div className="flex gap-1.5">
      {meals.map((meal, index) => {
        const isOn = set.has(meal);
        return (
          <motion.span
            key={meal}
            title={meal}
            className={cn("size-2.5 rounded-full", isOn ? onClass[meal] : "bg-muted")}
            initial={reduced || !isOn ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.12 * index, type: "spring", stiffness: 380, damping: 18 }}
          />
        );
      })}
    </div>
  );
}
