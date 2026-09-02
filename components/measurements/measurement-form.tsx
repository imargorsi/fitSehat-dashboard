"use client";

import { saveMeasurement, saveProfileBaselines } from "@/app/(dashboard)/measurements/actions";
import {
  FormErrorRow,
  FormField,
  FormGrid,
  FormSubmitRow,
} from "@/components/layout/form-field";
import { FormError } from "@/components/layout/form-error";
import { ActionButton } from "@/components/layout/action-button";
import { DateInput, NumberInput } from "@/components/ui/form-controls";
import { ACTIONS, PLACE } from "@/lib/app-copy";
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
      className={compact ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : undefined}
    >
      {compact ? (
        <>
          <FormField label="Date" htmlFor="measuredOn">
            <DateInput id="measuredOn" name="measuredOn" required defaultValue={defaultDate} />
          </FormField>
          <FormField label="Weight (kg)" htmlFor="weightKg">
            <NumberInput
              id="weightKg"
              name="weightKg"
              min={0.1}
              step={0.1}
              required
              placeholder={PLACE.weight}
            />
          </FormField>
          <FormField label="Waist (cm)" htmlFor="waistCm">
            <NumberInput
              id="waistCm"
              name="waistCm"
              min={0.1}
              step={0.1}
              placeholder={PLACE.waist}
            />
          </FormField>
          <div className="flex items-end">
            <ActionButton type="submit" icon="activity" pending={isPending} className="w-full min-w-0 rounded-full">
              Save
            </ActionButton>
          </div>
          <div className="sm:col-span-2">
            <FormError error={state && "error" in state ? state.error : undefined} />
          </div>
        </>
      ) : (
        <FormGrid>
          <FormField label="Date" htmlFor="measuredOn">
            <DateInput id="measuredOn" name="measuredOn" required defaultValue={defaultDate} />
          </FormField>
          <FormField label="Weight (kg)" htmlFor="weightKg">
            <NumberInput
              id="weightKg"
              name="weightKg"
              min={0.1}
              step={0.1}
              required
              placeholder={PLACE.weight}
            />
          </FormField>
          <FormField label="Waist (cm)" htmlFor="waistCm">
            <NumberInput id="waistCm" name="waistCm" min={0.1} step={0.1} placeholder={PLACE.waist} />
          </FormField>
          <FormSubmitRow>
            <ActionButton type="submit" size="lg" icon="activity" pending={isPending} className="w-full min-w-0 rounded-full">
              {ACTIONS.saveWeighIn}
            </ActionButton>
          </FormSubmitRow>
          <FormErrorRow>
            <FormError error={state && "error" in state ? state.error : undefined} />
          </FormErrorRow>
        </FormGrid>
      )}
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
    <form ref={formRef} action={formAction}>
      <FormGrid>
        <FormField label="Start weight (kg)" htmlFor="startWeightKg">
          <NumberInput
            id="startWeightKg"
            name="startWeightKg"
            min={0.1}
            step={0.1}
            placeholder={PLACE.startWeight}
            defaultValue={startWeightKg ?? undefined}
          />
        </FormField>
        <FormField label="Target weight (kg)" htmlFor="targetWeightKg">
          <NumberInput
            id="targetWeightKg"
            name="targetWeightKg"
            min={0.1}
            step={0.1}
            placeholder={PLACE.targetWeight}
            defaultValue={targetWeightKg ?? undefined}
          />
        </FormField>
        <FormField label="Start waist (cm)" htmlFor="startWaistCm">
          <NumberInput
            id="startWaistCm"
            name="startWaistCm"
            min={0.1}
            step={0.1}
            placeholder={PLACE.startWaist}
            defaultValue={startWaistCm ?? undefined}
          />
        </FormField>
        <FormSubmitRow>
          <ActionButton type="submit" size="lg" icon="settings" pending={isPending} className="w-full min-w-36 rounded-full sm:w-auto">
            {ACTIONS.saveBaselines}
          </ActionButton>
        </FormSubmitRow>
        <FormErrorRow>
          <FormError error={state && "error" in state ? state.error : undefined} />
        </FormErrorRow>
      </FormGrid>
    </form>
  );
}
