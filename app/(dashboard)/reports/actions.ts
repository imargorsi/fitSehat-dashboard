"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { weeklyReports } from "@/lib/db/schema";
import { captureValidationError, firstZodError, wrapFormAction, wrapVoidAction } from "@/lib/errors";
import type { TFormState } from "@/lib/form-state.types";
import { emptyToUndefined } from "@/lib/number.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import { weeklyReportIdSchema, weeklyReportSchema } from "@/lib/validations/reports.utils";

async function createWeeklyReportImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = weeklyReportSchema.safeParse({
    name: formData.get("name"),
    fileUrl: emptyToUndefined(formData.get("fileUrl")) ?? "",
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  await db.insert(weeklyReports).values({
    userId: user.id,
    name: parsed.data.name,
    fileUrl: parsed.data.fileUrl ? parsed.data.fileUrl : null,
  });

  revalidateTracker();
  return { ok: true };
}

async function deleteWeeklyReportImpl(formData: FormData): Promise<void> {
  const user = await requireAuthUser();
  const parsed = weeklyReportIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    captureValidationError("deleteWeeklyReport", firstZodError(parsed));
    return;
  }

  await db
    .delete(weeklyReports)
    .where(and(eq(weeklyReports.id, parsed.data.id), eq(weeklyReports.userId, user.id)));

  revalidateTracker();
}

export const createWeeklyReport = wrapFormAction("createWeeklyReport", createWeeklyReportImpl);
export const deleteWeeklyReport = wrapVoidAction("deleteWeeklyReport", deleteWeeklyReportImpl);
