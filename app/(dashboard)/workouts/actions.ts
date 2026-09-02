"use server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { ensureProfile } from "@/lib/db/profiles";
import { profiles, walkDays } from "@/lib/db/schema";
import { firstZodError, wrapFormAction } from "@/lib/errors";
import type { TFormState } from "@/lib/form-state.types";
import { todayDateString } from "@/lib/date.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import { stepGoalSchema, walkDaySchema } from "@/lib/validations/walks.utils";
import { caloriesFromSteps, DEFAULT_STEP_GOAL, snapSteps } from "@/lib/walk.utils";

async function saveWalkDayImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = walkDaySchema.safeParse({
    walkedOn: formData.get("walkedOn"),
    steps: formData.get("steps"),
  });
  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  const today = todayDateString();
  if (parsed.data.walkedOn > today) {
    return { error: "Future walks stay empty for now, Love. Pick today or earlier." };
  }

  const profile = await ensureProfile(user.id);
  const goalSteps = profile.stepGoal ?? DEFAULT_STEP_GOAL;
  const steps = snapSteps(parsed.data.steps);
  const caloriesBurned = caloriesFromSteps(steps);

  await db
    .insert(walkDays)
    .values({
      userId: user.id,
      walkedOn: parsed.data.walkedOn,
      steps,
      goalSteps,
      caloriesBurned,
    })
    .onConflictDoUpdate({
      target: [walkDays.userId, walkDays.walkedOn],
      set: {
        steps,
        goalSteps,
        caloriesBurned,
        updatedAt: new Date(),
      },
    });

  revalidateTracker();
  return { ok: true };
}

async function saveStepGoalImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = stepGoalSchema.safeParse({ stepGoal: formData.get("stepGoal") });
  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  await db
    .update(profiles)
    .set({ stepGoal: parsed.data.stepGoal, updatedAt: new Date() })
    .where(eq(profiles.userId, user.id));

  revalidateTracker();
  return { ok: true };
}

export const saveWalkDay = wrapFormAction("saveWalkDay", saveWalkDayImpl);
export const saveStepGoal = wrapFormAction("saveStepGoal", saveStepGoalImpl);
