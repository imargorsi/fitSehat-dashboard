"use client";

import { usePathname } from "next/navigation";

import { EyebrowAccent, H1, Muted } from "@/components/ui/typography";
import { dashboardNav } from "@/lib/navigation";

export function ScreenHeading() {
  const pathname = usePathname();
  const current = dashboardNav.find((item) => item.href === pathname);

  if (!current || pathname === "/overview") {
    return null;
  }

  return (
    <div className="mb-8 max-w-3xl sm:mb-10">
      <EyebrowAccent>{current.label}</EyebrowAccent>
      <H1 className="mt-2">{current.shortLabel}</H1>
      <Muted className="mt-2 sm:mt-3">{current.description}</Muted>
    </div>
  );
}
