import { outlineButtonClass } from "@/lib/field-control";
import { typeCaption, typeEyebrow } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const eyebrowClass = typeEyebrow;
export const captionClass = typeCaption;

export const widgetInsetClass = "px-5 sm:px-6";

export const widgetHeaderClass = cn(widgetInsetClass, "pt-5 pb-4 sm:pt-6");

export const widgetBodyClass = cn(widgetInsetClass, "pb-5 sm:pb-6");

export const widgetFooterClass = cn(
  "flex items-center justify-between border-t border-border py-3 text-sm",
  widgetInsetClass
);

export const statGridClass = "grid min-w-0 grid-cols-2 gap-3 overflow-visible sm:gap-4 lg:grid-cols-4";

export const sectionGridClass = "grid min-w-0 gap-6 lg:grid-cols-2";

export const formGridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

export const formStackClass = "grid gap-5";

export const listStackClass = "space-y-2.5";

export const listFlushClass = "divide-y divide-border/50";

export const sceneIconClass = "size-16 shrink-0 sm:size-24 lg:size-28";

export const sceneHeroIconClass = "-ml-1 size-28 shrink-0 sm:size-36 lg:size-44";

export const sceneDashIconClass = "size-12 shrink-0 sm:size-14 lg:size-16";

export const sceneBulletIconClass = "size-12 shrink-0 sm:size-14";

export const optionalMacroSectionClass = "grid gap-3 rounded-[1.35rem] border border-border bg-muted/30 p-4";

export const calorieDialogClass = cn(
  "glass-panel flex max-h-[min(92dvh,54rem)] w-[calc(100%-0.75rem)] grid-cols-1 flex-col gap-0 overflow-hidden rounded-[1.5rem] border border-border bg-card p-0",
  "sm:w-full sm:max-w-2xl sm:rounded-[1.75rem]"
);

export const navOutlineButtonClass = outlineButtonClass;
