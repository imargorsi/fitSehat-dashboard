import { PET_NAMES } from "@/lib/constants";
import { formatInt } from "@/lib/number.utils";

export { PET_NAMES };

export const CELEBRATIONS = {
  meal: [
    "Logged, Guddi. Look at you taking care of yourself.",
    "Fuel in, Love. I am so proud of you.",
    "Another kind choice, Precious. Your glow noticed.",
    "Saved, Jaan. One healthy bite at a time.",
  ],
  workout: [
    "Steps saved, Guddi. Look at you moving.",
    "Walk logged, Precious. Strong looks beautiful on you.",
    "That is a win, Jaan. Keep going, Love.",
  ],
  weighIn: [
    "Check-in saved, Love. The number is never a verdict.",
    "Logged, Guddi. Showing up is already enough.",
    "Tuesday energy, Precious. You are still on your way.",
  ],
  macros: [
    "Target saved, Jaan. I will keep score gently.",
    "Noted, Love. Fuel is how you glow.",
  ],
  mealIdea: [
    "Saved, Guddi. Eat what you actually like.",
    "On the board, Precious. Future you will thank you.",
  ],
  report: [
    "Week captured, Jaan. Look how far you have come.",
    "Saved, Love. Consistency is the glow.",
  ],
} as const;

export type TCelebrateKind = keyof typeof CELEBRATIONS;

export function calorieCaption(
  value: number,
  goal: number | null,
  left: number | null
): string {
  if (value === 0) {
    return "Your day is just getting started, Guddi.";
  }
  if (goal == null) {
    return "Look at you moving fuel through the day, Love.";
  }
  const percent = value / goal;
  if (percent >= 1) {
    return "Fueled, Precious. Listen to your body from here.";
  }
  if (percent >= 0.7) {
    return "Almost there, Jaan. Plenty of room if you are hungry.";
  }
  if (left != null) {
    return `${formatInt(left)} kcal of room still, Guddi. No rush.`;
  }
  return "One healthy choice at a time, Love.";
}

export function proteinCaption(
  value: number,
  goal: number | null,
  left: number | null
): string {
  if (value === 0) {
    return "Protein can wait until the next meal, Precious.";
  }
  if (goal == null) {
    return "Muscle is protection, Jaan. You are feeding it.";
  }
  const percent = value / goal;
  if (percent >= 1) {
    return "Protein locked in, Guddi. Beautiful work.";
  }
  if (percent >= 0.7) {
    return "So close, Love. You are doing this.";
  }
  if (left != null) {
    return `${formatInt(left)} g still to play with, Precious.`;
  }
  return "Slow and steady still counts, Jaan.";
}

export function mealsCaption(coreCount: number, logCount: number): string {
  if (logCount === 0) {
    return "We will fill this up together, Guddi.";
  }
  if (coreCount >= 4) {
    return "Four meals, Love. I knew you could do it.";
  }
  if (coreCount === 3) {
    return "Almost a full board, Precious. Beautiful.";
  }
  return "Look at you fueling today, Jaan.";
}

export function weightCaption(hasLatest: boolean, delta: number | null): string {
  if (!hasLatest) {
    return "Tuesday is a check-in, Guddi — never a verdict.";
  }
  if (delta == null || Math.abs(delta) < 0.05) {
    return "Steady, Love. Showing up is the glow.";
  }
  if (delta < 0) {
    return "The trend is yours, Precious. I am proud of you.";
  }
  return "Numbers move, Jaan. You are still on your way.";
}

export function streakCaption(streak: number): string {
  if (streak <= 0) {
    return "Tomorrow is another chance, Love.";
  }
  if (streak === 1) {
    return "Day one of choosing yourself, Guddi.";
  }
  if (streak === 7) {
    return "Seven days of choosing yourself, Precious.";
  }
  if (streak >= 30) {
    return "Thirty days of taking care of yourself, Jaan. That is beautiful.";
  }
  return `${streak} days of showing up. Keep going, Love.`;
}

export const EMPTY = {
  calories: {
    title: "Nothing here yet, Guddi.",
    body: "Add your first meal whenever you are ready. One kind plate is enough.",
  },
  mealsToday: {
    title: "Your day is just getting started, Love.",
    body: "Breakfast is a kind place to begin, Precious.",
  },
  quickAdd: {
    title: "No saved meals yet, Jaan.",
    body: "Save a few you actually like. We will add them in one tap.",
  },
  weight: {
    title: "No weigh-ins yet, Guddi.",
    body: "Tuesday is a check-in, never a verdict. Come when you are ready.",
  },
  macros: {
    title: "No targets yet, Love.",
    body: "Set one when you feel like it. I will keep score gently.",
  },
  measurements: {
    title: "Nothing here yet, Precious.",
    body: "Show up when you are ready, Jaan. The number is just a hug on the scale.",
  },
  mealBand: {
    title: "Empty for now, Guddi.",
    body: "Add something you actually like eating. I will keep it ready.",
  },
  walk: {
    title: "No walks logged this month, Love.",
    body: "A short walk still counts, Precious. Rest days matter too.",
  },
  reports: {
    title: "No reports yet, Jaan.",
    body: "A short note for the week is plenty.",
  },
} as const;

export const PLACE = {
  mealItem: "What did you eat?",
  mealName: "Meal name",
  calories: "0",
  protein: "Add protein",
  carbs: "Add carbs",
  fats: "Add fat",
  notes: "A sweet note for me, Precious",
  weight: "Weight (kg)",
  waist: "Waist (cm)",
  startWeight: "Start weight",
  targetWeight: "Target weight",
  startWaist: "Start waist",
  stepGoal: "Daily step goal",
  email: "Email",
  password: "Password",
  signUpName: "Your name",
} as const;

export const ACTIONS = {
  logMeal: "Log this, Guddi",
  addMeal: "Save this meal, Precious",
  saveWalk: "Save your walk, Jaan",
  saveWeighIn: "I've got this, Love",
  saveCompact: "Save, Guddi",
  saveBaselines: "Keep these, Precious",
  updateGoal: "Update for me, Love",
  addQuick: "Add this, Jaan",
  begin: "I'm here, Guddi",
  signIn: "Come in, Love",
  openTracker: "Come in, Precious",
  alreadyHaveKey: "It's me, Jaan",
  tryAgain: "Try with me, Love",
  home: "Take me home, Guddi",
} as const;
