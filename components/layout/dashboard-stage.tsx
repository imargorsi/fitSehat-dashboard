"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";

import { PageFade } from "@/components/layout/page-fade";
import { useSmoothScroll } from "@/hooks/useSmoothScroll.hook";
import { cn } from "@/lib/utils";

export function DashboardStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const isToday = pathname === "/overview";

  useSmoothScroll(ref, !reduced, pathname);

  return (
    <main
      ref={ref}
      className={cn(
        "dashboard-scroll relative min-h-0 w-full min-w-0 flex-1 overflow-x-clip overflow-y-auto overscroll-y-contain px-4 sm:px-6 lg:px-8",
        isToday
          ? "flex flex-col pt-[max(0.5rem,env(safe-area-inset-top))] pb-[calc(6.25rem+env(safe-area-inset-bottom))] lg:pt-5 lg:pb-6"
          : "pt-[max(1rem,env(safe-area-inset-top))] pb-[calc(6.25rem+env(safe-area-inset-bottom))] lg:pt-8 lg:pb-12"
      )}
    >
      <div
        className={cn(
          "relative z-10 mx-auto w-full min-w-0 max-w-[120rem]",
          isToday && "flex min-h-0 flex-1 flex-col"
        )}
      >
        <PageFade className={isToday ? "flex min-h-0 flex-1 flex-col" : undefined}>
          {children}
        </PageFade>
      </div>
    </main>
  );
}
