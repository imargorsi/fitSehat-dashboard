"use client";

import { useReducedMotion } from "motion/react";
import { Area, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import { EmptyNote } from "@/components/layout/empty-note";
import { GlassCard } from "@/components/layout/glass-card";
import { WidgetBody } from "@/components/layout/widget-header";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eyebrow, H3, Muted } from "@/components/ui/typography";
import { EMPTY } from "@/lib/app-copy";
import { formatChartAxisDate } from "@/lib/date.utils";
import { pillTabsListClass, pillTabsTriggerClass, widgetHeaderClass } from "@/lib/layout";
import { formatNumber } from "@/lib/number.utils";
import { cn } from "@/lib/utils";

export type TTrendPoint = {
  label: string;
  weight?: number;
  waist?: number;
};

const weightConfig = {
  value: {
    label: "Weight",
    color: "var(--neon)",
  },
} satisfies ChartConfig;

const waistConfig = {
  value: {
    label: "Waist",
    color: "var(--rose)",
  },
} satisfies ChartConfig;

function seriesData(points: TTrendPoint[], key: "weight" | "waist") {
  return points
    .filter((point) => point[key] != null)
    .map((point) => ({
      date: point.label,
      value: point[key] as number,
    }));
}

function paddedDomain(values: number[]): [number, number] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (min === max) {
    const pad = Math.max(Math.abs(min) * 0.08, 1);
    return [min - pad, max + pad];
  }
  const pad = Math.max((max - min) * 0.15, 0.4);
  return [min - pad, max + pad];
}

function TrendLine({
  data,
  config,
  empty,
  unit,
  gradientId,
}: {
  data: { date: string; value: number }[];
  config: ChartConfig;
  empty: { title: string; body: string };
  unit: string;
  gradientId: string;
}) {
  const reducedMotion = useReducedMotion();

  if (data.length === 0) {
    return <EmptyNote title={empty.title} body={empty.body} icon="trend" tone="neon" />;
  }

  const [yMin, yMax] = paddedDomain(data.map((point) => point.value));

  return (
    <ChartContainer config={config} className="aspect-auto h-64 min-h-64 w-full sm:h-80">
      <LineChart accessibilityLayer data={data} margin={{ left: 8, right: 12, top: 12, bottom: 4 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-value)" stopOpacity={0.38} />
            <stop offset="100%" stopColor="var(--color-value)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeOpacity={0.28} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={12}
          minTickGap={28}
          interval="preserveStartEnd"
          tickFormatter={(value) => formatChartAxisDate(String(value))}
        />
        <YAxis hide domain={[yMin, yMax]} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dot"
              formatter={(value) => (
                <div className="flex flex-1 items-center justify-between gap-8 leading-none">
                  <span className="text-muted-foreground">{config.value?.label}</span>
                  <span className="font-medium text-foreground tabular-nums">
                    {formatNumber(Number(value))} {unit}
                  </span>
                </div>
              )}
              labelFormatter={(_, payload) => {
                const date = payload?.[0]?.payload?.date;
                return date ? formatChartAxisDate(String(date)) : "";
              }}
            />
          }
        />
        <Area
          dataKey="value"
          type="monotone"
          stroke="none"
          fill={`url(#${gradientId})`}
          isAnimationActive={!reducedMotion}
        />
        <Line
          name={String(config.value?.label ?? "value")}
          dataKey="value"
          type="monotone"
          stroke="var(--color-value)"
          strokeWidth={2.5}
          dot={false}
          activeDot={{ r: 5, strokeWidth: 0 }}
          isAnimationActive={!reducedMotion}
        />
      </LineChart>
    </ChartContainer>
  );
}

export function MeasurementTrendChart({ points }: { points: TTrendPoint[] }) {
  const weight = seriesData(points, "weight");
  const waist = seriesData(points, "waist");

  return (
    <GlassCard className="flex w-full flex-col">
      <Tabs defaultValue="weight" className="w-full gap-0">
        <div
          className={cn(
            "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
            widgetHeaderClass
          )}
        >
          <div className="min-w-0">
            <Eyebrow>Check-in</Eyebrow>
            <H3 className="mt-2">Trend</H3>
            <Muted className="mt-1.5">Last twelve check-ins, oldest on the left.</Muted>
          </div>
          <TabsList className={pillTabsListClass}>
            <TabsTrigger
              value="weight"
              className={cn(
                pillTabsTriggerClass,
                "flex-1 data-active:bg-neon data-active:text-neon-foreground dark:data-active:bg-neon dark:data-active:text-neon-foreground"
              )}
            >
              Weight
            </TabsTrigger>
            <TabsTrigger
              value="waist"
              className={cn(
                pillTabsTriggerClass,
                "flex-1 data-active:bg-rose data-active:text-rose-foreground dark:data-active:bg-rose dark:data-active:text-rose-foreground"
              )}
            >
              Waist
            </TabsTrigger>
          </TabsList>
        </div>
        <WidgetBody className="pt-2 sm:pt-3">
          <TabsContent value="weight">
            <TrendLine
              data={weight}
              config={weightConfig}
              empty={EMPTY.weight}
              unit="kg"
              gradientId="trend-glow-weight"
            />
          </TabsContent>
          <TabsContent value="waist">
            <TrendLine
              data={waist}
              config={waistConfig}
              empty={EMPTY.waist}
              unit="cm"
              gradientId="trend-glow-waist"
            />
          </TabsContent>
        </WidgetBody>
      </Tabs>
    </GlassCard>
  );
}
