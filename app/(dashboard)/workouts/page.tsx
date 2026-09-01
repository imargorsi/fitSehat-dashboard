import { AnimateIcon } from "@/components/icons/animate-icon";
import { ModulePanel } from "@/components/layout/module-panel";
import { PageShell } from "@/components/layout/page-shell";
import { StatCard } from "@/components/layout/stat-card";
import { WalkCalendar } from "@/components/walk/walk-calendar";
import { WalkGoalForm } from "@/components/walk/walk-goal-form";
import { WalkSlider } from "@/components/walk/walk-slider";
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
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 [&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
        <StatCard
          icon={<AnimateIcon name="footprints" size={16} tone="neon" />}
          label="Today"
          countTo={steps}
          unit="steps"
          hint={
            walkAchieved(steps, goal)
              ? "Goal met, Guddi. Beautiful consistency."
              : `A gentle ${formatInt(goal)}-step mark, Love. Rest is allowed.`
          }
          meter={{ value: steps, max: goal }}
        />
        <StatCard
          icon={<AnimateIcon name="flame" size={16} tone="neon" />}
          label="Burn"
          countTo={todayWalk?.caloriesBurned ?? caloriesFromSteps(steps)}
          unit="kcal"
          hint="A gentle walking estimate, Precious. Not a verdict."
        />
        <StatCard
          icon={<AnimateIcon name="calendarCheck" size={16} tone="neon" />}
          label="Days met"
          countTo={metDays}
          hint="Showing up is the glow, Jaan. Missed days stay kind."
        />
      </div>

      <ModulePanel
        eyebrow="Today"
        title="Log today's walk, Love"
        description="Slide to the steps you took, Guddi. We keep a soft calorie estimate beside it."
      >
        <WalkSlider key={`${today}-${steps}-${goal}`} today={today} goal={goal} initialSteps={steps || goal} />
      </ModulePanel>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <ModulePanel
          eyebrow="Rhythm"
          title="Your days, Precious"
          description="Peach days met the goal. Gold days you walked. Empty days can be rest, Jaan."
        >
          <WalkCalendar today={today} monthStart={startOfMonth(today)} stamps={stamps} />
        </ModulePanel>
        <ModulePanel eyebrow="Pace" title="Daily goal, Love" description="Change this whenever you like, Guddi.">
          <WalkGoalForm goal={goal} />
        </ModulePanel>
      </div>
    </PageShell>
  );
}
