import type { ReactNode } from "react";

import { DayTotal, Eyebrow, Meta, RowSubtitle, RowTitle, Strong, Unit } from "@/components/ui/typography";
import { formatInt, formatNumber } from "@/lib/number.utils";
import { cn } from "@/lib/utils";

function grams(value: number | string | null | undefined, suffix: string) {
  const amount = formatNumber(value);
  return amount === "—" ? `— ${suffix}` : `${amount}g ${suffix}`;
}

export function CalorieDayTotals({
  calories,
  protein,
  carbs,
}: {
  calories: number;
  protein: number;
  carbs: number;
}) {
  return (
    <div className="flex flex-wrap items-baseline justify-end gap-x-4 gap-y-1">
      <DayTotal>
        {formatInt(calories)} <Unit>kcal</Unit>
      </DayTotal>
      <Meta className="tabular-nums">{grams(protein, "P")}</Meta>
      <Meta className="tabular-nums">{grams(carbs, "C")}</Meta>
    </div>
  );
}

export function CalorieJournalRow({
  item,
  meal,
  notes,
  calories,
  proteinG,
  carbsG,
  fatsG,
  action,
  className,
}: {
  item: string;
  meal: string;
  notes?: string | null;
  calories: number;
  proteinG?: string | null;
  carbsG?: string | null;
  fatsG?: string | null;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-[1.35rem] glass-row px-4 py-3 sm:px-5", className)}>
      <div className="flex min-w-0 items-center gap-3 sm:gap-5">
        <div className="min-w-0 flex-1">
          <Eyebrow>{meal}</Eyebrow>
          <RowTitle className="mt-1">{item}</RowTitle>
          {notes ? <RowSubtitle>{notes}</RowSubtitle> : null}
        </div>
        <div className="hidden shrink-0 items-baseline gap-4 sm:flex">
          <Strong className="tabular-nums">
            {formatInt(calories)} <Unit>kcal</Unit>
          </Strong>
          <Meta className="min-w-[3.5rem] text-right tabular-nums">{grams(proteinG, "P")}</Meta>
          <Meta className="min-w-[3.5rem] text-right tabular-nums">{grams(carbsG, "C")}</Meta>
          <Meta className="min-w-[3.5rem] text-right tabular-nums">{grams(fatsG, "F")}</Meta>
        </div>
        {action ? <div className="flex shrink-0 items-center gap-0.5">{action}</div> : null}
      </div>
      <div className="mt-2.5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-border/60 pt-2.5 sm:hidden">
        <Strong className="tabular-nums">
          {formatInt(calories)} <Unit>kcal</Unit>
        </Strong>
        <Meta className="tabular-nums">{grams(proteinG, "P")}</Meta>
        <Meta className="tabular-nums">{grams(carbsG, "C")}</Meta>
        <Meta className="tabular-nums">{grams(fatsG, "F")}</Meta>
      </div>
    </div>
  );
}
