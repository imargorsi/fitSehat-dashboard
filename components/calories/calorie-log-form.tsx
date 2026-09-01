"use client";

import { useState } from "react";

import { createCalorieLog } from "@/app/(dashboard)/calories/actions";
import { FormError } from "@/components/layout/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, PLACE } from "@/lib/care-copy";
import { CALORIE_MEALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
      <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="grid gap-2">
          <Label htmlFor="item">What you ate</Label>
          <Input id="item" name="item" required placeholder={PLACE.mealItem} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="loggedOn">Date</Label>
          <Input id="loggedOn" name="loggedOn" type="date" required defaultValue={today} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="meal">Meal</Label>
          <SelectField id="meal" name="meal" defaultValue="Breakfast" required options={CALORIE_MEALS} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="calories">Calories</Label>
          <Input id="calories" name="calories" type="number" min={0} step={1} required placeholder={PLACE.calories} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="proteinG">Protein (g)</Label>
          <Input id="proteinG" name="proteinG" type="number" min={0} step={0.1} placeholder={PLACE.protein} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="carbsG">Carbs (g)</Label>
          <Input id="carbsG" name="carbsG" type="number" min={0} step={0.1} placeholder={PLACE.carbs} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="fatsG">Fats (g)</Label>
          <Input id="fatsG" name="fatsG" type="number" min={0} step={0.1} placeholder={PLACE.fats} />
        </div>
        <div className="grid gap-2 sm:col-span-2 lg:col-span-4">
          <Label htmlFor="notes">Note</Label>
          <Textarea id="notes" name="notes" placeholder={PLACE.notes} />
        </div>
        <div className="flex items-end sm:col-span-2 lg:col-span-4">
          <Button type="submit" size="lg" className="w-full min-w-40 rounded-full sm:w-auto" disabled={isPending}>
            {isPending ? "Saving…" : ACTIONS.logMeal}
          </Button>
        </div>
        <div className="sm:col-span-2 lg:col-span-4">
          <FormError error={state && "error" in state ? state.error : undefined} />
        </div>
      </form>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="grid gap-5">
      <input type="hidden" name="meal" value={meal} />
      <section className="grid gap-2">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">What</p>
        <Label htmlFor="item" className="sr-only">
          What you ate
        </Label>
        <Input id="item" name="item" required placeholder={PLACE.mealItem} />
      </section>

      <section className="grid gap-3">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">When</p>
        <div className="grid gap-3 sm:grid-cols-[minmax(0,11rem)_1fr] sm:items-end">
          <div className="grid gap-2">
            <Label htmlFor="loggedOn">Date</Label>
            <Input id="loggedOn" name="loggedOn" type="date" required defaultValue={today} />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CALORIE_MEALS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setMeal(option)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm transition-colors",
                  meal === option
                    ? "bg-love text-neon-foreground shadow-glow"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-2">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Energy</p>
        <Label htmlFor="calories" className="sr-only">
          Calories
        </Label>
        <div className="relative">
          <Input
            id="calories"
            name="calories"
            type="number"
            min={0}
            step={1}
            required
            placeholder={PLACE.calories}
            className="pr-14"
          />
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-muted-foreground">
            kcal
          </span>
        </div>
      </section>

      <section className="grid gap-3 rounded-[1.25rem] bg-muted/35 p-4">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Macros · optional</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="proteinG">Protein</Label>
            <Input id="proteinG" name="proteinG" type="number" min={0} step={0.1} placeholder={PLACE.protein} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="carbsG">Carbs</Label>
            <Input id="carbsG" name="carbsG" type="number" min={0} step={0.1} placeholder={PLACE.carbs} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fatsG">Fats</Label>
            <Input id="fatsG" name="fatsG" type="number" min={0} step={0.1} placeholder={PLACE.fats} />
          </div>
        </div>
      </section>

      <section className="grid gap-2">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Note · optional</p>
        <Label htmlFor="notes" className="sr-only">
          Note
        </Label>
        <Textarea id="notes" name="notes" placeholder={PLACE.notes} />
      </section>

      <Button type="submit" size="lg" className="w-full rounded-full" disabled={isPending}>
        {isPending ? "Saving…" : ACTIONS.logMeal}
      </Button>
      <FormError error={state && "error" in state ? state.error : undefined} />
    </form>
  );
}
