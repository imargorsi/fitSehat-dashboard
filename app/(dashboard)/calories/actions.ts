"use server";

import { and, eq } from "drizzle-orm";

import { getActiveMacroTarget } from "@/lib/db/macros";
import { db } from "@/lib/db";
import { calorieLogs } from "@/lib/db/schema";
import { captureValidationError, firstZodError, wrapFormAction, wrapVoidAction } from "@/lib/errors";
import type { TFormState } from "@/lib/form-state.types";
import { emptyToUndefined } from "@/lib/number.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import { calorieLogIdSchema, calorieLogSchema } from "@/lib/validations/calories.utils";

async function createCalorieLogImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = calorieLogSchema.safeParse({
    item: formData.get("item"),
    loggedOn: formData.get("loggedOn"),
    meal: formData.get("meal"),
    calories: formData.get("calories"),
    proteinG: emptyToUndefined(formData.get("proteinG")),
    carbsG: emptyToUndefined(formData.get("carbsG")),
    fatsG: emptyToUndefined(formData.get("fatsG")),
    notes: emptyToUndefined(formData.get("notes")),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  const activeTarget = await getActiveMacroTarget(user.id);

  await db.insert(calorieLogs).values({
    userId: user.id,
    macroTargetId: activeTarget?.id ?? null,
    loggedOn: parsed.data.loggedOn,
    item: parsed.data.item,
    meal: parsed.data.meal,
    calories: parsed.data.calories,
    proteinG: parsed.data.proteinG != null ? String(parsed.data.proteinG) : null,
    carbsG: parsed.data.carbsG != null ? String(parsed.data.carbsG) : null,
    fatsG: parsed.data.fatsG != null ? String(parsed.data.fatsG) : null,
    notes: parsed.data.notes ?? null,
  });

  revalidateTracker();
  return { ok: true };
}

async function deleteCalorieLogImpl(formData: FormData): Promise<void> {
  const user = await requireAuthUser();
  const parsed = calorieLogIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    captureValidationError("deleteCalorieLog", firstZodError(parsed));
    return;
  }

  await db
    .delete(calorieLogs)
    .where(and(eq(calorieLogs.id, parsed.data.id), eq(calorieLogs.userId, user.id)));

  revalidateTracker();
}

export const createCalorieLog = wrapFormAction("createCalorieLog", createCalorieLogImpl);
export const deleteCalorieLog = wrapVoidAction("deleteCalorieLog", deleteCalorieLogImpl);
