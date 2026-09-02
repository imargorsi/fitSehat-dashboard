"use client";

import { useMemo, useState } from "react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { CalendarCell, CalendarTitle, CalendarWeekday, Legend } from "@/components/ui/typography";
import { formatMonthTitle, monthCells, shiftMonth, startOfMonth } from "@/lib/date.utils";
import { iconButtonClass } from "@/lib/field-control";
import { formatInt } from "@/lib/number.utils";
import { cn } from "@/lib/utils";
import { walkAchieved } from "@/lib/walk.utils";

export type TWalkStamp = {
  date: string;
  steps: number;
  goalSteps: number;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function WalkCalendar({
  today,
  monthStart,
  stamps,
}: {
  today: string;
  monthStart: string;
  stamps: TWalkStamp[];
}) {
  const [cursor, setCursor] = useState(monthStart);
  const byDate = useMemo(() => new Map(stamps.map((row) => [row.date, row])), [stamps]);
  const cells = monthCells(cursor);

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setCursor((value) => shiftMonth(value, -1))}
          className={iconButtonClass}
          aria-label="Previous month"
        >
          <AnimateIcon name="chevronLeft" size={18} tone="muted" />
        </button>
        <CalendarTitle>{formatMonthTitle(cursor)}</CalendarTitle>
        <button
          type="button"
          onClick={() => setCursor((value) => shiftMonth(value, 1))}
          className={iconButtonClass}
          aria-label="Next month"
        >
          <AnimateIcon name="chevronRight" size={18} tone="muted" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center sm:gap-1.5">
        {WEEKDAYS.map((day) => (
          <CalendarWeekday key={day}>{day}</CalendarWeekday>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
        {cells.map((cell) => {
          const stamp = byDate.get(cell.date);
          const achieved = stamp ? walkAchieved(stamp.steps, stamp.goalSteps) : false;
          const isToday = cell.date === today;
          const isFuture = cell.date > today;
          return (
            <div
              key={cell.date}
              title={
                stamp
                  ? `${cell.date}: ${formatInt(stamp.steps)} steps`
                  : cell.date
              }
              className={cn(
                "flex aspect-square flex-col items-center justify-center rounded-xl sm:rounded-2xl",
                !cell.inMonth && "opacity-30",
                isFuture && "text-muted-foreground",
                cell.inMonth && !stamp && !isFuture && "bg-muted/35 text-muted-foreground",
                stamp && !achieved && "bg-gold/15 text-gold",
                achieved && "bg-love text-neon-foreground shadow-glow",
                isToday && !achieved && "ring-1 ring-rose/50"
              )}
            >
              <CalendarCell>{Number(cell.date.slice(8, 10))}</CalendarCell>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-love" /> Met it, Guddi
        </Legend>
        <Legend className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-gold/70" /> Walked, still going, Love
        </Legend>
        <Legend className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-muted" /> Rest / not logged, Jaan
        </Legend>
      </div>
    </div>
  );
}

export function walkMonthStart(today: string) {
  return startOfMonth(today);
}
