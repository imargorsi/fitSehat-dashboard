"use client";

import { useState } from "react";

import { createCalorieLog } from "@/app/(dashboard)/calories/actions";
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

export function CalorieLogForm({
  today,
  compact = false,
  onSuccess,
}: {
  today: string;
  compact?: boolean;
  onSuccess?: () => void;
}) {
  const { formRef, state, formAction, isPending } = useResettingForm(
    createCalorieLog,
    "meal",
    onSuccess
  );
  const [meal, setMeal] = useState<(typeof CALORIE_MEALS)[number]>("Breakfast");

  if (!compact) {
    return (
      <form ref={formRef} action={formAction}>
        <FormGrid>
          <FormField label="What you ate" htmlFor="item">
            <TextInput id="item" name="item" required placeholder={PLACE.mealItem} />
          </FormField>
          <FormField label="Date" htmlFor="loggedOn">
            <DateInput id="loggedOn" name="loggedOn" required defaultValue={today} />
          </FormField>
          <FormField label="Meal" htmlFor="meal">
            <SelectField id="meal" name="meal" defaultValue="Breakfast" required options={CALORIE_MEALS} />
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
          <FormField label="Note" htmlFor="notes" className="sm:col-span-2 lg:col-span-4">
            <Textarea id="notes" name="notes" placeholder={PLACE.notes} />
          </FormField>
          <FormSubmitRow>
            <ActionButton
              type="submit"
              size="lg"
              icon="flame"
              pending={isPending}
              className="w-full min-w-40 rounded-full sm:w-auto"
            >
              {ACTIONS.logMeal}
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
      <FormStack>
        <HiddenInput name="meal" value={meal} />
        <FormSection title="What">
          <TextInput id="item" name="item" required placeholder={PLACE.mealItem} aria-label="What you ate" />
        </FormSection>

        <FormSection title="When" className="gap-3">
          <div className="grid gap-3 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-end">
            <FormField label="Date" htmlFor="loggedOn">
              <DateInput id="loggedOn" name="loggedOn" required defaultValue={today} />
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
            />
            <InputSuffix>kcal</InputSuffix>
          </div>
        </FormSection>

        <OptionalMacroSection>
          <FormField label="Protein" htmlFor="proteinG">
            <NumberInput id="proteinG" name="proteinG" min={0} step={0.1} placeholder={PLACE.protein} />
          </FormField>
          <FormField label="Carbs" htmlFor="carbsG">
            <NumberInput id="carbsG" name="carbsG" min={0} step={0.1} placeholder={PLACE.carbs} />
          </FormField>
          <FormField label="Fats" htmlFor="fatsG">
            <NumberInput id="fatsG" name="fatsG" min={0} step={0.1} placeholder={PLACE.fats} />
          </FormField>
        </OptionalMacroSection>

        <FormSection title="Note · optional">
          <Textarea id="notes" name="notes" placeholder={PLACE.notes} aria-label="Note" />
        </FormSection>

        <ActionButton type="submit" size="lg" icon="flame" pending={isPending} className="w-full rounded-full">
          {ACTIONS.logMeal}
        </ActionButton>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </FormStack>
    </form>
  );
}
