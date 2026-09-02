import { cn } from "@/lib/utils";

/** Shared chrome for all form controls — sourced from theme tokens only. */
export const fieldControlClass = cn(
  "h-12 w-full min-w-0 appearance-none rounded-2xl border border-border bg-card px-4 text-base text-foreground [color-scheme:dark]",
  "shadow-[inset_0_1px_0_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
  "outline-none transition-[border-color,box-shadow,background-color] duration-200",
  "placeholder:text-muted-foreground",
  "focus-visible:border-rose focus-visible:bg-muted/40 focus-visible:shadow-glow focus-visible:ring-4 focus-visible:ring-[var(--focus-ring)]",
  "disabled:cursor-not-allowed disabled:opacity-50"
);

/** Outline nav / secondary action button chrome */
export const outlineButtonClass = cn(
  "h-9 shrink-0 rounded-full border-border/55 bg-transparent px-3.5 text-[0.8125rem] font-medium text-muted-foreground shadow-none",
  "hover:border-rose/35 hover:bg-transparent hover:text-foreground"
);

/** Choice chip (meal type, step presets) */
export const choiceChipClass =
  "rounded-full px-3 py-1.5 text-sm transition-colors bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground";

export const choiceChipSelectedClass =
  "rounded-full px-3 py-1.5 text-sm transition-colors bg-brand text-neon-foreground shadow-glow";

/** Compact choice chip (step presets on mobile) */
export const choiceChipCompactClass =
  "rounded-full px-2.5 py-1.5 text-xs transition-colors sm:px-3 sm:text-sm bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground";

export const choiceChipCompactSelectedClass =
  "rounded-full px-2.5 py-1.5 text-xs transition-colors sm:px-3 sm:text-sm bg-brand text-neon-foreground shadow-glow";

/** Range slider overlay input */
export const rangeInputClass =
  "absolute inset-0 w-full cursor-pointer appearance-none bg-transparent opacity-0";

/** Icon-only circular control */
export const iconButtonClass =
  "flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground";
