import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function SoftRow({
  icon,
  title,
  subtitle,
  value,
  action,
  className,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  value?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2 rounded-[1.25rem] border border-border/60 bg-muted/25 px-3 py-3 transition-colors hover:bg-muted/40 sm:gap-3.5 sm:px-4 sm:py-4",
        className
      )}
    >
      {icon}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[0.9375rem] font-medium leading-6">{title}</p>
        {subtitle ? <p className="truncate text-sm leading-5 text-muted-foreground">{subtitle}</p> : null}
      </div>
      {value ? <div className="max-w-[40%] shrink-0 text-right text-xs leading-5 sm:max-w-none sm:text-sm">{value}</div> : null}
      {action}
    </div>
  );
}
