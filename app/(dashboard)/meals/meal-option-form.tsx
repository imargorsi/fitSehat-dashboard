"use client";

import { createMealOption, updateMealOption } from "@/app/(dashboard)/meals/actions";
import { ActionButton } from "@/components/layout/action-button";
import { FormError } from "@/components/layout/form-error";
import { FormField } from "@/components/layout/form-field";
import { HiddenInput, InputSuffix, NumberInput, SelectField, TextInput } from "@/components/ui/form-controls";
import { Eyebrow } from "@/components/ui/typography";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, PLACE } from "@/lib/app-copy";
import { CALORIE_MEALS } from "@/lib/constants";
import { optionalMacroSectionClass } from "@/lib/layout";

export type TMealOptionFormInitial = {
  id: string;
  name: string;
  mealType: (typeof CALORIE_MEALS)[number];
  calories: number;
  proteinG?: string | null;
  carbsG?: string | null;
  fatsG?: string | null;
};

function MacroField({
  id,
  label,
  placeholder,
  step = 0.1,
  required = false,
  suffix,
  defaultValue,
}: {
  id: string;
  label: string;
  placeholder: string;
  step?: number;
  required?: boolean;
  suffix: string;
  defaultValue?: string | number;
}) {
  return (
    <FormField label={label} htmlFor={id}>
      <div className="relative min-w-0">
        <NumberInput
          id={id}
          name={id}
          min={0}
          step={step}
          required={required}
          placeholder={placeholder}
          className="pr-12"
          defaultValue={defaultValue}
        />
        <InputSuffix>{suffix}</InputSuffix>
      </div>
    </FormField>
  );
}

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
    <form ref={formRef} action={formAction} className="flex w-full min-w-0 flex-col gap-5">
      {isEdit ? <HiddenInput name="id" value={initial!.id} /> : null}

      <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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
      </div>

      <section className={optionalMacroSectionClass}>
        <Eyebrow>Macros</Eyebrow>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <MacroField
            id="calories"
            label="Calories"
            placeholder={PLACE.calories}
            step={1}
            required
            suffix="kcal"
            defaultValue={initial?.calories}
          />
          <MacroField
            id="proteinG"
            label="Protein"
            placeholder={PLACE.protein}
            suffix="g"
            defaultValue={initial?.proteinG ?? undefined}
          />
          <MacroField
            id="carbsG"
            label="Carbs"
            placeholder={PLACE.carbs}
            suffix="g"
            defaultValue={initial?.carbsG ?? undefined}
          />
          <MacroField
            id="fatsG"
            label="Fat"
            placeholder={PLACE.fats}
            suffix="g"
            defaultValue={initial?.fatsG ?? undefined}
          />
        </div>
      </section>

      <ActionButton type="submit" size="lg" icon="utensils" pending={isPending} className="w-full rounded-full">
        {submitLabel}
      </ActionButton>
      <FormError error={state && "error" in state ? state.error : undefined} />
    </form>
  );
}
