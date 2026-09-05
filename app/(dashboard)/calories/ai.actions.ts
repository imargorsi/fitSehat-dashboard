"use server";

import { analyzeMeal as runAnalyzeMeal, hasGeminiCredentials } from "@/lib/ai/fitsehat-ai";
import type { TAnalyzeMealInput, TAnalyzeMealResult } from "@/lib/ai/fitsehat-ai.types";
import { AI } from "@/lib/app-copy";
import { wrapLookupAction } from "@/lib/errors";
import { requireAuthUser } from "@/lib/session";

async function analyzeMealImpl(input: TAnalyzeMealInput): Promise<TAnalyzeMealResult> {
  await requireAuthUser();

  if (!hasGeminiCredentials()) {
    return { ok: false, error: AI.unavailable };
  }

  return runAnalyzeMeal(input);
}

export const analyzeMeal = wrapLookupAction("analyzeMeal", analyzeMealImpl);
