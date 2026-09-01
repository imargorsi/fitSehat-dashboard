"use client";

import { createMacroTarget } from "@/app/(dashboard)/macros/actions";
import { FormError } from "@/components/layout/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResettingForm } from "@/hooks/useResettingForm.hook";

export function MacroTargetForm() {
  const { formRef, state, formAction, isPending } = useResettingForm(createMacroTarget, "macros");

  return (
    <form ref={formRef} action={formAction} className="grid gap-5">
      <div className="grid gap-2">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Name</p>
        <Label htmlFor="name" className="sr-only">
          Name
        </Label>
        <Input id="name" name="name" required defaultValue="Daily Calorie Goal" />
      </div>
      <div className="grid gap-2">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Energy</p>
        <Label htmlFor="targetCalories">Target calories</Label>
        <Input
          id="targetCalories"
          name="targetCalories"
          type="number"
          min={1}
          step={1}
          required
          placeholder="2300"
        />
      </div>
      <div className="grid gap-3 rounded-[1.25rem] bg-muted/35 p-4">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">Macros</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="proteinTargetG">Protein (g)</Label>
            <Input
              id="proteinTargetG"
              name="proteinTargetG"
              type="number"
              min={0}
              step={1}
              required
              placeholder="170"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="fatsTargetG">Fats (g)</Label>
            <Input
              id="fatsTargetG"
              name="fatsTargetG"
              type="number"
              min={0}
              step={1}
              required
              placeholder="70"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="carbsTargetG">Carbs (g)</Label>
            <Input
              id="carbsTargetG"
              name="carbsTargetG"
              type="number"
              min={0}
              step={1}
              required
              placeholder="247"
            />
          </div>
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full rounded-full sm:w-auto" disabled={isPending}>
        {isPending ? "Saving…" : "Save target"}
      </Button>
      <FormError error={state && "error" in state ? state.error : undefined} />
    </form>
  );
}
