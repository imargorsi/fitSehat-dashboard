"use server";

import { getActiveMacroTarget } from "@/lib/db/macros";
import { getMealOption } from "@/lib/db/meals";
import { db } from "@/lib/db";
import { calorieLogs } from "@/lib/db/schema";
import { todayDateString } from "@/lib/date.utils";
import { firstZodError, wrapFormAction } from "@/lib/errors";
import type { TFormState } from "@/lib/form-state.types";
import { caloriesFromOption, mealKindFromOption } from "@/lib/meals.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";
import { mealOptionQuickAddSchema } from "@/lib/validations/meals.utils";

async function quickAddMealOptionImpl(_prev: TFormState, formData: FormData): Promise<TFormState> {
  const user = await requireAuthUser();
  const parsed = mealOptionQuickAddSchema.safeParse({
    mealOptionId: formData.get("mealOptionId"),
  });

  if (!parsed.success) {
    return { error: firstZodError(parsed) };
  }

  const option = await getMealOption(user.id, parsed.data.mealOptionId);
  if (!option) {
    return { error: "That saved meal no longer exists. Pick another." };
  }

  const calories = caloriesFromOption(option);
  if (calories <= 0 && option.calories == null) {
    return { error: "Add calories to that meal before quick add." };
  }

  const activeTarget = await getActiveMacroTarget(user.id);

  await db.insert(calorieLogs).values({
    userId: user.id,
    macroTargetId: activeTarget?.id ?? null,
    loggedOn: todayDateString(),
    item: option.name,
    meal: mealKindFromOption(option.mealType),
    calories,
    proteinG: option.proteinG,
    carbsG: option.carbsG,
    fatsG: option.fatsG,
    notes: option.notes,
  });

  revalidateTracker();
  return { ok: true };
}

export const quickAddMealOption = wrapFormAction("quickAddMealOption", quickAddMealOptionImpl);
