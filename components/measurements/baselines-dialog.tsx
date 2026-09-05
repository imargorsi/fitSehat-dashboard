"use client";

import { useCallback, useState } from "react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { ProfileBaselinesForm } from "@/components/measurements/measurement-form";
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

export function BaselinesDialog({
  startWeightKg,
  targetWeightKg,
  startWaistCm,
}: {
  startWeightKg: string | null;
  targetWeightKg: string | null;
  startWaistCm: string | null;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        nativeButton={false}
        render={<Button variant="outline" className="rounded-full" />}
      >
        <span className="inline-flex items-center gap-1.5">
          <AnimateIcon name="settings" size={16} tone="muted" playOnMount={false} />
          {ACTIONS.baselines}
        </span>
      </DialogTrigger>
      <DialogContent showCloseButton className={calorieDialogClass}>
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Check-in</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>Starting values</DialogHeading>
            </DialogTitle>
            <DialogDescription>
              Progress is calculated from these baselines. Update them when you reset your goals.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className={dialogScrollClass}>
          {open ? (
            <ProfileBaselinesForm
              key={`${startWeightKg}-${targetWeightKg}-${startWaistCm}`}
              startWeightKg={startWeightKg}
              targetWeightKg={targetWeightKg}
              startWaistCm={startWaistCm}
              onSuccess={close}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
