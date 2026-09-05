"use client";

import { useCallback, useState } from "react";

import { CalorieLogForm } from "@/components/calories/calorie-log-form";
import { CalorieSavedMeals } from "@/components/calories/calorie-saved-meals";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogHeading, Eyebrow, Muted } from "@/components/ui/typography";
import { ACTIONS, LOOKUP } from "@/lib/app-copy";
import { calorieDialogClass, widgetBodyClass, widgetHeaderClass } from "@/lib/layout";
import type { TSavedMealPick } from "@/lib/meals.utils";
import { cn } from "@/lib/utils";

const tabTriggerClass = cn(
  "h-9 min-h-0 flex-1 rounded-full bg-transparent px-3 text-sm font-medium text-muted-foreground shadow-none after:hidden after:content-none",
  "hover:text-foreground data-active:bg-neon data-active:text-neon-foreground data-active:shadow-none",
  "dark:data-active:bg-neon dark:data-active:text-neon-foreground dark:data-active:border-transparent"
);

export function CalorieLogDialog({
  today,
  meals,
  label = ACTIONS.logMeal,
  size = "default",
}: {
  today: string;
  meals: TSavedMealPick[];
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
      <DialogContent showCloseButton className={calorieDialogClass}>
        <Tabs defaultValue="log" className="flex min-h-0 flex-1 flex-col gap-0">
          <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
            <DialogHeader className="gap-4 pr-8">
              <div className="grid gap-1.5">
                <Eyebrow>Fuel</Eyebrow>
                <DialogTitle className="border-0 p-0">
                  <DialogHeading>{ACTIONS.logMeal}</DialogHeading>
                </DialogTitle>
                <DialogDescription className="sr-only">{LOOKUP.hint}</DialogDescription>
              </div>
              <TabsList className="flex h-12 w-full items-center gap-1 rounded-full border border-border bg-muted/40 p-1.5 group-data-horizontal/tabs:h-12">
                <TabsTrigger value="log" className={tabTriggerClass}>
                  {ACTIONS.logMeal}
                </TabsTrigger>
                <TabsTrigger value="saved" className={tabTriggerClass}>
                  {ACTIONS.fromSaved}
                </TabsTrigger>
              </TabsList>
            </DialogHeader>
          </div>
          <div
            className={cn(
              "dashboard-scroll modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
              widgetBodyClass
            )}
          >
            <TabsContent value="log" className="outline-none">
              <Muted className="mb-4">{LOOKUP.hint}</Muted>
              {open ? <CalorieLogForm today={today} compact onSuccess={close} /> : null}
            </TabsContent>
            <TabsContent value="saved" className="outline-none">
              {open ? <CalorieSavedMeals today={today} meals={meals} onSuccess={close} /> : null}
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
