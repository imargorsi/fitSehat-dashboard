"use client";

import { type PointerEvent, type ReactNode, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { PageFade } from "@/components/layout/page-fade";
import { ScreenHeading } from "@/components/layout/screen-heading";
import { useSmoothScroll } from "@/hooks/useSmoothScroll.hook";

const GLOW_SPRING = { stiffness: 90, damping: 26, mass: 0.35 };

export function DashboardStage({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const x = useMotionValue(50);
  const y = useMotionValue(18);
  const xSpring = useSpring(x, GLOW_SPRING);
  const ySpring = useSpring(y, GLOW_SPRING);
  const glow = useMotionTemplate`radial-gradient(26rem circle at ${xSpring}% ${ySpring}%, var(--cursor-glow), transparent 70%)`;

  useSmoothScroll(ref, !reduced, pathname);

  function onMove(event: PointerEvent<HTMLElement>) {
    if (reduced || event.pointerType === "touch") {
      return;
    }
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }
    x.set(((event.clientX - rect.left) / rect.width) * 100);
    y.set(((event.clientY - rect.top) / rect.height) * 100);
  }

  return (
    <main
      ref={ref}
      onPointerMove={onMove}
      className="dashboard-scroll relative min-h-0 flex-1 overflow-x-clip overflow-y-auto overscroll-y-contain px-4 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[calc(6.75rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8 lg:pt-[calc(6.5rem+env(safe-area-inset-top))] lg:pb-12"
    >
      {reduced ? null : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: glow }}
        />
      )}
      <div className="relative z-10 mx-auto w-full max-w-[120rem]">
        <PageFade>
          <ScreenHeading />
          {children}
        </PageFade>
      </div>
    </main>
  );
}
