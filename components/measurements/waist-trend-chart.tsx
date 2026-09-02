"use client";

import { TrendLineChart, type TTrendPoint } from "@/components/measurements/trend-line-chart";

export type TWaistPoint = TTrendPoint;

export function WaistTrendChart({ points }: { points: TWaistPoint[] }) {
  return (
    <TrendLineChart
      points={points}
      unit="cm"
      tone="gold"
      title="Waist trend"
      subtitle="Track waist measurements from your check-ins."
    />
  );
}
