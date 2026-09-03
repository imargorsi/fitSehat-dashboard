import type { ComponentPropsWithoutRef, ElementType } from "react";

import {
  typeAccent,
  typeCalendarCell,
  typeCalendarTitle,
  typeCalendarWeekday,
  typeCaption,
  typeChartLabel,
  typeChartLabelActive,
  typeDayHeader,
  typeDayTotal,
  typeDialogTitle,
  typeError,
  typeEyebrow,
  typeEyebrowAccent,
  typeH1,
  typeH2,
  typeH3,
  typeH4,
  typeInitialBadge,
  typeLandingApp,
  typeLandingHero,
  typeLegend,
  typeLinkHint,
  typeMeta,
  typeMetric,
  typeMetricAccent,
  typeMetricAccentCompact,
  typeMetricCompact,
  typeMetricGlow,
  typeMetricWalk,
  typeMetricWalkCompact,
  typeMicro,
  typeMuted,
  typeNavLink,
  typeP,
  typePercent,
  typeQuote,
  typeRowSubtitle,
  typeRowTitle,
  typeRowValue,
  typeSpan,
  typeStatHint,
  typeStrong,
  typeStrongNeon,
  typeStrongViolet,
  typeUnit,
} from "@/lib/typography";
import { cn } from "@/lib/utils";

type TTypographyProps<T extends ElementType> = {
  as?: T;
  className?: string;
} & ComponentPropsWithoutRef<T>;

function createTypography<T extends ElementType>(defaultTag: T, baseClass: string) {
  return function Typography({ as, className, ...props }: TTypographyProps<T>) {
    const Tag = (as ?? defaultTag) as ElementType;
    return <Tag className={cn(baseClass, className)} {...props} />;
  };
}

export const H1 = createTypography("h1", typeH1);
export const H2 = createTypography("h2", typeH2);
export const H3 = createTypography("h3", typeH3);
export const H4 = createTypography("h4", typeH4);
export const DialogHeading = createTypography("h2", typeDialogTitle);
export const P = createTypography("p", typeP);
export const Muted = createTypography("p", typeMuted);
export const Span = createTypography("span", typeSpan);
export const Strong = createTypography("span", typeStrong);
export const StrongNeon = createTypography("span", typeStrongNeon);
export const StrongViolet = createTypography("span", typeStrongViolet);
export const Eyebrow = createTypography("p", typeEyebrow);
export const EyebrowAccent = createTypography("p", typeEyebrowAccent);
export const Caption = createTypography("p", typeCaption);
export const Metric = createTypography("p", typeMetric);
export const MetricCompact = createTypography("p", typeMetricCompact);
export const MetricGlow = createTypography("p", typeMetricGlow);
export const MetricWalk = createTypography("p", typeMetricWalk);
export const MetricWalkCompact = createTypography("p", typeMetricWalkCompact);
export const MetricAccent = createTypography("p", typeMetricAccent);
export const MetricAccentCompact = createTypography("p", typeMetricAccentCompact);
export const Quote = createTypography("p", typeQuote);
export const Micro = createTypography("span", typeMicro);
export const NavLinkLabel = createTypography("span", typeNavLink);
export const RowTitle = createTypography("p", typeRowTitle);
export const RowSubtitle = createTypography("p", typeRowSubtitle);
export const RowValue = createTypography("div", typeRowValue);
export const ErrorText = createTypography("p", typeError);
export const Unit = createTypography("span", typeUnit);
export const Accent = createTypography("span", typeAccent);
export const Meta = createTypography("span", typeMeta);
export const StatHint = createTypography("p", typeStatHint);
export const Percent = createTypography("span", typePercent);
export const DayHeader = createTypography("p", typeDayHeader);
export const DayTotal = createTypography("p", typeDayTotal);
export const ChartLabel = createTypography("span", typeChartLabel);
export const ChartLabelActive = createTypography("span", typeChartLabelActive);
export const CalendarTitle = createTypography("p", typeCalendarTitle);
export const CalendarWeekday = createTypography("span", typeCalendarWeekday);
export const CalendarCell = createTypography("span", typeCalendarCell);
export const Legend = createTypography("span", typeLegend);
export const InitialBadge = createTypography("span", typeInitialBadge);
export const LinkHint = createTypography("p", typeLinkHint);
export const LandingApp = createTypography("p", typeLandingApp);
export const LandingHero = createTypography("h1", typeLandingHero);
