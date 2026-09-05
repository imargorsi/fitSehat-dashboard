import { z } from "zod";

export const macroTargetSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  targetCalories: z.coerce.number().int().positive("Calories must be greater than 0"),
  proteinTargetG: z.coerce.number().int().nonnegative(),
  fatsTargetG: z.coerce.number().int().nonnegative(),
  carbsTargetG: z.coerce.number().int().nonnegative(),
});

export const macroTargetIdSchema = z.object({
  id: z.string().uuid(),
});

export type TMacroTargetInput = z.infer<typeof macroTargetSchema>;

export const calorieGoalSchema = z.object({
  targetCalories: z.coerce
    .number()
    .int()
    .min(800, "Use at least 800 kcal")
    .max(8000, "Keep the target at 8,000 kcal or less"),
  proteinTargetG: z.coerce.number().int().nonnegative("Protein cannot be negative").optional(),
});

export type TCalorieGoalInput = z.infer<typeof calorieGoalSchema>;
