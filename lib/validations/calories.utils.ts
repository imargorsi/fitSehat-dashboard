import { z } from "zod";

import { CALORIE_MEALS } from "@/lib/constants";

export const calorieLogSchema = z.object({
  item: z.string().trim().min(1, "Tell me what you ate, Guddi").max(200),
  loggedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a date for me, Love"),
  meal: z.enum(CALORIE_MEALS),
  calories: z.coerce.number().int().nonnegative("Energy cannot be negative, Precious"),
  proteinG: z.coerce.number().nonnegative().optional(),
  carbsG: z.coerce.number().nonnegative().optional(),
  fatsG: z.coerce.number().nonnegative().optional(),
  notes: z.string().trim().max(400).optional(),
});

export const calorieLogIdSchema = z.object({
  id: z.string().uuid(),
});

export const calorieLogUpdateSchema = calorieLogSchema.extend({
  id: z.string().uuid(),
});

export type TCalorieLogInput = z.infer<typeof calorieLogSchema>;
export type TCalorieLogUpdateInput = z.infer<typeof calorieLogUpdateSchema>;
