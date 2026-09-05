import { z } from "zod";

import { CALORIE_MEALS } from "@/lib/constants";

export const mealOptionSchema = z.object({
  name: z.string().trim().min(1, "Enter a meal name").max(200),
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

export const mealOptionUpdateSchema = mealOptionSchema.extend({
  id: z.string().uuid(),
});

export const mealOptionQuickAddSchema = z.object({
  mealOptionId: z.string().uuid("Select a valid meal"),
  loggedOn: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date")
    .optional(),
});

export type TMealOptionInput = z.infer<typeof mealOptionSchema>;
