import { PET_NAMES } from "@/lib/constants";

export const CARE_NOTES = [
  "Proud of you for taking care of yourself, Guddi.",
  "One healthy choice at a time, Precious. You have got this.",
  "Your future self is going to thank you, Love.",
  "Keep going, Jaan. You are getting closer.",
  "A little progress is still progress, Guddi.",
  "Do not forget to be proud of yourself today, Precious.",
  "Healthy looks beautiful on you, Love.",
  "I am rooting for you always, Jaan.",
  "You do not have to be perfect, Guddi. Just keep going.",
  "Look at you taking care of yourself, Precious.",
  "Another day of choosing yourself. I am proud of you, Love.",
  "Your glow-up is loading, Jaan. I can already see it.",
  "Take a breath, Guddi. You have got this.",
  "Remember to drink some water, Precious. I am right here.",
  "I made this so taking care of you feels a little lighter, Love.",
  "Tuesday weigh-in is a check-in, Jaan — never a verdict.",
  "You are allowed to eat, Guddi. Fuel is how you glow.",
  "Rest is part of the plan, Precious, not a pause from it.",
  "Small logs. Quiet wins. I have got you, Love.",
  "Hey Jaan, a little care today still counts.",
] as const;

export function nextCareNoteIndex(current: number, length: number): number {
  if (length <= 1) {
    return 0;
  }
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * length);
  }
  return next;
}

export function pickStable<T>(items: readonly T[], seed: string): T {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash + seed.charCodeAt(index) * (index + 1)) % 2147483647;
  }
  return items[hash % items.length] as T;
}

export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] as T;
}

export function petNameFor(seed: string): (typeof PET_NAMES)[number] {
  return pickStable(PET_NAMES, seed);
}
