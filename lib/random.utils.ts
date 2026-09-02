export function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

export function nextRandomIndex(current: number, length: number): number {
  if (length <= 1) {
    return 0;
  }
  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * length);
  }
  return next;
}
