import type { TCalorieLog } from "@/lib/db/schema";
import { isCoreMeal, type TCoreMeal } from "@/lib/meals.utils";

export function remainingAmount(value: number, goal: number | null): number | null {
  if (goal == null) {
    return null;
  }
  return Math.max(0, Math.round(goal - value));
}

export function loggedCoreMeals(logs: TCalorieLog[]): Set<TCoreMeal> {
  const logged = new Set<TCoreMeal>();
  for (const log of logs) {
    if (isCoreMeal(log.meal)) {
      logged.add(log.meal);
    }
  }
  return logged;
}
