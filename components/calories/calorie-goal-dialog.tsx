"use client";

import { useCallback, useState } from "react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { CalorieGoalForm } from "@/components/calories/calorie-goal-form";
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
import { formatInt } from "@/lib/number.utils";
import { calorieDialogClass, widgetBodyClass, widgetHeaderClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function CalorieGoalDialog({
  targetCalories,
  proteinTargetG,
}: {
  targetCalories: number | null;
  proteinTargetG: number | null;
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
          {ACTIONS.calorieTarget}
        </span>
      </DialogTrigger>
      <DialogContent showCloseButton className={calorieDialogClass}>
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Fuel</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>Daily calorie target</DialogHeading>
            </DialogTitle>
            <DialogDescription>
              {targetCalories != null
                ? `Currently ${formatInt(targetCalories)} kcal a day. Change it whenever your fuel needs shift.`
                : "Set a daily calorie target. Remaining calories and the week chart use this number."}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div
          className={cn(
            "dashboard-scroll modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            widgetBodyClass
          )}
        >
          {open ? (
            <CalorieGoalForm
              key={`${targetCalories}-${proteinTargetG}`}
              targetCalories={targetCalories}
              proteinTargetG={proteinTargetG}
              onSuccess={close}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
