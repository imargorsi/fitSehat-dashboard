"use client";

import { useCallback, useState } from "react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { WalkGoalForm } from "@/components/walk/walk-goal-form";
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

export function WalkGoalDialog({ goal }: { goal: number }) {
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
          {ACTIONS.dailyGoal}
        </span>
      </DialogTrigger>
      <DialogContent showCloseButton className={calorieDialogClass}>
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Move</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>Daily step goal</DialogHeading>
            </DialogTitle>
            <DialogDescription>
              Currently {formatInt(goal)} steps a day. Change it whenever your pace shifts.
            </DialogDescription>
          </DialogHeader>
        </div>
        <div
          className={cn(
            "dashboard-scroll modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            widgetBodyClass
          )}
        >
          {open ? <WalkGoalForm key={goal} goal={goal} onSuccess={close} /> : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
