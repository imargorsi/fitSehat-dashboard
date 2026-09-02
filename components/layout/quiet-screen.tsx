"use client";

import type { ReactNode } from "react";

import { BrandLogo } from "@/components/layout/brand-logo";
import { LandingHero, Muted } from "@/components/ui/typography";

export function QuietScreen({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <BrandLogo size="mark" float={false} />
      <LandingHero className="mt-6">{title}</LandingHero>
      <Muted className="mt-3 max-w-sm">{body}</Muted>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
