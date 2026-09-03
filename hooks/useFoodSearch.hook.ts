"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { getFoodServings, searchFoods } from "@/app/(dashboard)/calories/nutrition.actions";
import { LOOKUP } from "@/lib/app-copy";
import { displayFoodName } from "@/lib/nutrition/fatsecret.utils";
import type { TFoodSearchHit, TFoodServing } from "@/lib/nutrition/nutrition.types";

export type TNutritionPrefill = {
  item: string;
  calories: number;
  proteinG: number | null;
  carbsG: number | null;
  fatsG: number | null;
  caption: string;
};

const DEBOUNCE_MS = 350;
const MIN_QUERY = 2;

function prefillFromHit(hit: TFoodSearchHit): TNutritionPrefill | null {
  if (hit.calories == null) {
    return null;
  }
  return {
    item: displayFoodName(hit.name, hit.brand),
    calories: hit.calories,
    proteinG: hit.proteinG,
    carbsG: hit.carbsG,
    fatsG: hit.fatsG,
    caption: LOOKUP.suggested,
  };
}

function prefillFromServing(hit: TFoodSearchHit, serving: TFoodServing): TNutritionPrefill {
  return {
    item: displayFoodName(hit.name, hit.brand),
    calories: serving.calories,
    proteinG: serving.proteinG,
    carbsG: serving.carbsG,
    fatsG: serving.fatsG,
    caption: LOOKUP.suggested,
  };
}

export function useFoodSearch(query: string, enabled: boolean, onPrefill: (next: TNutritionPrefill) => void) {
  const [foods, setFoods] = useState<TFoodSearchHit[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selected, setSelected] = useState<TFoodSearchHit | null>(null);
  const [servings, setServings] = useState<TFoodServing[]>([]);
  const [servingId, setServingId] = useState<string | null>(null);
  const [isLoadingServings, setIsLoadingServings] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const requestId = useRef(0);
  const frozenQuery = useRef<string | null>(null);
  const onPrefillRef = useRef(onPrefill);

  useEffect(() => {
    onPrefillRef.current = onPrefill;
  }, [onPrefill]);

  const resetLookup = useCallback(() => {
    requestId.current += 1;
    frozenQuery.current = null;
    setFoods([]);
    setMessage(null);
    setIsSearching(false);
    setSelected(null);
    setServings([]);
    setServingId(null);
    setIsLoadingServings(false);
    setIsManual(false);
  }, []);

  useEffect(() => {
    if (!enabled || isManual) {
      return;
    }

    const trimmed = query.trim();
    if (frozenQuery.current && trimmed === frozenQuery.current) {
      return;
    }

    const id = requestId.current + 1;
    requestId.current = id;

    if (trimmed.length < MIN_QUERY) {
      const clearTimer = window.setTimeout(() => {
        if (requestId.current !== id) {
          return;
        }
        frozenQuery.current = null;
        setFoods([]);
        setMessage(null);
        setIsSearching(false);
        setSelected(null);
        setServings([]);
        setServingId(null);
      }, 0);
      return () => window.clearTimeout(clearTimer);
    }

    frozenQuery.current = null;
    const timer = window.setTimeout(() => {
      if (requestId.current !== id) {
        return;
      }
      setIsSearching(true);
      setMessage(null);
      setSelected(null);
      setServings([]);
      setServingId(null);

      void searchFoods(trimmed)
        .then((result) => {
          if (requestId.current !== id) {
            return;
          }
          setIsSearching(false);
          if (!result.ok) {
            setFoods([]);
            setMessage(result.error);
            return;
          }
          if (result.message === LOOKUP.unavailable) {
            setIsManual(true);
            setFoods([]);
            setMessage(result.message);
            return;
          }
          setFoods(result.foods);
          setMessage(result.foods.length === 0 ? (result.message ?? LOOKUP.none) : null);
        })
        .catch(() => {
          if (requestId.current !== id) {
            return;
          }
          setIsSearching(false);
          setFoods([]);
          setMessage(LOOKUP.failed);
        });
    }, DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, enabled, isManual]);

  const selectFood = useCallback(async (hit: TFoodSearchHit) => {
    const id = requestId.current + 1;
    requestId.current = id;
    frozenQuery.current = displayFoodName(hit.name, hit.brand);
    setSelected(hit);
    setFoods([]);
    setIsSearching(false);
    setIsLoadingServings(true);
    setMessage(null);
    try {
      const result = await getFoodServings(hit.foodId);
      if (requestId.current !== id) {
        return;
      }
      setIsLoadingServings(false);

      if (!result.ok) {
        const fallback = prefillFromHit(hit);
        if (fallback) {
          setServings([]);
          setServingId(null);
          onPrefillRef.current(fallback);
          return;
        }
        setMessage(result.error);
        return;
      }

      if (result.food.servings.length === 0) {
        const fallback = prefillFromHit(hit);
        if (fallback) {
          setServings([]);
          setServingId(null);
          onPrefillRef.current(fallback);
          return;
        }
        setMessage(LOOKUP.none);
        return;
      }

      const nextServings = result.food.servings;
      const first = nextServings[0];
      if (!first) {
        const fallback = prefillFromHit(hit);
        if (fallback) {
          onPrefillRef.current(fallback);
          return;
        }
        setMessage(LOOKUP.none);
        return;
      }
      setServings(nextServings);
      setServingId(first.servingId);
      onPrefillRef.current(prefillFromServing(hit, first));
    } catch {
      if (requestId.current !== id) {
        return;
      }
      setIsLoadingServings(false);
      const fallback = prefillFromHit(hit);
      if (fallback) {
        onPrefillRef.current(fallback);
        return;
      }
      setMessage(LOOKUP.failed);
    }
  }, []);

  const selectServing = useCallback(
    (nextId: string) => {
      if (!selected) {
        return;
      }
      const serving = servings.find((item) => item.servingId === nextId);
      if (!serving) {
        return;
      }
      setServingId(nextId);
      onPrefillRef.current(prefillFromServing(selected, serving));
    },
    [selected, servings]
  );

  const enterManually = useCallback(() => {
    requestId.current += 1;
    frozenQuery.current = null;
    setIsManual(true);
    setIsSearching(false);
    setFoods([]);
    setMessage(null);
    setSelected(null);
    setServings([]);
    setServingId(null);
    setIsLoadingServings(false);
  }, []);

  const showResults = enabled && !isManual && query.trim().length >= MIN_QUERY;

  return {
    foods,
    message,
    isSearching,
    selected,
    servings,
    servingId,
    isLoadingServings,
    isManual,
    showResults,
    selectFood,
    selectServing,
    enterManually,
    resetLookup,
  };
}
