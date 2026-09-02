import { AnimateIcon } from "@/components/icons/animate-icon";
import { deleteCalorieLog } from "@/app/(dashboard)/calories/actions";
import { CalorieLogDialog } from "@/components/calories/calorie-log-dialog";
import { CalorieLogEditDialog } from "@/components/calories/calorie-log-edit-dialog";
import { DeleteRowButton } from "@/components/layout/delete-row-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { ModulePanel } from "@/components/layout/module-panel";
import { PageShell } from "@/components/layout/page-shell";
import { StatGrid, SectionGrid } from "@/components/layout/page-grids";
import { SoftRow } from "@/components/layout/soft-row";
import { MealDots, StatCard } from "@/components/layout/stat-card";
import { WeekCalorieChart } from "@/components/overview/week-calorie-chart";
import { Caption, DayHeader, DayTotal, Meta, Strong, Unit } from "@/components/ui/typography";
import { aggregateLogs, dailyTotals } from "@/lib/calories.utils";
import { calorieCaption, EMPTY, mealsCaption, proteinCaption } from "@/lib/app-copy";
import {
  addDays,
  formatMediumDate,
  startOfWeekMonday,
  todayDateString,
  weekDaysMonday,
} from "@/lib/date.utils";
import { listCalorieLogs, listCalorieLogsInRange } from "@/lib/db/calories";
import { getActiveMacroTarget } from "@/lib/db/macros";
import type { TCalorieLog } from "@/lib/db/schema";
import { listStackClass } from "@/lib/layout";
import { formatInt, formatNumber } from "@/lib/number.utils";
import { isCalorieMeal } from "@/lib/meals.utils";
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
  const weekStart = startOfWeekMonday(today);
  const [logs, target, rangeLogs] = await Promise.all([
    listCalorieLogs(user.id),
    getActiveMacroTarget(user.id),
    listCalorieLogsInRange(user.id, weekStart, addDays(weekStart, 6)),
  ]);
  const todaysLogs = logs.filter((log) => String(log.loggedOn).slice(0, 10) === today);
  const todayTotals = aggregateLogs(todaysLogs);
  const calorieGoal = target?.targetCalories ?? null;
  const proteinGoal = target?.proteinTargetG ?? null;
  const caloriesLeft = remainingAmount(todayTotals.calories, calorieGoal);
  const proteinLeft = remainingAmount(todayTotals.protein, proteinGoal);
  const coreLogged = loggedCoreMeals(todaysLogs);
  const grouped = groupLogsByDate(logs);
  const byDay = dailyTotals(rangeLogs);
  const bars = weekDaysMonday(weekStart).map((day) => ({
    ...day,
    calories: byDay.get(day.date)?.calories ?? 0,
    isToday: day.date === today,
  }));

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
          hint={target ? `Attached to ${target.name}` : "Logs save even before a target is set."}
        />
      </StatGrid>

      <SectionGrid>
        <WeekCalorieChart bars={bars} goal={calorieGoal} />
      </SectionGrid>

      <ModulePanel
        eyebrow="Journal"
        title="Calorie history"
        description="Newest days first. Tap edit to update an entry."
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
                          action={
                            <div className="flex shrink-0 items-center gap-0.5">
                              <CalorieLogEditDialog
                                today={today}
                                initial={{
                                  id: log.id,
                                  item: log.item,
                                  loggedOn: String(log.loggedOn).slice(0, 10),
                                  meal: isCalorieMeal(log.meal) ? log.meal : "Snack",
                                  calories: log.calories,
                                  proteinG: log.proteinG,
                                  carbsG: log.carbsG,
                                  fatsG: log.fatsG,
                                  notes: log.notes,
                                }}
                              />
                              <DeleteRowButton action={deleteCalorieLog} id={log.id} />
                            </div>
                          }
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
