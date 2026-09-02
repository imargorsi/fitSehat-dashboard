"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { mealOptions } from "@/lib/db/schema";
import { captureValidationError, firstZodError, wrapFormAction, wrapVoidAction } from "@/lib/errors";
import type { TFormState } from "@/lib/form-state.types";
import { emptyToUndefined } from "@/lib/number.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import { mealOptionIdSchema, mealOptionSchema } from "@/lib/validations/meals.utils";

async function createMealOptionImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = mealOptionSchema.safeParse({
    name: formData.get("name"),
    mealType: formData.get("mealType"),
    calories: formData.get("calories"),
    proteinG: emptyToUndefined(formData.get("proteinG")),
    carbsG: emptyToUndefined(formData.get("carbsG")),
    fatsG: emptyToUndefined(formData.get("fatsG")),
    notes: emptyToUndefined(formData.get("notes")),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  await db.insert(mealOptions).values({
    userId: user.id,
    name: parsed.data.name,
    mealType: parsed.data.mealType,
    calories: parsed.data.calories,
    proteinG: parsed.data.proteinG != null ? String(parsed.data.proteinG) : null,
    carbsG: parsed.data.carbsG != null ? String(parsed.data.carbsG) : null,
    fatsG: parsed.data.fatsG != null ? String(parsed.data.fatsG) : null,
    notes: parsed.data.notes ?? null,
  });

  revalidateTracker();
  return { ok: true };
}

async function deleteMealOptionImpl(formData: FormData): Promise<void> {
  const user = await requireAuthUser();
  const parsed = mealOptionIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    captureValidationError("deleteMealOption", firstZodError(parsed));
    return;
  }

  await db
    .delete(mealOptions)
    .where(and(eq(mealOptions.id, parsed.data.id), eq(mealOptions.userId, user.id)));

  revalidateTracker();
}

export const createMealOption = wrapFormAction("createMealOption", createMealOptionImpl);
export const deleteMealOption = wrapVoidAction("deleteMealOption", deleteMealOptionImpl);
