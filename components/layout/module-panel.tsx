import type { ReactNode } from "react";

import { GlassCard } from "@/components/layout/glass-card";
import { Eyebrow, H2, Muted } from "@/components/ui/typography";
import { widgetInsetClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

export function ModulePanel({
  eyebrow,
  title,
  description,
  action,
  icon,
  hideIconOnMobile = false,
  magic = true,
  bordered = true,
  children,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  hideIconOnMobile?: boolean;
  magic?: boolean;
  bordered?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <GlassCard
      magic={magic}
      bordered={bordered}
      className={cn("flex h-full min-w-0 flex-col overflow-x-clip", className)}
    >
      <div
        className={cn(
          "flex pb-4",
          icon
            ? "flex-wrap items-center gap-3 overflow-visible sm:gap-5"
            : "flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4",
          widgetInsetClass,
          "pt-5 sm:pt-6 lg:px-7 lg:pt-7"
        )}
      >
        {icon ? (
          <div className={cn("shrink-0", hideIconOnMobile && "hidden sm:block")}>{icon}</div>
        ) : null}
        <div className="min-w-0 flex-1">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <H2 className={cn(eyebrow && "mt-2")}>{title}</H2>
          {description ? <Muted className="mt-1.5 max-w-xl">{description}</Muted> : null}
        </div>
        {action ? <div className="w-full shrink-0 lg:w-auto lg:self-start">{action}</div> : null}
      </div>
      <div className={cn("flex min-h-0 flex-1 flex-col", widgetInsetClass, "pb-5 sm:pb-6 lg:px-7 lg:pb-7")}>
        {children}
      </div>
    </GlassCard>
  );
}
