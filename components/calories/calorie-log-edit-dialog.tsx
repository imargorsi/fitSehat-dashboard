"use client";

import { useCallback, useState } from "react";

import { CalorieLogForm, type TCalorieLogFormInitial } from "@/components/calories/calorie-log-form";
import { UiIcon } from "@/components/icons/ui-icon";
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
import { calorieDialogClass, widgetBodyClass, widgetHeaderClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function CalorieLogEditDialog({
  today,
  initial,
  compact = false,
}: {
  today: string;
  initial: TCalorieLogFormInitial;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        nativeButton={false}
        render={
          <Button
            variant={compact ? "ghost" : "outline"}
            size={compact ? "icon" : "sm"}
            aria-label={ACTIONS.edit}
            className="rounded-full text-muted-foreground hover:text-foreground"
          />
        }
      >
        <UiIcon name="pencil" size={14} className="text-current" />
        {compact ? null : ACTIONS.edit}
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className={calorieDialogClass}
      >
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Fuel</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>{ACTIONS.saveChanges}</DialogHeading>
            </DialogTitle>
            <DialogDescription>Update this entry. Your history stays intact.</DialogDescription>
          </DialogHeader>
        </div>
        <div
          className={cn(
            "dashboard-scroll modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            widgetBodyClass
          )}
        >
          {open ? (
            <CalorieLogForm
              key={`${initial.id}-${initial.loggedOn}-${initial.calories}-${initial.item}`}
              today={today}
              compact
              initial={initial}
              onSuccess={close}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
