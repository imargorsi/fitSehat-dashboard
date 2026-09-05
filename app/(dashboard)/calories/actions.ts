"use server";

import { and, eq } from "drizzle-orm";

import { getActiveMacroTarget } from "@/lib/db/macros";
import { db } from "@/lib/db";
import { calorieLogs, macroTargets } from "@/lib/db/schema";
import { captureValidationError, firstZodError, wrapFormAction } from "@/lib/errors";
import type { TFormState } from "@/lib/form-state.types";
import { emptyToUndefined } from "@/lib/number.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import { calorieLogIdSchema, calorieLogSchema, calorieLogUpdateSchema } from "@/lib/validations/calories.utils";
import { calorieGoalSchema } from "@/lib/validations/macros.utils";

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

async function updateCalorieLogImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = calorieLogUpdateSchema.safeParse({
    id: formData.get("id"),
    item: formData.get("item"),
    loggedOn: formData.get("loggedOn"),
    meal: formData.get("meal"),
    calories: formData.get("calories"),
    proteinG: emptyToUndefined(formData.get("proteinG")),
    carbsG: emptyToUndefined(formData.get("carbsG")),
    fatsG: emptyToUndefined(formData.get("fatsG")),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  await db
    .update(calorieLogs)
    .set({
      loggedOn: parsed.data.loggedOn,
      item: parsed.data.item,
      meal: parsed.data.meal,
      calories: parsed.data.calories,
      proteinG: parsed.data.proteinG != null ? String(parsed.data.proteinG) : null,
      carbsG: parsed.data.carbsG != null ? String(parsed.data.carbsG) : null,
      fatsG: parsed.data.fatsG != null ? String(parsed.data.fatsG) : null,
    })
    .where(and(eq(calorieLogs.id, parsed.data.id), eq(calorieLogs.userId, user.id)));

  revalidateTracker();
  return { ok: true };
}

async function deleteCalorieLogImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = calorieLogIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    captureValidationError("deleteCalorieLog", firstZodError(parsed));
    return { error: firstZodError(parsed) };
  }

  await db
    .delete(calorieLogs)
    .where(and(eq(calorieLogs.id, parsed.data.id), eq(calorieLogs.userId, user.id)));

  revalidateTracker();
  return { ok: true };
}

async function saveCalorieGoalImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const proteinRaw = emptyToUndefined(formData.get("proteinTargetG"));
  const parsed = calorieGoalSchema.safeParse({
    targetCalories: formData.get("targetCalories"),
    ...(proteinRaw != null ? { proteinTargetG: proteinRaw } : {}),
  });
  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  const active = await getActiveMacroTarget(user.id);
  const proteinTargetG = parsed.data.proteinTargetG ?? active?.proteinTargetG ?? 0;

  if (active) {
    await db
      .update(macroTargets)
      .set({
        targetCalories: parsed.data.targetCalories,
        proteinTargetG,
        updatedAt: new Date(),
      })
      .where(and(eq(macroTargets.id, active.id), eq(macroTargets.userId, user.id)));
  } else {
    await db.insert(macroTargets).values({
      userId: user.id,
      name: "Daily Calorie Goal",
      targetCalories: parsed.data.targetCalories,
      proteinTargetG,
      fatsTargetG: 0,
      carbsTargetG: 0,
    });
  }

  revalidateTracker();
  return { ok: true };
}

export const createCalorieLog = wrapFormAction("createCalorieLog", createCalorieLogImpl);
export const updateCalorieLog = wrapFormAction("updateCalorieLog", updateCalorieLogImpl);
export const deleteCalorieLog = wrapFormAction("deleteCalorieLog", deleteCalorieLogImpl);
export const saveCalorieGoal = wrapFormAction("saveCalorieGoal", saveCalorieGoalImpl);
