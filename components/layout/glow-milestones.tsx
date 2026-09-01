"use client";

import { useEffect } from "react";
import { toast } from "sonner";

import { streakCaption } from "@/lib/care-copy";

export function GlowMilestones({
  today,
  coreMeals,
  streak,
  score,
}: {
  today: string;
  coreMeals: number;
  streak: number;
  score: number;
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
      toast.success("Four meals logged. I knew you could do it.");
      return;
    }
    if ((streak === 7 || streak === 14 || streak === 30) && unseen(`streak-${streak}`)) {
      toast.success(streakCaption(streak));
      return;
    }
    if (score >= 80 && unseen(`glow-80-${today}`)) {
      toast.success("Your healthy glow is showing. I am so proud of you.");
    }
  }, [today, coreMeals, streak, score]);

  return null;
}
