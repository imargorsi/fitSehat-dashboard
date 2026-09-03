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
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <GlassCard className="flex flex-col">
      <div className={cn("flex flex-col gap-4 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 lg:pt-7", widgetInsetClass, "pt-5 sm:pt-6 lg:px-7")}>
        <div className="min-w-0">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <H2 className={cn(eyebrow && "mt-2")}>{title}</H2>
          {description ? <Muted className="mt-1.5 max-w-xl">{description}</Muted> : null}
        </div>
        {action ? <div className="w-full shrink-0 sm:w-auto sm:self-start">{action}</div> : null}
      </div>
      <div className={cn(widgetInsetClass, "pb-5 sm:pb-6 lg:px-7 lg:pb-7")}>{children}</div>
    </GlassCard>
  );
}
