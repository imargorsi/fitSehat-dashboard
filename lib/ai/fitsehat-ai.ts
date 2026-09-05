import "server-only";

import { GoogleGenAI } from "@google/genai";

import { fitsehatMealResponseSchema } from "@/lib/ai/fitsehat-ai.schema";
import type { TAnalyzeMealInput, TAnalyzeMealResult, TFitSehatAiAnalysis } from "@/lib/ai/fitsehat-ai.types";
import { emptyTotals, totalsFromItems } from "@/lib/ai/fitsehat-ai.utils";
import { buildMealAnalysisPrompt, FITSEHAT_MEAL_SYSTEM_PROMPT } from "@/lib/ai/prompts/fitsehat-meal";
import { AI } from "@/lib/app-copy";
import { env } from "@/lib/env";
import { AppError } from "@/lib/errors/app-error";
import { ERROR_CODES } from "@/lib/errors/codes";
import { log } from "@/lib/errors/logger";
import { analyzeMealInputSchema, fitsehatAiAnalysisSchema } from "@/lib/validations/ai.utils";

const ANALYZE_MS = 25_000;

export function hasGeminiCredentials(): boolean {
  return Boolean(env.geminiApiKey);
}

function analysisError(message: string, cause?: unknown, status = 502): AppError {
  return new AppError(message, {
    code: ERROR_CODES.EXTERNAL,
    exposeMessage: true,
    status,
    cause,
  });
}

function isRateLimit(error: unknown): boolean {
  if (typeof error === "object" && error !== null) {
    const status = (error as { status?: unknown }).status;
    if (status === 429) {
      return true;
    }
    const code = (error as { code?: unknown }).code;
    if (code === 429 || code === "RESOURCE_EXHAUSTED") {
      return true;
    }
  }
  return error instanceof Error && /429|RESOURCE_EXHAUSTED|rate.?limit/i.test(error.message);
}

function parseJsonText(text: string): unknown {
  const trimmed = text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```$/i, "")
    .trim();
  return JSON.parse(trimmed) as unknown;
}

function normalizeAnalysis(raw: unknown): TFitSehatAiAnalysis {
  if (typeof raw === "object" && raw !== null && "status" in raw && (raw as { status: unknown }).status === "clarification_required") {
    const record = raw as { status: "clarification_required"; message?: unknown };
    const message = String(record.message ?? "").trim();
    if (!message) {
      throw analysisError(AI.malformed);
    }
    return {
      status: "clarification_required",
      message,
      items: [],
      total: emptyTotals(),
    };
  }

  const parsed = fitsehatAiAnalysisSchema.safeParse(raw);
  if (!parsed.success || parsed.data.status !== "success") {
    throw analysisError(AI.malformed);
  }

  const items = parsed.data.items;
  return {
    status: "success",
    message: parsed.data.message,
    items,
    total: totalsFromItems(items),
  };
}

export async function analyzeMeal(input: TAnalyzeMealInput): Promise<TAnalyzeMealResult> {
  const parsed = analyzeMealInputSchema.safeParse({
    text: input.text,
    clarification: input.clarification?.trim() ? input.clarification : undefined,
    previousAnalysis: input.previousAnalysis,
  });

  if (!parsed.success) {
    return { ok: false, error: AI.empty };
  }

  const apiKey = env.geminiApiKey;
  if (!apiKey) {
    return { ok: false, error: AI.unavailable };
  }

  const client = new GoogleGenAI({ apiKey });
  const prompt = buildMealAnalysisPrompt({
    text: parsed.data.text,
    previousAnalysis: parsed.data.previousAnalysis,
    clarification: parsed.data.clarification,
  });

  let text: string | undefined;
  try {
    const response = await client.models.generateContent({
      model: env.geminiModel,
      contents: prompt,
      config: {
        abortSignal: AbortSignal.timeout(ANALYZE_MS),
        systemInstruction: FITSEHAT_MEAL_SYSTEM_PROMPT,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: fitsehatMealResponseSchema,
      },
    });
    text = response.text;
  } catch (error) {
    if (isRateLimit(error)) {
      throw analysisError(AI.rateLimited, error, 429);
    }
    if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
      throw analysisError(AI.unavailable, error);
    }
    log("warn", "analyzeMeal gemini failed", { error });
    throw analysisError(AI.unavailable, error);
  }

  if (!text?.trim()) {
    return { ok: false, error: AI.malformed };
  }

  let raw: unknown;
  try {
    raw = parseJsonText(text);
  } catch {
    return { ok: false, error: AI.malformed };
  }

  try {
    const analysis = normalizeAnalysis(raw);
    log("info", "analyzeMeal ok", {
      status: analysis.status,
      itemCount: analysis.items.length,
    });
    return { ok: true, analysis };
  } catch (error) {
    if (error instanceof AppError && error.message === AI.malformed) {
      return { ok: false, error: AI.malformed };
    }
    throw error;
  }
}
