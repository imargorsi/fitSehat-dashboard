"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { CountUp } from "@/components/motion/count-up";
import { GlassCard } from "@/components/layout/glass-card";
import { cn } from "@/lib/utils";
import { clampPercent } from "@/lib/number.utils";

export function GlowIcon({
  children,
  tone = "neon",
}: {
  children: ReactNode;
  tone?: "neon" | "violet";
}) {
  return (
    <div
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-2xl sm:size-10",
        tone === "neon" && "bg-neon/15 text-neon shadow-glow",
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
  tone?: "neon" | "violet";
}) {
  const reduced = useReducedMotion();
  const percent = clampPercent(value, max);

  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
      <motion.div
        className={cn(
          "h-full rounded-full",
          tone === "neon" && "bg-love shadow-glow",
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
}: {
  icon: ReactNode;
  tone?: "neon" | "violet";
  label: string;
  value?: string;
  countTo?: number;
  suffix?: string;
  unit?: string;
  hint: string;
  meter?: { value: number; max: number };
  footer?: ReactNode;
  compact?: boolean;
}) {
  return (
    <GlassCard className={cn("flex h-full min-w-0 flex-col gap-3", compact ? "p-4" : "gap-3 p-4 sm:gap-4 sm:p-6")}>
      <div className="flex items-start justify-between gap-3">
        <GlowIcon tone={tone}>{icon}</GlowIcon>
        {meter ? (
          <span className="text-xs text-muted-foreground sm:text-sm">
            {clampPercent(meter.value, meter.max)}%
          </span>
        ) : null}
      </div>
      <div className="space-y-1">
        <p className="text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase sm:text-sm">{label}</p>
        <p
          className={cn(
            "leading-none font-semibold tracking-tight",
            compact ? "text-2xl lg:text-3xl" : "text-2xl sm:text-[1.85rem] lg:text-4xl"
          )}
        >
          {countTo != null ? <CountUp value={countTo} /> : value}
          {suffix ? (
            <span className="text-lg font-normal text-muted-foreground sm:text-2xl">{suffix}</span>
          ) : null}
          {unit ? (
            <span className="ml-1 text-sm font-normal text-muted-foreground sm:ml-1.5 sm:text-base">{unit}</span>
          ) : null}
        </p>
      </div>
      {meter ? <NeonMeter value={meter.value} max={meter.max} tone={tone} /> : null}
      {footer}
      <p
        className={cn(
          "text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6",
          compact ? "line-clamp-1" : "line-clamp-2 sm:line-clamp-3"
        )}
      >
        {hint}
      </p>
    </GlassCard>
  );
}

export function MealDots({ logged }: { logged: Iterable<string> }) {
  const set = logged instanceof Set ? logged : new Set(logged);
  const meals = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
  const reduced = useReducedMotion();

  return (
    <div className="flex gap-1.5">
      {meals.map((meal, index) => {
        const isOn = set.has(meal);
        return (
          <motion.span
            key={meal}
            title={meal}
            className={cn("size-2.5 rounded-full", isOn ? "bg-neon shadow-glow" : "bg-muted")}
            initial={reduced || !isOn ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: reduced ? 0 : 0.12 * index, type: "spring", stiffness: 380, damping: 18 }}
          />
        );
      })}
    </div>
  );
}
