"use server";

import { getActiveMacroTarget } from "@/lib/db/macros";
import { getMealOption } from "@/lib/db/meals";
import { db } from "@/lib/db";
import { calorieLogs } from "@/lib/db/schema";
import { todayDateString } from "@/lib/date.utils";
import type { TFormState } from "@/lib/form-state.types";
import { caloriesFromOption, mealKindFromOption } from "@/lib/meals.utils";
import { revalidateTracker } from "@/lib/revalidate.utils";
import { requireAuthUser } from "@/lib/session";

export async function quickAddMealOption(
  _prev: TFormState,
  formData: FormData
): Promise<TFormState> {
  const user = await requireAuthUser();
  const mealOptionId = String(formData.get("mealOptionId") ?? "");
  const option = await getMealOption(user.id, mealOptionId);
  if (!option) {
    return { error: "That meal idea is gone, Love. Pick another." };
  }

  const calories = caloriesFromOption(option);
  if (calories <= 0 && option.calories == null) {
    return { error: "Add energy to that meal first, Guddi." };
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
