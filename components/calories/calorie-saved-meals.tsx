"use client";

import { useState } from "react";

import { quickAddMealOption } from "@/app/(dashboard)/overview/actions";
import { ActionButton } from "@/components/layout/action-button";
import { AppLinkButton } from "@/components/layout/app-link-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { FormError } from "@/components/layout/form-error";
import { FormChunk, FormStack, IconField } from "@/components/layout/form-field";
import { MealTypeChip, MEAL_FILTERS, type TMealFilter } from "@/components/meals/meal-filter-chips";
import { UiIcon } from "@/components/icons/ui-icon";
import { ChoiceChip, ChoiceChipGroup, DateInput, HiddenInput } from "@/components/ui/form-controls";
import { Meta, Strong, Unit } from "@/components/ui/typography";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, EMPTY } from "@/lib/app-copy";
import { formatInt, formatNumber } from "@/lib/number.utils";
import { suggestedMealNow, type TSavedMealPick } from "@/lib/meals.utils";

function macroLine(item: TSavedMealPick): string {
  return [item.proteinG, item.carbsG, item.fatsG]
    .map((value, index) => {
      const amount = formatNumber(value);
      const suffix = ["P", "C", "F"][index];
      return amount === "—" ? null : `${amount}g ${suffix}`;
    })
    .filter((part): part is string => part != null)
    .join(" · ");
}

function defaultFilter(meals: TSavedMealPick[]): TMealFilter {
  const suggested = suggestedMealNow();
  return meals.some((meal) => meal.mealType === suggested) ? suggested : "All";
}

function SavedMealRow({
  meal,
  loggedOn,
  onSuccess,
}: {
  meal: TSavedMealPick;
  loggedOn: string;
  onSuccess?: () => void;
}) {
  const { formRef, state, formAction, isPending } = useResettingForm(quickAddMealOption, "meal", onSuccess);
  const macros = macroLine(meal);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex min-w-0 items-center gap-3 rounded-[1.35rem] glass-row px-3.5 py-3"
    >
      <HiddenInput name="mealOptionId" value={meal.id} />
      <HiddenInput name="loggedOn" value={loggedOn} />
      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <MealTypeChip meal={meal.mealType} />
          <Strong className="min-w-0 break-words">{meal.name}</Strong>
        </div>
        <Meta className="mt-1.5 block tabular-nums">
          {formatInt(meal.calories)} <Unit>kcal</Unit>
          {macros ? ` · ${macros}` : ""}
        </Meta>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
      <ActionButton
        type="submit"
        size="sm"
        icon="plus"
        pending={isPending}
        pendingLabel="Adding…"
        className="shrink-0 rounded-full"
      >
        {ACTIONS.addQuick}
      </ActionButton>
    </form>
  );
}

export function CalorieSavedMeals({
  today,
  meals,
  onSuccess,
}: {
  today: string;
  meals: TSavedMealPick[];
  onSuccess?: () => void;
}) {
  const [loggedOn, setLoggedOn] = useState(today);
  const [filter, setFilter] = useState<TMealFilter>(() => defaultFilter(meals));
  const visible = filter === "All" ? meals : meals.filter((meal) => meal.mealType === filter);

  return (
    <FormStack className="gap-0">
      <FormChunk>
        <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,11.5rem)_1fr] sm:items-center">
          <IconField icon={<UiIcon name="calendar" size={16} className="text-muted-foreground" />}>
            <DateInput
              id="savedLoggedOn"
              required
              aria-label="Date"
              value={loggedOn}
              onChange={(event) => setLoggedOn(event.target.value)}
            />
          </IconField>
          {meals.length > 0 ? (
            <ChoiceChipGroup aria-label="Meal type">
              {MEAL_FILTERS.map((type) => (
                <ChoiceChip key={type} compact selected={filter === type} onClick={() => setFilter(type)}>
                  {type}
                </ChoiceChip>
              ))}
            </ChoiceChipGroup>
          ) : null}
        </div>
      </FormChunk>
      {meals.length === 0 ? (
        <FormChunk>
          <EmptyNote title={EMPTY.quickAdd.title} body={EMPTY.quickAdd.body} icon="utensils" tone="gold" />
          <AppLinkButton href="/meals" label={ACTIONS.addMeal} icon="plus" />
        </FormChunk>
      ) : (
        <FormChunk>
          {visible.length === 0 ? (
            <EmptyNote title={EMPTY.mealBand.title} body={EMPTY.mealBand.body} icon="utensils" tone="gold" />
          ) : (
            <ul className="grid min-w-0 gap-2.5">
              {visible.map((meal) => (
                <li key={meal.id} className="min-w-0">
                  <SavedMealRow meal={meal} loggedOn={loggedOn} onSuccess={onSuccess} />
                </li>
              ))}
            </ul>
          )}
        </FormChunk>
      )}
    </FormStack>
  );
}
