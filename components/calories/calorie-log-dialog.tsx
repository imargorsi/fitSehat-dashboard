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
import { calorieDialogClass, dialogScrollClass, pillTabsListClass, pillTabsTriggerClass, widgetHeaderClass } from "@/lib/layout";
import type { TSavedMealPick } from "@/lib/meals.utils";
import { cn } from "@/lib/utils";

const tabTriggerClass = cn(
  pillTabsTriggerClass,
  "flex-1",
  "data-active:bg-neon data-active:text-neon-foreground dark:data-active:bg-neon dark:data-active:text-neon-foreground"
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
        <Tabs defaultValue="log" className="flex min-h-0 min-w-0 flex-1 flex-col gap-0 overflow-x-hidden">
          <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
            <DialogHeader className="gap-4 pr-8">
              <div className="grid gap-1.5">
                <Eyebrow>Fuel</Eyebrow>
                <DialogTitle className="border-0 p-0">
                  <DialogHeading>{ACTIONS.logMeal}</DialogHeading>
                </DialogTitle>
                <DialogDescription className="sr-only">{LOOKUP.hint}</DialogDescription>
              </div>
              <TabsList className={cn(pillTabsListClass, "w-full")}>
                <TabsTrigger value="log" className={tabTriggerClass}>
                  {ACTIONS.logMeal}
                </TabsTrigger>
                <TabsTrigger value="saved" className={tabTriggerClass}>
                  {ACTIONS.fromSaved}
                </TabsTrigger>
              </TabsList>
            </DialogHeader>
          </div>
          <div className={dialogScrollClass}>
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
