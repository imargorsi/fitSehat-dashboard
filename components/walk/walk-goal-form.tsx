"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { saveStepGoal } from "@/app/(dashboard)/workouts/actions";
import { FormError } from "@/components/layout/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        <Label htmlFor="stepGoal">Daily step goal, Love</Label>
        <Input
          id="stepGoal"
          name="stepGoal"
          type="number"
          min={1000}
          max={20000}
          step={100}
          defaultValue={goal}
          required
          placeholder={PLACE.stepGoal}
        />
      </div>
      <Button type="submit" className="w-full rounded-full sm:w-auto" disabled={isPending}>
        {isPending ? "Saving for you…" : ACTIONS.updateGoal}
      </Button>
      <p className="text-sm text-muted-foreground sm:col-span-2">
        Common marks, Precious: {STEP_PRESETS.map((value) => value.toLocaleString()).join(", ")}.
      </p>
      <div className="sm:col-span-2">
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
