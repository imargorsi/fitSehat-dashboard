import type { TFitSehatAiItem, TFitSehatAiTotals } from "@/lib/ai/fitsehat-ai.types";

const ITEM_MAX = 200;

export function roundMacro(value: number): number {
  return Math.round(value * 10) / 10;
}

export function totalsFromItems(items: TFitSehatAiItem[]): TFitSehatAiTotals {
  return {
    calories: Math.round(items.reduce((sum, item) => sum + item.calories, 0)),
    proteinG: roundMacro(items.reduce((sum, item) => sum + item.proteinG, 0)),
    carbohydratesG: roundMacro(items.reduce((sum, item) => sum + item.carbohydratesG, 0)),
    fatG: roundMacro(items.reduce((sum, item) => sum + item.fatG, 0)),
  };
}

export function aiMealItemLabel(items: TFitSehatAiItem[]): string {
  const label = items
    .map((item) => item.portionDescription.trim() || `${item.name} × ${item.quantity}`)
    .filter((part) => part.length > 0)
    .join(", ");

  if (!label) {
    return "Logged meal";
  }
  if (label.length <= ITEM_MAX) {
    return label;
  }
  return `${label.slice(0, ITEM_MAX - 1).trimEnd()}…`;
}

export function emptyTotals(): TFitSehatAiTotals {
  return { calories: 0, proteinG: 0, carbohydratesG: 0, fatG: 0 };
}
