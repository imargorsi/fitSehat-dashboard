import { APP_TIME_ZONE } from "@/lib/constants";

export function todayDateString(timeZone = APP_TIME_ZONE, date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function startOfWeekMonday(dateStr: string): string {
  const date = parseDateOnly(dateStr);
  const day = date.getUTCDay();
  const diff = day === 0 ? 6 : day - 1;
  date.setUTCDate(date.getUTCDate() - diff);
  return toDateOnly(date);
}

export function startOfMonth(dateStr: string): string {
  return `${dateStr.slice(0, 7)}-01`;
}

export function daysInclusive(from: string, to: string): number {
  const start = parseDateOnly(from).getTime();
  const end = parseDateOnly(to).getTime();
  return Math.floor((end - start) / 86_400_000) + 1;
}

export function latestTuesdayOnOrBefore(dateStr: string): string {
  const date = parseDateOnly(dateStr);
  const day = date.getUTCDay();
  const diff = (day + 5) % 7;
  date.setUTCDate(date.getUTCDate() - diff);
  return toDateOnly(date);
}

export function addDays(dateStr: string, amount: number): string {
  const date = parseDateOnly(dateStr);
  date.setUTCDate(date.getUTCDate() + amount);
  return toDateOnly(date);
}

export function weekDaysMonday(weekStart: string): { date: string; label: string }[] {
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index);
    const label = new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: "UTC",
    }).format(parseDateOnly(date));
    return { date, label };
  });
}

export function formatLongDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseDateOnly(dateStr));
}

export function formatMediumDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseDateOnly(dateStr));
}

export function formatChartAxisDate(dateStr: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(parseDateOnly(dateStr));
}

export function greetingWord(date = new Date(), timeZone = APP_TIME_ZONE): "morning" | "afternoon" | "evening" {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      hour: "numeric",
      hourCycle: "h23",
      timeZone,
    }).format(date)
  );
  if (hour < 12) {
    return "morning";
  }
  if (hour < 17) {
    return "afternoon";
  }
  return "evening";
}

export function monthCells(monthStart: string): { date: string; inMonth: boolean }[] {
  const prefix = monthStart.slice(0, 7);
  const last = lastDateOfMonth(monthStart);
  const start = startOfWeekMonday(monthStart);
  const end = addDays(startOfWeekMonday(last), 6);
  const cells: { date: string; inMonth: boolean }[] = [];
  let cursor = start;
  while (cursor <= end) {
    cells.push({ date: cursor, inMonth: cursor.startsWith(prefix) });
    cursor = addDays(cursor, 1);
  }
  return cells;
}

export function lastDateOfMonth(monthStart: string): string {
  const year = Number(monthStart.slice(0, 4));
  const month = Number(monthStart.slice(5, 7));
  const last = new Date(Date.UTC(year, month, 0));
  return toDateOnly(last);
}

export function shiftMonth(monthStart: string, amount: number): string {
  const year = Number(monthStart.slice(0, 4));
  const month = Number(monthStart.slice(5, 7));
  const shifted = new Date(Date.UTC(year, month - 1 + amount, 1));
  return toDateOnly(shifted);
}

export function formatMonthTitle(monthStart: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseDateOnly(monthStart));
}

export function formatClock(value: Date | string, timeZone = APP_TIME_ZONE): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  }).format(date);
}

function parseDateOnly(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day));
}

function toDateOnly(date: Date): string {
  return date.toISOString().slice(0, 10);
}
