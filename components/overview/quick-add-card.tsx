"use client";

import { quickAddMealOption } from "@/app/(dashboard)/overview/actions";
import { ActionButton } from "@/components/layout/action-button";
import { AppLinkButton } from "@/components/layout/app-link-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { FormError } from "@/components/layout/form-error";
import { GlassCard } from "@/components/layout/glass-card";
import { WidgetHeader } from "@/components/layout/widget-header";
import { Press } from "@/components/motion/press";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { EMPTY, ACTIONS } from "@/lib/care-copy";
import { caloriesFromOption, mealKindFromOption } from "@/lib/meals.utils";
import type { TMealOption } from "@/lib/db/schema";
import { formatInt } from "@/lib/number.utils";

export function QuickAddCard({ meals }: { meals: TMealOption[] }) {
  const items = meals.slice(0, 4);

  return (
    <GlassCard className="flex h-full flex-col">
      <WidgetHeader
        title="Quick add, Precious"
        subtitle="Meals you already love"
        actions={<AppLinkButton href="/meals" label="Edit meals" icon="settings" iconTone="muted" />}
      />
      {items.length === 0 ? (
        <EmptyNote title={EMPTY.quickAdd.title} body={EMPTY.quickAdd.body} icon="utensils" tone="gold" />
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
        <ActionButton type="submit" size="sm" icon="plus" pending={isPending} pendingLabel="Adding…" className="w-full rounded-full">
          {ACTIONS.addQuick}
        </ActionButton>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </form>
    </Press>
  );
}
