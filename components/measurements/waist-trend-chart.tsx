"use client";

import { TrendLineChart, type TTrendPoint } from "@/components/measurements/trend-line-chart";

export type TWaistPoint = TTrendPoint;

export function WaistTrendChart({ points }: { points: TWaistPoint[] }) {
  return (
    <TrendLineChart
      points={points}
      unit="cm"
      tone="gold"
      title="Waist curve, Love"
      subtitle="Gentle check-ins, Guddi. The trend is yours."
    />
  );
}
