import type { ReactNode } from "react";

import { RowSubtitle, RowTitle, RowValue } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

export function SoftRow({
  icon,
  title,
  subtitle,
  value,
  action,
  flush = false,
  className,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: ReactNode;
  value?: ReactNode;
  action?: ReactNode;
  flush?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2 transition-colors sm:gap-3.5",
        flush
          ? "rounded-none px-0 py-3 hover:bg-muted/25 sm:py-3.5"
          : "rounded-[1.35rem] glass-row px-3 py-3 hover:bg-muted/40 sm:px-4 sm:py-4",
        className
      )}
    >
      {icon}
      <div className="min-w-0 flex-1">
        <RowTitle>{title}</RowTitle>
        {subtitle ? (
          <RowSubtitle className="flex min-w-0 items-center gap-1.5">
            {subtitle}
          </RowSubtitle>
        ) : null}
      </div>
      {value ? <RowValue className="max-w-[40%] shrink-0 sm:max-w-none">{value}</RowValue> : null}
      {action}
    </div>
  );
}
