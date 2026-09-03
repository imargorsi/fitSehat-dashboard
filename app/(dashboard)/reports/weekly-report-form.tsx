"use client";

import { createWeeklyReport } from "@/app/(dashboard)/reports/actions";
import { FormError } from "@/components/layout/form-error";
import { ActionButton } from "@/components/layout/action-button";
import { FormLabel, TextInput } from "@/components/ui/form-controls";
import { useResettingForm } from "@/hooks/useResettingForm.hook";
import { ACTIONS, PLACE } from "@/lib/app-copy";

export function WeeklyReportForm() {
  const { formRef, state, formAction, isPending } = useResettingForm(createWeeklyReport, "report");

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="grid gap-2">
        <FormLabel htmlFor="name">Report name</FormLabel>
        <TextInput id="name" name="name" required placeholder={PLACE.mealName} />
      </div>
      <div className="grid gap-2">
        <FormLabel htmlFor="fileUrl">Link (optional)</FormLabel>
        <TextInput id="fileUrl" name="fileUrl" type="url" placeholder="https://" />
      </div>
      <div className="flex items-end">
        <ActionButton type="submit" size="lg" icon="book" pending={isPending} pendingLabel="Saving…" className="w-full min-w-36 rounded-full sm:w-auto">
          {ACTIONS.saveCompact}
        </ActionButton>
      </div>
      <div className="sm:col-span-2 lg:col-span-3">
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
