"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CALORIE_MEALS, type TCalorieMeal } from "@/lib/constants";
import { isCalorieMeal } from "@/lib/meals.utils";
import { cn } from "@/lib/utils";

export const MEAL_FILTERS = ["All", ...CALORIE_MEALS] as const;
export type TMealFilter = (typeof MEAL_FILTERS)[number];

export const MEAL_TAB: Record<TMealFilter, { trigger: string; dot: string }> = {
  All: {
    trigger:
      "data-active:bg-neon data-active:text-neon-foreground dark:data-active:bg-neon dark:data-active:text-neon-foreground",
    dot: "bg-foreground",
  },
  Breakfast: {
    trigger:
      "data-active:bg-neon data-active:text-neon-foreground dark:data-active:bg-neon dark:data-active:text-neon-foreground",
    dot: "bg-neon",
  },
  Lunch: {
    trigger:
      "data-active:bg-rose data-active:text-rose-foreground dark:data-active:bg-rose dark:data-active:text-rose-foreground",
    dot: "bg-rose",
  },
  Dinner: {
    trigger:
      "data-active:bg-gold data-active:text-gold-foreground dark:data-active:bg-gold dark:data-active:text-gold-foreground",
    dot: "bg-gold",
  },
  Snack: {
    trigger:
      "data-active:bg-violet data-active:text-violet-foreground dark:data-active:bg-violet dark:data-active:text-violet-foreground",
    dot: "bg-violet",
  },
};

export function MealFilterTabsList({ counts }: { counts: Record<TMealFilter, number> }) {
  return (
    <TabsList className="flex h-12 w-max max-w-full items-center gap-1 overflow-x-auto rounded-full border border-border bg-muted/40 p-1.5 group-data-horizontal/tabs:h-12 sm:h-14 sm:p-2 sm:group-data-horizontal/tabs:h-14">
      {MEAL_FILTERS.map((type) => (
        <TabsTrigger
          key={type}
          value={type}
          className={cn(
            "group h-8 min-h-0 flex-none gap-1.5 rounded-full bg-transparent px-2.5 text-sm font-medium text-muted-foreground shadow-none after:hidden after:content-none sm:h-9 sm:gap-2 sm:px-3",
            "hover:text-foreground data-active:shadow-none dark:data-active:border-transparent",
            MEAL_TAB[type].trigger
          )}
        >
          <span
            aria-hidden
            className={cn(
              "size-1.5 shrink-0 rounded-full group-data-active:hidden",
              MEAL_TAB[type].dot
            )}
          />
          {type}
          <span
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[0.65rem] font-medium tabular-nums text-muted-foreground",
              "group-data-active:bg-foreground/20 group-data-active:text-inherit"
            )}
          >
            {counts[type]}
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

const MEAL_PILL: Record<TCalorieMeal, string> = {
  Breakfast: "bg-neon/15 text-neon",
  Lunch: "bg-rose/15 text-rose",
  Dinner: "bg-gold/15 text-gold",
  Snack: "bg-violet/15 text-violet",
};

export function MealTypeChip({ meal }: { meal: string }) {
  const type = isCalorieMeal(meal) ? meal : "Snack";

  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium",
        MEAL_PILL[type]
      )}
    >
      <span aria-hidden className={cn("size-1.5 rounded-full", MEAL_TAB[type].dot)} />
      {type}
    </span>
  );
}
