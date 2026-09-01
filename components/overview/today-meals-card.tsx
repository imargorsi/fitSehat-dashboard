import Link from "next/link";
import { ChevronRight, Moon, Sun, UtensilsCrossed } from "lucide-react";

import { EmptyNote } from "@/components/layout/empty-note";
import { GlassCard } from "@/components/layout/glass-card";
import { SoftRow } from "@/components/layout/soft-row";
import { Button } from "@/components/ui/button";
import { EMPTY } from "@/lib/care-copy";
import { formatClock } from "@/lib/date.utils";
import { formatInt, formatNumber } from "@/lib/number.utils";
import type { TCalorieLog } from "@/lib/db/schema";

const mealIcon = {
  Breakfast: Sun,
  Lunch: UtensilsCrossed,
  Dinner: Moon,
  Snack: UtensilsCrossed,
  Other: UtensilsCrossed,
};

export function TodayMealsCard({
  logs,
  totalCalories,
}: {
  logs: TCalorieLog[];
  totalCalories: number;
}) {
  return (
    <GlassCard className="flex h-full flex-col">
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-6">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Today</p>
          <p className="font-heading mt-1 text-lg font-semibold tracking-tight">Today&apos;s meals</p>
          <p className="text-sm text-muted-foreground">Fuel logged with care</p>
        </div>
        <Button size="sm" nativeButton={false} render={<Link href="/calories" />}>
          Add
        </Button>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5">
        {logs.length === 0 ? (
          <EmptyNote title={EMPTY.mealsToday.title} body={EMPTY.mealsToday.body} />
        ) : (
          <ul className="space-y-2">
            {logs.map((log) => {
              const Icon = mealIcon[log.meal as keyof typeof mealIcon] ?? UtensilsCrossed;
              return (
                <li key={log.id}>
                  <Link href="/calories" className="block">
                    <SoftRow
                      className="hover:bg-muted/55"
                      icon={
                        <span className="flex size-10 items-center justify-center rounded-2xl bg-rose/15 text-rose">
                          <Icon className="size-4" />
                        </span>
                      }
                      title={log.item}
                      subtitle={`${log.meal} · ${formatClock(log.createdAt)}${log.notes ? ` · ${log.notes}` : ""}`}
                      value={
                        <span>
                          <span className="block font-medium text-foreground">{formatInt(log.calories)}</span>
                          <span className="block text-xs text-muted-foreground">
                            {log.proteinG ? `${formatNumber(log.proteinG)}g P` : "kcal"}
                          </span>
                        </span>
                      }
                      action={<ChevronRight className="size-4 text-muted-foreground" />}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-sm">
        <span className="text-muted-foreground">Total</span>
        <span className="font-medium text-neon">{formatInt(totalCalories)} kcal</span>
      </div>
    </GlassCard>
  );
}
