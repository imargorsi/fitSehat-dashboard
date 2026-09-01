import type { TCalorieLog, TMacroTarget } from "@/lib/db/schema";
import { toNumber } from "@/lib/number.utils";

export type TMacroTotals = {
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
};

export function emptyTotals(): TMacroTotals {
  return { calories: 0, protein: 0, fats: 0, carbs: 0 };
}

export function addLogToTotals(totals: TMacroTotals, log: TCalorieLog): TMacroTotals {
  return {
    calories: totals.calories + log.calories,
    protein: totals.protein + (toNumber(log.proteinG) ?? 0),
    fats: totals.fats + (toNumber(log.fatsG) ?? 0),
    carbs: totals.carbs + (toNumber(log.carbsG) ?? 0),
  };
}

export function aggregateLogs(logs: TCalorieLog[]): TMacroTotals {
  return logs.reduce(addLogToTotals, emptyTotals());
}

export function dailyTotals(logs: TCalorieLog[]): Map<string, TMacroTotals> {
  const byDay = new Map<string, TMacroTotals>();
  for (const log of logs) {
    const day = String(log.loggedOn).slice(0, 10);
    byDay.set(day, addLogToTotals(byDay.get(day) ?? emptyTotals(), log));
  }
  return byDay;
}

export function daysTargetHit(
  logs: TCalorieLog[],
  target: TMacroTarget | null
): number {
  if (!target) {
    return 0;
  }
  let hits = 0;
  for (const totals of dailyTotals(logs).values()) {
    if (totals.calories > 0 && totals.calories <= target.targetCalories) {
      hits += 1;
    }
  }
  return hits;
}
