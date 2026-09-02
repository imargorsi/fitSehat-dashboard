"use client";

import { quickAddMealOption } from "@/app/(dashboard)/overview/actions";
import { ActionButton } from "@/components/layout/action-button";
import { AppLinkButton } from "@/components/layout/app-link-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { FormError } from "@/components/layout/form-error";
import { GlassCard } from "@/components/layout/glass-card";
import { WidgetBody, WidgetHeader } from "@/components/layout/widget-header";
import { Press } from "@/components/motion/press";
import { HiddenInput } from "@/components/ui/form-controls";
import { InitialBadge, Meta, RowTitle } from "@/components/ui/typography";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { EMPTY, ACTIONS } from "@/lib/app-copy";
import { caloriesFromOption, mealKindFromOption } from "@/lib/meals.utils";
import type { TMealOption } from "@/lib/db/schema";
import { formatInt } from "@/lib/number.utils";

export function QuickAddCard({ meals }: { meals: TMealOption[] }) {
  const items = meals.slice(0, 4);

  return (
    <GlassCard className="flex h-full flex-col">
      <WidgetHeader
        title="Quick add"
        subtitle="Saved meals for one-tap logging"
        actions={<AppLinkButton href="/meals" label="Edit meals" icon="settings" iconTone="muted" />}
      />
      {items.length === 0 ? (
        <WidgetBody className="pt-0">
          <EmptyNote title={EMPTY.quickAdd.title} body={EMPTY.quickAdd.body} icon="utensils" tone="gold" />
        </WidgetBody>
      ) : (
        <WidgetBody className="pt-0">
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {items.map((meal) => (
              <QuickAddItem key={meal.id} meal={meal} />
            ))}
          </div>
        </WidgetBody>
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
        <HiddenInput name="mealOptionId" value={meal.id} />
        <div className="flex size-10 items-center justify-center rounded-2xl bg-brand shadow-glow">
          <InitialBadge>{meal.name.slice(0, 1).toUpperCase()}</InitialBadge>
        </div>
        <div className="min-w-0 flex-1">
          <RowTitle>{meal.name}</RowTitle>
          <Meta className="leading-5">
            {formatInt(calories)} kcal · {kind}
            {meal.proteinG ? ` · ${meal.proteinG}g P` : ""}
          </Meta>
        </div>
        <ActionButton type="submit" size="sm" icon="plus" pending={isPending} pendingLabel="Adding…" className="w-full rounded-full">
          {ACTIONS.addQuick}
        </ActionButton>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </form>
    </Press>
  );
}
