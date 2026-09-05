"use client";

import { useCallback, useState } from "react";

import { MealOptionForm } from "@/app/(dashboard)/meals/meal-option-form";
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
import { ACTIONS } from "@/lib/app-copy";
import { calorieDialogClass, widgetBodyClass, widgetHeaderClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function MealOptionDialog() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger nativeButton={false} render={<Button className="rounded-full" />}>
        <span className="inline-flex items-center gap-1.5">
          <AnimateIcon name="utensils" size={16} tone="current" playOnMount={false} />
          {ACTIONS.addMeal}
        </span>
      </DialogTrigger>
      <DialogContent showCloseButton className={calorieDialogClass}>
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Meals</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>{ACTIONS.addMeal}</DialogHeading>
            </DialogTitle>
            <DialogDescription>
              Name, type, and macros. Add it to today from the library or Fuel.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div
          className={cn(
            "dashboard-scroll modal-scroll flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-y-auto overscroll-contain pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            widgetBodyClass
          )}
        >
          {open ? <MealOptionForm onSuccess={close} /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
