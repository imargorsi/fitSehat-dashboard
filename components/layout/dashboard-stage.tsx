"use client";

import { useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";

import { PageFade } from "@/components/layout/page-fade";
import { useSmoothScroll } from "@/hooks/useSmoothScroll.hook";

export function DashboardStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();

  useSmoothScroll(ref, !reduced, pathname);

  return (
    <main
      ref={ref}
      className="dashboard-scroll relative min-h-0 flex-1 overflow-x-clip overflow-y-auto overscroll-y-contain px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[calc(6.75rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8 lg:pt-8 lg:pb-12"
    >
      <div className="relative z-10 mx-auto w-full max-w-[120rem]">
        <PageFade>{children}</PageFade>
      </div>
    </main>
  );
}
