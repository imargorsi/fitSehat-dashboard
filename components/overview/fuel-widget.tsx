import { CalorieLogDialog } from "@/components/calories/calorie-log-dialog";
import { AppLinkButton } from "@/components/layout/app-link-button";
import { GlassCard } from "@/components/layout/glass-card";
import { SoftRow } from "@/components/layout/soft-row";
import { WidgetBody, WidgetHeader } from "@/components/layout/widget-header";
import { Muted } from "@/components/ui/typography";
import type { TCalorieLog } from "@/lib/db/schema";
import { formatInt } from "@/lib/number.utils";
import { cn } from "@/lib/utils";

export function FuelWidget({
  today,
  calories,
  goal,
  logs,
}: {
  today: string;
  calories: number;
  goal: number | null;
  logs: TCalorieLog[];
}) {
  const recent = logs.slice(0, 3);

  return (
    <GlassCard className="flex h-full flex-col">
      <WidgetHeader
        title="Fuel, Love"
        subtitle={`${formatInt(calories)} kcal today${goal != null ? ` · ${formatInt(goal)} mark` : ""}`}
        actions={
          <>
            <AppLinkButton href="/calories" label="History" icon="history" />
            <CalorieLogDialog today={today} />
          </>
        }
      />
      <WidgetBody className={cn("flex flex-col gap-2", recent.length === 0 && "pt-0")}>
        {recent.length === 0 ? (
          <Muted>Nothing logged yet, Guddi. One kind meal starts the day.</Muted>
        ) : (
          recent.map((log) => (
            <SoftRow
              key={log.id}
              title={log.item}
              subtitle={log.notes ? `${log.meal} · ${log.notes}` : log.meal}
              value={`${formatInt(log.calories)} kcal`}
            />
          ))
        )}
      </WidgetBody>
    </GlassCard>
  );
}
