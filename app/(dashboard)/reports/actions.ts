"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { weeklyReports } from "@/lib/db/schema";
import type { TFormState } from "@/lib/form-state.types";
import { emptyToUndefined } from "@/lib/number.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import { weeklyReportIdSchema, weeklyReportSchema } from "@/lib/validations/reports.utils";

export async function createWeeklyReport(
  _prev: TFormState,
  formData: FormData
): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = weeklyReportSchema.safeParse({
    name: formData.get("name"),
    fileUrl: emptyToUndefined(formData.get("fileUrl")) ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db.insert(weeklyReports).values({
    userId: user.id,
    name: parsed.data.name,
    fileUrl: parsed.data.fileUrl ? parsed.data.fileUrl : null,
  });

  revalidateTracker();
  return { ok: true };
}

export async function deleteWeeklyReport(formData: FormData): Promise<void> {
  const user = await requireAuthUser();
  const parsed = weeklyReportIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    return;
  }

  await db
    .delete(weeklyReports)
    .where(and(eq(weeklyReports.id, parsed.data.id), eq(weeklyReports.userId, user.id)));

  revalidateTracker();
}
