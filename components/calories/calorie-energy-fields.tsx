"use client";

import type { ChangeEvent } from "react";

import { IconField } from "@/components/layout/form-field";
import { InputSuffix, NumberInput } from "@/components/ui/form-controls";
import { UiIcon } from "@/components/icons/ui-icon";
import { PLACE } from "@/lib/app-copy";

function MacroInput({
  id,
  placeholder,
  ariaLabel,
  value,
  onChange,
}: {
  id: string;
  placeholder: string;
  ariaLabel: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative min-w-0">
      <NumberInput
        id={id}
        name={id}
        min={0}
        step={0.1}
        placeholder={placeholder}
        className="pr-10"
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
      />
      <InputSuffix>g</InputSuffix>
    </div>
  );
}

export function CalorieEnergyFields({
  calories,
  proteinG,
  carbsG,
  fatsG,
  onCalories,
  onProtein,
  onCarbs,
  onFats,
}: {
  calories: string;
  proteinG: string;
  carbsG: string;
  fatsG: string;
  onCalories: (value: string) => void;
  onProtein: (value: string) => void;
  onCarbs: (value: string) => void;
  onFats: (value: string) => void;
}) {
  const set =
    (setter: (value: string) => void) =>
    (event: ChangeEvent<HTMLInputElement>) =>
      setter(event.target.value);

  return (
    <>
      <IconField
        icon={<UiIcon name="flame" size={16} className="text-muted-foreground" />}
        suffix={<InputSuffix>kcal</InputSuffix>}
      >
        <NumberInput
          id="calories"
          name="calories"
          min={0}
          step={1}
          required
          placeholder={PLACE.calories}
          className="pr-14"
          aria-label="Calories"
          value={calories}
          onChange={set(onCalories)}
        />
      </IconField>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <MacroInput
          id="proteinG"
          placeholder={PLACE.protein}
          ariaLabel="Protein in grams"
          value={proteinG}
          onChange={set(onProtein)}
        />
        <MacroInput
          id="carbsG"
          placeholder={PLACE.carbs}
          ariaLabel="Carbs in grams"
          value={carbsG}
          onChange={set(onCarbs)}
        />
        <MacroInput
          id="fatsG"
          placeholder={PLACE.fats}
          ariaLabel="Fats in grams"
          value={fatsG}
          onChange={set(onFats)}
        />
      </div>
    </>
  );
}
