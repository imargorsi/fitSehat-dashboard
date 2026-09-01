"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { saveWalkDay } from "@/app/(dashboard)/workouts/actions";
import { FormError } from "@/components/layout/form-error";
import { Button } from "@/components/ui/button";
import { CELEBRATIONS } from "@/lib/care-copy";
import { pickRandom } from "@/lib/care-notes";
import type { TFormState } from "@/lib/form-state.types";
import { formatInt } from "@/lib/number.utils";
import { cn } from "@/lib/utils";
import {
  caloriesFromSteps,
  DEFAULT_STEP_GOAL,
  MAX_STEPS,
  MIN_STEPS,
  snapSteps,
  STEP_PRESETS,
  walkAchieved,
} from "@/lib/walk.utils";

export function WalkSlider({
  today,
  goal,
  initialSteps,
  compact = false,
}: {
  today: string;
  goal: number;
  initialSteps: number;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const sliderId = useId();
  const toasted = useRef<TFormState>(null);
  const [steps, setSteps] = useState(initialSteps || goal || DEFAULT_STEP_GOAL);
  const [state, formAction, isPending] = useActionState(saveWalkDay, null);
  const burned = caloriesFromSteps(steps);
  const met = walkAchieved(steps, goal);
  const fill = Math.min(100, (steps / MAX_STEPS) * 100);
  const goalMark = Math.min(96, Math.max(4, (goal / MAX_STEPS) * 100));

  useEffect(() => {
    if (state && "ok" in state && state.ok && toasted.current !== state) {
      toasted.current = state;
      toast.success(pickRandom(CELEBRATIONS.workout));
    }
  }, [state]);

  return (
    <form action={formAction} className={cn("grid", compact ? "gap-3" : "gap-4")}>
      <input type="hidden" name="walkedOn" value={today} />
      <input type="hidden" name="steps" value={steps} />
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          {compact ? null : (
            <p className="text-sm tracking-[0.16em] text-muted-foreground uppercase">Today</p>
          )}
          <p
            className={cn(
              "font-heading font-semibold tracking-tight tabular-nums",
              compact ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"
            )}
          >
            {formatInt(steps)}
            <span className="ml-1 text-xs font-normal text-muted-foreground sm:ml-1.5 sm:text-sm">steps</span>
          </p>
        </div>
        <div className="shrink-0 text-right">
          {compact ? null : <p className="text-sm text-muted-foreground">About</p>}
          <p className={cn("font-semibold tabular-nums text-rose", compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl")}>
            {formatInt(burned)}
            <span className="ml-1 text-xs font-normal text-muted-foreground sm:text-sm">kcal</span>
          </p>
        </div>
      </div>

      <div className="relative h-8">
        <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-love shadow-glow"
            initial={false}
            animate={{ width: `${fill}%` }}
            transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 220, damping: 28 }}
          />
        </div>
        <div
          aria-hidden
          title={`Goal ${formatInt(goal)}`}
          className="pointer-events-none absolute top-1/2 h-5 w-px -translate-y-1/2 bg-rose/55"
          style={{ left: `${goalMark}%` }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-card bg-rose shadow-glow"
          initial={false}
          animate={{ left: `${fill}%` }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 26 }}
        />
        <label htmlFor={sliderId} className="sr-only">
          Steps
        </label>
        <input
          id={sliderId}
          type="range"
          min={MIN_STEPS}
          max={MAX_STEPS}
          step={100}
          value={steps}
          onChange={(event) => setSteps(snapSteps(Number(event.target.value)))}
          className="absolute inset-0 w-full cursor-pointer appearance-none bg-transparent opacity-0"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {STEP_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setSteps(preset)}
            className={cn(
              "rounded-full px-2.5 py-1.5 text-xs transition-colors sm:px-3 sm:text-sm",
              steps === preset
                ? "bg-love text-neon-foreground shadow-glow"
                : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            {formatInt(preset)}
          </button>
        ))}
      </div>

      {compact ? null : (
        <p className="text-sm text-muted-foreground">
          Goal {formatInt(goal)}. {met ? "You met it. Beautiful consistency." : "Rest is allowed. Every step still counts."}
        </p>
      )}

      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        <Button
          type="submit"
          size={compact ? "default" : "lg"}
          className="w-full rounded-full sm:w-auto"
          disabled={isPending}
        >
          {isPending ? "Saving…" : "Save walk"}
        </Button>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
