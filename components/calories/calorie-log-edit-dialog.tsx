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
import { widgetBodyClass, widgetHeaderClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function CalorieLogEditDialog({
  today,
  initial,
}: {
  today: string;
  initial: TCalorieLogFormInitial;
}) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger nativeButton={false} render={<Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" />}>
        <UiIcon name="list" size={14} className="text-current" />
        {ACTIONS.edit}
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="flex max-h-[min(90dvh,42rem)] w-[calc(100%-1.25rem)] flex-col gap-0 overflow-hidden rounded-[1.5rem] border border-border bg-card p-0 sm:max-w-lg sm:rounded-[1.75rem]"
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
