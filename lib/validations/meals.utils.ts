import { z } from "zod";

import { CALORIE_MEALS } from "@/lib/constants";

export const mealOptionSchema = z.object({
  name: z.string().trim().min(1, "Give this meal a name, Love").max(200),
  mealType: z.enum(CALORIE_MEALS),
  calories: z.coerce.number().int().nonnegative("Energy cannot be negative, Guddi"),
  proteinG: z.coerce.number().nonnegative().optional(),
  carbsG: z.coerce.number().nonnegative().optional(),
  fatsG: z.coerce.number().nonnegative().optional(),
  notes: z.string().trim().max(400).optional(),
});

export const mealOptionIdSchema = z.object({
  id: z.string().uuid(),
});

export const mealOptionQuickAddSchema = z.object({
  mealOptionId: z.string().uuid("Pick a valid meal, Love"),
});

export type TMealOptionInput = z.infer<typeof mealOptionSchema>;
