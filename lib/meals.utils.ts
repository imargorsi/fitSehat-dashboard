import { APP_TIME_ZONE, CALORIE_MEALS, MEAL_OPTION_TYPES, type TCalorieMeal, type TMealOptionType } from "@/lib/constants";

export const CORE_MEALS = CALORIE_MEALS;
export type TCoreMeal = TCalorieMeal;

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

export function suggestedMealNow(timeZone = APP_TIME_ZONE, date = new Date()): TCalorieMeal {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(date)
      .find((part) => part.type === "hour")?.value ?? "12"
  );

  if (hour < 11) {
    return "Breakfast";
  }
  if (hour < 16) {
    return "Lunch";
  }
  if (hour < 21) {
    return "Dinner";
  }
  return "Snack";
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
  return mealBandFromType(mealType)?.meal ?? "Snack";
}

export function caloriesFromOption(option: { calories: number | null; mealType: string }): number {
  if (option.calories != null) {
    return option.calories;
  }
  return mealBandFromType(option.mealType)?.calories ?? 0;
}

export type TSavedMealPick = {
  id: string;
  name: string;
  mealType: TCalorieMeal;
  calories: number;
  proteinG: string | null;
  carbsG: string | null;
  fatsG: string | null;
};

export function savedMealPickFromOption(option: {
  id: string;
  name: string;
  mealType: string;
  calories: number | null;
  proteinG: string | null;
  carbsG: string | null;
  fatsG: string | null;
}): TSavedMealPick {
  return {
    id: option.id,
    name: option.name,
    mealType: mealKindFromOption(option.mealType),
    calories: caloriesFromOption(option),
    proteinG: option.proteinG,
    carbsG: option.carbsG,
    fatsG: option.fatsG,
  };
}

export function mealLibraryStats(
  meals: { name: string; mealType: string; calories: number }[]
) {
  if (meals.length === 0) {
    return {
      saved: 0,
      types: 0,
      average: null as number | null,
      lightest: null as { name: string; calories: number } | null,
    };
  }

  const types = new Set(meals.map((meal) => meal.mealType)).size;
  const average = Math.round(meals.reduce((sum, meal) => sum + meal.calories, 0) / meals.length);
  const lightest = meals.reduce((min, meal) => (meal.calories < min.calories ? meal : min));

  return {
    saved: meals.length,
    types,
    average,
    lightest: { name: lightest.name, calories: lightest.calories },
  };
}
