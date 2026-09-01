import { z } from "zod";

export const weeklyReportSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  fileUrl: z.union([z.string().trim().url("Enter a valid URL"), z.literal("")]).optional(),
});

export const weeklyReportIdSchema = z.object({
  id: z.string().uuid(),
});

export type TWeeklyReportInput = z.infer<typeof weeklyReportSchema>;
