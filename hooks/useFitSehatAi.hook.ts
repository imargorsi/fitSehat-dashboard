"use client";

import { useCallback, useRef, useState } from "react";

import { analyzeMeal } from "@/app/(dashboard)/calories/ai.actions";
import type { TFitSehatAiAnalysis } from "@/lib/ai/fitsehat-ai.types";
import { AI } from "@/lib/app-copy";

export type TFitSehatAiPhase = "idle" | "analyzing" | "result" | "adjusting" | "reanalyzing";

export function useFitSehatAi() {
  const [phase, setPhase] = useState<TFitSehatAiPhase>("idle");
  const [description, setDescription] = useState("");
  const [clarification, setClarification] = useState("");
  const [analysis, setAnalysis] = useState<TFitSehatAiAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestId = useRef(0);

  const reset = useCallback(() => {
    requestId.current += 1;
    setPhase("idle");
    setDescription("");
    setClarification("");
    setAnalysis(null);
    setError(null);
  }, []);

  const runAnalysis = useCallback(async (nextPhase: "analyzing" | "reanalyzing") => {
    const text = description.trim();
    if (!text) {
      setError(AI.empty);
      return;
    }

    const id = requestId.current + 1;
    requestId.current = id;
    setPhase(nextPhase);
    setError(null);

    const clarificationText = nextPhase === "reanalyzing" ? clarification.trim() : "";

    try {
      const result = await analyzeMeal({
        text,
        previousAnalysis: nextPhase === "reanalyzing" ? (analysis ?? undefined) : undefined,
        clarification: clarificationText || undefined,
      });

      if (requestId.current !== id) {
        return;
      }

      if (!result.ok) {
        setError(result.error);
        setPhase(nextPhase === "reanalyzing" && analysis ? "adjusting" : "idle");
        return;
      }

      setAnalysis(result.analysis);
      setClarification("");
      setPhase("result");
    } catch {
      if (requestId.current !== id) {
        return;
      }
      setError(AI.unavailable);
      setPhase(nextPhase === "reanalyzing" && analysis ? "adjusting" : "idle");
    }
  }, [analysis, clarification, description]);

  const analyze = useCallback(() => {
    if (phase === "analyzing" || phase === "reanalyzing") {
      return;
    }
    void runAnalysis("analyzing");
  }, [phase, runAnalysis]);

  const startAdjust = useCallback(() => {
    if (!analysis || analysis.status !== "success") {
      return;
    }
    setError(null);
    setPhase("adjusting");
  }, [analysis]);

  const recalculate = useCallback(() => {
    if (phase === "analyzing" || phase === "reanalyzing") {
      return;
    }
    if (!clarification.trim()) {
      setError(AI.empty);
      return;
    }
    void runAnalysis("reanalyzing");
  }, [clarification, phase, runAnalysis]);

  const isBusy = phase === "analyzing" || phase === "reanalyzing";

  return {
    phase,
    isBusy,
    description,
    setDescription,
    clarification,
    setClarification,
    analysis,
    error,
    analyze,
    startAdjust,
    recalculate,
    reset,
  };
}
