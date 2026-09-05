/**
 * Typography tokens — Geist only. Use via components/ui/typography or these class strings.
 * Never apply raw font-family, arbitrary text sizes, or letter-spacing in product UI.
 */

/** Page / screen title */
export const typeH1 = "font-heading text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl";

/** Module panel title */
export const typeH2 = "font-heading text-xl font-semibold tracking-tight lg:text-2xl";

/** Widget / card title */
export const typeH3 = "font-heading text-lg font-semibold tracking-tight";

/** Dialog / compact section title */
export const typeH4 = "font-heading text-base font-semibold tracking-tight";

/** Dialog hero title */
export const typeDialogTitle = "font-heading text-2xl font-semibold tracking-tight";

/** Body copy */
export const typeP = "text-base leading-6 text-foreground";

/** Secondary body / descriptions */
export const typeMuted = "text-sm leading-6 text-muted-foreground sm:leading-7 lg:text-base";

/** Small inline / meta */
export const typeSpan = "text-sm text-foreground";

/** Emphasis inline */
export const typeStrong = "font-medium text-foreground";

/** Accent emphasis (footer totals, etc.) */
export const typeStrongNeon = "font-medium text-neon";

/** Violet metric readout */
export const typeStrongViolet = "text-sm font-medium text-violet";

/** Uppercase section label */
export const typeEyebrow = "text-xs tracking-[0.18em] text-muted-foreground uppercase";

/** Hero date / accent label */
export const typeEyebrowAccent = "text-[0.62rem] tracking-[0.22em] text-neon uppercase sm:text-xs";

/** Stat card / compact label */
export const typeCaption = "text-[0.65rem] tracking-[0.08em] text-muted-foreground uppercase sm:text-sm sm:tracking-[0.16em]";

/** Large metric numbers */
export const typeMetric = "text-2xl font-semibold tracking-tight sm:text-[1.85rem] lg:text-4xl leading-none";

/** Compact metric (stat cards) */
export const typeMetricCompact = "text-2xl font-semibold tracking-tight lg:text-3xl leading-none";

/** Glow ring center score */
export const typeMetricGlow = "text-2xl font-semibold tracking-tight sm:text-3xl leading-none";

/** Walk slider step count */
export const typeMetricWalk = "font-heading text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl leading-none";

/** Walk slider step count (compact) */
export const typeMetricWalkCompact = "font-heading text-xl font-semibold tracking-tight tabular-nums sm:text-2xl leading-none";

/** Burn / accent metric */
export const typeMetricAccent = "text-xl font-semibold tabular-nums text-rose sm:text-2xl leading-none";

/** Burn / accent metric (compact) */
export const typeMetricAccentCompact = "text-lg font-semibold tabular-nums text-rose sm:text-xl leading-none";

/** Hero / editorial quote */
export const typeQuote =
  "font-heading text-balance font-semibold tracking-tight text-center text-[1.05rem] leading-[1.28] sm:text-[1.45rem] sm:leading-[1.22] lg:text-[1.85rem]";

/** Nav dock micro label */
export const typeMicro = "max-w-full truncate text-center text-[0.62rem] font-medium tracking-wide leading-tight sm:text-[0.65rem]";

/** Desktop nav link label */
export const typeNavLink = "text-sm font-medium";

/** List row title */
export const typeRowTitle = "truncate font-medium leading-6 text-foreground";

/** List row subtitle */
export const typeRowSubtitle = "truncate text-sm leading-5 text-muted-foreground";

/** List row value column */
export const typeRowValue = "text-right text-xs leading-5 sm:text-sm";

/** Form / validation error */
export const typeError = "text-sm text-destructive";

/** Unit suffix (kcal, steps, g) */
export const typeUnit = "font-normal text-xs text-muted-foreground sm:text-sm";

/** Accent inline text */
export const typeAccent = "text-sm text-rose";

/** Small meta line */
export const typeMeta = "text-xs text-muted-foreground";

/** Stat card hint */
export const typeStatHint = "text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6";

/** Percent / meter readout */
export const typePercent = "text-xs text-muted-foreground sm:text-sm";

/** Day section header */
export const typeDayHeader = "font-heading mt-1 text-base font-semibold tracking-tight";

/** Day total calories */
export const typeDayTotal = "text-sm tabular-nums text-rose";

/** Chart axis label */
export const typeChartLabel = "text-center text-xs text-muted-foreground";

/** Chart axis label (today) */
export const typeChartLabelActive = "text-center text-xs font-medium text-rose";

/** Calendar month title */
export const typeCalendarTitle = "font-heading min-w-0 truncate text-base font-semibold tracking-tight sm:text-lg";

/** Calendar weekday header */
export const typeCalendarWeekday = "text-[0.65rem] tracking-wide text-muted-foreground uppercase sm:text-xs";

/** Calendar day cell */
export const typeCalendarCell = "text-[0.7rem] tabular-nums sm:text-sm";

/** Calendar legend */
export const typeLegend = "text-xs text-muted-foreground";

/** Quick-add initial badge */
export const typeInitialBadge = "text-sm font-semibold text-neon-foreground";

/** Auth / footer link hint */
export const typeLinkHint = "text-center text-sm text-muted-foreground";

/** Landing app name */
export const typeLandingApp = "font-heading text-lg font-semibold tracking-tight";

/** Landing hero (between H1 default and module) */
export const typeLandingHero = "font-heading text-2xl font-semibold tracking-tight sm:text-3xl";
