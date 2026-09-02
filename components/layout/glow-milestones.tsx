"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { CELEBRATIONS, streakCaption } from "@/lib/care-copy";
import { pickRandom } from "@/lib/care-notes";
import { dispatchLoveBurst } from "@/lib/love-motion.utils";

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
      toast.success("Four meals logged, Guddi. I knew you could do it.");
      dispatchLoveBurst();
      return;
    }
    if (walkMet && unseen(`walk-met-${today}`)) {
      toast.success(pickRandom(CELEBRATIONS.walkGoal));
      dispatchLoveBurst();
      return;
    }
    if ((streak === 7 || streak === 14 || streak === 30) && unseen(`streak-${streak}`)) {
      toast.success(streakCaption(streak));
      dispatchLoveBurst();
      return;
    }
    if (score >= 80 && unseen(`glow-80-${today}`)) {
      toast.success("Your healthy glow is showing, Precious. I am so proud of you.");
      dispatchLoveBurst();
    }
  }, [today, coreMeals, streak, score, walkMet]);

  return null;
}
