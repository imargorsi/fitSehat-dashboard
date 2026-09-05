"use client";

import { useCallback, useEffect, useState } from "react";

import { createCalorieLog, updateCalorieLog } from "@/app/(dashboard)/calories/actions";
import { CalorieEnergyFields } from "@/components/calories/calorie-energy-fields";
import { FoodSearchPanel } from "@/components/calories/food-search";
import { MealWhenRow } from "@/components/calories/meal-when-row";
import { ActionButton } from "@/components/layout/action-button";
import { FormChunk, FormErrorRow, FormField, FormGrid, FormStack, FormSubmitRow } from "@/components/layout/form-field";
import { FormError } from "@/components/layout/form-error";
import {
  DateInput,
  HiddenInput,
  NumberInput,
  SelectField,
  TextInput,
} from "@/components/ui/form-controls";
import { Caption } from "@/components/ui/typography";
import { type TNutritionPrefill, useFoodSearch } from "@/hooks/useFoodSearch.hook";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, LOOKUP, PLACE } from "@/lib/app-copy";
import { CALORIE_MEALS, type TCalorieMeal } from "@/lib/constants";
import { dialogDockActionClass, dialogPanelClass, dialogScrollClass } from "@/lib/layout";
import { suggestedMealNow } from "@/lib/meals.utils";

export type TCalorieLogFormInitial = {
  id: string;
  item: string;
  loggedOn: string;
  meal: TCalorieMeal;
  calories: number;
  proteinG?: string | null;
  carbsG?: string | null;
  fatsG?: string | null;
  notes?: string | null;
};

function fieldString(value: string | number | null | undefined): string {
  if (value == null || value === "") {
    return "";
  }
  return String(value);
}

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
  const [meal, setMeal] = useState<TCalorieMeal>(initial?.meal ?? suggestedMealNow());
  const [loggedOn, setLoggedOn] = useState(initial?.loggedOn ?? today);
  const [item, setItem] = useState(initial?.item ?? "");
  const [calories, setCalories] = useState(fieldString(initial?.calories));
  const [proteinG, setProteinG] = useState(fieldString(initial?.proteinG));
  const [carbsG, setCarbsG] = useState(fieldString(initial?.carbsG));
  const [fatsG, setFatsG] = useState(fieldString(initial?.fatsG));

  const applyPrefill = useCallback((next: TNutritionPrefill) => {
    setItem(next.item);
    setCalories(String(next.calories));
    setProteinG(fieldString(next.proteinG));
    setCarbsG(fieldString(next.carbsG));
    setFatsG(fieldString(next.fatsG));
  }, []);

  const lookup = useFoodSearch(item, compact && !isEdit, applyPrefill);
  const { resetLookup } = lookup;

  useEffect(() => {
    const form = formRef.current;
    if (!form) {
      return;
    }
    const onReset = () => {
      setMeal(suggestedMealNow());
      setLoggedOn(today);
      setItem("");
      setCalories("");
      setProteinG("");
      setCarbsG("");
      setFatsG("");
      resetLookup();
    };
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [formRef, resetLookup, today]);

  if (!compact) {
    return (
      <form ref={formRef} action={formAction} className="min-w-0 overflow-x-hidden">
        {isEdit ? <HiddenInput name="id" value={initial!.id} /> : null}
        <FormGrid>
          <FormField label="What you ate" htmlFor="item">
            <TextInput id="item" name="item" required placeholder={PLACE.mealItem} value={item} onChange={(event) => setItem(event.target.value)} />
          </FormField>
          <FormField label="Date" htmlFor="loggedOn">
            <DateInput id="loggedOn" name="loggedOn" required defaultValue={initial?.loggedOn ?? today} />
          </FormField>
          <FormField label="Meal" htmlFor="meal">
            <SelectField
              key={initial?.meal ?? "new"}
              id="meal"
              name="meal"
              defaultValue={initial?.meal ?? suggestedMealNow()}
              required
              options={CALORIE_MEALS}
            />
          </FormField>
          <FormField label="Calories" htmlFor="calories">
            <NumberInput id="calories" name="calories" min={0} step={1} required placeholder={PLACE.calories} value={calories} onChange={(event) => setCalories(event.target.value)} />
          </FormField>
          <FormField label="Protein (g)" htmlFor="proteinG">
            <NumberInput id="proteinG" name="proteinG" min={0} step={0.1} placeholder={PLACE.protein} value={proteinG} onChange={(event) => setProteinG(event.target.value)} />
          </FormField>
          <FormField label="Carbs (g)" htmlFor="carbsG">
            <NumberInput id="carbsG" name="carbsG" min={0} step={0.1} placeholder={PLACE.carbs} value={carbsG} onChange={(event) => setCarbsG(event.target.value)} />
          </FormField>
          <FormField label="Fats (g)" htmlFor="fatsG">
            <NumberInput id="fatsG" name="fatsG" min={0} step={0.1} placeholder={PLACE.fats} value={fatsG} onChange={(event) => setFatsG(event.target.value)} />
          </FormField>
          <FormSubmitRow>
            <ActionButton type="submit" size="lg" icon="flame" pending={isPending} className="w-full min-w-40 rounded-full sm:w-auto">
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
    <form ref={formRef} action={formAction} className={dialogPanelClass}>
      {isEdit ? <HiddenInput name="id" value={initial!.id} /> : null}
      <HiddenInput name="meal" value={meal} />
      <div className={dialogScrollClass}>
        <FormStack className="gap-0">
          <FormChunk>
            <TextInput
              id="item"
              name="item"
              required
              autoFocus
              autoComplete="off"
              placeholder={PLACE.mealItem}
              aria-label={LOOKUP.prompt}
              className="h-14"
              value={item}
              onChange={(event) => setItem(event.target.value)}
            />
            {!isEdit ? <FoodSearchPanel {...lookup} /> : null}
          </FormChunk>

          <FormChunk>
            <MealWhenRow
              meal={meal}
              onMeal={setMeal}
              dateId="loggedOn"
              dateName="loggedOn"
              loggedOn={loggedOn}
              onLoggedOn={setLoggedOn}
            />
          </FormChunk>

          <FormChunk>
            <Caption>{LOOKUP.macros}</Caption>
            <CalorieEnergyFields
              calories={calories}
              proteinG={proteinG}
              carbsG={carbsG}
              fatsG={fatsG}
              onCalories={setCalories}
              onProtein={setProteinG}
              onCarbs={setCarbsG}
              onFats={setFatsG}
            />
          </FormChunk>
        </FormStack>
      </div>
      <div className={dialogDockActionClass}>
        <ActionButton type="submit" size="lg" icon="flame" pending={isPending} className="w-full rounded-full">
          {submitLabel}
        </ActionButton>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
