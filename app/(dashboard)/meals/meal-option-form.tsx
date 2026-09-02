"use client";

import { createMealOption } from "@/app/(dashboard)/meals/actions";
import {
  FormErrorRow,
  FormField,
  FormGrid,
  FormSubmitRow,
} from "@/components/layout/form-field";
import { FormError } from "@/components/layout/form-error";
import { ActionButton } from "@/components/layout/action-button";
import { NumberInput, SelectField, TextInput, Textarea } from "@/components/ui/form-controls";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, PLACE } from "@/lib/care-copy";
import { CALORIE_MEALS } from "@/lib/constants";

export function MealOptionForm() {
  const { formRef, state, formAction, isPending } = useResettingForm(createMealOption, "mealIdea");

  return (
    <form ref={formRef} action={formAction}>
      <FormGrid>
        <FormField label="Meal name" htmlFor="name">
          <TextInput id="name" name="name" required placeholder={PLACE.mealName} />
        </FormField>
        <FormField label="Meal type" htmlFor="mealType">
          <SelectField
            id="mealType"
            name="mealType"
            required
            defaultValue={CALORIE_MEALS[0]}
            options={CALORIE_MEALS}
          />
        </FormField>
        <FormField label="Calories" htmlFor="calories">
          <NumberInput id="calories" name="calories" min={0} step={1} required placeholder={PLACE.calories} />
        </FormField>
        <FormField label="Protein (g)" htmlFor="proteinG">
          <NumberInput id="proteinG" name="proteinG" min={0} step={0.1} placeholder={PLACE.protein} />
        </FormField>
        <FormField label="Carbs (g)" htmlFor="carbsG">
          <NumberInput id="carbsG" name="carbsG" min={0} step={0.1} placeholder={PLACE.carbs} />
        </FormField>
        <FormField label="Fats (g)" htmlFor="fatsG">
          <NumberInput id="fatsG" name="fatsG" min={0} step={0.1} placeholder={PLACE.fats} />
        </FormField>
        <FormField label="Note" htmlFor="notes" className="sm:col-span-2">
          <Textarea id="notes" name="notes" placeholder={PLACE.notes} />
        </FormField>
        <FormSubmitRow>
          <ActionButton type="submit" size="lg" icon="utensils" pending={isPending} className="w-full min-w-36 rounded-full sm:w-auto">
            {ACTIONS.addMeal}
          </ActionButton>
        </FormSubmitRow>
        <FormErrorRow>
          <FormError error={state && "error" in state ? state.error : undefined} />
        </FormErrorRow>
      </FormGrid>
    </form>
  );
}
