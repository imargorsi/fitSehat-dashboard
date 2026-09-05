"use client";

import { useMemo, useState } from "react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { CalendarCell, CalendarTitle, CalendarWeekday, Legend, Meta } from "@/components/ui/typography";
import { formatMonthTitle, monthCells, shiftMonth, startOfMonth } from "@/lib/date.utils";
import { iconButtonClass } from "@/lib/field-control";
import { formatCompactSteps, formatInt } from "@/lib/number.utils";
import { cn } from "@/lib/utils";
import { walkAchieved } from "@/lib/walk.utils";

export type TWalkStamp = {
  id: string;
  date: string;
  steps: number;
  goalSteps: number;
  caloriesBurned: number;
};

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function DayFace({
  date,
  steps,
  achieved,
}: {
  date: string;
  steps?: number;
  achieved: boolean;
}) {
  const hasSteps = (steps ?? 0) > 0;
  return (
    <>
      <CalendarCell>{Number(date.slice(8, 10))}</CalendarCell>
      {hasSteps ? (
        <Meta
          className={cn(
            "max-w-full truncate leading-none tabular-nums",
            achieved ? "text-neon-foreground/80" : "text-current"
          )}
        >
          {formatCompactSteps(steps ?? 0)}
        </Meta>
      ) : (
        <span className="h-3" aria-hidden />
      )}
    </>
  );
}

export function WalkCalendar({
  today,
  monthStart,
  stamps,
  selectedDate,
  onSelectDate,
}: {
  today: string;
  monthStart: string;
  stamps: TWalkStamp[];
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
}) {
  const [cursor, setCursor] = useState(monthStart);
  const byDate = useMemo(() => new Map(stamps.map((row) => [row.date, row])), [stamps]);
  const cells = monthCells(cursor);

  return (
    <div className="grid gap-4 sm:gap-5">
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
      <div className="grid grid-cols-7 gap-1.5 border-b border-border/50 pb-2 text-center sm:gap-2">
        {WEEKDAYS.map((day) => (
          <CalendarWeekday key={day}>{day}</CalendarWeekday>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {cells.map((cell) => {
          const stamp = byDate.get(cell.date);
          const achieved = stamp ? walkAchieved(stamp.steps, stamp.goalSteps) : false;
          const isToday = cell.date === today;
          const isFuture = cell.date > today;
          const isSelected = selectedDate === cell.date;
          const canSelect = onSelectDate && cell.inMonth && !isFuture;

          const className = cn(
            "flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-1.5 sm:min-h-[4.75rem] sm:rounded-2xl sm:py-2",
            "transition-colors",
            !cell.inMonth && "opacity-30",
            isFuture && "text-muted-foreground",
            cell.inMonth && !stamp && !isFuture && "bg-muted/40 text-muted-foreground",
            stamp && !achieved && "bg-gold/15 text-gold",
            achieved && "bg-brand text-neon-foreground shadow-glow",
            isToday && !achieved && "ring-1 ring-rose/50",
            isSelected && "ring-2 ring-violet/70",
            canSelect && "cursor-pointer hover:ring-1 hover:ring-rose/40",
            canSelect && !achieved && "hover:bg-muted/55"
          );

          const title = stamp
            ? `${cell.date}: ${formatInt(stamp.steps)} steps`
            : isFuture
              ? `${cell.date}: future`
              : `${cell.date}: tap to log`;

          const face = <DayFace date={cell.date} steps={stamp?.steps} achieved={achieved} />;

          if (canSelect) {
            return (
              <button
                key={cell.date}
                type="button"
                title={title}
                aria-label={title}
                aria-pressed={isSelected}
                onClick={() => onSelectDate(cell.date)}
                className={className}
              >
                {face}
              </button>
            );
          }

          return (
            <div key={cell.date} title={title} className={className}>
              {face}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-4">
        <Legend className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-brand" /> Goal met
        </Legend>
        <Legend className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-gold/70" /> Walk logged
        </Legend>
        <Legend className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-muted" /> Rest / not logged
        </Legend>
      </div>
    </div>
  );
}

export function walkMonthStart(today: string) {
  return startOfMonth(today);
}
