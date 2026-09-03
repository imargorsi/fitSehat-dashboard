import type { TMacroTarget } from "@/lib/db/schema";

export type TMacroPercents = {
  proteinPct: number;
  fatsPct: number;
  carbsPct: number;
};

export function macroCaloriePercents(target: TMacroTarget): TMacroPercents {
  const total = target.targetCalories || 1;
  return {
    proteinPct: Math.round(((target.proteinTargetG * 4) / total) * 100),
    fatsPct: Math.round(((target.fatsTargetG * 9) / total) * 100),
    carbsPct: Math.round(((target.carbsTargetG * 4) / total) * 100),
  };
}
