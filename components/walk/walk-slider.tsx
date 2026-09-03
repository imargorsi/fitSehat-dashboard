"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { saveWalkDay } from "@/app/(dashboard)/workouts/actions";
import { ActionButton } from "@/components/layout/action-button";
import { FormError } from "@/components/layout/form-error";
import {
  ChoiceChip,
  ChoiceChipGroup,
  HiddenInput,
  RangeInput,
} from "@/components/ui/form-controls";
import {
  Caption,
  MetricAccent,
  MetricAccentCompact,
  MetricWalk,
  MetricWalkCompact,
  Muted,
  Unit,
} from "@/components/ui/typography";
import { ACTIONS, CELEBRATIONS } from "@/lib/app-copy";
import type { TFormState } from "@/lib/form-state.types";
import { pickRandom } from "@/lib/random.utils";
import { formatInt } from "@/lib/number.utils";
import { cn } from "@/lib/utils";
import {
  caloriesFromSteps,
  MAX_STEPS,
  MIN_STEPS,
  snapSteps,
  STEP_PRESETS,
  walkAchieved,
} from "@/lib/walk.utils";

export function WalkSlider({
  walkedOn,
  today,
  goal,
  initialSteps,
  compact = false,
}: {
  walkedOn: string;
  today: string;
  goal: number;
  initialSteps: number;
  compact?: boolean;
}) {
  const reduced = useReducedMotion();
  const sliderId = useId();
  const toasted = useRef<TFormState>(null);
  const [steps, setSteps] = useState(initialSteps);
  const [state, formAction, isPending] = useActionState(saveWalkDay, null);
  const burned = caloriesFromSteps(steps);
  const met = walkAchieved(steps, goal);
  const isToday = walkedOn === today;
  const fill = Math.min(100, (steps / MAX_STEPS) * 100);
  const goalMark = Math.min(96, Math.max(4, (goal / MAX_STEPS) * 100));
  const StepMetric = compact ? MetricWalkCompact : MetricWalk;
  const BurnMetric = compact ? MetricAccentCompact : MetricAccent;

  useEffect(() => {
    if (!state || toasted.current === state) {
      return;
    }
    toasted.current = state;
    if ("ok" in state && state.ok) {
      toast.success(pickRandom(CELEBRATIONS.workout));
      return;
    }
    if ("error" in state && state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={formAction} className={cn("grid", compact ? "gap-3" : "gap-4")}>
      <HiddenInput name="walkedOn" value={walkedOn} />
      <HiddenInput name="steps" value={steps} />
      <div className="flex items-end justify-between gap-3">
        <div className="min-w-0">
          {compact ? null : <Caption>{isToday ? "Today" : "That day"}</Caption>}
          <StepMetric>
            {formatInt(steps)}
            <Unit className="ml-1 sm:ml-1.5">steps</Unit>
          </StepMetric>
        </div>
        <div className="shrink-0 text-right">
          {compact ? null : <Muted>Estimated burn</Muted>}
          <BurnMetric>
            {formatInt(burned)}
            <Unit className="ml-1">kcal</Unit>
          </BurnMetric>
        </div>
      </div>

      <div className="relative h-8">
        <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-brand shadow-glow"
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
        <RangeInput
          id={sliderId}
          min={MIN_STEPS}
          max={MAX_STEPS}
          step={100}
          value={steps}
          onChange={(event) => setSteps(snapSteps(Number(event.target.value)))}
        />
      </div>

      <ChoiceChipGroup className="gap-2">
        {STEP_PRESETS.map((preset) => (
          <ChoiceChip
            key={preset}
            compact
            selected={steps === preset}
            onClick={() => setSteps(preset)}
          >
            {formatInt(preset)}
          </ChoiceChip>
        ))}
      </ChoiceChipGroup>

      {compact ? null : (
        <Muted>
          Goal {formatInt(goal)}. {met ? "Daily step goal met." : "Every step counts toward your goal."}
        </Muted>
      )}

      <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">
        <ActionButton
          type="submit"
          size={compact ? "default" : "lg"}
          icon="footprints"
          pending={isPending}
          pendingLabel="Saving…"
          className="w-full rounded-full sm:w-auto"
        >
          {compact ? ACTIONS.saveCompact : ACTIONS.saveWalk}
        </ActionButton>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
