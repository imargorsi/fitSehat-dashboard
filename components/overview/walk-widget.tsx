import { AppLinkButton } from "@/components/layout/app-link-button";
import { GlassCard } from "@/components/layout/glass-card";
import { WidgetBody, WidgetHeader } from "@/components/layout/widget-header";
import { WalkSlider } from "@/components/walk/walk-slider";
import { formatInt } from "@/lib/number.utils";
import { walkAchieved } from "@/lib/walk.utils";

export function WalkWidget({
  today,
  goal,
  steps,
  caloriesBurned,
}: {
  today: string;
  goal: number;
  steps: number;
  caloriesBurned: number;
}) {
  return (
    <GlassCard className="flex h-full flex-col">
      <WidgetHeader
        title="Move, Jaan"
        subtitle={`${formatInt(steps)} / ${formatInt(goal)} steps${
          walkAchieved(steps, goal) ? " · met" : ""
        }${caloriesBurned ? ` · ${formatInt(caloriesBurned)} kcal` : ""}`}
        actions={<AppLinkButton href="/workouts" label="Calendar" icon="calendar" iconTone="gold" />}
      />
      <WidgetBody className="pt-0">
        <WalkSlider key={`${today}-${steps}-${goal}`} today={today} goal={goal} initialSteps={steps || goal} compact />
      </WidgetBody>
    </GlassCard>
  );
}
