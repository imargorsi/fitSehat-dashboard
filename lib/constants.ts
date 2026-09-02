export const CALORIE_MEALS = ["Breakfast", "Lunch", "Dinner", "Snack"] as const;
export type TCalorieMeal = (typeof CALORIE_MEALS)[number];

export const MEAL_OPTION_TYPES = [
  "Breakfast (500 C)",
  "Lunch (600–800 C)",
  "Dinner (500–700 C)",
  "Snack (200–300 C)",
] as const;
export type TMealOptionType = (typeof MEAL_OPTION_TYPES)[number];

export const APP_TIME_ZONE = "Asia/Karachi";
export const APP_NAME = "FitSehat";
