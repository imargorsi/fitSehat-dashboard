import { formatInt } from "@/lib/number.utils";
import { pickStable } from "@/lib/care-notes";

export const CELEBRATIONS = {
  meal: [
    "Logged. Look at you taking care of yourself.",
    "Fuel in. I am proud of you.",
    "Another kind choice. Your glow noticed.",
    "Saved. One healthy choice at a time.",
  ],
  workout: [
    "Steps saved. Look at you moving.",
    "Walk logged. Strong looks beautiful on you.",
    "That is a win. Keep going, love.",
  ],
  weighIn: [
    "Check-in saved. The number is not a verdict.",
    "Logged. I am proud of you for showing up.",
    "Tuesday energy. You are still on your way.",
  ],
  macros: [
    "Target saved. I will keep score gently.",
    "Noted. Fuel is how you glow.",
  ],
  mealIdea: [
    "Saved. Eat what you actually like.",
    "On the board. Future you will thank you.",
  ],
  report: [
    "Week captured. Look how far you have come.",
    "Saved. Consistency is the glow.",
  ],
} as const;

export type TCelebrateKind = keyof typeof CELEBRATIONS;

const GREETING_SUBLINES = {
  morning: [
    "Ready to take care of yourself today?",
    "Here is how your healthy glow is doing.",
    "Slow, kind, and yours.",
  ],
  afternoon: [
    "Here is how your healthy glow is doing.",
    "A little progress is still progress.",
    "I am rooting for you, always.",
  ],
  evening: [
    "Be proud of what you already did.",
    "If today was quiet, tomorrow is another chance.",
    "Rest days matter too.",
  ],
} as const;

export function greetingPeriodLabel(period: "morning" | "afternoon" | "evening"): string {
  if (period === "morning") {
    return "Good morning";
  }
  if (period === "afternoon") {
    return "Good afternoon";
  }
  return "Good evening";
}

const GLOW_TITLES = {
  morning: "Your Healthy Glow",
  afternoon: "Today's Journey",
  evening: "A little progress every day",
} as const;

export function greetingDisplayTitle(period: "morning" | "afternoon" | "evening"): string {
  return GLOW_TITLES[period];
}

export function greetingAccent(name: string): string {
  const safe = name.trim() || "love";
  return `Proud of you, ${safe}`;
}

export function greetingSubline(
  period: "morning" | "afternoon" | "evening",
  seed: string
): string {
  return pickStable(GREETING_SUBLINES[period], `${seed}-sub`);
}

export function calorieCaption(
  value: number,
  goal: number | null,
  left: number | null
): string {
  if (value === 0) {
    return "Your day is just getting started.";
  }
  if (goal == null) {
    return "Look at you moving fuel through the day.";
  }
  const percent = value / goal;
  if (percent >= 1) {
    return "Fueled. Listen to your body from here.";
  }
  if (percent >= 0.7) {
    return "Almost there. Plenty of room if you are hungry.";
  }
  if (left != null) {
    return `${formatInt(left)} kcal of room still. No rush.`;
  }
  return "One healthy choice at a time.";
}

export function proteinCaption(
  value: number,
  goal: number | null,
  left: number | null
): string {
  if (value === 0) {
    return "Protein can wait until the next meal.";
  }
  if (goal == null) {
    return "Muscle is protection. You are feeding it.";
  }
  const percent = value / goal;
  if (percent >= 1) {
    return "Protein locked in. Beautiful work.";
  }
  if (percent >= 0.7) {
    return "So close. You are doing this.";
  }
  if (left != null) {
    return `${formatInt(left)} g still to play with.`;
  }
  return "Slow and steady still counts.";
}

export function mealsCaption(coreCount: number, logCount: number): string {
  if (logCount === 0) {
    return "We will fill this up together.";
  }
  if (coreCount >= 4) {
    return "Four meals. I knew you could do it.";
  }
  if (coreCount === 3) {
    return "Almost a full board. Beautiful.";
  }
  return "Look at you fueling today.";
}

export function weightCaption(hasLatest: boolean, delta: number | null): string {
  if (!hasLatest) {
    return "Tuesday is a check-in, not a verdict.";
  }
  if (delta == null || Math.abs(delta) < 0.05) {
    return "Steady. Showing up is the glow.";
  }
  if (delta < 0) {
    return "The trend is yours. I am proud of you.";
  }
  return "Numbers move. You are still on your way.";
}

export function streakCaption(streak: number): string {
  if (streak <= 0) {
    return "Tomorrow is another chance.";
  }
  if (streak === 1) {
    return "Day one of choosing yourself.";
  }
  if (streak === 7) {
    return "Seven days of choosing yourself.";
  }
  if (streak >= 30) {
    return "Thirty days of taking care of yourself. That is beautiful.";
  }
  return `${streak} days of showing up. Keep going, love.`;
}

export const EMPTY = {
  calories: {
    title: "Nothing here yet.",
    body: "One kind entry is enough to start today.",
  },
  mealsToday: {
    title: "Your day is just getting started.",
    body: "Breakfast is a kind place to begin.",
  },
  quickAdd: {
    title: "No meal ideas yet.",
    body: "Save a few you actually like. We will add them in one tap.",
  },
  weight: {
    title: "No weigh-ins yet.",
    body: "Tuesday is a check-in, not a verdict.",
  },
  macros: {
    title: "No targets yet.",
    body: "Set one when you are ready. I will keep score gently.",
  },
  measurements: {
    title: "Nothing here yet.",
    body: "Show up when you are ready. The number is just a check-in.",
  },
  mealBand: {
    title: "Empty band.",
    body: "Add something you actually like eating.",
  },
  walk: {
    title: "No walks logged this month.",
    body: "A short walk still counts. Rest days matter too.",
  },
  reports: {
    title: "No reports yet.",
    body: "A short note for the week is plenty.",
  },
} as const;
