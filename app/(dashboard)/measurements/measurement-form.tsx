"use client";

import { saveMeasurement, saveProfileBaselines } from "@/app/(dashboard)/measurements/actions";
import { FormError } from "@/components/layout/form-error";
import { ActionButton } from "@/components/layout/action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ACTIONS, PLACE } from "@/lib/care-copy";
import { useResettingForm } from "@/hooks/useResettingForm.hook";

export function MeasurementForm({
  defaultDate,
  compact = false,
}: {
  defaultDate: string;
  compact?: boolean;
}) {
  const { formRef, state, formAction, isPending } = useResettingForm(saveMeasurement, "weighIn");

  return (
    <form
      ref={formRef}
      action={formAction}
      className={compact ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : "grid gap-4 sm:grid-cols-2 lg:grid-cols-4"}
    >
      <div className="grid gap-2">
        <Label htmlFor="measuredOn">Date</Label>
        <Input id="measuredOn" name="measuredOn" type="date" required defaultValue={defaultDate} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="weightKg">Weight (kg)</Label>
        <Input
          id="weightKg"
          name="weightKg"
          type="number"
          min={0.1}
          step={0.1}
          required
          placeholder={PLACE.weight}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="waistCm">Waist (cm)</Label>
        <Input
          id="waistCm"
          name="waistCm"
          type="number"
          min={0.1}
          step={0.1}
          placeholder={PLACE.waist}
        />
      </div>
      <div className="flex items-end">
        <ActionButton
          type="submit"
          size={compact ? "default" : "lg"}
          icon="activity"
          pending={isPending}
          className="w-full min-w-0 rounded-full"
        >
          {compact ? "Save" : ACTIONS.saveWeighIn}
        </ActionButton>
      </div>
      <div className={compact ? "sm:col-span-2" : "sm:col-span-2 lg:col-span-4"}>
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}

export function ProfileBaselinesForm({
  startWeightKg,
  targetWeightKg,
  startWaistCm,
}: {
  startWeightKg: string | null;
  targetWeightKg: string | null;
  startWaistCm: string | null;
}) {
  const { formRef, state, formAction, isPending } = useResettingForm(saveProfileBaselines, "macros");

  return (
    <form ref={formRef} action={formAction} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div className="grid gap-2">
        <Label htmlFor="startWeightKg">Start weight (kg)</Label>
        <Input
          id="startWeightKg"
          name="startWeightKg"
          type="number"
          min={0.1}
          step={0.1}
          placeholder={PLACE.startWeight}
          defaultValue={startWeightKg ?? undefined}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="targetWeightKg">Target weight (kg)</Label>
        <Input
          id="targetWeightKg"
          name="targetWeightKg"
          type="number"
          min={0.1}
          step={0.1}
          placeholder={PLACE.targetWeight}
          defaultValue={targetWeightKg ?? undefined}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="startWaistCm">Start waist (cm)</Label>
        <Input
          id="startWaistCm"
          name="startWaistCm"
          type="number"
          min={0.1}
          step={0.1}
          placeholder={PLACE.startWaist}
          defaultValue={startWaistCm ?? undefined}
        />
      </div>
      <div className="flex items-end">
        <ActionButton type="submit" size="lg" icon="settings" pending={isPending} className="w-full min-w-36 rounded-full sm:w-auto">
          {ACTIONS.saveBaselines}
        </ActionButton>
      </div>
      <div className="sm:col-span-2 lg:col-span-4">
        <FormError error={state && "error" in state ? state.error : undefined} />
      </div>
    </form>
  );
}
