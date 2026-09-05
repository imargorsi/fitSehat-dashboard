"use client";

import { useCallback, useState } from "react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { MeasurementForm } from "@/components/measurements/measurement-form";
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

export function CheckInDialog({ defaultDate }: { defaultDate: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger nativeButton={false} render={<Button className="rounded-full" />}>
        <span className="inline-flex items-center gap-1.5">
          <AnimateIcon name="activity" size={16} tone="current" playOnMount={false} />
          {ACTIONS.checkIn}
        </span>
      </DialogTrigger>
      <DialogContent showCloseButton className={calorieDialogClass}>
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Check-in</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>{ACTIONS.checkIn}</DialogHeading>
            </DialogTitle>
            <DialogDescription>Any day works. Saving the same date updates that entry.</DialogDescription>
          </DialogHeader>
        </div>
        <div className={dialogScrollClass}>
          {open ? <MeasurementForm defaultDate={defaultDate} onSuccess={close} /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
