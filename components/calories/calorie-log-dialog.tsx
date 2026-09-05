"use client";

import { useCallback, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { CalorieLogForm } from "@/components/calories/calorie-log-form";
import { CalorieSavedMeals } from "@/components/calories/calorie-saved-meals";
import { FitSehatAiPanel } from "@/components/calories/fitsehat-ai-panel";
import { AnimateIcon } from "@/components/icons/animate-icon";
import { UiIcon } from "@/components/icons/ui-icon";
import type { TAppIconName } from "@/components/icons/app-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogHeading, Eyebrow } from "@/components/ui/typography";
import { ACTIONS, AI, LOOKUP } from "@/lib/app-copy";
import {
  calorieDialogClass,
  dialogPanelClass,
  dialogScrollClass,
  pillTabsListClass,
  pillTabsTriggerClass,
  widgetHeaderClass,
} from "@/lib/layout";
import type { TSavedMealPick } from "@/lib/meals.utils";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TLogMealTab = "search" | "saved" | "ai";

const tabTriggerClass = cn(
  pillTabsTriggerClass,
  "data-active:bg-neon data-active:text-neon-foreground dark:data-active:bg-neon dark:data-active:text-neon-foreground"
);

const TABS: { value: TLogMealTab; short: string; full: string; icon: TAppIconName; hint: string }[] = [
  { value: "search", short: "Search", full: AI.searchTitle, icon: "search", hint: LOOKUP.prompt },
  { value: "saved", short: "Saved", full: AI.savedTitle, icon: "utensils", hint: LOOKUP.saved },
  { value: "ai", short: "AI", full: AI.name, icon: "sparkles", hint: AI.hint },
];

function TabPanel({ tab, children }: { tab: TLogMealTab; children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={tab}
      className={dialogPanelClass}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.22, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

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
  const [tab, setTab] = useState<TLogMealTab>("search");
  const close = useCallback(() => setOpen(false), []);
  const active = TABS.find((item) => item.value === tab) ?? TABS[0];

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      setTab("search");
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger nativeButton={true} render={<Button size={size} className="rounded-full" />}>
        <span className="inline-flex items-center gap-1.5">
          <AnimateIcon name="flame" size={16} tone="current" playOnMount={false} />
          {label}
        </span>
      </DialogTrigger>
      <DialogContent showCloseButton className={calorieDialogClass}>
        <Tabs
          value={tab}
          onValueChange={(value) => {
            if (value === "search" || value === "saved" || value === "ai") {
              setTab(value);
            }
          }}
          className="flex min-h-0 min-w-0 flex-1 flex-col gap-0 overflow-hidden"
        >
          <div className={cn("relative shrink-0", widgetHeaderClass, "pb-3")}>
            <DialogHeader className="gap-4 pr-8">
              <div className="grid min-w-0 gap-1.5">
                <Eyebrow>Fuel</Eyebrow>
                <DialogTitle className="border-0 p-0">
                  <DialogHeading>{ACTIONS.logMeal}</DialogHeading>
                </DialogTitle>
              </div>
              <TabsList className={pillTabsListClass}>
                {TABS.map((item) => (
                  <TabsTrigger key={item.value} value={item.value} className={tabTriggerClass}>
                    <UiIcon name={item.icon} size={14} className="hidden text-current md:block" />
                    <span className="truncate sm:hidden">{item.short}</span>
                    <span className="hidden truncate sm:inline">{item.full}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <DialogDescription className="flex items-center gap-2 text-pretty">
                <UiIcon name={active.icon} size={16} className="text-muted-foreground" />
                {active.hint}
              </DialogDescription>
            </DialogHeader>
          </div>
          {tab === "search" && open ? (
            <TabPanel tab="search">
              <CalorieLogForm today={today} compact onSuccess={close} />
            </TabPanel>
          ) : null}
          {tab === "saved" && open ? (
            <TabPanel tab="saved">
              <div className={dialogScrollClass}>
                <CalorieSavedMeals today={today} meals={meals} onSuccess={close} />
              </div>
            </TabPanel>
          ) : null}
          {tab === "ai" && open ? (
            <TabPanel tab="ai">
              <FitSehatAiPanel today={today} onSuccess={close} />
            </TabPanel>
          ) : null}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
