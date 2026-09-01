import { cn } from "@/lib/utils";

/** Shared chrome for text inputs and custom selects — thumb-friendly, soft focus. */
export const fieldControlClass = cn(
  "h-12 w-full min-w-0 appearance-none rounded-2xl border border-border bg-card px-4 text-base text-foreground",
  "shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
  "outline-none transition-[border-color,box-shadow,background-color,transform] duration-200",
  "placeholder:text-muted-foreground",
  "focus-visible:border-rose focus-visible:bg-muted/40 focus-visible:shadow-glow focus-visible:ring-4 focus-visible:ring-gold/25",
  "disabled:cursor-not-allowed disabled:opacity-50"
);
