"use server";

import { LOOKUP } from "@/lib/app-copy";
import { wrapLookupAction } from "@/lib/errors";
import {
  getFatSecretFood,
  hasFatSecretCredentials,
  searchFatSecretFoods,
} from "@/lib/nutrition/fatsecret.client";
import type { TFoodDetailResult, TFoodSearchResult } from "@/lib/nutrition/nutrition.types";
import { requireAuthUser } from "@/lib/session";
import { foodIdSchema, foodSearchQuerySchema } from "@/lib/validations/nutrition.utils";

async function searchFoodsImpl(query: string): Promise<TFoodSearchResult> {
  await requireAuthUser();

  const parsed = foodSearchQuerySchema.safeParse(query);
  if (!parsed.success) {
    return { ok: true, foods: [] };
  }

  if (!hasFatSecretCredentials()) {
    return { ok: true, foods: [], message: LOOKUP.unavailable };
  }

  const foods = await searchFatSecretFoods(parsed.data);
  if (foods.length === 0) {
    return { ok: true, foods: [], message: LOOKUP.none };
  }

  return { ok: true, foods };
}

async function getFoodServingsImpl(foodId: string): Promise<TFoodDetailResult> {
  await requireAuthUser();

  const parsed = foodIdSchema.safeParse(foodId);
  if (!parsed.success) {
    return { ok: false, error: LOOKUP.failed };
  }

  if (!hasFatSecretCredentials()) {
    return { ok: false, error: LOOKUP.unavailable };
  }

  const food = await getFatSecretFood(parsed.data);
  if (food.servings.length === 0) {
    return { ok: false, error: LOOKUP.none };
  }

  return { ok: true, food };
}

export const searchFoods = wrapLookupAction("searchFoods", searchFoodsImpl);
export const getFoodServings = wrapLookupAction("getFoodServings", getFoodServingsImpl);
