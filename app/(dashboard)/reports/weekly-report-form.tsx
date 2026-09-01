"use client";

import { createWeeklyReport } from "@/app/(dashboard)/reports/actions";
import { FormError } from "@/components/layout/form-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResettingForm } from "@/hooks/useResettingForm.hook";

export function WeeklyReportForm() {
  const { formRef, state, formAction, isPending } = useResettingForm(createWeeklyReport, "report");

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="grid gap-2">
        <Label htmlFor="name">Name, Love</Label>
        <Input id="name" name="name" required placeholder="This week's note, Guddi" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="fileUrl">A link if you like, Precious</Label>
        <Input id="fileUrl" name="fileUrl" type="url" placeholder="Only if you want, Jaan" />
      </div>
      <div className="flex items-end">
        <Button type="submit" size="lg" className="w-full min-w-36 rounded-full sm:w-auto" disabled={isPending}>
          {isPending ? "Saving for you…" : "Keep this week, Love"}
        </Button>
      </div>
      <div className="sm:col-span-2 lg:col-span-3">
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
