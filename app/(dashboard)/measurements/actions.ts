"use server";

import { and, eq, ne } from "drizzle-orm";

import { db } from "@/lib/db";
import { ensureProfile } from "@/lib/db/profiles";
import { profiles, weeklyMeasurements } from "@/lib/db/schema";
import { captureValidationError, firstZodError, wrapFormAction } from "@/lib/errors";
import type { TFormState } from "@/lib/form-state.types";
import { emptyToUndefined } from "@/lib/number.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import {
  measurementIdSchema,
  measurementSchema,
  profileBaselinesSchema,
} from "@/lib/validations/measurements.utils";

async function saveMeasurementImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = measurementSchema.safeParse({
    id: emptyToUndefined(formData.get("id")),
    measuredOn: formData.get("measuredOn"),
    weightKg: formData.get("weightKg"),
    waistCm: emptyToUndefined(formData.get("waistCm")),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  const weightKg = String(parsed.data.weightKg);
  const waistCm = parsed.data.waistCm != null ? String(parsed.data.waistCm) : null;

  if (parsed.data.id) {
    const clash = await db
      .select({ id: weeklyMeasurements.id })
      .from(weeklyMeasurements)
      .where(
        and(
          eq(weeklyMeasurements.userId, user.id),
          eq(weeklyMeasurements.measuredOn, parsed.data.measuredOn),
          ne(weeklyMeasurements.id, parsed.data.id)
        )
      )
      .limit(1);

    if (clash[0]) {
      return { error: "A check-in already exists for that date." };
    }

    const updated = await db
      .update(weeklyMeasurements)
      .set({
        measuredOn: parsed.data.measuredOn,
        weightKg,
        waistCm,
      })
      .where(and(eq(weeklyMeasurements.id, parsed.data.id), eq(weeklyMeasurements.userId, user.id)))
      .returning({ id: weeklyMeasurements.id });

    if (!updated[0]) {
      return { error: "This check-in is no longer in your history." };
    }
  } else {
    await db
      .insert(weeklyMeasurements)
      .values({
        userId: user.id,
        measuredOn: parsed.data.measuredOn,
        weightKg,
        waistCm,
      })
      .onConflictDoUpdate({
        target: [weeklyMeasurements.userId, weeklyMeasurements.measuredOn],
        set: { weightKg, waistCm },
      });
  }

  revalidateTracker();
  return { ok: true };
}

async function deleteMeasurementImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = measurementIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    captureValidationError("deleteMeasurement", firstZodError(parsed));
    return { error: firstZodError(parsed) };
  }

  await db
    .delete(weeklyMeasurements)
    .where(and(eq(weeklyMeasurements.id, parsed.data.id), eq(weeklyMeasurements.userId, user.id)));

  revalidateTracker();
  return { ok: true };
}

async function saveProfileBaselinesImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = profileBaselinesSchema.safeParse({
    startWeightKg: emptyToUndefined(formData.get("startWeightKg")),
    targetWeightKg: emptyToUndefined(formData.get("targetWeightKg")),
    startWaistCm: emptyToUndefined(formData.get("startWaistCm")),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  const profile = await ensureProfile(user.id);

  await db
    .update(profiles)
    .set({
      startWeightKg:
        parsed.data.startWeightKg != null ? String(parsed.data.startWeightKg) : profile.startWeightKg,
      targetWeightKg:
        parsed.data.targetWeightKg != null
          ? String(parsed.data.targetWeightKg)
          : profile.targetWeightKg,
      startWaistCm:
        parsed.data.startWaistCm != null ? String(parsed.data.startWaistCm) : profile.startWaistCm,
      updatedAt: new Date(),
    })
    .where(eq(profiles.userId, user.id));

  revalidateTracker();
  return { ok: true };
}

export const saveMeasurement = wrapFormAction("saveMeasurement", saveMeasurementImpl);
export const deleteMeasurement = wrapFormAction("deleteMeasurement", deleteMeasurementImpl);
export const saveProfileBaselines = wrapFormAction("saveProfileBaselines", saveProfileBaselinesImpl);
