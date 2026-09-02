"use client";

import { createMacroTarget } from "@/app/(dashboard)/macros/actions";
import { FormError } from "@/components/layout/form-error";
import { FormField, FormStack, OptionalMacroSection } from "@/components/layout/form-field";
import { ActionButton } from "@/components/layout/action-button";
import { NumberInput, TextInput } from "@/components/ui/form-controls";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, PLACE } from "@/lib/app-copy";

export function MacroTargetForm() {
  const { formRef, state, formAction, isPending } = useResettingForm(createMacroTarget, "macros");

  return (
    <form ref={formRef} action={formAction}>
      <FormStack>
        <FormField label="Name" htmlFor="name">
          <TextInput id="name" name="name" required defaultValue="Daily Calorie Goal" placeholder={PLACE.mealName} />
        </FormField>
        <FormField label="Target calories" htmlFor="targetCalories">
          <NumberInput
            id="targetCalories"
            name="targetCalories"
            min={1}
            step={1}
            required
            placeholder={PLACE.calories}
          />
        </FormField>
        <OptionalMacroSection title="Optional macros">
          <FormField label="Protein (g)" htmlFor="proteinTargetG">
            <NumberInput
              id="proteinTargetG"
              name="proteinTargetG"
              min={0}
              step={1}
              required
              placeholder={PLACE.protein}
            />
          </FormField>
          <FormField label="Fat (g)" htmlFor="fatsTargetG">
            <NumberInput
              id="fatsTargetG"
              name="fatsTargetG"
              min={0}
              step={1}
              required
              placeholder={PLACE.fats}
            />
          </FormField>
          <FormField label="Carbs (g)" htmlFor="carbsTargetG">
            <NumberInput
              id="carbsTargetG"
              name="carbsTargetG"
              min={0}
              step={1}
              required
              placeholder={PLACE.carbs}
            />
          </FormField>
        </OptionalMacroSection>
        <ActionButton type="submit" size="lg" icon="flame" pending={isPending} pendingLabel="Saving…" className="w-full rounded-full sm:w-auto">
          {ACTIONS.saveCompact}
        </ActionButton>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </FormStack>
    </form>
  );
}
