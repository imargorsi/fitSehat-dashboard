"use client";

import { quickAddMealOption } from "@/app/(dashboard)/overview/actions";
import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";
import { HiddenInput } from "@/components/ui/form-controls";
import { ACTIONS } from "@/lib/app-copy";
import { useResettingForm } from "@/hooks/useResettingForm.hook";

export function MealQuickAddButton({ mealId, today }: { mealId: string; today: string }) {
  const { formRef, formAction, isPending } = useResettingForm(quickAddMealOption, "meal");

  return (
    <form ref={formRef} action={formAction}>
      <HiddenInput name="mealOptionId" value={mealId} />
      <HiddenInput name="loggedOn" value={today} />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={isPending}
        aria-label={ACTIONS.addQuick}
        className="rounded-full text-muted-foreground hover:text-foreground"
      >
        <UiIcon name="plus" size={14} className="text-current" />
      </Button>
    </form>
  );
}
