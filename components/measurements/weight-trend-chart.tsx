"use client";

import { TrendLineChart, type TTrendPoint } from "@/components/measurements/trend-line-chart";

export type TWeightPoint = TTrendPoint;

export function WeightTrendChart({ points }: { points: TWeightPoint[] }) {
  return (
    <TrendLineChart
      points={points}
      unit="kg"
      tone="violet"
      title="Weight trend"
      subtitle="Track changes over time from your check-ins."
    />
  );
}
