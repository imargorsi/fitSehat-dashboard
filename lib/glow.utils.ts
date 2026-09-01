import { addDays } from "@/lib/date.utils";
import { streakCaption } from "@/lib/care-copy";
import { clampPercent } from "@/lib/number.utils";

export type TGlowInput = {
  coreMeals: number;
  logCount: number;
  caloriePercent: number | null;
  proteinPercent: number | null;
  streak: number;
  walkAchieved?: boolean;
};

export type TGlow = {
  score: number;
  label: string;
  caption: string;
};

export function uniqueLogDays(loggedOn: Iterable<string>): Set<string> {
  const days = new Set<string>();
  for (const value of loggedOn) {
    days.add(String(value).slice(0, 10));
  }
  return days;
}

export function loggingStreak(days: Set<string>, today: string): number {
  let cursor = days.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export function todayGlow(input: TGlowInput): TGlow {
  let score = 0;
  if (input.logCount > 0) {
    score += 18;
  }
  score += Math.min(4, input.coreMeals) * 14;
  if (input.proteinPercent != null) {
    score += Math.round(Math.min(100, Math.max(0, input.proteinPercent)) * 0.14);
  }
  if (input.caloriePercent != null) {
    const percent = input.caloriePercent;
    if (percent >= 40 && percent <= 115) {
      score += 12;
    } else if (percent > 0) {
      score += 6;
    }
  }
  if (input.streak >= 3) {
    score += 8;
  }
  if (input.walkAchieved) {
    score += 8;
  }
  score = Math.min(100, score);

  let label = "Quiet start";
  if (score >= 75) {
    label = "Radiant";
  } else if (score >= 50) {
    label = "Glowing";
  } else if (score >= 25) {
    label = "Warming up";
  }

  return {
    score,
    label,
    caption: glowCaption(score, input),
  };
}

function glowCaption(score: number, input: TGlowInput): string {
  if (input.logCount === 0) {
    return "Hey love, a little care today still counts.";
  }
  if (input.coreMeals >= 4) {
    return "Goal board complete. I knew you could do it.";
  }
  if (input.streak >= 7) {
    return streakCaption(input.streak);
  }
  if (score >= 75) {
    return "Look at that glow. I am so proud of you.";
  }
  if (score >= 50) {
    return "Your healthy glow is loading.";
  }
  return "Showing up is enough. Keep going.";
}

export function meterPercent(value: number, max: number | null): number | null {
  if (max == null || max <= 0) {
    return null;
  }
  return clampPercent(value, max);
}
