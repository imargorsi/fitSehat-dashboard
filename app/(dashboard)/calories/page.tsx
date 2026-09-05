import { SceneIcon } from "@/components/icons/scene-icon";
import { CalorieGoalDialog } from "@/components/calories/calorie-goal-dialog";
import { CalorieJournal } from "@/components/calories/calorie-journal";
import { CalorieLogDialog } from "@/components/calories/calorie-log-dialog";
import { PageShell } from "@/components/layout/page-shell";
import { StatGrid } from "@/components/layout/page-grids";
import { MealDots, StatCard } from "@/components/layout/stat-card";
import { WeekCalorieChart } from "@/components/overview/week-calorie-chart";
import { aggregateLogs, dailyTotals } from "@/lib/calories.utils";
import { calorieCaption, calorieGoalCaption, mealsCaption, proteinCaption } from "@/lib/app-copy";
import { addDays, startOfWeekMonday, todayDateString, weekDaysMonday } from "@/lib/date.utils";
import { listCalorieLogs, listCalorieLogsInRange } from "@/lib/db/calories";
import { getActiveMacroTarget } from "@/lib/db/macros";
import { listMealOptions } from "@/lib/db/meals";
import { savedMealPickFromOption } from "@/lib/meals.utils";
import { loggedCoreMeals, remainingAmount } from "@/lib/overview.utils";
import { requireAuthUser } from "@/lib/session";

export default async function CaloriesPage() {
  const user = await requireAuthUser();
  const today = todayDateString();
  const weekStart = startOfWeekMonday(today);
  const [logs, target, rangeLogs, mealOptions] = await Promise.all([
    listCalorieLogs(user.id),
    getActiveMacroTarget(user.id),
    listCalorieLogsInRange(user.id, weekStart, addDays(weekStart, 6)),
    listMealOptions(user.id),
  ]);
  const meals = mealOptions.map(savedMealPickFromOption);
  const todaysLogs = logs.filter((log) => String(log.loggedOn).slice(0, 10) === today);
  const todayTotals = aggregateLogs(todaysLogs);
  const calorieGoal = target?.targetCalories ?? null;
  const proteinGoal = target != null && target.proteinTargetG > 0 ? target.proteinTargetG : null;
  const caloriesLeft = remainingAmount(todayTotals.calories, calorieGoal);
  const proteinLeft = remainingAmount(todayTotals.protein, proteinGoal);
  const coreLogged = loggedCoreMeals(todaysLogs);
  const byDay = dailyTotals(rangeLogs);
  const bars = weekDaysMonday(weekStart).map((day) => ({
    ...day,
    calories: byDay.get(day.date)?.calories ?? 0,
    isToday: day.date === today,
  }));

  return (
    <PageShell
      action={
        <>
          <CalorieGoalDialog
            targetCalories={target?.targetCalories ?? null}
            proteinTargetG={target?.proteinTargetG ?? null}
          />
          <CalorieLogDialog today={today} meals={meals} />
        </>
      }
    >
      <StatGrid>
        <StatCard
          scene
          tone="neon"
          icon={<SceneIcon src="/icons/food-cover.png" delay={0} />}
          label="Calories"
          countTo={todayTotals.calories}
          unit="kcal"
          hint={calorieCaption(todayTotals.calories, calorieGoal, caloriesLeft)}
          meter={calorieGoal != null ? { value: todayTotals.calories, max: calorieGoal } : undefined}
        />
        <StatCard
          scene
          tone="rose"
          icon={<SceneIcon src="/icons/arm-muscle.png" delay={0.12} />}
          label="Protein"
          countTo={Math.round(todayTotals.protein)}
          unit="g"
          hint={proteinCaption(todayTotals.protein, proteinGoal, proteinLeft)}
          meter={proteinGoal != null ? { value: todayTotals.protein, max: proteinGoal } : undefined}
        />
        <StatCard
          scene
          tone="gold"
          icon={<SceneIcon src="/icons/plate.png" delay={0.24} />}
          label="Plates"
          countTo={todaysLogs.length}
          hint={mealsCaption(coreLogged.size, todaysLogs.length)}
          footer={<MealDots logged={coreLogged} />}
        />
        <StatCard
          scene
          tone="violet"
          icon={<SceneIcon src="/icons/calorie-tracker.png" delay={0.36} />}
          label="Goal"
          value={calorieGoal == null ? "—" : undefined}
          countTo={calorieGoal ?? undefined}
          unit="kcal"
          hint={calorieGoalCaption(calorieGoal != null)}
        />
      </StatGrid>

      <WeekCalorieChart bars={bars} goal={calorieGoal} fullWidth />

      <CalorieJournal
        today={today}
        logs={logs.map((log) => ({
          id: log.id,
          item: log.item,
          meal: log.meal,
          notes: log.notes,
          calories: log.calories,
          proteinG: log.proteinG,
          carbsG: log.carbsG,
          fatsG: log.fatsG,
          loggedOn: String(log.loggedOn).slice(0, 10),
        }))}
      />
    </PageShell>
  );
}
