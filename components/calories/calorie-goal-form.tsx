"use client";

import { saveCalorieGoal } from "@/app/(dashboard)/calories/actions";
import { ActionButton } from "@/components/layout/action-button";
import { FormError } from "@/components/layout/form-error";
import { FormField, FormGrid, FormSubmitRow } from "@/components/layout/form-field";
import { NumberInput } from "@/components/ui/form-controls";
import { Muted } from "@/components/ui/typography";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, PLACE } from "@/lib/app-copy";
import { CALORIE_GOAL_PRESETS } from "@/lib/calories.utils";
import { formatInt } from "@/lib/number.utils";

export function CalorieGoalForm({
  targetCalories,
  proteinTargetG,
  onSuccess,
}: {
  targetCalories: number | null;
  proteinTargetG: number | null;
  onSuccess?: () => void;
}) {
  const { formRef, state, formAction, isPending } = useResettingForm(
    saveCalorieGoal,
    "calorieTarget",
    onSuccess,
    false
  );

  return (
    <form ref={formRef} action={formAction}>
      <FormGrid className="lg:grid-cols-2">
        <FormField label="Target calories" htmlFor="targetCalories">
          <NumberInput
            id="targetCalories"
            name="targetCalories"
            min={800}
            max={8000}
            step={50}
            required
            placeholder={PLACE.calorieGoal}
            defaultValue={targetCalories ?? undefined}
          />
        </FormField>
        <FormField label="Protein (g) · optional" htmlFor="proteinTargetG">
          <NumberInput
            id="proteinTargetG"
            name="proteinTargetG"
            min={0}
            step={1}
            placeholder={PLACE.protein}
            defaultValue={proteinTargetG != null && proteinTargetG > 0 ? proteinTargetG : undefined}
          />
        </FormField>
        <FormSubmitRow className="lg:col-span-2">
          <ActionButton
            type="submit"
            size="lg"
            icon="flame"
            pending={isPending}
            pendingLabel="Saving…"
            className="w-full min-w-0 rounded-full"
          >
            {ACTIONS.updateGoal}
          </ActionButton>
        </FormSubmitRow>
      </FormGrid>
      <Muted className="mt-3">
        Common targets: {CALORIE_GOAL_PRESETS.map((value) => formatInt(value)).join(", ")} kcal.
      </Muted>
      <FormError error={state && "error" in state ? state.error : undefined} />
    </form>
  );
}
