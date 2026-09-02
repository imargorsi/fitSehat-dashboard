"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Quote, Span } from "@/components/ui/typography";
import { nextCareNoteIndex } from "@/lib/care-notes";
import { EASE_OUT } from "@/lib/motion";
import { splitQuoteHighlight } from "@/lib/quote.utils";

const QUOTE_CYCLE_MS = 7000;

export function HeroQuoteRotator({
  quotes,
  className,
}: {
  quotes: readonly string[];
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (quotes.length <= 1) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((current) => nextCareNoteIndex(current, quotes.length));
    }, QUOTE_CYCLE_MS);
    return () => window.clearInterval(id);
  }, [quotes.length]);

  const quote = quotes[index] ?? quotes[0] ?? "";
  const { lead, accent } = splitQuoteHighlight(quote);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? undefined : { opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <Quote className={className}>
          <Span>{lead}</Span>
          {accent ? <Span className="text-neon"> {accent}</Span> : null}
        </Quote>
      </motion.div>
    </AnimatePresence>
  );
}
