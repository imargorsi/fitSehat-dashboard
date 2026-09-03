"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { CELEBRATIONS, mealsCaption, streakCaption } from "@/lib/app-copy";
import { pickRandom } from "@/lib/random.utils";

export function GlowMilestones({
  today,
  coreMeals,
  streak,
  score,
  walkMet,
}: {
  today: string;
  coreMeals: number;
  streak: number;
  score: number;
  walkMet: boolean;
}) {
  useEffect(() => {
    const unseen = (key: string) => {
      const storageKey = `fitsehat-${key}`;
      if (localStorage.getItem(storageKey)) {
        return false;
      }
      localStorage.setItem(storageKey, "1");
      return true;
    };

    if (coreMeals >= 4 && unseen(`meals-4-${today}`)) {
      toast.success(mealsCaption(4, coreMeals));
      return;
    }
    if (walkMet && unseen(`walk-met-${today}`)) {
      toast.success(pickRandom(CELEBRATIONS.walkGoal));
      return;
    }
    if ((streak === 7 || streak === 14 || streak === 30) && unseen(`streak-${streak}`)) {
      toast.success(streakCaption(streak));
      return;
    }
    if (score >= 80 && unseen(`glow-80-${today}`)) {
      toast.success("Strong day across fuel, movement, and logging.");
    }
  }, [today, coreMeals, streak, score, walkMet]);

  return null;
}
