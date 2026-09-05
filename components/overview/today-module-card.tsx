"use client";

import type { ReactNode } from "react";

import { AppLinkButton } from "@/components/layout/app-link-button";
import { GlassCard } from "@/components/layout/glass-card";
import { CountUp } from "@/components/motion/count-up";
import { ProgressRing } from "@/components/motion/progress-ring";
import { Badge } from "@/components/ui/badge";
import { MetricCompact, Unit } from "@/components/ui/typography";
import type { TAppIconName } from "@/components/icons/app-icons";
import { clampPercent } from "@/lib/number.utils";

export function TodayModuleCard({
  href,
  action,
  actionIcon,
  icon,
  label,
  value,
  countTo,
  suffix,
  unit,
  meter,
}: {
  href: string;
  action: string;
  actionIcon: TAppIconName;
  icon: ReactNode;
  label: string;
  value?: string;
  countTo?: number;
  suffix?: string;
  unit?: string;
  meter?: { value: number; max: number };
}) {
  const percent = meter ? clampPercent(meter.value, meter.max) : null;

  return (
    <GlassCard className="h-full min-w-0 items-center overflow-hidden p-4 text-center sm:overflow-visible sm:p-5">
      <Badge variant="outline" className="rounded-full border-border/70 bg-muted/30">
        {label}
      </Badge>
      <div className="relative mx-auto mt-3 size-20 sm:mt-5 sm:size-24 lg:size-28">
        {percent != null ? (
          <ProgressRing value={percent} className="absolute inset-0 size-full" />
        ) : (
          <div className="absolute inset-[8%] rounded-full border border-border/50 bg-muted/20" />
        )}
        <div className="absolute inset-0 flex items-center justify-center">{icon}</div>
      </div>
      <div className="mt-3 flex min-h-12 items-center justify-center px-1">
        <MetricCompact className="text-center">
          {countTo != null ? <CountUp value={countTo} /> : value}
          {suffix ? <Unit>{suffix}</Unit> : null}
          {unit ? <Unit className="ml-1">{unit}</Unit> : null}
        </MetricCompact>
      </div>
      <div className="mt-auto w-full pt-5">
        <AppLinkButton
          href={href}
          label={action}
          icon={actionIcon}
          className="w-full justify-center"
        />
      </div>
    </GlassCard>
  );
}
