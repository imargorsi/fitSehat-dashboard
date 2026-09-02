"use client";

import { createMealOption, updateMealOption } from "@/app/(dashboard)/meals/actions";
import {
  FormErrorRow,
  FormField,
  FormGrid,
  FormSubmitRow,
} from "@/components/layout/form-field";
import { FormError } from "@/components/layout/form-error";
import { ActionButton } from "@/components/layout/action-button";
import { HiddenInput, NumberInput, SelectField, TextInput, Textarea } from "@/components/ui/form-controls";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, PLACE } from "@/lib/app-copy";
import { CALORIE_MEALS } from "@/lib/constants";

export type TMealOptionFormInitial = {
  id: string;
  name: string;
  mealType: (typeof CALORIE_MEALS)[number];
  calories: number;
  proteinG?: string | null;
  carbsG?: string | null;
  fatsG?: string | null;
  notes?: string | null;
};

export function MealOptionForm({
  initial,
  onSuccess,
}: {
  initial?: TMealOptionFormInitial;
  onSuccess?: () => void;
} = {}) {
  const isEdit = Boolean(initial?.id);
  const action = isEdit ? updateMealOption : createMealOption;
  const celebrate = isEdit ? "updated" : "mealIdea";
  const submitLabel = isEdit ? ACTIONS.saveChanges : ACTIONS.addMeal;
  const { formRef, state, formAction, isPending } = useResettingForm(action, celebrate, onSuccess, !isEdit);

  return (
    <form ref={formRef} action={formAction}>
      {isEdit ? <HiddenInput name="id" value={initial!.id} /> : null}
      <FormGrid>
        <FormField label="Meal name" htmlFor="name">
          <TextInput id="name" name="name" required placeholder={PLACE.mealName} defaultValue={initial?.name} />
        </FormField>
        <FormField label="Meal type" htmlFor="mealType">
          <SelectField
            key={initial?.mealType ?? CALORIE_MEALS[0]}
            id="mealType"
            name="mealType"
            required
            defaultValue={initial?.mealType ?? CALORIE_MEALS[0]}
            options={CALORIE_MEALS}
          />
        </FormField>
        <FormField label="Calories" htmlFor="calories">
          <NumberInput id="calories" name="calories" min={0} step={1} required placeholder={PLACE.calories} defaultValue={initial?.calories} />
        </FormField>
        <FormField label="Protein (g)" htmlFor="proteinG">
          <NumberInput id="proteinG" name="proteinG" min={0} step={0.1} placeholder={PLACE.protein} defaultValue={initial?.proteinG ?? undefined} />
        </FormField>
        <FormField label="Carbs (g)" htmlFor="carbsG">
          <NumberInput id="carbsG" name="carbsG" min={0} step={0.1} placeholder={PLACE.carbs} defaultValue={initial?.carbsG ?? undefined} />
        </FormField>
        <FormField label="Fats (g)" htmlFor="fatsG">
          <NumberInput id="fatsG" name="fatsG" min={0} step={0.1} placeholder={PLACE.fats} defaultValue={initial?.fatsG ?? undefined} />
        </FormField>
        <FormField label="Note" htmlFor="notes" className="sm:col-span-2">
          <Textarea id="notes" name="notes" placeholder={PLACE.notes} defaultValue={initial?.notes ?? undefined} />
        </FormField>
        <FormSubmitRow>
          <ActionButton type="submit" size="lg" icon="utensils" pending={isPending} className="w-full min-w-36 rounded-full sm:w-auto">
            {submitLabel}
          </ActionButton>
        </FormSubmitRow>
        <FormErrorRow>
          <FormError error={state && "error" in state ? state.error : undefined} />
        </FormErrorRow>
      </FormGrid>
    </form>
  );
}
