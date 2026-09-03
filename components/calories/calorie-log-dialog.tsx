"use client";

import { useCallback, useState } from "react";

import { CalorieLogForm } from "@/components/calories/calorie-log-form";
import { AnimateIcon } from "@/components/icons/animate-icon";
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
import { ACTIONS, LOOKUP } from "@/lib/app-copy";
import { calorieDialogClass, widgetBodyClass, widgetHeaderClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function CalorieLogDialog({
  today,
  label = ACTIONS.logMeal,
  size = "default",
}: {
  today: string;
  label?: string;
  size?: "default" | "sm" | "lg";
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        nativeButton={false}
        render={<Button size={size} className="rounded-full" />}
      >
        <span className="inline-flex items-center gap-1.5">
          <AnimateIcon name="flame" size={16} tone="current" playOnMount={false} />
          {label}
        </span>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className={calorieDialogClass}
      >
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Fuel</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>{ACTIONS.logMeal}</DialogHeading>
            </DialogTitle>
            <DialogDescription>{LOOKUP.hint}</DialogDescription>
          </DialogHeader>
        </div>
        <div
          className={cn(
            "dashboard-scroll modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            widgetBodyClass
          )}
        >
          <CalorieLogForm today={today} compact onSuccess={close} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
