import { SceneIcon } from "@/components/icons/scene-icon";
import { GlowMilestones } from "@/components/layout/glow-milestones";
import { PageShell } from "@/components/layout/page-shell";
import { StatGrid } from "@/components/layout/page-grids";
import { DashboardHero } from "@/components/overview/dashboard-hero";
import { TodayModuleCard } from "@/components/overview/today-module-card";
import { ACTIONS } from "@/lib/app-copy";
import { aggregateLogs } from "@/lib/calories.utils";
import { addDays, formatLongDate, todayDateString } from "@/lib/date.utils";
import { listCalorieLogsInRange } from "@/lib/db/calories";
import { getActiveMacroTarget } from "@/lib/db/macros";
import { listMealOptions } from "@/lib/db/meals";
import { listMeasurements } from "@/lib/db/measurements";
import { ensureProfile } from "@/lib/db/profiles";
import { getWalkDay } from "@/lib/db/walks";
import { loggingStreak, meterPercent, todayGlow, uniqueLogDays } from "@/lib/glow.utils";
import { formatNumber as formatNum, toNumber } from "@/lib/number.utils";
import { loggedCoreMeals } from "@/lib/overview.utils";
import { requireAuthUser } from "@/lib/session";
import { sceneDashIconClass } from "@/lib/layout";
import { DEFAULT_STEP_GOAL, walkAchieved } from "@/lib/walk.utils";

export default async function OverviewPage() {
  const user = await requireAuthUser();
  const today = todayDateString();

  const [target, rangeLogs, measurements, meals, profile, todayWalk] = await Promise.all([
    getActiveMacroTarget(user.id),
    listCalorieLogsInRange(user.id, addDays(today, -40), today),
    listMeasurements(user.id),
    listMealOptions(user.id),
    ensureProfile(user.id),
    getWalkDay(user.id, today),
  ]);

  const todayLogs = rangeLogs.filter((log) => String(log.loggedOn).slice(0, 10) === today);
  const todayTotals = aggregateLogs(todayLogs);
  const calorieGoal = target?.targetCalories ?? null;
  const proteinGoal = target?.proteinTargetG ?? null;
  const coreLogged = loggedCoreMeals(todayLogs);
  const streak = loggingStreak(uniqueLogDays(rangeLogs.map((log) => String(log.loggedOn))), today);
  const stepGoal = profile.stepGoal ?? DEFAULT_STEP_GOAL;
  const walkSteps = todayWalk?.steps ?? 0;
  const glow = todayGlow({
    coreMeals: coreLogged.size,
    logCount: todayLogs.length,
    caloriePercent: meterPercent(todayTotals.calories, calorieGoal),
    proteinPercent: meterPercent(todayTotals.protein, proteinGoal),
    streak,
    walkAchieved: walkAchieved(walkSteps, stepGoal),
  });

  const latest = measurements[0];
  const latestWeight = latest ? toNumber(latest.weightKg) : null;

  return (
    <PageShell fill>
      <GlowMilestones
        today={today}
        coreMeals={coreLogged.size}
        streak={streak}
        score={glow.score}
        walkMet={walkAchieved(walkSteps, stepGoal)}
      />

      <DashboardHero dateLabel={formatLongDate(today).toUpperCase()} glow={glow} />

      <StatGrid className="w-full shrink-0">
        <TodayModuleCard
          href="/calories"
          action={ACTIONS.logMeal}
          actionIcon="flame"
          icon={<SceneIcon src="/icons/food-cover.png" delay={0} className={sceneDashIconClass} />}
          label="Fuel"
          countTo={todayTotals.calories}
          unit="kcal"
          meter={calorieGoal != null ? { value: todayTotals.calories, max: calorieGoal } : undefined}
        />
        <TodayModuleCard
          href="/meals"
          action={ACTIONS.addMeal}
          actionIcon="utensils"
          icon={<SceneIcon src="/icons/healthy-food.png" delay={0.08} className={sceneDashIconClass} />}
          label="Meals"
          countTo={meals.length}
          unit="saved meals"
        />
        <TodayModuleCard
          href="/workouts"
          action={ACTIONS.logWalk}
          actionIcon="footprints"
          icon={<SceneIcon src="/icons/running-woman.png" delay={0.16} className={sceneDashIconClass} />}
          label="Move"
          countTo={walkSteps}
          unit="steps"
          meter={{ value: walkSteps, max: stepGoal }}
        />
        <TodayModuleCard
          href="/measurements"
          action={ACTIONS.checkIn}
          actionIcon="activity"
          icon={<SceneIcon src="/icons/3dicons-heart-front-color.png" delay={0.24} className={sceneDashIconClass} />}
          label="Check-in"
          value={latestWeight != null ? formatNum(latestWeight) : "—"}
          unit="kg"
        />
      </StatGrid>
    </PageShell>
  );
}
