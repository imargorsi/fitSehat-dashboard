import { SceneIcon } from "@/components/icons/scene-icon";
import { StatGrid } from "@/components/layout/page-grids";
import { StatCard } from "@/components/layout/stat-card";
import { WalkPageClient } from "@/components/walk/walk-page-client";
import { burnCaption, daysMetCaption, stepGoalCaption, stepsCaption } from "@/lib/app-copy";
import { addDays, startOfMonth, todayDateString } from "@/lib/date.utils";
import { ensureProfile } from "@/lib/db/profiles";
import { listWalkDaysInRange } from "@/lib/db/walks";
import { remainingAmount } from "@/lib/overview.utils";
import { requireAuthUser } from "@/lib/session";
import { caloriesFromSteps, DEFAULT_STEP_GOAL, walkAchieved } from "@/lib/walk.utils";

export default async function WalkPage() {
  const user = await requireAuthUser();
  const today = todayDateString();
  const profile = await ensureProfile(user.id);
  const goal = profile.stepGoal ?? DEFAULT_STEP_GOAL;
  const monthStart = startOfMonth(today);
  const rows = await listWalkDaysInRange(user.id, addDays(today, -400), addDays(today, 40));
  const todayWalk = rows.find((row) => String(row.walkedOn).slice(0, 10) === today);
  const steps = todayWalk?.steps ?? 0;
  const burn = todayWalk?.caloriesBurned ?? caloriesFromSteps(steps);
  const stepsLeft = remainingAmount(steps, goal);
  const stamps = rows.map((row) => ({
    id: row.id,
    date: String(row.walkedOn).slice(0, 10),
    steps: row.steps,
    goalSteps: row.goalSteps,
    caloriesBurned: row.caloriesBurned,
  }));
  const metDays = stamps.filter(
    (row) => row.date.startsWith(monthStart.slice(0, 7)) && walkAchieved(row.steps, row.goalSteps)
  ).length;

  return (
    <WalkPageClient today={today} goal={goal} stamps={stamps} monthStart={monthStart}>
      <StatGrid>
        <StatCard
          scene
          icon={<SceneIcon src="/icons/running-woman.png" delay={0} />}
          label="Today"
          countTo={steps}
          unit="steps"
          hint={stepsCaption(steps, goal, stepsLeft)}
          meter={{ value: steps, max: goal }}
        />
        <StatCard
          scene
          icon={<SceneIcon src="/icons/3dicons-fire-front-color.png" delay={0.12} />}
          label="Burn"
          countTo={burn}
          unit="kcal"
          hint={burnCaption(burn)}
        />
        <StatCard
          scene
          icon={<SceneIcon src="/icons/3dicons-calendar-front-color.png" delay={0.24} />}
          label="Days met"
          countTo={metDays}
          hint={daysMetCaption(metDays)}
        />
        <StatCard
          scene
          icon={<SceneIcon src="/icons/bullseye.png" delay={0.36} />}
          label="Goal"
          countTo={goal}
          unit="steps"
          hint={stepGoalCaption(goal)}
        />
      </StatGrid>
    </WalkPageClient>
  );
}
