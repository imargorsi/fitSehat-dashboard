"use client";

import { motion, useReducedMotion } from "motion/react";

import { GlassCard } from "@/components/layout/glass-card";
import { WidgetBody, WidgetHeader } from "@/components/layout/widget-header";
import { ChartLabel, ChartLabelActive } from "@/components/ui/typography";
import { EASE_OUT } from "@/lib/motion";
import { formatInt } from "@/lib/number.utils";
import { cn } from "@/lib/utils";

export type TWeekBar = {
  date: string;
  label: string;
  calories: number;
  isToday: boolean;
};

export function WeekCalorieChart({
  bars,
  goal,
}: {
  bars: TWeekBar[];
  goal: number | null;
}) {
  const reduced = useReducedMotion();
  const peak = Math.max(goal ?? 0, ...bars.map((bar) => bar.calories), 1);
  const goalTop = goal != null ? Math.max(8, 100 - (goal / peak) * 100) : null;
  const loggedDays = bars.filter((bar) => bar.calories > 0).length;

  return (
    <GlassCard className="flex h-full min-h-[20rem] flex-col">
      <WidgetHeader
        eyebrow="Week"
        title="Calories this week"
        subtitle={
          loggedDays > 0
            ? `${loggedDays} day${loggedDays === 1 ? "" : "s"} logged this week.`
            : goal != null
              ? `${formatInt(goal)} kcal daily target`
              : "No calories logged this week yet."
        }
        className="pb-3 sm:pb-4"
      />
      <WidgetBody className="flex min-h-[12rem] flex-1 flex-col pt-0 sm:min-h-[14rem]">
        <div className="relative flex flex-1 items-stretch gap-1.5 sm:gap-2">
          {goalTop != null ? (
            <div
              className="pointer-events-none absolute right-0 left-0 border-t border-dashed border-neon/40"
              style={{ top: `${goalTop}%` }}
            />
          ) : null}
          {bars.map((bar, index) => {
            const height = Math.max(10, (bar.calories / peak) * 100);
            return (
              <div key={bar.date} className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex w-full flex-1 items-end justify-center pb-2">
                  <motion.div
                    title={`${bar.label}: ${formatInt(bar.calories)} kcal`}
                    className={cn(
                      "w-full max-w-9 origin-bottom rounded-full",
                      bar.isToday ? "bg-brand shadow-glow" : bar.calories > 0 ? "bg-rose/45" : "bg-muted/80"
                    )}
                    initial={{ height: reduced ? `${height}%` : "10%" }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.05, ease: EASE_OUT }}
                    whileHover={reduced ? undefined : { scaleY: 1.04 }}
                  />
                </div>
                <div className="flex shrink-0 flex-col items-center gap-1.5">
                  {bar.isToday ? (
                    <span aria-hidden className="h-1 w-5 rounded-full bg-brand shadow-glow" />
                  ) : (
                    <span aria-hidden className="h-1 w-5" />
                  )}
                  {bar.isToday ? (
                    <ChartLabelActive>{bar.label}</ChartLabelActive>
                  ) : (
                    <ChartLabel>{bar.label}</ChartLabel>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </WidgetBody>
    </GlassCard>
  );
}
