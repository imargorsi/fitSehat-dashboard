"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { AnimateIcon } from "@/components/icons/animate-icon";

export function CareMoment() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced) {
      return;
    }
    if (sessionStorage.getItem("fitsehat-heart-moment")) {
      return;
    }
    const delay = 14000 + Math.floor(Math.random() * 12000);
    const show = window.setTimeout(() => {
      setVisible(true);
      sessionStorage.setItem("fitsehat-heart-moment", "1");
    }, delay);
    const hide = window.setTimeout(() => setVisible(false), delay + 2800);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [reduced]);

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {visible ? (
          <motion.span
            initial={{ opacity: 0, y: 80, x: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -40, x: 28 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.6, ease: "easeOut" }}
            className="absolute right-[12%] bottom-28 lg:bottom-16"
          >
            <AnimateIcon name="heart" size={40} tone="rose" playOnMount />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
