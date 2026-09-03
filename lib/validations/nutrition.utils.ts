import { z } from "zod";

export const foodSearchQuerySchema = z.string().trim().min(2).max(80);

export const foodIdSchema = z
  .string()
  .trim()
  .regex(/^\d+$/, "Pick a food from the list");
