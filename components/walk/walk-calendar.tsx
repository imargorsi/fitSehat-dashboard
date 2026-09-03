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
          const isSelected = selectedDate === cell.date;
          const canSelect = onSelectDate && cell.inMonth && !isFuture;

          const className = cn(
            "flex aspect-square flex-col items-center justify-center rounded-xl sm:rounded-2xl transition-colors",
            !cell.inMonth && "opacity-30",
            isFuture && "text-muted-foreground",
            cell.inMonth && !stamp && !isFuture && "bg-muted/35 text-muted-foreground",
            stamp && !achieved && "bg-gold/15 text-gold",
            achieved && "bg-brand text-neon-foreground shadow-glow",
            isToday && !achieved && "ring-1 ring-rose/50",
            isSelected && "ring-2 ring-violet/70",
            canSelect && "cursor-pointer hover:ring-1 hover:ring-rose/40"
          );

          const title = stamp
            ? `${cell.date}: ${formatInt(stamp.steps)} steps`
            : isFuture
              ? `${cell.date}: future`
              : `${cell.date}: tap to log`;

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
                <CalendarCell>{Number(cell.date.slice(8, 10))}</CalendarCell>
              </button>
            );
          }

          return (
            <div key={cell.date} title={title} className={className}>
              <CalendarCell>{Number(cell.date.slice(8, 10))}</CalendarCell>
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
