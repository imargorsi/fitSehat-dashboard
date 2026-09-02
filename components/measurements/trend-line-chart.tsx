"use client";

import { motion, useReducedMotion } from "motion/react";

import { EmptyNote } from "@/components/layout/empty-note";
import { GlassCard } from "@/components/layout/glass-card";
import { WidgetBody, WidgetHeader } from "@/components/layout/widget-header";
import { ChartLabel, StrongViolet } from "@/components/ui/typography";
import { EMPTY } from "@/lib/app-copy";
import { formatChartAxisDate } from "@/lib/date.utils";
import { EASE_OUT } from "@/lib/motion";
import { formatNumber } from "@/lib/number.utils";
import { cn } from "@/lib/utils";

export type TTrendPoint = {
  label: string;
  value: number;
};

type TTrendTone = "violet" | "gold";

const toneStyles: Record<
  TTrendTone,
  { stroke: string; fill: string; valueClass: string; empty: { title: string; body: string } }
> = {
  violet: {
    stroke: "stroke-violet",
    fill: "fill-violet",
    valueClass: "",
    empty: EMPTY.weight,
  },
  gold: {
    stroke: "stroke-gold",
    fill: "fill-gold",
    valueClass: "text-gold",
    empty: {
      title: "No waist check-ins yet",
      body: "Log waist on your next check-in to see the trend.",
    },
  },
};

function TrendHeader({
  eyebrow,
  title,
  subtitle,
  latest,
  unit,
  tone,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  latest?: number;
  unit: string;
  tone: TTrendTone;
}) {
  const ValueTag = tone === "violet" ? StrongViolet : "span";
  return (
    <WidgetHeader
      eyebrow={eyebrow}
      title={title}
      subtitle={subtitle}
      actions={
        latest != null ? (
          <ValueTag className={cn("tabular-nums", toneStyles[tone].valueClass)}>
            {formatNumber(latest)} {unit}
          </ValueTag>
        ) : undefined
      }
      className="pb-3 sm:pb-4"
    />
  );
}

export function TrendLineChart({
  points,
  unit,
  tone,
  eyebrow = "Trend",
  title,
  subtitle,
}: {
  points: TTrendPoint[];
  unit: string;
  tone: TTrendTone;
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  const reduced = useReducedMotion();
  const styles = toneStyles[tone];
  const width = 320;
  const height = 148;
  const pad = 18;

  if (points.length === 0) {
    return (
      <GlassCard className="flex h-full flex-col">
        <TrendHeader eyebrow={eyebrow} title={title} subtitle={subtitle} unit={unit} tone={tone} />
        <WidgetBody className="pt-0">
          <EmptyNote title={styles.empty.title} body={styles.empty.body} icon="trend" tone={tone === "violet" ? "neon" : "gold"} />
        </WidgetBody>
      </GlassCard>
    );
  }

  const values = points.map((point) => point.value);
  const min = Math.min(...values) - 0.4;
  const max = Math.max(...values) + 0.4;
  const span = max - min || 1;
  const coords = points.map((point, index) => {
    const x =
      points.length === 1
        ? width / 2
        : pad + (index * (width - pad * 2)) / (points.length - 1);
    const y = height - pad - ((point.value - min) / span) * (height - pad * 2);
    return { ...point, x, y };
  });
  const path = coords
    .map((coord, index) => `${index === 0 ? "M" : "L"} ${coord.x.toFixed(1)} ${coord.y.toFixed(1)}`)
    .join(" ");
  const last = coords[coords.length - 1];

  return (
    <GlassCard className="flex h-full min-h-[20rem] flex-col">
      <TrendHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        latest={last?.value}
        unit={unit}
        tone={tone}
      />
      <WidgetBody className="flex flex-1 flex-col gap-2 pt-0">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" role="img" aria-label={`${title} trend`}>
          <motion.path
            d={path}
            className={cn("fill-none", styles.stroke)}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduced ? 0 : 0.9, ease: EASE_OUT }}
          />
          {coords.map((coord, index) => (
            <motion.circle
              key={`${coord.label}-${coord.value}`}
              cx={coord.x}
              cy={coord.y}
              r="4"
              className={styles.fill}
              initial={{ scale: reduced ? 1 : 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.35 + index * 0.06, ease: EASE_OUT }}
            />
          ))}
        </svg>
        <div className="flex justify-between gap-1 px-1">
          {coords.map((coord) => (
            <ChartLabel key={coord.label} className="min-w-0 flex-1 truncate text-center">
              {formatChartAxisDate(coord.label)}
            </ChartLabel>
          ))}
        </div>
      </WidgetBody>
    </GlassCard>
  );
}
