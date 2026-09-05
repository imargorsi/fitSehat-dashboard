"use client";

import { IconField } from "@/components/layout/form-field";
import { UiIcon } from "@/components/icons/ui-icon";
import { ChoiceChip, ChoiceChipGroup, DateInput } from "@/components/ui/form-controls";
import { Caption } from "@/components/ui/typography";
import { LOOKUP } from "@/lib/app-copy";
import { CALORIE_MEALS, type TCalorieMeal } from "@/lib/constants";

export function MealWhenRow({
  meal,
  onMeal,
  dateId,
  dateName,
  loggedOn,
  onLoggedOn,
}: {
  meal: TCalorieMeal;
  onMeal: (next: TCalorieMeal) => void;
  dateId: string;
  dateName?: string;
  loggedOn: string;
  onLoggedOn: (next: string) => void;
}) {
  return (
    <div className="grid min-w-0 gap-3">
      <Caption>{LOOKUP.when}</Caption>
      <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-[minmax(0,11.5rem)_1fr] sm:items-center">
        <IconField icon={<UiIcon name="calendar" size={16} className="text-muted-foreground" />}>
          <DateInput
            id={dateId}
            name={dateName}
            required
            aria-label="Date"
            value={loggedOn}
            onChange={(event) => onLoggedOn(event.target.value)}
          />
        </IconField>
        <ChoiceChipGroup className="w-full" aria-label="Meal">
          {CALORIE_MEALS.map((option) => (
            <ChoiceChip key={option} compact selected={meal === option} onClick={() => onMeal(option)}>
              {option}
            </ChoiceChip>
          ))}
        </ChoiceChipGroup>
      </div>
    </div>
  );
}
