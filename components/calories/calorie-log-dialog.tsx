"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { CalorieLogForm } from "@/components/calories/calorie-log-form";
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
import { ACTIONS } from "@/lib/care-copy";
import { widgetBodyClass, widgetHeaderClass } from "@/lib/layout";
import { EASE_OUT } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function CalorieLogDialog({
  today,
  label = ACTIONS.logMeal,
}: {
  today: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const close = useCallback(() => setOpen(false), []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger nativeButton={false} render={<Button className="w-full rounded-full sm:w-auto" />}>
        <span className="inline-flex items-center gap-1.5">
          <AnimateIcon name="flame" size={16} tone="onLove" playOnMount={false} />
          {label}
        </span>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="flex max-h-[min(90dvh,42rem)] w-[calc(100%-1.25rem)] flex-col gap-0 overflow-hidden rounded-[1.5rem] border border-border bg-card p-0 sm:max-w-lg sm:rounded-[1.75rem]"
      >
        <div className={cn("relative shrink-0 border-b border-border/50", widgetHeaderClass, "pb-4")}>
          {!reduced ? (
            <>
              <motion.span
                aria-hidden
                initial={{ opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: [0, 0.55, 0.35], y: [8, 0, -4], scale: 1 }}
                transition={{ duration: 2.4, delay: 0.35, ease: EASE_OUT }}
                className="pointer-events-none absolute top-4 right-14 text-lg text-rose/70"
              >
                ♥
              </motion.span>
              <motion.span
                aria-hidden
                initial={{ opacity: 0, y: 10, scale: 0.7 }}
                animate={{ opacity: [0, 0.45, 0.25], y: [10, 2, -2], scale: 1 }}
                transition={{ duration: 2.8, delay: 0.7, ease: EASE_OUT }}
                className="pointer-events-none absolute top-8 right-24 text-sm text-gold/70"
              >
                ✦
              </motion.span>
            </>
          ) : null}
          <DialogHeader className="gap-1.5 pr-8">
            <Eyebrow>Fuel</Eyebrow>
            <DialogTitle className="border-0 p-0">
              <DialogHeading>Add your meal here, Guddi</DialogHeading>
            </DialogTitle>
            <DialogDescription>One kind plate is enough, Love. Macros can wait.</DialogDescription>
          </DialogHeader>
        </div>
        <div
          className={cn(
            "dashboard-scroll modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
            widgetBodyClass
          )}
        >
          <CalorieLogForm today={today} compact onSuccess={close} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
