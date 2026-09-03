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

export const statGridClass = "grid min-w-0 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4";

export const sectionGridClass = "grid min-w-0 gap-6 lg:grid-cols-2";

export const formGridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

export const formStackClass = "grid gap-5";

export const listStackClass = "space-y-2.5";

export const optionalMacroSectionClass = "grid gap-3 rounded-[1.35rem] border border-border bg-muted/30 p-4";

export const calorieDialogClass = cn(
  "glass-panel flex max-h-[min(92dvh,54rem)] w-[calc(100%-0.75rem)] flex-col gap-0 overflow-hidden rounded-[1.5rem] border border-border bg-card p-0",
  "sm:w-full sm:max-w-2xl sm:rounded-[1.75rem]"
);

export const navOutlineButtonClass = outlineButtonClass;
