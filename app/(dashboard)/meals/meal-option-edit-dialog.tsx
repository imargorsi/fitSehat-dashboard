"use client";

import { useCallback, useState } from "react";

import { MealOptionForm, type TMealOptionFormInitial } from "@/app/(dashboard)/meals/meal-option-form";
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
import { calorieDialogClass, dialogScrollClass, widgetHeaderClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function MealOptionEditDialog({ initial }: { initial: TMealOptionFormInitial }) {
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
            <Eyebrow>Meals</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>{ACTIONS.saveChanges}</DialogHeading>
            </DialogTitle>
            <DialogDescription>Update name, type, and macros. Quick add will use the new values.</DialogDescription>
          </DialogHeader>
        </div>
        <div className={cn(dialogScrollClass, "flex w-full flex-col")}>
          {open ? (
            <MealOptionForm
              key={`${initial.id}-${initial.name}-${initial.calories}-${initial.mealType}`}
              initial={initial}
              onSuccess={close}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
