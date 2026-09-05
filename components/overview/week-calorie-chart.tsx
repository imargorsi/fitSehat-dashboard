"use client";

import { motion, useReducedMotion } from "motion/react";

import { GlassCard } from "@/components/layout/glass-card";
import { WidgetBody, WidgetHeader } from "@/components/layout/widget-header";
import { ChartLabel, ChartLabelActive, Meta } from "@/components/ui/typography";
import { EASE_OUT } from "@/lib/motion";
import { formatInt } from "@/lib/number.utils";
import { cn } from "@/lib/utils";

export type TWeekBar = {
  date: string;
  label: string;
  calories: number;
  isToday: boolean;
};

function weekChartPeak(bars: TWeekBar[], goal: number | null): number {
  const dataMax = Math.max(...bars.map((bar) => bar.calories), 0);
  const includeGoal = goal != null && dataMax >= goal * 0.4;
  return Math.max(dataMax * 1.2, includeGoal ? goal : 0, 1);
}

function weekBarHeight(calories: number, peak: number): number {
  if (calories <= 0) {
    return 4;
  }
  return Math.max(8, (calories / peak) * 100);
}

export function WeekCalorieChart({
  bars,
  goal,
  fullWidth = false,
}: {
  bars: TWeekBar[];
  goal: number | null;
  fullWidth?: boolean;
}) {
  const reduced = useReducedMotion();
  const weekTotal = bars.reduce((sum, bar) => sum + bar.calories, 0);
  const peak = weekChartPeak(bars, goal);
  const goalTop = goal != null && goal <= peak ? Math.max(6, 100 - (goal / peak) * 100) : null;
  const loggedDays = bars.filter((bar) => bar.calories > 0).length;
  const subtitle =
    loggedDays > 0
      ? `${formatInt(weekTotal)} kcal this week${goal != null ? ` · ${formatInt(goal)} daily target` : ""}.`
      : goal != null
        ? `${formatInt(goal)} kcal daily target`
        : "No calories logged this week yet.";

  return (
    <GlassCard className={cn("flex flex-col", fullWidth ? "min-h-[22rem]" : "h-full min-h-[20rem]")}>
      <WidgetHeader eyebrow="Fuel" title="This week" subtitle={subtitle} className="pb-3 sm:pb-4" />
      <WidgetBody className={cn("flex flex-1 flex-col pt-0", fullWidth ? "min-h-[14rem] sm:min-h-[16rem]" : "min-h-[12rem] sm:min-h-[14rem]")}>
        <div className="relative flex flex-1 items-stretch gap-1.5 sm:gap-3">
          {goalTop != null ? (
            <div
              className="pointer-events-none absolute right-0 left-0 border-t border-dashed border-neon/40"
              style={{ top: `${goalTop}%` }}
            />
          ) : null}
          {bars.map((bar, index) => {
            const height = weekBarHeight(bar.calories, peak);
            return (
              <div key={bar.date} className="flex min-w-0 flex-1 flex-col items-center">
                <div className="flex w-full flex-1 items-end justify-center pb-2">
                  <motion.div
                    title={`${bar.label}: ${formatInt(bar.calories)} kcal`}
                    className={cn(
                      "w-full origin-bottom rounded-full",
                      fullWidth ? "max-w-14 sm:max-w-16" : "max-w-9",
                      bar.isToday ? "bg-brand shadow-glow" : bar.calories > 0 ? "bg-rose/45" : "bg-muted/80"
                    )}
                    initial={{ height: reduced || bar.calories <= 0 ? `${height}%` : "8%" }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.05, ease: EASE_OUT }}
                    whileHover={reduced ? undefined : { scaleY: 1.04 }}
                  />
                </div>
                <div className="flex shrink-0 flex-col items-center gap-1">
                  {fullWidth ? (
                    <Meta className={cn("tabular-nums", bar.calories === 0 && "text-muted-foreground/70")}>
                      {formatInt(bar.calories)}
                    </Meta>
                  ) : bar.isToday ? (
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
