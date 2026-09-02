import { AnimateIcon } from "@/components/icons/animate-icon";
import { GlowMilestones } from "@/components/layout/glow-milestones";
import { PageShell } from "@/components/layout/page-shell";
import { SectionGrid, StatGrid } from "@/components/layout/page-grids";
import { MealDots, StatCard } from "@/components/layout/stat-card";
import { CheckInWidget } from "@/components/overview/check-in-widget";
import { FuelWidget } from "@/components/overview/fuel-widget";
import { GlowCard } from "@/components/overview/glow-card";
import { QuickAddCard } from "@/components/overview/quick-add-card";
import { QuoteHero } from "@/components/overview/quote-hero";
import { TodayMealsCard } from "@/components/overview/today-meals-card";
import { WalkWidget } from "@/components/overview/walk-widget";
import { WeekCalorieChart } from "@/components/overview/week-calorie-chart";
import { Muted } from "@/components/ui/typography";
import { aggregateLogs, dailyTotals } from "@/lib/calories.utils";
import {
  calorieCaption,
  mealsCaption,
  proteinCaption,
  weightCaption,
} from "@/lib/care-copy";
import {
  addDays,
  formatLongDate,
  startOfWeekMonday,
  todayDateString,
  weekDaysMonday,
} from "@/lib/date.utils";
import { listCalorieLogsInRange } from "@/lib/db/calories";
import { getActiveMacroTarget } from "@/lib/db/macros";
import { listMealOptions } from "@/lib/db/meals";
import { listMeasurements } from "@/lib/db/measurements";
import { ensureProfile } from "@/lib/db/profiles";
import { getWalkDay } from "@/lib/db/walks";
import { loggingStreak, meterPercent, todayGlow, uniqueLogDays } from "@/lib/glow.utils";
import { formatNumber as formatNum, toNumber } from "@/lib/number.utils";
import { loggedCoreMeals, remainingAmount } from "@/lib/overview.utils";
import { requireAuthUser } from "@/lib/session";
import { caloriesFromSteps, DEFAULT_STEP_GOAL, walkAchieved } from "@/lib/walk.utils";

export default async function OverviewPage() {
  const user = await requireAuthUser();
  const today = todayDateString();
  const weekStart = startOfWeekMonday(today);
  const weekAgo = addDays(today, -7);

  const [target, rangeLogs, measurements, meals, profile, todayWalk] = await Promise.all([
    getActiveMacroTarget(user.id),
    listCalorieLogsInRange(user.id, addDays(today, -40), addDays(weekStart, 6)),
    listMeasurements(user.id),
    listMealOptions(user.id),
    ensureProfile(user.id),
    getWalkDay(user.id, today),
  ]);

  const todayLogs = rangeLogs.filter((log) => String(log.loggedOn).slice(0, 10) === today);
  const weekLogs = rangeLogs.filter((log) => {
    const day = String(log.loggedOn).slice(0, 10);
    return day >= weekStart && day <= addDays(weekStart, 6);
  });
  const todayTotals = aggregateLogs(todayLogs);
  const byDay = dailyTotals(weekLogs);
  const bars = weekDaysMonday(weekStart).map((day) => ({
    ...day,
    calories: byDay.get(day.date)?.calories ?? 0,
    isToday: day.date === today,
  }));

  const calorieGoal = target?.targetCalories ?? null;
  const proteinGoal = target?.proteinTargetG ?? null;
  const caloriesLeft = remainingAmount(todayTotals.calories, calorieGoal);
  const proteinLeft = remainingAmount(todayTotals.protein, proteinGoal);
  const coreLogged = loggedCoreMeals(todayLogs);
  const streak = loggingStreak(uniqueLogDays(rangeLogs.map((log) => String(log.loggedOn))), today);
  const stepGoal = profile.stepGoal ?? DEFAULT_STEP_GOAL;
  const walkSteps = todayWalk?.steps ?? 0;
  const walkBurn = todayWalk?.caloriesBurned ?? caloriesFromSteps(walkSteps);
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
  const prior =
    measurements.find((row) => String(row.measuredOn).slice(0, 10) <= weekAgo) ?? measurements[1];
  const priorWeight = prior ? toNumber(prior.weightKg) : null;
  const weightDelta =
    latestWeight != null && priorWeight != null ? latestWeight - priorWeight : null;

  const todayMeals = [...todayLogs].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <PageShell>
      <GlowMilestones
        today={today}
        coreMeals={coreLogged.size}
        streak={streak}
        score={glow.score}
      />

      <SectionGrid className="lg:grid-cols-[minmax(0,7fr)_minmax(16rem,3fr)] lg:items-stretch">
        <QuoteHero dateLabel={formatLongDate(today).toUpperCase()} />
        <GlowCard glow={glow} streak={streak} />
      </SectionGrid>

      <StatGrid>
        <StatCard
          icon={<AnimateIcon name="flame" size={16} tone="neon" />}
          label="Fuel"
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
          icon={<AnimateIcon name="trend" size={16} tone="violet" />}
          tone="violet"
          label="Weight"
          value={latestWeight != null ? formatNum(latestWeight) : "—"}
          unit="kg"
          hint={weightCaption(latestWeight != null, weightDelta)}
        />
        <StatCard
          icon={<AnimateIcon name="utensils" size={16} tone="neon" />}
          label="Meals"
          countTo={coreLogged.size}
          suffix=" / 4"
          hint={mealsCaption(coreLogged.size, todayLogs.length)}
          footer={<MealDots logged={coreLogged} />}
        />
      </StatGrid>

      <SectionGrid>
        <FuelWidget today={today} calories={todayTotals.calories} goal={calorieGoal} logs={todayMeals} />
        <WalkWidget today={today} goal={stepGoal} steps={walkSteps} caloriesBurned={walkBurn} />
        <QuickAddCard meals={meals} />
        <CheckInWidget
          today={today}
          latestWeight={latestWeight != null ? formatNum(latestWeight) : null}
        />
      </SectionGrid>

      <SectionGrid>
        <TodayMealsCard logs={todayMeals} totalCalories={todayTotals.calories} />
        <WeekCalorieChart bars={bars} goal={calorieGoal} />
      </SectionGrid>

      <Muted className="text-center">
        Take care of yourself, Guddi. Keep going. Someone is always rooting for you.
      </Muted>
    </PageShell>
  );
}
