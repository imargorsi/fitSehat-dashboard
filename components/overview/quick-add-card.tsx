"use client";

import Link from "next/link";

import { quickAddMealOption } from "@/app/(dashboard)/overview/actions";
import { EmptyNote } from "@/components/layout/empty-note";
import { FormError } from "@/components/layout/form-error";
import { GlassCard } from "@/components/layout/glass-card";
import { Press } from "@/components/motion/press";
import { Button } from "@/components/ui/button";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { EMPTY } from "@/lib/care-copy";
import { caloriesFromOption, mealKindFromOption } from "@/lib/meals.utils";
import type { TMealOption } from "@/lib/db/schema";
import { formatInt } from "@/lib/number.utils";

export function QuickAddCard({ meals }: { meals: TMealOption[] }) {
  const items = meals.slice(0, 4);

  return (
    <GlassCard className="flex h-full flex-col">
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-6">
        <div>
          <p className="font-heading text-lg font-semibold tracking-tight">Quick add</p>
          <p className="text-sm text-muted-foreground">From your meal options</p>
        </div>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/meals" />}>
          Edit
        </Button>
      </div>
      {items.length === 0 ? (
        <EmptyNote title={EMPTY.quickAdd.title} body={EMPTY.quickAdd.body} />
      ) : (
        <div className="grid grid-cols-2 gap-2 px-4 pb-5 sm:gap-3 sm:px-5">
          {items.map((meal) => (
            <QuickAddItem key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </GlassCard>
  );
}

function QuickAddItem({ meal }: { meal: TMealOption }) {
  const { formRef, state, formAction, isPending } = useResettingForm(quickAddMealOption, "meal");
  const kind = mealKindFromOption(meal.mealType);
  const calories = caloriesFromOption(meal);

  return (
    <Press lift={false}>
      <form
        ref={formRef}
        action={formAction}
        className="flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-border/40 bg-muted/30 p-3 sm:p-4"
      >
        <input type="hidden" name="mealOptionId" value={meal.id} />
        <div className="flex size-10 items-center justify-center rounded-2xl bg-love text-sm font-semibold text-neon-foreground shadow-glow">
          {meal.name.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{meal.name}</p>
          <p className="text-xs leading-5 text-muted-foreground">
            {formatInt(calories)} kcal · {kind}
            {meal.proteinG ? ` · ${meal.proteinG}g P` : ""}
          </p>
        </div>
        <Button type="submit" size="sm" className="w-full rounded-full" disabled={isPending}>
          {isPending ? "Adding…" : "Add"}
        </Button>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </form>
    </Press>
  );
}
