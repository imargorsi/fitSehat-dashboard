"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { formatMonthTitle, monthCells, shiftMonth, startOfMonth } from "@/lib/date.utils";
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
          className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Previous month"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="font-heading min-w-0 truncate text-base font-semibold tracking-tight sm:text-lg">{formatMonthTitle(cursor)}</p>
        <button
          type="button"
          onClick={() => setCursor((value) => shiftMonth(value, 1))}
          className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Next month"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[0.65rem] tracking-wide text-muted-foreground uppercase sm:gap-1.5 sm:text-xs">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
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
                "flex aspect-square flex-col items-center justify-center rounded-xl text-[0.7rem] tabular-nums sm:rounded-2xl sm:text-sm",
                !cell.inMonth && "opacity-30",
                isFuture && "text-muted-foreground",
                cell.inMonth && !stamp && !isFuture && "bg-muted/35 text-muted-foreground",
                stamp && !achieved && "bg-gold/15 text-gold",
                achieved && "bg-love text-neon-foreground shadow-glow",
                isToday && !achieved && "ring-1 ring-rose/50"
              )}
            >
              {Number(cell.date.slice(8, 10))}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-love" /> Met the goal
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-gold/70" /> Walked, still going
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-muted" /> Rest / not logged
        </span>
      </div>
    </div>
  );
}

export function walkMonthStart(today: string) {
  return startOfMonth(today);
}
