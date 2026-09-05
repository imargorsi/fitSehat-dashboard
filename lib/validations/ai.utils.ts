import { z } from "zod";

const itemSchema = z.object({
  name: z.string().trim().min(1).max(80),
  quantity: z.coerce.number().positive().max(100),
  unit: z.string().trim().min(1).max(40),
  portionDescription: z.string().trim().min(1).max(120),
  calories: z.coerce.number().nonnegative().max(5000),
  proteinG: z.coerce.number().nonnegative().max(500),
  carbohydratesG: z.coerce.number().nonnegative().max(500),
  fatG: z.coerce.number().nonnegative().max(500),
  confidence: z.coerce.number().min(0).max(1),
});

const totalSchema = z.object({
  calories: z.coerce.number().nonnegative().max(20000),
  proteinG: z.coerce.number().nonnegative().max(2000),
  carbohydratesG: z.coerce.number().nonnegative().max(2000),
  fatG: z.coerce.number().nonnegative().max(2000),
});

export const fitsehatAiAnalysisSchema = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("success"),
    message: z.string().trim().max(240).optional(),
    items: z.array(itemSchema).min(1).max(12),
    total: totalSchema,
  }),
  z.object({
    status: z.literal("clarification_required"),
    message: z.string().trim().min(1).max(240),
    items: z.array(itemSchema).max(0).default([]),
    total: totalSchema.optional(),
  }),
]);

export const analyzeMealInputSchema = z.object({
  text: z.string().trim().min(1, "Tell us what you ate").max(800),
  clarification: z.string().trim().max(400).optional(),
  previousAnalysis: fitsehatAiAnalysisSchema.optional(),
});

export type TAnalyzeMealInputParsed = z.infer<typeof analyzeMealInputSchema>;
