import type { ReactNode } from "react";

import { Eyebrow, H3, Muted } from "@/components/ui/typography";
import { widgetBodyClass, widgetFooterClass, widgetHeaderClass } from "@/lib/layout";
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
    <div className={cn("flex items-start justify-between gap-3", widgetHeaderClass, className)}>
      <div className="min-w-0 flex-1">
        {eyebrow ? <Eyebrow className={cn(!subtitle && "mb-0")}>{eyebrow}</Eyebrow> : null}
        <H3 className={cn(eyebrow && "mt-1")}>{title}</H3>
        {subtitle ? <Muted className="mt-0.5">{subtitle}</Muted> : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-end">
          {actions}
        </div>
      ) : null}
    </div>
  );
}

export function WidgetBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("min-w-0 flex-1", widgetBodyClass, className)}>{children}</div>;
}

export function WidgetFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(widgetFooterClass, className)}>{children}</div>;
}
