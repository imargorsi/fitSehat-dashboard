import Link from "next/link";

import { AppLinkButton } from "@/components/layout/app-link-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { GlassCard } from "@/components/layout/glass-card";
import { SoftRow } from "@/components/layout/soft-row";
import { WidgetHeader } from "@/components/layout/widget-header";
import { AnimateIcon } from "@/components/icons/animate-icon";import { EMPTY } from "@/lib/care-copy";
import { formatClock } from "@/lib/date.utils";
import { formatInt, formatNumber } from "@/lib/number.utils";
import type { TCalorieLog } from "@/lib/db/schema";

const mealIcon = {
  Breakfast: "sun" as const,
  Lunch: "utensils" as const,
  Dinner: "utensils" as const,
  Snack: "sparkles" as const,
  Other: "utensils" as const,
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
      <WidgetHeader
        eyebrow="Today"
        title="Today's meals, Love"
        subtitle="Fuel logged with care, Guddi"
        actions={<AppLinkButton href="/calories" label="Add more" icon="plus" />}
      />
      <div className="flex flex-1 flex-col px-5 pb-5">
        {logs.length === 0 ? (
          <EmptyNote title={EMPTY.mealsToday.title} body={EMPTY.mealsToday.body} icon="sun" tone="gold" />
        ) : (
          <ul className="space-y-2">
            {logs.map((log) => {
              const icon = mealIcon[log.meal as keyof typeof mealIcon] ?? "utensils";
              return (
                <li key={log.id}>
                  <Link href="/calories" className="block">
                    <SoftRow
                      className="hover:bg-muted/55"
                      icon={
                        <span className="flex size-10 items-center justify-center rounded-2xl border border-border/40 bg-rose/10">
                          <AnimateIcon name={icon} size={18} tone="rose" />
                        </span>
                      }                      title={log.item}
                      subtitle={`${log.meal} · ${formatClock(log.createdAt)}${log.notes ? ` · ${log.notes}` : ""}`}
                      value={
                        <span>
                          <span className="block font-medium text-foreground">{formatInt(log.calories)}</span>
                          <span className="block text-xs text-muted-foreground">
                            {log.proteinG ? `${formatNumber(log.proteinG)}g P` : "kcal"}
                          </span>
                        </span>
                      }
                      action={<AnimateIcon name="chevron" size={16} tone="muted" />}                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-border px-5 py-3 text-sm">
        <span className="text-muted-foreground">All of it, Love</span>
        <span className="font-medium text-neon">{formatInt(totalCalories)} kcal</span>
      </div>
    </GlassCard>
  );
}
