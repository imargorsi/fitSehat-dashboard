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
} from "@/lib/walk.utils";

export function WalkSlider({
  walkedOn,
  today,
  goal,
  initialSteps,
  compact = false,
  onSuccess,
}: {
  walkedOn: string;
  today: string;
  goal: number;
  initialSteps: number;
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const reduced = useReducedMotion();
  const sliderId = useId();
  const toasted = useRef<TFormState>(null);
  const [steps, setSteps] = useState(initialSteps);
  const [state, formAction, isPending] = useActionState(saveWalkDay, null);
  const burned = caloriesFromSteps(steps);
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
      onSuccess?.();
      return;
    }
    if ("error" in state && state.error) {
      toast.error(state.error);
    }
  }, [state, onSuccess]);

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

      <div className={cn(compact ? "px-1 py-1" : "px-1 py-2")}>
        <div className={cn("relative", compact ? "h-9" : "h-11")}>
          <div className="absolute inset-x-0 top-1/2 h-3.5 -translate-y-1/2 overflow-hidden rounded-full border border-border bg-background sm:h-4">
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
            className="pointer-events-none absolute top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-rose"
            style={{ left: `${goalMark}%` }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-background bg-rose shadow-glow sm:size-7"
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
        <div className="mt-2 flex items-center justify-between gap-2">
          <Caption>0</Caption>
          <Caption className="text-rose">Goal {formatInt(goal)}</Caption>
          <Caption>{formatInt(MAX_STEPS)}</Caption>
        </div>
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
