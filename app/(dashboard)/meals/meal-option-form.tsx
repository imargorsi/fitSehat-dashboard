"use client";

import { createMealOption } from "@/app/(dashboard)/meals/actions";
import { FormError } from "@/components/layout/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { CALORIE_MEALS } from "@/lib/constants";

export function MealOptionForm() {
  const { formRef, state, formAction, isPending } = useResettingForm(createMealOption, "mealIdea");

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Meal name</Label>
        <Input id="name" name="name" required placeholder="Greek yogurt + berries" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="mealType">Meal type</Label>
        <SelectField
          id="mealType"
          name="mealType"
          required
          defaultValue={CALORIE_MEALS[0]}
          options={CALORIE_MEALS}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="calories">Calories</Label>
        <Input id="calories" name="calories" type="number" min={0} step={1} required placeholder="0" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="proteinG">Protein (g)</Label>
        <Input id="proteinG" name="proteinG" type="number" min={0} step={0.1} placeholder="g" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="carbsG">Carbs (g)</Label>
        <Input id="carbsG" name="carbsG" type="number" min={0} step={0.1} placeholder="g" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="fatsG">Fats (g)</Label>
        <Input id="fatsG" name="fatsG" type="number" min={0} step={0.1} placeholder="g" />
      </div>
      <div className="grid gap-2 sm:col-span-2">
        <Label htmlFor="notes">Note</Label>
        <Textarea id="notes" name="notes" placeholder="A quiet detail, if you like" />
      </div>
      <div className="flex items-end sm:col-span-2 lg:col-span-4">
        <Button type="submit" size="lg" className="w-full min-w-36 rounded-full sm:w-auto" disabled={isPending}>
          {isPending ? "Saving…" : "Add meal"}
        </Button>
      </div>
      <div className="sm:col-span-2 lg:col-span-4">
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
