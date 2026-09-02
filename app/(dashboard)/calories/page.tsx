import { AnimateIcon } from "@/components/icons/animate-icon";
import { deleteCalorieLog } from "@/app/(dashboard)/calories/actions";
import { CalorieLogDialog } from "@/components/calories/calorie-log-dialog";
import { DeleteRowButton } from "@/components/layout/delete-row-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { ModulePanel } from "@/components/layout/module-panel";
import { PageShell } from "@/components/layout/page-shell";
import { StatGrid } from "@/components/layout/page-grids";
import { SoftRow } from "@/components/layout/soft-row";
import { MealDots, StatCard } from "@/components/layout/stat-card";
import { Caption, DayHeader, DayTotal, Meta, Strong, Unit } from "@/components/ui/typography";
import { aggregateLogs } from "@/lib/calories.utils";
import { calorieCaption, EMPTY, mealsCaption, proteinCaption } from "@/lib/care-copy";
import { formatMediumDate, todayDateString } from "@/lib/date.utils";
import { listCalorieLogs } from "@/lib/db/calories";
import { getActiveMacroTarget } from "@/lib/db/macros";
import type { TCalorieLog } from "@/lib/db/schema";
import { listStackClass } from "@/lib/layout";
import { formatInt, formatNumber } from "@/lib/number.utils";
import { loggedCoreMeals, remainingAmount } from "@/lib/overview.utils";
import { requireAuthUser } from "@/lib/session";

function groupLogsByDate(logs: TCalorieLog[]): [string, TCalorieLog[]][] {
  const grouped = new Map<string, TCalorieLog[]>();
  for (const log of logs) {
    const day = String(log.loggedOn).slice(0, 10);
    const rows = grouped.get(day) ?? [];
    rows.push(log);
    grouped.set(day, rows);
  }
  return [...grouped.entries()];
}

export default async function CaloriesPage() {
  const user = await requireAuthUser();
  const today = todayDateString();
  const [logs, target] = await Promise.all([
    listCalorieLogs(user.id),
    getActiveMacroTarget(user.id),
  ]);
  const todaysLogs = logs.filter((log) => String(log.loggedOn).slice(0, 10) === today);
  const todayTotals = aggregateLogs(todaysLogs);
  const calorieGoal = target?.targetCalories ?? null;
  const proteinGoal = target?.proteinTargetG ?? null;
  const caloriesLeft = remainingAmount(todayTotals.calories, calorieGoal);
  const proteinLeft = remainingAmount(todayTotals.protein, proteinGoal);
  const coreLogged = loggedCoreMeals(todaysLogs);
  const grouped = groupLogsByDate(logs);

  return (
    <PageShell>
      <StatGrid>
        <StatCard
          icon={<AnimateIcon name="flame" size={16} tone="neon" />}
          label="Today"
          countTo={todayTotals.calories}
          unit="kcal"
          hint={calorieCaption(todayTotals.calories, calorieGoal, caloriesLeft)}
          meter={calorieGoal != null ? { value: todayTotals.calories, max: calorieGoal } : undefined}
        />
        <StatCard
          icon={<AnimateIcon name="activity" size={16} tone="neon" />}
          label="Protein"
          countTo={Math.round(todayTotals.protein)}
          unit="g"
          hint={proteinCaption(todayTotals.protein, proteinGoal, proteinLeft)}
          meter={proteinGoal != null ? { value: todayTotals.protein, max: proteinGoal } : undefined}
        />
        <StatCard
          icon={<AnimateIcon name="utensils" size={16} tone="neon" />}
          label="Meals"
          countTo={coreLogged.size}
          suffix=" / 4"
          hint={mealsCaption(coreLogged.size, todaysLogs.length)}
          footer={<MealDots logged={coreLogged} />}
        />
        <StatCard
          icon={<AnimateIcon name="list" size={16} tone="neon" />}
          label="Plates today"
          countTo={todaysLogs.length}
          hint={target ? `Attached to ${target.name}` : "Logs save even before a target, Love. No rush."}
        />
      </StatGrid>

      <ModulePanel
        eyebrow="Journal"
        title="Your history, Precious"
        description="Newest days first, Guddi. One kind plate is enough."
        action={<CalorieLogDialog today={today} />}
      >
        {grouped.length === 0 ? (
          <EmptyNote title={EMPTY.calories.title} body={EMPTY.calories.body} icon="book" tone="rose" />
        ) : (
          <div className="space-y-8">
            {grouped.map(([day, rows]) => {
              const dayTotal = aggregateLogs(rows);
              return (
                <section key={day} className="space-y-3">
                  <div className="flex items-end justify-between gap-3 px-1">
                    <div>
                      <Caption>{day === today ? "Today" : "Day"}</Caption>
                      <DayHeader>{day === today ? "Today" : formatMediumDate(day)}</DayHeader>
                    </div>
                    <DayTotal>
                      {formatInt(dayTotal.calories)}{" "}
                      <Unit>kcal</Unit>
                    </DayTotal>
                  </div>
                  <ul className={listStackClass}>
                    {rows.map((log) => (
                      <li key={log.id}>
                        <SoftRow
                          title={log.item}
                          subtitle={log.notes ? `${log.meal} · ${log.notes}` : log.meal}
                          value={
                            <span>
                              <Strong className="block">
                                {formatInt(log.calories)} kcal
                              </Strong>
                              {log.proteinG ? (
                                <Meta className="block">
                                  {formatNumber(log.proteinG)}g P
                                </Meta>
                              ) : null}
                            </span>
                          }
                          action={<DeleteRowButton action={deleteCalorieLog} id={log.id} />}
                        />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
        )}
      </ModulePanel>
    </PageShell>
  );
}
