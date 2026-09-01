import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function WidgetHeader({
  eyebrow,
  title,
  subtitle,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-3 px-5 pt-5 pb-4 sm:px-6 sm:pt-6",
        className
      )}
    >
      <div className="min-w-0 flex-1">
        {eyebrow ? (
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">{eyebrow}</p>
        ) : null}
        <p className={cn("font-heading font-semibold tracking-tight", eyebrow ? "mt-1 text-lg" : "text-lg")}>
          {title}
        </p>
        {subtitle ? <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  );
}
