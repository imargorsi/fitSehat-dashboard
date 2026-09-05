import { formatInt, formatNumber } from "@/lib/number.utils";

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
  baselines: [
    "Starting values saved.",
    "Baselines updated.",
  ],
  macros: [
    "Macro target saved.",
    "Targets updated.",
  ],
  calorieTarget: [
    "Calorie target saved.",
    "Daily fuel goal updated.",
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

export function libraryCaption(count: number): string {
  if (count === 0) {
    return "Save meals you eat often.";
  }
  if (count === 1) {
    return "One meal ready to add from Fuel.";
  }
  return `${formatInt(count)} meals ready to add from Fuel.`;
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

export function stepsCaption(value: number, goal: number, left: number | null): string {
  if (value === 0) {
    return "No steps logged yet today.";
  }
  if (left === 0) {
    return "Daily step target met.";
  }
  if (left != null) {
    return `${formatInt(left)} steps remaining today.`;
  }
  return `${formatInt(value)} steps toward ${formatInt(goal)}.`;
}

export function burnCaption(kcal: number): string {
  if (kcal === 0) {
    return "Walk to estimate calories burned.";
  }
  return "Estimated from today's walk.";
}

export function daysMetCaption(metDays: number): string {
  if (metDays === 0) {
    return "No goal days this month yet.";
  }
  if (metDays === 1) {
    return "One day at your step goal this month.";
  }
  return `${formatInt(metDays)} days at your step goal this month.`;
}

export function calorieGoalCaption(hasTarget: boolean): string {
  return hasTarget ? "Your daily calorie target." : "Set a daily target to track remaining.";
}

export function stepGoalCaption(goal: number): string {
  return `${formatInt(goal)} steps each day.`;
}

export function progressCaption(delta: number | null, unit: string): string {
  if (delta == null) {
    return "Set a starting value to track progress.";
  }
  if (Math.abs(delta) < 0.05) {
    return "Steady compared to your start.";
  }
  if (delta > 0) {
    return `Down ${formatNumber(delta)} ${unit} from your start.`;
  }
  return `Up ${formatNumber(Math.abs(delta))} ${unit} from your start.`;
}

export function progressShort(delta: number | null, unit: string): string {
  if (delta == null) {
    return "";
  }
  if (Math.abs(delta) < 0.05) {
    return "steady";
  }
  if (delta > 0) {
    return `↓ ${formatNumber(delta)} ${unit}`;
  }
  return `↑ ${formatNumber(Math.abs(delta))} ${unit}`;
}

export function formatSignedChange(delta: number | null): string {
  if (delta == null) {
    return "—";
  }
  if (Math.abs(delta) < 0.05) {
    return "0";
  }
  if (delta > 0) {
    return `−${formatNumber(delta)}`;
  }
  return `+${formatNumber(Math.abs(delta))}`;
}

export function targetWeightCaption(hasTarget: boolean): string {
  return hasTarget ? "Your target weight." : "Set a target in Baselines.";
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
    title: "No meals logged yet",
    body: "Log your first meal to start the journal.",
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
    title: "No weight check-ins yet",
    body: "Add a check-in to see your weight trend.",
  },
  waist: {
    title: "No waist check-ins yet",
    body: "Log waist on your next check-in to see the trend.",
  },
  macros: {
    title: "No macro targets yet",
    body: "Set calorie and protein targets when you are ready.",
  },
  measurements: {
    title: "No check-ins yet",
    body: "Record weight and waist to see your trend.",
  },
  mealBand: {
    title: "No meals in this category",
    body: "Save a meal here, then add it from Fuel in one tap.",
  },
  walk: {
    title: "No walks yet",
    body: "Tap a day or use Log walk to save your steps.",
  },
  reports: {
    title: "No reports yet",
    body: "Save a short weekly note when you are ready.",
  },
} as const;

export const AI = {
  name: "FitSehat AI",
  hint: "Just tell us — we'll estimate.",
  placeholder: "2 roti, half a plate of daal, and a glass of lassi",
  analyze: "Analyze meal",
  analyzing: "Analyzing your meal…",
  identifying: "Identifying foods",
  portions: "Estimating portions",
  nutrition: "Calculating nutrition",
  understood: "Here's what I understood:",
  estimateNote: "Estimated nutrition based on your description.",
  confirm: "Does this look right?",
  looksRight: "Looks right",
  adjust: "Adjust",
  adjustHint: "What would you like to change?",
  adjustPlaceholder: "Example: It was only half a roti",
  recalculate: "Recalculate",
  chooserTitle: "FitSehat AI",
  chooserBody: "Just tell us what you ate",
  searchTitle: "Search food",
  searchBody: "Search our food database",
  savedTitle: "Saved meals",
  savedBody: "Log something you've saved",
  unavailable: "We couldn't analyze your meal right now. Please try again or use Search Food.",
  malformed: "We couldn't understand that meal. Please try describing it another way.",
  rateLimited: "FitSehat AI is busy right now. Wait a moment and try again.",
  empty: "Tell us what you ate first.",
} as const;

export const LOOKUP = {
  prompt: "What did you eat?",
  hint: "Search, pick a serving, then log. You can type calories yourself.",
  saved: "Tap a meal you already know.",
  when: "When",
  macros: "Calories & macros",
  suggested: "Suggested from search — change anything that looks off.",
  none: "No match — enter calories yourself.",
  failed: "Lookup is unavailable. Enter calories yourself.",
  invalidClient: "Lookup is unavailable. Enter calories yourself.",
  unavailable: "Search is unavailable. Enter calories yourself.",
  loading: "Searching foods…",
  servingsLoading: "Loading servings…",
  enterManually: "Enter calories myself",
} as const;

export const PLACE = {
  mealItem: "Chicken karahi, 2 roti…",
  mealName: "Meal name",
  calorieGoal: "Daily calorie target",
  calories: "Calories",
  protein: "Protein",
  carbs: "Carbs",
  fats: "Fat",
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
  fromSaved: "From saved meals",
  addMeal: "Save meal",
  saveChanges: "Save changes",
  edit: "Edit",
  delete: "Delete",
  saveWalk: "Save walk",
  logWalk: "Log walk",
  dailyGoal: "Goal",
  calorieTarget: "Target",
  saveWeighIn: "Save check-in",
  checkIn: "Check-in",
  baselines: "Baselines",
  saveCompact: "Save",
  saveBaselines: "Save baselines",
  updateGoal: "Update goal",
  addQuick: "Add to today",
  begin: "Create account",
  signIn: "Sign in",
  signOut: "Sign out",
  alreadyHaveKey: "Sign in",
  tryAgain: "Try again",
  home: "Back to home",
  back: "Back",
} as const;

export const APP_TAGLINE =
  "All-in-one health tracking for calories, movement, and progress.";
