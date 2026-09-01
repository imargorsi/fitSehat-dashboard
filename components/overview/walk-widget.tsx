import Link from "next/link";

import { GlassCard } from "@/components/layout/glass-card";
import { WalkSlider } from "@/components/walk/walk-slider";
import { Button } from "@/components/ui/button";
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
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 sm:pt-6">
        <div>
          <p className="font-heading text-lg font-semibold tracking-tight">Move</p>
          <p className="text-sm text-muted-foreground">
            {formatInt(steps)} / {formatInt(goal)} steps
            {walkAchieved(steps, goal) ? " · met" : ""}
            {caloriesBurned ? ` · ${formatInt(caloriesBurned)} kcal` : ""}
          </p>
        </div>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/workouts" />}>
          Calendar
        </Button>
      </div>
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <WalkSlider key={`${today}-${steps}-${goal}`} today={today} goal={goal} initialSteps={steps || goal} compact />
      </div>
    </GlassCard>
  );
}
