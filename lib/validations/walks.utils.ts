import { z } from "zod";

import { DEFAULT_STEP_GOAL, MAX_STEPS, MIN_STEPS } from "@/lib/walk.utils";

export const walkDaySchema = z.object({
  walkedOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date"),
  steps: z.coerce.number().int().min(MIN_STEPS).max(MAX_STEPS),
});

export const walkDayIdSchema = z.object({
  id: z.string().uuid(),
});

export const stepGoalSchema = z.object({
  stepGoal: z.coerce.number().int().min(1000).max(MAX_STEPS).default(DEFAULT_STEP_GOAL),
});
