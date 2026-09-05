"use client";

import { useCallback, useState } from "react";

import { UiIcon } from "@/components/icons/ui-icon";
import {
  MeasurementForm,
  type TMeasurementFormInitial,
} from "@/components/measurements/measurement-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogHeading, Eyebrow } from "@/components/ui/typography";
import { ACTIONS } from "@/lib/app-copy";
import { calorieDialogClass, dialogScrollClass, widgetHeaderClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function CheckInEditDialog({ initial }: { initial: TMeasurementFormInitial }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        nativeButton={false}
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={ACTIONS.edit}
            className="rounded-full text-muted-foreground hover:text-foreground"
          />
        }
      >
        <UiIcon name="pencil" size={14} className="text-current" />
      </DialogTrigger>
      <DialogContent showCloseButton className={calorieDialogClass}>
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Check-in</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>{ACTIONS.saveChanges}</DialogHeading>
            </DialogTitle>
            <DialogDescription>Update this check-in. Your history stays intact.</DialogDescription>
          </DialogHeader>
        </div>
        <div className={dialogScrollClass}>
          {open ? (
            <MeasurementForm
              key={`${initial.id}-${initial.measuredOn}-${initial.weightKg}-${initial.waistCm ?? ""}`}
              defaultDate={initial.measuredOn}
              initial={initial}
              onSuccess={close}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
