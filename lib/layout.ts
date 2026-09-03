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

export const sectionGridClass = "grid min-w-0 gap-5 lg:grid-cols-2";

export const formGridClass = "grid gap-4 sm:grid-cols-2 lg:grid-cols-4";

export const formStackClass = "grid gap-5";

export const listStackClass = "space-y-2.5";

export const optionalMacroSectionClass = "grid gap-3 rounded-[1.25rem] bg-muted/35 p-4";

export const navOutlineButtonClass = outlineButtonClass;
