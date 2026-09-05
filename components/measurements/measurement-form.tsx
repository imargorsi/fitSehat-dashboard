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
import { DateInput, HiddenInput, NumberInput } from "@/components/ui/form-controls";
import { ACTIONS, PLACE } from "@/lib/app-copy";
import { useResettingForm } from "@/hooks/useResettingForm.hook";

export type TMeasurementFormInitial = {
  id: string;
  measuredOn: string;
  weightKg: string | number;
  waistCm?: string | number | null;
};

export function MeasurementForm({
  defaultDate,
  compact = false,
  initial,
  onSuccess,
}: {
  defaultDate: string;
  compact?: boolean;
  initial?: TMeasurementFormInitial;
  onSuccess?: () => void;
}) {
  const isEdit = Boolean(initial?.id);
  const { formRef, state, formAction, isPending } = useResettingForm(
    saveMeasurement,
    isEdit ? "updated" : "weighIn",
    onSuccess,
    !isEdit
  );
  const measuredOn = initial?.measuredOn ?? defaultDate;
  const submitLabel = isEdit ? ACTIONS.saveChanges : compact ? ACTIONS.saveCompact : ACTIONS.saveWeighIn;

  return (
    <form
      ref={formRef}
      action={formAction}
      className={compact ? "grid min-w-0 grid-cols-1 gap-3 overflow-x-hidden sm:grid-cols-2" : "min-w-0 overflow-x-hidden"}
    >
      {isEdit ? <HiddenInput name="id" value={initial!.id} /> : null}
      {compact ? (
        <>
          <FormField label="Date" htmlFor="measuredOn">
            <DateInput id="measuredOn" name="measuredOn" required defaultValue={measuredOn} />
          </FormField>
          <FormField label="Weight (kg)" htmlFor="weightKg">
            <NumberInput
              id="weightKg"
              name="weightKg"
              min={0.1}
              step={0.1}
              required
              placeholder={PLACE.weight}
              defaultValue={initial?.weightKg != null ? String(initial.weightKg) : undefined}
            />
          </FormField>
          <FormField label="Waist (cm)" htmlFor="waistCm">
            <NumberInput
              id="waistCm"
              name="waistCm"
              min={0.1}
              step={0.1}
              placeholder={PLACE.waist}
              defaultValue={initial?.waistCm != null ? String(initial.waistCm) : undefined}
            />
          </FormField>
          <div className="flex items-end">
            <ActionButton type="submit" icon="activity" pending={isPending} className="w-full min-w-0 rounded-full">
              {submitLabel}
            </ActionButton>
          </div>
          <div className="sm:col-span-2">
            <FormError error={state && "error" in state ? state.error : undefined} />
          </div>
        </>
      ) : (
        <FormGrid className="lg:grid-cols-2">
          <FormField label="Date" htmlFor="measuredOn">
            <DateInput id="measuredOn" name="measuredOn" required defaultValue={measuredOn} />
          </FormField>
          <FormField label="Weight (kg)" htmlFor="weightKg">
            <NumberInput
              id="weightKg"
              name="weightKg"
              min={0.1}
              step={0.1}
              required
              placeholder={PLACE.weight}
              defaultValue={initial?.weightKg != null ? String(initial.weightKg) : undefined}
            />
          </FormField>
          <FormField label="Waist (cm)" htmlFor="waistCm" className="sm:col-span-2">
            <NumberInput
              id="waistCm"
              name="waistCm"
              min={0.1}
              step={0.1}
              placeholder={PLACE.waist}
              defaultValue={initial?.waistCm != null ? String(initial.waistCm) : undefined}
            />
          </FormField>
          <FormSubmitRow className="lg:col-span-2">
            <ActionButton type="submit" size="lg" icon="activity" pending={isPending} className="w-full min-w-0 rounded-full">
              {submitLabel}
            </ActionButton>
          </FormSubmitRow>
          <FormErrorRow className="lg:col-span-2">
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
  onSuccess,
}: {
  startWeightKg: string | null;
  targetWeightKg: string | null;
  startWaistCm: string | null;
  onSuccess?: () => void;
}) {
  const { formRef, state, formAction, isPending } = useResettingForm(
    saveProfileBaselines,
    "baselines",
    onSuccess,
    false
  );

  return (
    <form ref={formRef} action={formAction}>
      <FormGrid className="lg:grid-cols-2">
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
        <FormField label="Start waist (cm)" htmlFor="startWaistCm" className="sm:col-span-2">
          <NumberInput
            id="startWaistCm"
            name="startWaistCm"
            min={0.1}
            step={0.1}
            placeholder={PLACE.startWaist}
            defaultValue={startWaistCm ?? undefined}
          />
        </FormField>
        <FormSubmitRow className="lg:col-span-2">
          <ActionButton type="submit" size="lg" icon="settings" pending={isPending} className="w-full min-w-0 rounded-full">
            {ACTIONS.saveBaselines}
          </ActionButton>
        </FormSubmitRow>
        <FormErrorRow className="lg:col-span-2">
          <FormError error={state && "error" in state ? state.error : undefined} />
        </FormErrorRow>
      </FormGrid>
    </form>
  );
}
