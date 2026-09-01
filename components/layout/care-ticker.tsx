"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { AnimateIcon } from "@/components/icons/animate-icon";

import { CARE_NOTES, nextCareNoteIndex, personalizeNote } from "@/lib/care-notes";
import { cn } from "@/lib/utils";

export function CareTicker({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => nextCareNoteIndex(current, CARE_NOTES.length));
    }, 8000);
    return () => window.clearInterval(id);
  }, []);

  const text = personalizeNote(CARE_NOTES[index] ?? CARE_NOTES[0], name);

  return (
    <div className={cn("flex min-w-0 items-center gap-2 overflow-hidden", className)}>
      <AnimateIcon name="heart" size={24} tone="rose" playOnMount />
      <div className="relative h-8 min-w-0 flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={reduced ? false : { y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: -10, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="truncate text-sm text-muted-foreground"
          >
            {text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
