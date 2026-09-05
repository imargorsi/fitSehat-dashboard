"use client";

import { useCallback } from "react";

import { AnimateIcon } from "@/components/icons/animate-icon";
import { WalkSlider } from "@/components/walk/walk-slider";
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
import { formatMediumDate } from "@/lib/date.utils";
import { calorieDialogClass, dialogScrollClass, widgetHeaderClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function WalkLogDialog({
  today,
  walkedOn,
  goal,
  initialSteps,
  open,
  onOpenChange,
  onTrigger,
}: {
  today: string;
  walkedOn: string;
  goal: number;
  initialSteps: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onTrigger?: () => void;
}) {
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const isToday = walkedOn === today;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger
        nativeButton={false}
        render={<Button className="rounded-full" />}
        onClick={onTrigger}
      >
        <span className="inline-flex items-center gap-1.5">
          <AnimateIcon name="footprints" size={16} tone="current" playOnMount={false} />
          {ACTIONS.logWalk}
        </span>
      </DialogTrigger>
      <DialogContent showCloseButton className={calorieDialogClass}>
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Move</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>{initialSteps > 0 ? ACTIONS.saveChanges : ACTIONS.logWalk}</DialogHeading>
            </DialogTitle>
            <DialogDescription>
              {isToday
                ? "Slide to the steps you took today. Presets jump to a common total."
                : `Update ${formatMediumDate(walkedOn)}. Slide to set steps for that day.`}
            </DialogDescription>
          </DialogHeader>
        </div>
        <div className={dialogScrollClass}>
          {open ? (
            <WalkSlider
              key={`${walkedOn}-${initialSteps}-${goal}`}
              walkedOn={walkedOn}
              today={today}
              goal={goal}
              initialSteps={initialSteps}
              onSuccess={close}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
