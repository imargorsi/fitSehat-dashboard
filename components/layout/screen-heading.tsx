"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { EyebrowAccent, H1, Muted } from "@/components/ui/typography";
import { dashboardNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function ScreenHeading({
  action,
  scene,
}: {
  action?: ReactNode;
  scene?: ReactNode;
}) {
  const pathname = usePathname();
  const current = dashboardNav.find((item) => item.href === pathname);

  if (!current || pathname === "/overview") {
    return null;
  }

  return (
    <header
      className={cn(
        "border-b border-border pb-4 sm:pb-8",
        scene && "overflow-visible"
      )}
    >
      <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-6">
        <div className="min-w-0 flex-1">
          <EyebrowAccent>{current.shortLabel}</EyebrowAccent>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <H1 className="min-w-0">{current.heading}</H1>
            {action ? (
              <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">{action}</div>
            ) : null}
          </div>
          <Muted className="mt-1.5 max-w-2xl text-pretty sm:mt-3">{current.description}</Muted>
        </div>
        {scene}
      </div>
    </header>
  );
}
