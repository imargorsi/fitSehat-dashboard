import { z } from "zod";

export const measurementSchema = z.object({
  measuredOn: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date"),
  weightKg: z.coerce.number().positive("Weight must be greater than 0"),
  waistCm: z.coerce.number().positive().optional(),
});

export const measurementIdSchema = z.object({
  id: z.string().uuid(),
});

export const profileBaselinesSchema = z.object({
  startWeightKg: z.coerce.number().positive().optional(),
  targetWeightKg: z.coerce.number().positive().optional(),
  startWaistCm: z.coerce.number().positive().optional(),
});

export type TMeasurementInput = z.infer<typeof measurementSchema>;
export type TProfileBaselinesInput = z.infer<typeof profileBaselinesSchema>;
