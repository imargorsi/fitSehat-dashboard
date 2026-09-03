import { toNumber } from "@/lib/number.utils";
import type { TFoodSearchHit, TFoodServing } from "@/lib/nutrition/nutrition.types";

export function asList<T>(value: T | T[] | null | undefined): T[] {
  if (value == null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export function parseGrams(value: unknown): number | null {
  const parsed = toNumber(typeof value === "string" || typeof value === "number" ? value : null);
  if (parsed == null || parsed < 0) {
    return null;
  }
  return Math.round(parsed * 10) / 10;
}

export function parseCalories(value: unknown): number | null {
  const parsed = toNumber(typeof value === "string" || typeof value === "number" ? value : null);
  if (parsed == null || parsed < 0) {
    return null;
  }
  return Math.round(parsed);
}

export function parseDescriptionMacros(description: string): {
  calories: number | null;
  proteinG: number | null;
  carbsG: number | null;
  fatsG: number | null;
} {
  return {
    calories: parseCalories(description.match(/calories:\s*([\d.]+)/i)?.[1]),
    fatsG: parseGrams(description.match(/fat:\s*([\d.]+)/i)?.[1]),
    carbsG: parseGrams(description.match(/carbs:\s*([\d.]+)/i)?.[1]),
    proteinG: parseGrams(description.match(/protein:\s*([\d.]+)/i)?.[1]),
  };
}

export function displayFoodName(name: string, brand: string | null): string {
  return brand ? `${name} (${brand})` : name;
}

export function mapSearchHit(raw: Record<string, unknown>): TFoodSearchHit | null {
  const foodId = String(raw.food_id ?? "").trim();
  const name = String(raw.food_name ?? "").trim();
  if (!foodId || !name) {
    return null;
  }

  const description = String(raw.food_description ?? "").trim();
  const macros = parseDescriptionMacros(description);
  const brand = String(raw.brand_name ?? "").trim();

  return {
    foodId,
    name,
    brand: brand || null,
    description,
    ...macros,
  };
}

export function mapServing(raw: Record<string, unknown>): TFoodServing | null {
  const servingId = String(raw.serving_id ?? "").trim();
  const description = String(raw.serving_description ?? "").trim();
  const calories = parseCalories(raw.calories);
  if (!servingId || !description || calories == null) {
    return null;
  }

  return {
    servingId,
    description,
    calories,
    proteinG: parseGrams(raw.protein),
    carbsG: parseGrams(raw.carbohydrate),
    fatsG: parseGrams(raw.fat),
  };
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
