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
