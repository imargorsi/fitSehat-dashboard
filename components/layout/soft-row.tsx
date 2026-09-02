import type { ReactNode } from "react";

import { RowSubtitle, RowTitle, RowValue } from "@/components/ui/typography";
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
        <RowTitle>{title}</RowTitle>
        {subtitle ? <RowSubtitle>{subtitle}</RowSubtitle> : null}
      </div>
      {value ? <RowValue className="max-w-[40%] shrink-0 sm:max-w-none">{value}</RowValue> : null}
      {action}
    </div>
  );
}
