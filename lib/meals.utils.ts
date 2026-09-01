import { CALORIE_MEALS, MEAL_OPTION_TYPES, type TCalorieMeal, type TMealOptionType } from "@/lib/constants";

export const CORE_MEALS = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
export type TCoreMeal = (typeof CORE_MEALS)[number];

const MEAL_BANDS: Record<TMealOptionType, { meal: TCalorieMeal; calories: number }> = {
  "Breakfast (500 C)": { meal: "Breakfast", calories: 500 },
  "Lunch (600–800 C)": { meal: "Lunch", calories: 700 },
  "Dinner (500–700 C)": { meal: "Dinner", calories: 600 },
  "Snack (200–300 C)": { meal: "Snack", calories: 250 },
};

export function mealBandFromType(mealType: string): { meal: TCalorieMeal; calories: number } | null {
  if ((MEAL_OPTION_TYPES as readonly string[]).includes(mealType)) {
    return MEAL_BANDS[mealType as TMealOptionType];
  }
  return null;
}

export function isCalorieMeal(value: string): value is TCalorieMeal {
  return (CALORIE_MEALS as readonly string[]).includes(value);
}

export function isCoreMeal(value: string): value is TCoreMeal {
  return (CORE_MEALS as readonly string[]).includes(value);
}

export function mealKindFromOption(mealType: string): TCalorieMeal {
  if (isCalorieMeal(mealType)) {
    return mealType;
  }
  return mealBandFromType(mealType)?.meal ?? "Other";
}

export function caloriesFromOption(option: { calories: number | null; mealType: string }): number {
  if (option.calories != null) {
    return option.calories;
  }
  return mealBandFromType(option.mealType)?.calories ?? 0;
}
