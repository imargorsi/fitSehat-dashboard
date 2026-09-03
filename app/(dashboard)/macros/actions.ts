"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { macroTargets } from "@/lib/db/schema";
import { captureValidationError, firstZodError, wrapFormAction } from "@/lib/errors";
import type { TFormState } from "@/lib/form-state.types";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import { macroTargetIdSchema, macroTargetSchema } from "@/lib/validations/macros.utils";

async function createMacroTargetImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = macroTargetSchema.safeParse({
    name: formData.get("name"),
    targetCalories: formData.get("targetCalories"),
    proteinTargetG: formData.get("proteinTargetG"),
    fatsTargetG: formData.get("fatsTargetG"),
    carbsTargetG: formData.get("carbsTargetG"),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  await db.insert(macroTargets).values({
    userId: user.id,
    name: parsed.data.name,
    targetCalories: parsed.data.targetCalories,
    proteinTargetG: parsed.data.proteinTargetG,
    fatsTargetG: parsed.data.fatsTargetG,
    carbsTargetG: parsed.data.carbsTargetG,
  });

  revalidateTracker();
  return { ok: true };
}

async function deleteMacroTargetImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = macroTargetIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    captureValidationError("deleteMacroTarget", firstZodError(parsed));
    return { error: firstZodError(parsed) };
  }

  await db
    .delete(macroTargets)
    .where(and(eq(macroTargets.id, parsed.data.id), eq(macroTargets.userId, user.id)));

  revalidateTracker();
  return { ok: true };
}

export const createMacroTarget = wrapFormAction("createMacroTarget", createMacroTargetImpl);
export const deleteMacroTarget = wrapFormAction("deleteMacroTarget", deleteMacroTargetImpl);
