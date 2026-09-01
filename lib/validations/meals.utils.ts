import { z } from "zod";

import { CALORIE_MEALS } from "@/lib/constants";

export const mealOptionSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  mealType: z.enum(CALORIE_MEALS),
  calories: z.coerce.number().int().nonnegative("Calories cannot be negative"),
  proteinG: z.coerce.number().nonnegative().optional(),
  carbsG: z.coerce.number().nonnegative().optional(),
  fatsG: z.coerce.number().nonnegative().optional(),
  notes: z.string().trim().max(400).optional(),
});

export const mealOptionIdSchema = z.object({
  id: z.string().uuid(),
});

export type TMealOptionInput = z.infer<typeof mealOptionSchema>;
