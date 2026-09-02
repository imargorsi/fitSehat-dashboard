"use client";

import { useEffect, useState } from "react";

/** True when the dashboard stage has scrolled past `threshold` px. */
export function useDashboardScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.querySelector<HTMLElement>(".dashboard-scroll");
    if (!el) {
      return;
    }

    const update = () => {
      setScrolled(el.scrollTop > threshold);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, [threshold]);

  return scrolled;
}
