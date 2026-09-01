"use client";

import { useCallback, useRef, useState } from "react";
import { FlameIcon } from "@animateicons/react/lucide";
import { motion, useReducedMotion } from "motion/react";

import { ACTIONS } from "@/lib/care-copy";
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
import type { IconHandle } from "@animateicons/react";
import { EASE_OUT } from "@/lib/motion";

export function CalorieLogDialog({
  today,
  label = ACTIONS.logMeal,
}: {
  today: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const iconRef = useRef<IconHandle>(null);
  const close = useCallback(() => setOpen(false), []);

  const animate = () => iconRef.current?.startAnimation();
  const stop = () => iconRef.current?.stopAnimation();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        nativeButton={false}
        render={<Button className="w-full rounded-full sm:w-auto" />}
      >
        <span
          className="inline-flex items-center gap-1.5"
          onMouseEnter={animate}
          onMouseLeave={stop}
          onFocus={animate}
          onBlur={stop}
        >
          <FlameIcon ref={iconRef} size={16} duration={0.85} className="text-neon-foreground" />
          {label}
        </span>
      </DialogTrigger>
      <DialogContent
        showCloseButton
        className="flex max-h-[min(90dvh,42rem)] w-[calc(100%-1.25rem)] flex-col gap-0 overflow-hidden rounded-[1.5rem] border border-border bg-card p-0 sm:max-w-lg sm:rounded-[1.75rem]"
      >
        <div className="relative shrink-0 border-b border-border/50 px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
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
            <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Fuel</p>
            <DialogTitle className="font-heading text-2xl">Add your meal here, Guddi</DialogTitle>
            <DialogDescription>One kind plate is enough, Love. Macros can wait.</DialogDescription>
          </DialogHeader>
        </div>
        <div className="dashboard-scroll modal-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:px-6 sm:pb-6">
          <CalorieLogForm today={today} compact onSuccess={close} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
