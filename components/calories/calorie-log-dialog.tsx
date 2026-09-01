"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { CalorieLogForm } from "@/components/calories/calorie-log-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CalorieLogDialog({
  today,
  label = "Log meal",
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
        {label}
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="max-h-[min(90dvh,40rem)] w-[calc(100%-1.25rem)] overflow-y-auto rounded-[1.5rem] border border-border bg-card p-0 sm:max-w-lg sm:rounded-[1.75rem]"
      >
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-5 p-5 sm:p-6"
        >
          <DialogHeader className="gap-1.5 pr-8">
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Fuel</p>
            <DialogTitle className="font-heading text-2xl">Log a meal</DialogTitle>
            <DialogDescription>One kind entry is enough. Macros can wait.</DialogDescription>
          </DialogHeader>
          <CalorieLogForm today={today} compact onSuccess={close} />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
