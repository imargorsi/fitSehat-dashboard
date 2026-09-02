"use client";

import { useState } from "react";

import { createCalorieLog, updateCalorieLog } from "@/app/(dashboard)/calories/actions";
import { ActionButton } from "@/components/layout/action-button";
import {
  FormErrorRow,
  FormField,
  FormGrid,
  FormSection,
  FormStack,
  FormSubmitRow,
  OptionalMacroSection,
} from "@/components/layout/form-field";
import { FormError } from "@/components/layout/form-error";
import { DateInput, NumberInput, SelectField, TextInput, Textarea, ChoiceChip, ChoiceChipGroup, HiddenInput, InputSuffix } from "@/components/ui/form-controls";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, PLACE } from "@/lib/care-copy";
import { CALORIE_MEALS } from "@/lib/constants";

export type TCalorieLogFormInitial = {
  id: string;
  item: string;
  loggedOn: string;
  meal: (typeof CALORIE_MEALS)[number];
  calories: number;
  proteinG?: string | null;
  carbsG?: string | null;
  fatsG?: string | null;
  notes?: string | null;
};

export function CalorieLogForm({
  today,
  compact = false,
  initial,
  onSuccess,
}: {
  today: string;
  compact?: boolean;
  initial?: TCalorieLogFormInitial;
  onSuccess?: () => void;
}) {
  const isEdit = Boolean(initial?.id);
  const action = isEdit ? updateCalorieLog : createCalorieLog;
  const celebrate = isEdit ? "updated" : "meal";
  const submitLabel = isEdit ? ACTIONS.saveChanges : ACTIONS.logMeal;
  const { formRef, state, formAction, isPending } = useResettingForm(action, celebrate, onSuccess, !isEdit);
  const [meal, setMeal] = useState<(typeof CALORIE_MEALS)[number]>(initial?.meal ?? "Breakfast");

  if (!compact) {
    return (
      <form ref={formRef} action={formAction}>
        {isEdit ? <HiddenInput name="id" value={initial!.id} /> : null}
        <FormGrid>
          <FormField label="What you ate" htmlFor="item">
            <TextInput id="item" name="item" required placeholder={PLACE.mealItem} defaultValue={initial?.item} />
          </FormField>
          <FormField label="Date" htmlFor="loggedOn">
            <DateInput id="loggedOn" name="loggedOn" required defaultValue={initial?.loggedOn ?? today} />
          </FormField>
          <FormField label="Meal" htmlFor="meal">
            <SelectField
              key={initial?.meal ?? "Breakfast"}
              id="meal"
              name="meal"
              defaultValue={initial?.meal ?? "Breakfast"}
              required
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
          <FormField label="Note" htmlFor="notes" className="sm:col-span-2 lg:col-span-4">
            <Textarea id="notes" name="notes" placeholder={PLACE.notes} defaultValue={initial?.notes ?? undefined} />
          </FormField>
          <FormSubmitRow>
            <ActionButton
              type="submit"
              size="lg"
              icon="flame"
              pending={isPending}
              className="w-full min-w-40 rounded-full sm:w-auto"
            >
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

  return (
    <form ref={formRef} action={formAction}>
      {isEdit ? <HiddenInput name="id" value={initial!.id} /> : null}
      <FormStack>
        <HiddenInput name="meal" value={meal} />
        <FormSection title="What">
          <TextInput id="item" name="item" required placeholder={PLACE.mealItem} aria-label="What you ate" defaultValue={initial?.item} />
        </FormSection>

        <FormSection title="When" className="gap-3">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-end">
            <FormField label="Date" htmlFor="loggedOn">
              <DateInput id="loggedOn" name="loggedOn" required defaultValue={initial?.loggedOn ?? today} />
            </FormField>
            <ChoiceChipGroup>
              {CALORIE_MEALS.map((option) => (
                <ChoiceChip
                  key={option}
                  selected={meal === option}
                  onClick={() => setMeal(option)}
                >
                  {option}
                </ChoiceChip>
              ))}
            </ChoiceChipGroup>
          </div>
        </FormSection>

        <FormSection title="Energy">
          <div className="relative">
            <NumberInput
              id="calories"
              name="calories"
              min={0}
              step={1}
              required
              placeholder={PLACE.calories}
              className="pr-14"
              aria-label="Calories"
              defaultValue={initial?.calories}
            />
            <InputSuffix>kcal</InputSuffix>
          </div>
        </FormSection>

        <OptionalMacroSection>
          <FormField label="Protein" htmlFor="proteinG">
            <NumberInput id="proteinG" name="proteinG" min={0} step={0.1} placeholder={PLACE.protein} defaultValue={initial?.proteinG ?? undefined} />
          </FormField>
          <FormField label="Carbs" htmlFor="carbsG">
            <NumberInput id="carbsG" name="carbsG" min={0} step={0.1} placeholder={PLACE.carbs} defaultValue={initial?.carbsG ?? undefined} />
          </FormField>
          <FormField label="Fats" htmlFor="fatsG">
            <NumberInput id="fatsG" name="fatsG" min={0} step={0.1} placeholder={PLACE.fats} defaultValue={initial?.fatsG ?? undefined} />
          </FormField>
        </OptionalMacroSection>

        <FormSection title="Note · optional">
          <Textarea id="notes" name="notes" placeholder={PLACE.notes} aria-label="Note" defaultValue={initial?.notes ?? undefined} />
        </FormSection>

        <ActionButton type="submit" size="lg" icon="flame" pending={isPending} className="w-full rounded-full">
          {submitLabel}
        </ActionButton>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </FormStack>
    </form>
  );
}
