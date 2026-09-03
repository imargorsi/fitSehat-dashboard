import Link from "next/link";

import { AppLinkButton } from "@/components/layout/app-link-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { GlassCard } from "@/components/layout/glass-card";
import { SoftRow } from "@/components/layout/soft-row";
import { WidgetBody, WidgetFooter, WidgetHeader } from "@/components/layout/widget-header";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { Meta, Muted, Strong, StrongNeon } from "@/components/ui/typography";
import { EMPTY } from "@/lib/app-copy";
import { formatClock } from "@/lib/date.utils";
import { listStackClass } from "@/lib/layout";
import { formatInt, formatNumber } from "@/lib/number.utils";
import type { TCalorieLog } from "@/lib/db/schema";
import type { TCalorieMeal } from "@/lib/constants";
import { cn } from "@/lib/utils";

const mealIcon: Record<TCalorieMeal, "sun" | "utensils" | "sparkles"> = {
  Breakfast: "sun",
  Lunch: "utensils",
  Dinner: "utensils",
  Snack: "sparkles",
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
        title="Today's meals"
        subtitle="Meals logged today"
        actions={<AppLinkButton href="/calories" label="Add more" icon="plus" />}
      />
      <WidgetBody className={cn("flex flex-col", logs.length === 0 && "pt-0")}>
        {logs.length === 0 ? (
          <EmptyNote title={EMPTY.mealsToday.title} body={EMPTY.mealsToday.body} icon="sun" tone="gold" />
        ) : (
          <ul className={listStackClass}>
            {logs.map((log) => {
              const icon = mealIcon[log.meal as TCalorieMeal] ?? "utensils";
              return (
                <li key={log.id}>
                  <Link href="/calories" className="block">
                    <SoftRow
                      className="hover:bg-muted/55"
                      icon={
                        <span className="flex size-10 items-center justify-center rounded-2xl border border-border/40 bg-rose/10">
                          <AnimateIcon name={icon} size={18} tone="rose" />
                        </span>
                      }
                      title={log.item}
                      subtitle={`${log.meal} · ${formatClock(log.createdAt)}${log.notes ? ` · ${log.notes}` : ""}`}
                      value={
                        <span>
                          <Strong className="block">{formatInt(log.calories)}</Strong>
                          <Meta className="block">
                            {log.proteinG ? `${formatNumber(log.proteinG)}g P` : "kcal"}
                          </Meta>
                        </span>
                      }
                      action={<AnimateIcon name="chevron" size={16} tone="muted" />}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </WidgetBody>
      <WidgetFooter>
        <Muted>Total today</Muted>
        <StrongNeon>{formatInt(totalCalories)} kcal</StrongNeon>
      </WidgetFooter>
    </GlassCard>
  );
}
