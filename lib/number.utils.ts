export function toNumber(value: string | number | null | undefined): number | null {
  if (value == null || value === "") {
    return null;
  }
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function formatNumber(value: string | number | null | undefined, digits = 1): string {
  const parsed = toNumber(value);
  if (parsed == null) {
    return "—";
  }
  return Number.isInteger(parsed) ? String(parsed) : parsed.toFixed(digits);
}

export function formatInt(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}

export function clampPercent(value: number, max: number): number {
  if (max <= 0) {
    return 0;
  }
  return Math.min(100, Math.round((value / max) * 100));
}

export function emptyToUndefined(value: FormDataEntryValue | null): string | undefined {
  const text = String(value ?? "").trim();
  return text === "" ? undefined : text;
}
