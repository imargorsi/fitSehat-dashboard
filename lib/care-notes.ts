export const CARE_NOTES = [
  "Proud of you for taking care of yourself.",
  "One healthy choice at a time. You have got this.",
  "Your future self is going to thank you.",
  "Keep going, love. You are getting closer.",
  "A little progress is still progress.",
  "Do not forget to be proud of yourself today.",
  "Healthy looks beautiful on you.",
  "I am rooting for you, always.",
  "You do not have to be perfect. Just keep going.",
  "Look at you taking care of yourself.",
  "Another day of choosing yourself. I am proud of you.",
  "Your glow-up is loading.",
  "Take a breath. You have got this.",
  "Remember to drink some water.",
  "I made this so taking care of you feels a little lighter.",
  "Tuesday weigh-in is a check-in, not a verdict.",
  "You are allowed to eat. Fuel is how you glow.",
  "Rest is part of the plan, not a pause from it.",
  "Small logs. Quiet wins. I have got you.",
  "Hey love, a little care today still counts.",
] as const;

export function personalizeNote(note: string, name: string): string {
  const safe = name.trim() || "love";
  return note.replaceAll("{name}", safe);
}

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
