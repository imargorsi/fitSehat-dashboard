"use client";

import type { ReactNode } from "react";

import { BrandLogo } from "@/components/layout/brand-logo";

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
      <h1 className="font-heading mt-6 text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">{body}</p>
      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}
