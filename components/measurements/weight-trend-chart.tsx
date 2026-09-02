"use client";

import { TrendLineChart, type TTrendPoint } from "@/components/measurements/trend-line-chart";

export type TWeightPoint = TTrendPoint;

export function WeightTrendChart({ points }: { points: TWeightPoint[] }) {
  return (
    <TrendLineChart
      points={points}
      unit="kg"
      tone="violet"
      title="Your curve, Jaan"
      subtitle="Numbers move, Precious. You are still on your way."
    />
  );
}
