import Link from "next/link";

import { CalorieLogDialog } from "@/components/calories/calorie-log-dialog";
import { GlassCard } from "@/components/layout/glass-card";
import { SoftRow } from "@/components/layout/soft-row";
import { Button } from "@/components/ui/button";
import type { TCalorieLog } from "@/lib/db/schema";
import { formatInt } from "@/lib/number.utils";

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
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 sm:pt-6">
        <div>
          <p className="font-heading text-lg font-semibold tracking-tight">Fuel</p>
          <p className="text-sm text-muted-foreground">
            {formatInt(calories)} kcal today
            {goal != null ? ` · ${formatInt(goal)} mark` : ""}
          </p>
        </div>
        <CalorieLogDialog today={today} />
      </div>
      <div className="flex flex-1 flex-col gap-2 px-4 pb-5 sm:px-5">
        {recent.length === 0 ? (
          <p className="text-sm leading-6 text-muted-foreground">Nothing logged yet. One kind meal starts the day.</p>
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
        <Button variant="ghost" size="sm" className="mt-auto self-start" nativeButton={false} render={<Link href="/calories" />}>
          Open history
        </Button>
      </div>
    </GlassCard>
  );
}
