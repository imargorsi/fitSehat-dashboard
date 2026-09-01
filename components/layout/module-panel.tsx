import type { ReactNode } from "react";

import { GlassCard } from "@/components/layout/glass-card";
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
    <GlassCard className="flex flex-col" tilt={false}>
      <div className="flex flex-col gap-4 px-5 pt-5 pb-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4 sm:px-6 sm:pt-6 lg:px-7 lg:pt-7">
        <div className="min-w-0">
          {eyebrow ? (
            <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">{eyebrow}</p>
          ) : null}
          <h2
            className={cn(
              "font-heading text-xl font-semibold tracking-tight lg:text-2xl",
              eyebrow && "mt-2"
            )}
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action ? <div className="w-full shrink-0 sm:w-auto sm:self-start">{action}</div> : null}
      </div>
      <div className="px-5 pb-5 sm:px-6 sm:pb-6 lg:px-7 lg:pb-7">{children}</div>
    </GlassCard>
  );
}
