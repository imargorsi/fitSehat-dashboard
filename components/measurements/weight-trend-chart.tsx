"use client";

import { motion, useReducedMotion } from "motion/react";

import { EmptyNote } from "@/components/layout/empty-note";
import { GlassCard } from "@/components/layout/glass-card";
import { WidgetBody, WidgetHeader } from "@/components/layout/widget-header";
import { StrongViolet } from "@/components/ui/typography";
import { EMPTY } from "@/lib/care-copy";
import { EASE_OUT } from "@/lib/motion";
import { formatNumber } from "@/lib/number.utils";

export type TWeightPoint = {
  label: string;
  value: number;
};

function WeightTrendHeader({
  subtitle,
  latest,
}: {
  subtitle: string;
  latest?: number;
}) {
  return (
    <WidgetHeader
      eyebrow="Trend"
      title="Your curve, Jaan"
      subtitle={subtitle}
      actions={
        latest != null ? (
          <StrongViolet>{formatNumber(latest)} kg</StrongViolet>
        ) : undefined
      }
      className="pb-3 sm:pb-4"
    />
  );
}

export function WeightTrendChart({ points }: { points: TWeightPoint[] }) {
  const reduced = useReducedMotion();
  const width = 320;
  const height = 148;
  const pad = 18;

  if (points.length === 0) {
    return (
      <GlassCard className="flex h-full flex-col">
        <WeightTrendHeader subtitle="Last check-ins, Love" />
        <WidgetBody className="pt-0">
          <EmptyNote title={EMPTY.weight.title} body={EMPTY.weight.body} icon="trend" tone="neon" />
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
      <WeightTrendHeader
        subtitle="Numbers move, Precious. You are still on your way."
        latest={last?.value}
      />
      <WidgetBody className="flex flex-1 flex-col pt-0">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full" role="img" aria-label="Weight trend">
          <motion.path
            d={path}
            className="fill-none stroke-violet"
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
              className="fill-violet"
              initial={{ scale: reduced ? 1 : 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 0.35 + index * 0.06, ease: EASE_OUT }}
            />
          ))}
        </svg>
      </WidgetBody>
    </GlassCard>
  );
}
