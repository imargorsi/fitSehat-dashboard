import { formatInt } from "@/lib/number.utils";

export const CELEBRATIONS = {
  meal: [
    "Meal logged.",
    "Fuel entry saved.",
    "Calories recorded for today.",
  ],
  workout: [
    "Steps saved.",
    "Walk logged for today.",
    "Activity updated.",
  ],
  weighIn: [
    "Check-in saved.",
    "Measurement recorded.",
    "Weight and waist updated.",
  ],
  macros: [
    "Macro target saved.",
    "Targets updated.",
  ],
  mealIdea: [
    "Meal saved to your library.",
    "Added to saved meals.",
  ],
  report: [
    "Weekly report saved.",
    "Report recorded.",
  ],
  goal: [
    "Step goal updated.",
    "Daily goal saved.",
  ],
  walkGoal: [
    "Step goal met today.",
    "You hit your daily step target.",
    "Walking goal achieved.",
  ],
  deleted: [
    "Entry removed.",
    "Deleted from your log.",
  ],
  updated: [
    "Changes saved.",
    "Entry updated.",
  ],
} as const;

export const DELETE_TOAST = CELEBRATIONS.deleted[0];

export type TCelebrateKind = keyof typeof CELEBRATIONS;

export function calorieCaption(
  value: number,
  goal: number | null,
  left: number | null
): string {
  if (value === 0) {
    return "No calories logged yet today.";
  }
  if (goal == null) {
    return "Tracking intake without a calorie target.";
  }
  const percent = value / goal;
  if (percent >= 1) {
    return "At or above your calorie target.";
  }
  if (percent >= 0.7) {
    return "Approaching your calorie target.";
  }
  if (left != null) {
    return `${formatInt(left)} kcal remaining today.`;
  }
  return "Calories logged for today.";
}

export function proteinCaption(
  value: number,
  goal: number | null,
  left: number | null
): string {
  if (value === 0) {
    return "No protein logged yet today.";
  }
  if (goal == null) {
    return "Protein tracked without a target set.";
  }
  const percent = value / goal;
  if (percent >= 1) {
    return "Protein target met.";
  }
  if (percent >= 0.7) {
    return "Close to your protein target.";
  }
  if (left != null) {
    return `${formatInt(left)} g protein remaining.`;
  }
  return "Protein logged for today.";
}

export function mealsCaption(coreCount: number, logCount: number): string {
  if (logCount === 0) {
    return "No meals logged yet today.";
  }
  if (coreCount >= 4) {
    return "All four core meals logged.";
  }
  if (coreCount === 3) {
    return "Three of four core meals logged.";
  }
  return `${logCount} meal${logCount === 1 ? "" : "s"} logged today.`;
}

export function weightCaption(hasLatest: boolean, delta: number | null): string {
  if (!hasLatest) {
    return "Log a check-in to start your trend.";
  }
  if (delta == null || Math.abs(delta) < 0.05) {
    return "Steady compared to your start weight.";
  }
  if (delta < 0) {
    return "Down from your starting weight.";
  }
  return "Up from your starting weight — trends vary week to week.";
}

export function streakCaption(streak: number): string {
  if (streak <= 0) {
    return "Start a logging streak tomorrow.";
  }
  if (streak === 1) {
    return "Day one of consistent logging.";
  }
  if (streak === 7) {
    return "Seven days of consistent logging.";
  }
  if (streak >= 30) {
    return "Thirty days of consistent logging.";
  }
  return `${streak} day logging streak.`;
}

export const EMPTY = {
  calories: {
    title: "No calorie logs yet",
    body: "Log your first meal to start building your history.",
  },
  mealsToday: {
    title: "No meals logged today",
    body: "Add breakfast, lunch, dinner, or a snack when you are ready.",
  },
  quickAdd: {
    title: "No saved meals yet",
    body: "Save meals you eat often for one-tap logging.",
  },
  weight: {
    title: "No weigh-ins yet",
    body: "Add a check-in to see your weight trend.",
  },
  macros: {
    title: "No macro targets yet",
    body: "Set calorie and protein targets when you are ready.",
  },
  measurements: {
    title: "No measurements yet",
    body: "Record weight and waist to track progress over time.",
  },
  mealBand: {
    title: "No meals in this category",
    body: "Save a meal to use it from quick add.",
  },
  walk: {
    title: "No walks this month",
    body: "Log steps on any day from the calendar.",
  },
  reports: {
    title: "No reports yet",
    body: "Save a short weekly note when you are ready.",
  },
} as const;

export const PLACE = {
  mealItem: "What did you eat?",
  mealName: "Meal name",
  calories: "0",
  protein: "Protein (g)",
  carbs: "Carbs (g)",
  fats: "Fat (g)",
  notes: "Optional note",
  weight: "Weight (kg)",
  waist: "Waist (cm)",
  startWeight: "Start weight",
  targetWeight: "Target weight",
  startWaist: "Start waist",
  stepGoal: "Daily step goal",
  email: "Email",
  password: "Password",
  signUpName: "Full name",
} as const;

export const CONFIRM = {
  deleteTitle: "Delete this entry?",
  deleteBody: "This removes it from your history. You can log it again anytime.",
  deleteConfirm: "Delete",
  deleteCancel: "Cancel",
} as const;

export const ACTIONS = {
  logMeal: "Log meal",
  addMeal: "Save meal",
  saveChanges: "Save changes",
  edit: "Edit",
  saveWalk: "Save walk",
  saveWeighIn: "Save check-in",
  saveCompact: "Save",
  saveBaselines: "Save baselines",
  updateGoal: "Update goal",
  addQuick: "Add to today",
  begin: "Create account",
  signIn: "Sign in",
  alreadyHaveKey: "Sign in",
  tryAgain: "Try again",
  home: "Back to home",
} as const;

export const APP_TAGLINE =
  "All-in-one health tracking for calories, movement, and progress.";
