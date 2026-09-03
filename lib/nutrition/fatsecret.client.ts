import { LOOKUP } from "@/lib/app-copy";
import { env } from "@/lib/env";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/codes";
import { log } from "@/lib/errors/logger";
import {
  asList,
  isRecord,
  mapSearchHit,
  mapServing,
} from "@/lib/nutrition/fatsecret.utils";
import type { TFoodDetail, TFoodSearchHit } from "@/lib/nutrition/nutrition.types";

const TOKEN_URL = "https://oauth.fatsecret.com/connect/token";
const API_URL = "https://platform.fatsecret.com/rest/server.api";
const TOKEN_SKEW_MS = 60_000;
const FETCH_MS = 8_000;

type TCachedToken = {
  accessToken: string;
  expiresAt: number;
};

let cachedToken: TCachedToken | null = null;

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

async function requestAccessToken(): Promise<string> {
  const clientId = env.fatSecretClientId;
  const clientSecret = env.fatSecretClientSecret;
  if (!clientId || !clientSecret) {
    throw lookupError();
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  let response: Response;
  try {
    response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        scope: "basic",
      }),
      signal: AbortSignal.timeout(FETCH_MS),
      cache: "no-store",
    });
  } catch (error) {
    log("warn", "FatSecret token request failed", { error });
    throw lookupError(error);
  }

  const payload = await readJson(response);
  if (!response.ok || !isRecord(payload) || typeof payload.access_token !== "string") {
    const oauthError = isRecord(payload) ? String(payload.error ?? "") : "";
    log("warn", "FatSecret token request failed", {
      status: response.status,
      payload,
    });
    if (oauthError === "invalid_client") {
      throw new AppError(LOOKUP.invalidClient, {
        code: ERROR_CODES.EXTERNAL,
        exposeMessage: true,
        status: 502,
      });
    }
    throw lookupError();
  }

  const expiresIn = Number(payload.expires_in);
  cachedToken = {
    accessToken: payload.access_token,
    expiresAt: Date.now() + (Number.isFinite(expiresIn) ? expiresIn * 1000 : 86_400_000) - TOKEN_SKEW_MS,
  };
  return cachedToken.accessToken;
}

async function getAccessToken(forceRefresh = false): Promise<string> {
  if (!forceRefresh && cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.accessToken;
  }
  return requestAccessToken();
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

async function fatSecretRequest(params: Record<string, string>, retried = false): Promise<unknown> {
  const token = await getAccessToken(retried);
  let response: Response;
  try {
    response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ ...params, format: "json" }),
      signal: AbortSignal.timeout(FETCH_MS),
      cache: "no-store",
    });
  } catch (error) {
    log("warn", "FatSecret API request failed", { method: params.method, error });
    throw lookupError(error);
  }

  const payload = await readJson(response);
  const apiError = fatSecretApiError(payload);

  if (apiError?.code === "13" && !retried) {
    cachedToken = null;
    return fatSecretRequest(params, true);
  }

  if (!response.ok || apiError) {
    log("warn", "FatSecret API request failed", {
      method: params.method,
      status: response.status,
      code: apiError?.code,
      message: apiError?.message,
    });
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
