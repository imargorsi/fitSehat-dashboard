"use client";

import { usePathname } from "next/navigation";

import { dashboardNav } from "@/lib/navigation";

export function ScreenHeading() {
  const pathname = usePathname();
  const current = dashboardNav.find((item) => item.href === pathname);

  if (!current || pathname === "/overview") {
    return null;
  }

  return (
    <div className="mb-8 max-w-3xl sm:mb-10">
      <p className="text-xs tracking-[0.22em] text-muted-foreground uppercase">{current.label}</p>
      <h1 className="font-heading mt-2 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        {current.shortLabel}
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted-foreground sm:mt-3 sm:leading-7 lg:text-base">
        {current.description}
      </p>
    </div>
  );
}
