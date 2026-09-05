import { outlineButtonClass } from "@/lib/field-control";
import { typeCaption, typeEyebrow } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const eyebrowClass = typeEyebrow;
export const captionClass = typeCaption;

export const widgetInsetClass = "px-4 sm:px-6";

export const widgetHeaderClass = cn(widgetInsetClass, "min-w-0 pt-5 pb-4 sm:pt-6");

export const widgetBodyClass = cn(widgetInsetClass, "min-w-0 overflow-x-hidden pb-5 sm:pb-6");

export const widgetFooterClass = cn(
  "flex items-center justify-between border-t border-border py-3 text-sm",
  widgetInsetClass
);

export const statGridClass = "grid min-w-0 grid-cols-2 gap-3 overflow-visible sm:gap-4 lg:grid-cols-4";

export const sectionGridClass = "grid min-w-0 gap-6 lg:grid-cols-2";

export const formGridClass = "grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-4";

export const formStackClass = "grid min-w-0 gap-5 overflow-x-hidden";

export const listStackClass = "space-y-2.5";

export const listFlushClass = "divide-y divide-border/50";

export const sceneIconClass = "size-12 shrink-0 sm:size-14 lg:size-16";

export const sceneHeroIconClass = "size-16 shrink-0 sm:size-36 lg:size-44";

export const sceneDashIconClass = "size-12 shrink-0 sm:size-14 lg:size-16";

export const sceneBulletIconClass = "size-12 shrink-0 sm:size-14";

export const optionalMacroSectionClass = "grid gap-3 rounded-[1.35rem] border border-border bg-muted/30 p-4";

export const calorieDialogClass = cn(
  "glass-panel flex max-h-[min(92dvh,54rem)] w-[min(100%,calc(100vw-1.5rem))] max-w-[min(42rem,calc(100vw-1.5rem))] min-w-0 grid-cols-1 flex-col gap-0 overflow-hidden rounded-[1.5rem] border border-border bg-card p-0",
  "sm:w-full sm:max-w-2xl sm:rounded-[1.75rem]"
);

/** Segmented pill tabs — keep the active fill inside the track. */
export const pillTabsListClass = cn(
  "inline-flex h-10 w-full min-w-0 items-center justify-start gap-0.5 overflow-hidden rounded-full bg-muted/50 p-1",
  "group-data-horizontal/tabs:h-10"
);

export const pillTabsTriggerClass = cn(
  "h-full min-h-0 min-w-0 flex-1 rounded-full border-0 bg-transparent px-2 text-xs font-medium text-muted-foreground shadow-none sm:px-3 sm:text-sm",
  "after:hidden after:inset-auto after:h-0 after:content-none",
  "hover:text-foreground data-active:shadow-none dark:data-active:border-transparent"
);

export const dialogPanelClass = "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden";

export const dialogScrollClass = cn(
  widgetBodyClass,
  "dashboard-scroll modal-scroll min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
);

export const dialogDockActionClass = cn(
  "shrink-0 grid gap-3 bg-card px-5 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6"
);

export const navOutlineButtonClass = outlineButtonClass;
