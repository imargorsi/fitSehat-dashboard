"use client";

import { createMacroTarget } from "@/app/(dashboard)/macros/actions";
import { FormError } from "@/components/layout/form-error";
import { FormField, FormStack, OptionalMacroSection } from "@/components/layout/form-field";
import { ActionButton } from "@/components/layout/action-button";
import { NumberInput, TextInput } from "@/components/ui/form-controls";
import { useResettingForm } from "@/hooks/useResettingForm.hook";

export function MacroTargetForm() {
  const { formRef, state, formAction, isPending } = useResettingForm(createMacroTarget, "macros");

  return (
    <form ref={formRef} action={formAction}>
      <FormStack>
        <FormField label="Name, Love" htmlFor="name">
          <TextInput id="name" name="name" required defaultValue="Daily Calorie Goal" placeholder="A gentle daily mark, Guddi" />
        </FormField>
        <FormField label="Target calories, Jaan" htmlFor="targetCalories">
          <NumberInput
            id="targetCalories"
            name="targetCalories"
            min={1}
            step={1}
            required
            placeholder="Energy for the day, Love"
          />
        </FormField>
        <OptionalMacroSection title="Macros, Guddi">
          <FormField label="Protein, Precious" htmlFor="proteinTargetG">
            <NumberInput
              id="proteinTargetG"
              name="proteinTargetG"
              min={0}
              step={1}
              required
              placeholder="Protein for you, Jaan"
            />
          </FormField>
          <FormField label="Fats, Love" htmlFor="fatsTargetG">
            <NumberInput
              id="fatsTargetG"
              name="fatsTargetG"
              min={0}
              step={1}
              required
              placeholder="A little fat is okay, Guddi"
            />
          </FormField>
          <FormField label="Carbs, Precious" htmlFor="carbsTargetG">
            <NumberInput
              id="carbsTargetG"
              name="carbsTargetG"
              min={0}
              step={1}
              required
              placeholder="Carbs if you like, Love"
            />
          </FormField>
        </OptionalMacroSection>
        <ActionButton type="submit" size="lg" icon="flame" pending={isPending} pendingLabel="Saving for you…" className="w-full rounded-full sm:w-auto">
          Keep this, Jaan
        </ActionButton>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </FormStack>
    </form>
  );
}
