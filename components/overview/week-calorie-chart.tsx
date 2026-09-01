"use client";

import { motion, useReducedMotion } from "motion/react";

import { GlassCard } from "@/components/layout/glass-card";
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
    <GlassCard className="flex h-full flex-col gap-4 p-5 sm:p-6 lg:p-7">
      <div>
        <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Week</p>
        <p className="font-heading mt-2 text-lg font-semibold tracking-tight">Calories this week</p>
        <p className="text-sm leading-6 text-muted-foreground">
          {loggedDays > 0
            ? `${loggedDays} days of showing up. Look at you moving.`
            : goal != null
              ? `${formatInt(goal)} kcal daily goal · no rush`
              : "A quiet week can still be a kind week."}
        </p>
      </div>
      <div className="flex min-h-44 flex-1 flex-col gap-2">
        <div className="relative flex h-32 items-end gap-1.5 sm:h-36 sm:gap-2">
          {goalTop != null ? (
            <div
              className="pointer-events-none absolute right-0 left-0 border-t border-dashed border-neon/40"
              style={{ top: `${goalTop}%` }}
            />
          ) : null}
          {bars.map((bar, index) => {
            const height = Math.max(8, (bar.calories / peak) * 100);
            return (
              <div key={bar.date} className="flex h-full min-w-0 flex-1 items-end justify-center">
                <motion.div
                  title={`${bar.label}: ${formatInt(bar.calories)} kcal`}
                  className={cn(
                    "w-full max-w-8 origin-bottom rounded-t-2xl",
                    bar.isToday ? "bg-love shadow-glow" : bar.calories > 0 ? "bg-rose/45" : "bg-muted"
                  )}
                  initial={{ height: reduced ? `${height}%` : "8%" }}
                  animate={{ height: `${height}%` }}
                  transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.05, ease: EASE_OUT }}
                  whileHover={reduced ? undefined : { scaleY: 1.06 }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          {bars.map((bar) => (
            <span
              key={`${bar.date}-label`}
              className={cn(
                "min-w-0 flex-1 text-center text-xs",
                bar.isToday ? "font-medium text-rose" : "text-muted-foreground"
              )}
            >
              {bar.label}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
