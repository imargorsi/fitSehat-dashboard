"use client";

import { createCalorieLog } from "@/app/(dashboard)/calories/actions";
import { ActionButton } from "@/components/layout/action-button";
import { FormError } from "@/components/layout/form-error";
import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";
import { HiddenInput } from "@/components/ui/form-controls";
import { Caption, Meta, MetricCompact, Muted, Strong, Unit } from "@/components/ui/typography";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import type { TFitSehatAiSuccess } from "@/lib/ai/fitsehat-ai.types";
import { aiMealItemLabel } from "@/lib/ai/fitsehat-ai.utils";
import { AI } from "@/lib/app-copy";
import { formatInt, formatNumber } from "@/lib/number.utils";
import type { TCalorieMeal } from "@/lib/constants";

export function FitSehatAiResult({
  analysis,
  meal,
  loggedOn,
  notes,
  canConfirm = true,
  onAdjust,
  onSuccess,
}: {
  analysis: TFitSehatAiSuccess;
  meal: TCalorieMeal;
  loggedOn: string;
  notes: string;
  canConfirm?: boolean;
  onAdjust: () => void;
  onSuccess?: () => void;
}) {
  const { formRef, state, formAction, isPending } = useResettingForm(createCalorieLog, "meal", onSuccess);
  const item = aiMealItemLabel(analysis.items);

  return (
    <div className="grid gap-5">
      <div className="grid gap-2.5">
        {analysis.items.map((entry) => (
          <div key={`${entry.name}-${entry.portionDescription}`} className="min-w-0 rounded-[1.35rem] glass-row px-3.5 py-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <Strong className="block break-words">{entry.name}</Strong>
                <Caption className="mt-1 block">{entry.portionDescription}</Caption>
              </div>
              <Meta className="shrink-0 tabular-nums">
                {formatInt(Math.round(entry.calories))} <Unit>kcal</Unit>
              </Meta>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Caption>Total</Caption>
        <MetricCompact className="mt-1">
          {formatInt(analysis.total.calories)} <Unit>kcal</Unit>
        </MetricCompact>
        <Meta className="mt-2 block tabular-nums">
          {formatNumber(analysis.total.proteinG)}g P · {formatNumber(analysis.total.carbohydratesG)}g C · {formatNumber(analysis.total.fatG)}g F
        </Meta>
        <Muted className="mt-3">{AI.estimateNote}</Muted>
      </div>

      <form ref={formRef} action={formAction} className="grid gap-3">
        <HiddenInput name="item" value={item} />
        <HiddenInput name="loggedOn" value={loggedOn} />
        <HiddenInput name="meal" value={meal} />
        <HiddenInput name="calories" value={String(analysis.total.calories)} />
        <HiddenInput name="proteinG" value={String(analysis.total.proteinG)} />
        <HiddenInput name="carbsG" value={String(analysis.total.carbohydratesG)} />
        <HiddenInput name="fatsG" value={String(analysis.total.fatG)} />
        <HiddenInput name="notes" value={notes.slice(0, 400)} />
        {canConfirm ? (
          <>
            <Muted>{AI.confirm}</Muted>
            <div className="grid gap-2 sm:grid-cols-2">
              <ActionButton type="submit" size="lg" icon="check" pending={isPending} className="w-full rounded-full">
                {AI.looksRight}
              </ActionButton>
              <Button type="button" variant="outline" size="lg" className="w-full rounded-full" onClick={onAdjust} disabled={isPending}>
                <UiIcon name="pencil" size={16} className="text-current" />
                {AI.adjust}
              </Button>
            </div>
            <FormError error={state && "error" in state ? state.error : undefined} />
          </>
        ) : null}
      </form>
    </div>
  );
}
