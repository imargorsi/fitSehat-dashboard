import { LOOKUP } from "@/lib/app-copy";
import { env } from "@/lib/env";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/codes";
import { log } from "@/lib/errors/logger";
import {
  FATSECRET_API_URL,
  signedFatSecretQuery,
} from "@/lib/nutrition/fatsecret.oauth";
import {
  asList,
  isRecord,
  mapSearchHit,
  mapServing,
} from "@/lib/nutrition/fatsecret.utils";
import type { TFoodDetail, TFoodSearchHit } from "@/lib/nutrition/nutrition.types";

const FETCH_MS = 8_000;
const INVALID_KEY_CODES = new Set(["5", "8"]);

export function hasFatSecretCredentials(): boolean {
  return Boolean(env.fatSecretClientId && env.fatSecretClientSecret);
}

function lookupError(cause?: unknown): AppError {
  return new AppError(LOOKUP.failed, {
    code: ERROR_CODES.EXTERNAL,
    exposeMessage: true,
    status: 502,
    cause,
  });
}

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return null;
  }
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function fatSecretApiError(payload: unknown): { code: string; message: string } | null {
  if (!isRecord(payload) || !isRecord(payload.error)) {
    return null;
  }
  return {
    code: String(payload.error.code ?? ""),
    message: String(payload.error.message ?? ""),
  };
}

async function fatSecretRequest(params: Record<string, string>): Promise<unknown> {
  const consumerKey = env.fatSecretClientId;
  const consumerSecret = env.fatSecretClientSecret;
  if (!consumerKey || !consumerSecret) {
    throw lookupError();
  }

  const query = signedFatSecretQuery("POST", consumerKey, consumerSecret, {
    ...params,
    format: "json",
  });

  let response: Response;
  try {
    response = await fetch(FATSECRET_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: query,
      signal: AbortSignal.timeout(FETCH_MS),
      cache: "no-store",
    });
  } catch (error) {
    log("warn", "FatSecret API request failed", { method: params.method, error });
    throw lookupError(error);
  }

  const payload = await readJson(response);
  const apiError = fatSecretApiError(payload);

  if (!response.ok || apiError) {
    log("warn", "FatSecret API request failed", {
      method: params.method,
      status: response.status,
      code: apiError?.code,
      message: apiError?.message,
    });
    if (apiError && INVALID_KEY_CODES.has(apiError.code)) {
      throw new AppError(LOOKUP.invalidClient, {
        code: ERROR_CODES.EXTERNAL,
        exposeMessage: true,
        status: 502,
      });
    }
    throw lookupError();
  }

  return payload;
}

export async function searchFatSecretFoods(query: string): Promise<TFoodSearchHit[]> {
  const payload = await fatSecretRequest({
    method: "foods.search",
    search_expression: query,
    max_results: "10",
    page_number: "0",
  });

  if (!isRecord(payload) || !isRecord(payload.foods)) {
    return [];
  }

  return asList(payload.foods.food)
    .filter(isRecord)
    .map(mapSearchHit)
    .filter((hit): hit is TFoodSearchHit => hit != null);
}

export async function getFatSecretFood(foodId: string): Promise<TFoodDetail> {
  const payload = await fatSecretRequest({
    method: "food.get.v2",
    food_id: foodId,
  });

  if (!isRecord(payload) || !isRecord(payload.food)) {
    throw lookupError();
  }

  const food = payload.food;
  const name = String(food.food_name ?? "").trim();
  const id = String(food.food_id ?? foodId).trim();
  if (!name || !id) {
    throw lookupError();
  }

  const brand = String(food.brand_name ?? "").trim();
  const servingsRaw = isRecord(food.servings) ? food.servings.serving : null;

  return {
    foodId: id,
    name,
    brand: brand || null,
    servings: asList(servingsRaw)
      .filter(isRecord)
      .map(mapServing)
      .filter((serving): serving is NonNullable<typeof serving> => serving != null),
  };
}
