import { AnimateIcon } from "@/components/icons/animate-icon";
import { PageShell } from "@/components/layout/page-shell";
import { StatGrid } from "@/components/layout/page-grids";
import { StatCard } from "@/components/layout/stat-card";
import { WalkPageClient } from "@/components/walk/walk-page-client";
import { addDays, startOfMonth, todayDateString } from "@/lib/date.utils";
import { ensureProfile } from "@/lib/db/profiles";
import { listWalkDaysInRange } from "@/lib/db/walks";
import { formatInt } from "@/lib/number.utils";
import { requireAuthUser } from "@/lib/session";
import { caloriesFromSteps, DEFAULT_STEP_GOAL, walkAchieved } from "@/lib/walk.utils";

export default async function WalkPage() {
  const user = await requireAuthUser();
  const today = todayDateString();
  const profile = await ensureProfile(user.id);
  const goal = profile.stepGoal ?? DEFAULT_STEP_GOAL;
  const rows = await listWalkDaysInRange(user.id, addDays(today, -400), addDays(today, 40));
  const todayWalk = rows.find((row) => String(row.walkedOn).slice(0, 10) === today);
  const steps = todayWalk?.steps ?? 0;
  const stamps = rows.map((row) => ({
    date: String(row.walkedOn).slice(0, 10),
    steps: row.steps,
    goalSteps: row.goalSteps,
  }));
  const metDays = stamps.filter((row) => walkAchieved(row.steps, row.goalSteps)).length;

  return (
    <PageShell>
      <StatGrid className="lg:grid-cols-3 [&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
        <StatCard
          icon={<AnimateIcon name="footprints" size={16} tone="neon" />}
          label="Today"
          countTo={steps}
          unit="steps"
          hint={
            walkAchieved(steps, goal)
              ? "Daily step goal met."
              : `${formatInt(goal)} steps daily goal`
          }
          meter={{ value: steps, max: goal }}
        />
        <StatCard
          icon={<AnimateIcon name="flame" size={16} tone="neon" />}
          label="Burn"
          countTo={todayWalk?.caloriesBurned ?? caloriesFromSteps(steps)}
          unit="kcal"
          hint="Estimated calories burned from walking."
        />
        <StatCard
          icon={<AnimateIcon name="calendarCheck" size={16} tone="neon" />}
          label="Days met"
          countTo={metDays}
          hint="Days you met your step goal this month."
        />
      </StatGrid>

      <WalkPageClient today={today} goal={goal} stamps={stamps} monthStart={startOfMonth(today)} />
    </PageShell>
  );
}
