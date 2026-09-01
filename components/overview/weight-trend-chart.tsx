"use client";

import { motion, useReducedMotion } from "motion/react";

import { EmptyNote } from "@/components/layout/empty-note";
import { GlassCard } from "@/components/layout/glass-card";
import { EMPTY } from "@/lib/care-copy";
import { EASE_OUT } from "@/lib/motion";
import { formatNumber } from "@/lib/number.utils";

export type TWeightPoint = {
  label: string;
  value: number;
};

export function WeightTrendChart({ points }: { points: TWeightPoint[] }) {
  const reduced = useReducedMotion();
  const width = 320;
  const height = 148;
  const pad = 18;

  if (points.length === 0) {
    return (
      <GlassCard className="flex h-full flex-col gap-4 p-5 sm:p-6 lg:p-7">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Trend</p>
          <p className="font-heading mt-2 text-lg font-semibold tracking-tight">Weight trend</p>
          <p className="text-sm text-muted-foreground">Last check-ins</p>
        </div>
        <EmptyNote title={EMPTY.weight.title} body={EMPTY.weight.body} />
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
    <GlassCard className="flex h-full flex-col gap-4 p-5 sm:p-6 lg:p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        <div>
          <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">Trend</p>
          <p className="font-heading mt-2 text-lg font-semibold tracking-tight">Weight trend</p>
          <p className="text-sm leading-6 text-muted-foreground">Numbers move. You are still on your way.</p>
        </div>
        {last ? (
          <p className="text-sm font-medium text-violet">{formatNumber(last.value)} kg</p>
        ) : null}
      </div>
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
    </GlassCard>
  );
}
