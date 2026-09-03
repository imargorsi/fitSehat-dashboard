"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import { EyebrowAccent, H1, Muted } from "@/components/ui/typography";
import { dashboardNav } from "@/lib/navigation";

export function ScreenHeading({ action }: { action?: ReactNode }) {
  const pathname = usePathname();
  const current = dashboardNav.find((item) => item.href === pathname);

  if (!current || pathname === "/overview") {
    return null;
  }

  return (
    <header className="mb-8 border-b border-border pb-6 sm:mb-10 sm:pb-8">
      <EyebrowAccent>{current.label}</EyebrowAccent>
      <div className="mt-2 flex items-center justify-between gap-4">
        <H1 className="min-w-0">{current.shortLabel}</H1>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      <Muted className="mt-2 max-w-2xl sm:mt-3">{current.description}</Muted>
    </header>
  );
}
