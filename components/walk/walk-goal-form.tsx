"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { saveStepGoal } from "@/app/(dashboard)/workouts/actions";
import { FormError } from "@/components/layout/form-error";
import { ActionButton } from "@/components/layout/action-button";
import { FormLabel, NumberInput } from "@/components/ui/form-controls";
import { Muted } from "@/components/ui/typography";
import { ACTIONS, PLACE } from "@/lib/care-copy";
import type { TFormState } from "@/lib/form-state.types";
import { dispatchLoveBurst } from "@/lib/love-motion.utils";
import { STEP_PRESETS } from "@/lib/walk.utils";

export function WalkGoalForm({ goal }: { goal: number }) {
  const toasted = useRef<TFormState>(null);
  const [state, formAction, isPending] = useActionState(saveStepGoal, null);

  useEffect(() => {
    if (state && "ok" in state && state.ok && toasted.current !== state) {
      toasted.current = state;
      toast.success("Goal saved, Guddi. Move at your own pace.");
      dispatchLoveBurst();
    }
  }, [state]);

  return (
    <form action={formAction} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
      <div className="grid gap-2">
        <FormLabel htmlFor="stepGoal">Daily step goal, Love</FormLabel>
        <NumberInput
          id="stepGoal"
          name="stepGoal"
          min={1000}
          max={20000}
          step={100}
          defaultValue={goal}
          required
          placeholder={PLACE.stepGoal}
        />
      </div>
      <ActionButton type="submit" icon="settings" pending={isPending} pendingLabel="Saving for you…" className="w-full rounded-full sm:w-auto">
        {ACTIONS.updateGoal}
      </ActionButton>
      <Muted className="sm:col-span-2">
        Common marks, Precious: {STEP_PRESETS.map((value) => value.toLocaleString()).join(", ")}.
      </Muted>
      <div className="sm:col-span-2">
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
