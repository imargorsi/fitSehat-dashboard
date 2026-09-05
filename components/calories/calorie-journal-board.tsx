"use client";

import { Fragment } from "react";

import { deleteCalorieLog } from "@/app/(dashboard)/calories/actions";
import { CalorieLogEditDialog } from "@/components/calories/calorie-log-edit-dialog";
import { DeleteRowButton } from "@/components/layout/delete-row-button";
import { EmptyNote } from "@/components/layout/empty-note";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MealTypeChip } from "@/components/meals/meal-filter-chips";
import { MacroStatGrid } from "@/components/layout/macro-stat-grid";
import { Caption, DayHeader, DayTotal, Meta, Muted, Strong, Unit } from "@/components/ui/typography";
import { formatMediumDate } from "@/lib/date.utils";
import { isCalorieMeal } from "@/lib/meals.utils";
import { formatInt, formatNumber, toNumber } from "@/lib/number.utils";
import { typeCaption } from "@/lib/typography";

export type TCalorieJournalItem = {
  id: string;
  item: string;
  meal: string;
  notes: string | null;
  calories: number;
  proteinG: string | null;
  carbsG: string | null;
  fatsG: string | null;
  loggedOn: string;
};

function macroCell(value: string | number | null): string {
  return formatNumber(value);
}

function grams(value: number, suffix: string) {
  return `${formatNumber(value)}g ${suffix}`;
}

function groupLogsByDate(logs: TCalorieJournalItem[]): [string, TCalorieJournalItem[]][] {
  const grouped = new Map<string, TCalorieJournalItem[]>();
  for (const log of logs) {
    const rows = grouped.get(log.loggedOn) ?? [];
    rows.push(log);
    grouped.set(log.loggedOn, rows);
  }
  return [...grouped.entries()];
}

function dayTotals(rows: TCalorieJournalItem[]) {
  return rows.reduce(
    (totals, row) => ({
      calories: totals.calories + row.calories,
      protein: totals.protein + (toNumber(row.proteinG) ?? 0),
      carbs: totals.carbs + (toNumber(row.carbsG) ?? 0),
      fats: totals.fats + (toNumber(row.fatsG) ?? 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );
}

function RowActions({ today, item }: { today: string; item: TCalorieJournalItem }) {
  return (
    <div className="flex items-center justify-end">
      <CalorieLogEditDialog
        compact
        today={today}
        initial={{
          id: item.id,
          item: item.item,
          loggedOn: item.loggedOn,
          meal: isCalorieMeal(item.meal) ? item.meal : "Snack",
          calories: item.calories,
          proteinG: item.proteinG,
          carbsG: item.carbsG,
          fatsG: item.fatsG,
          notes: item.notes,
        }}
      />
      <DeleteRowButton compact action={deleteCalorieLog} id={item.id} />
    </div>
  );
}

function DayHeading({ day, today, rows }: { day: string; today: string; rows: TCalorieJournalItem[] }) {
  const totals = dayTotals(rows);
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-3">
      <div className="min-w-0">
        <Caption>{day === today ? "Today" : "Day"}</Caption>
        <DayHeader>{formatMediumDate(day)}</DayHeader>
      </div>
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1 sm:justify-end sm:gap-x-4">
        <DayTotal>
          {formatInt(totals.calories)} <Unit>kcal</Unit>
        </DayTotal>
        <Meta className="tabular-nums">{grams(totals.protein, "P")}</Meta>
        <Meta className="tabular-nums">{grams(totals.carbs, "C")}</Meta>
        <Meta className="tabular-nums">{grams(totals.fats, "F")}</Meta>
      </div>
    </div>
  );
}

export function CalorieJournalBoard({
  today,
  logs,
  empty,
}: {
  today: string;
  logs: TCalorieJournalItem[];
  empty: { title: string; body: string };
}) {
  if (logs.length === 0) {
    return <EmptyNote title={empty.title} body={empty.body} icon="book" tone="rose" />;
  }

  const grouped = groupLogsByDate(logs);

  return (
    <>
      <div className="space-y-6 sm:hidden">
        {grouped.map(([day, rows]) => (
          <section key={day} className="space-y-2.5">
            <DayHeading day={day} today={today} rows={rows} />
            <ul className="grid gap-2.5">
              {rows.map((item) => (
                <li key={item.id} className="min-w-0 rounded-2xl border border-border bg-muted/20 p-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <MealTypeChip meal={item.meal} />
                      <Strong className="mt-2 block break-words">{item.item}</Strong>
                      {item.notes ? <Muted className="mt-1 break-words">{item.notes}</Muted> : null}
                    </div>
                    <RowActions today={today} item={item} />
                  </div>
                  <MacroStatGrid
                    calories={formatInt(item.calories)}
                    protein={macroCell(item.proteinG)}
                    carbs={macroCell(item.carbsG)}
                    fat={macroCell(item.fatsG)}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className={typeCaption}>Meal</TableHead>
              <TableHead className={typeCaption}>Name</TableHead>
              <TableHead className={typeCaption}>Calories</TableHead>
              <TableHead className={typeCaption}>Protein</TableHead>
              <TableHead className={typeCaption}>Carbs</TableHead>
              <TableHead className={typeCaption}>Fat</TableHead>
              <TableHead className="w-24">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {grouped.map(([day, rows]) => (
              <Fragment key={day}>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableCell colSpan={7} className="whitespace-normal bg-muted/20 px-2 py-3">
                    <DayHeading day={day} today={today} rows={rows} />
                  </TableCell>
                </TableRow>
                {rows.map((item) => (
                  <TableRow key={item.id} className="border-border/50">
                    <TableCell>
                      <MealTypeChip meal={item.meal} />
                    </TableCell>
                    <TableCell className="whitespace-normal">
                      <Strong>{item.item}</Strong>
                      {item.notes ? <Muted className="mt-0.5">{item.notes}</Muted> : null}
                    </TableCell>
                    <TableCell className="tabular-nums">{formatInt(item.calories)}</TableCell>
                    <TableCell className="tabular-nums">{macroCell(item.proteinG)}</TableCell>
                    <TableCell className="tabular-nums">{macroCell(item.carbsG)}</TableCell>
                    <TableCell className="tabular-nums">{macroCell(item.fatsG)}</TableCell>
                    <TableCell className="text-right">
                      <RowActions today={today} item={item} />
                    </TableCell>
                  </TableRow>
                ))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
