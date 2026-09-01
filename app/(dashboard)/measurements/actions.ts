"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { ensureProfile } from "@/lib/db/profiles";
import { profiles, weeklyMeasurements } from "@/lib/db/schema";
import type { TFormState } from "@/lib/form-state.types";
import { emptyToUndefined } from "@/lib/number.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import {
  measurementIdSchema,
  measurementSchema,
  profileBaselinesSchema,
} from "@/lib/validations/measurements.utils";

export async function saveMeasurement(
  _prev: TFormState,
  formData: FormData
): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = measurementSchema.safeParse({
    measuredOn: formData.get("measuredOn"),
    weightKg: formData.get("weightKg"),
    waistCm: emptyToUndefined(formData.get("waistCm")),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  await db
    .insert(weeklyMeasurements)
    .values({
      userId: user.id,
      measuredOn: parsed.data.measuredOn,
      weightKg: String(parsed.data.weightKg),
      waistCm: parsed.data.waistCm != null ? String(parsed.data.waistCm) : null,
    })
    .onConflictDoUpdate({
      target: [weeklyMeasurements.userId, weeklyMeasurements.measuredOn],
      set: {
        weightKg: String(parsed.data.weightKg),
        waistCm: parsed.data.waistCm != null ? String(parsed.data.waistCm) : null,
      },
    });

  revalidateTracker();
  return { ok: true };
}

export async function deleteMeasurement(formData: FormData): Promise<void> {
  const user = await requireAuthUser();
  const parsed = measurementIdSchema.safeParse({ id: formData.get("id") });
  if (!parsed.success) {
    return;
  }

  await db
    .delete(weeklyMeasurements)
    .where(and(eq(weeklyMeasurements.id, parsed.data.id), eq(weeklyMeasurements.userId, user.id)));

  revalidateTracker();
}

export async function saveProfileBaselines(
  _prev: TFormState,
  formData: FormData
): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = profileBaselinesSchema.safeParse({
    startWeightKg: emptyToUndefined(formData.get("startWeightKg")),
    targetWeightKg: emptyToUndefined(formData.get("targetWeightKg")),
    startWaistCm: emptyToUndefined(formData.get("startWaistCm")),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input" };
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
