export const DEFAULT_STEP_GOAL = 4000;
export const MIN_STEPS = 0;
export const MAX_STEPS = 20000;
export const STEP_SNAP = 100;
/** Gentle walking estimate: about 0.04 kcal per step. */
export const KCAL_PER_STEP = 0.04;
export const STEP_PRESETS = [4000, 6000, 8000, 10000] as const;

export function caloriesFromSteps(steps: number): number {
  return Math.round(Math.max(0, steps) * KCAL_PER_STEP);
}

export function snapSteps(value: number): number {
  const clamped = Math.min(MAX_STEPS, Math.max(MIN_STEPS, value));
  return Math.round(clamped / STEP_SNAP) * STEP_SNAP;
}

export function walkAchieved(steps: number, goal: number): boolean {
  return goal > 0 && steps >= goal;
}
