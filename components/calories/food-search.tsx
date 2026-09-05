"use client";

import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";
import { ChoiceChip, ChoiceChipGroup } from "@/components/ui/form-controls";
import { Caption, Muted, RowSubtitle, RowTitle, RowValue } from "@/components/ui/typography";
import type { useFoodSearch } from "@/hooks/useFoodSearch.hook";
import { LOOKUP } from "@/lib/app-copy";
import { formatInt } from "@/lib/number.utils";
import { cn } from "@/lib/utils";

type TFoodSearchPanelProps = ReturnType<typeof useFoodSearch>;

export function FoodSearchPanel({
  foods,
  message,
  isSearching,
  selected,
  servings,
  servingId,
  isLoadingServings,
  showResults,
  selectFood,
  selectServing,
  enterManually,
}: TFoodSearchPanelProps) {
  if (!showResults && !selected && !message) {
    return null;
  }

  return (
    <div className="grid min-w-0 gap-3">
      {isSearching ? (
        <Muted className="flex items-center gap-2">
          <UiIcon name="loader" size={14} spin className="text-muted-foreground" />
          {LOOKUP.loading}
        </Muted>
      ) : null}

      {!isSearching && foods.length > 0 && !selected ? (
        <ul className="grid max-h-64 min-w-0 gap-1.5 overflow-x-hidden overflow-y-auto">
          {foods.map((food) => (
            <li key={food.foodId} className="min-w-0">
              <button
                type="button"
                onClick={() => void selectFood(food)}
                className={cn(
                  "flex w-full min-w-0 items-center gap-3 rounded-[1.35rem] glass-row px-3 py-3 text-left transition-colors",
                  "hover:bg-muted/40"
                )}
              >
                <div className="min-w-0 flex-1">
                  <RowTitle className="whitespace-normal break-words">{food.name}</RowTitle>
                  <RowSubtitle className="whitespace-normal break-words">{food.brand ?? food.description}</RowSubtitle>
                </div>
                {food.calories != null ? (
                  <RowValue className="shrink-0">{formatInt(food.calories)} kcal</RowValue>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      {isLoadingServings ? (
        <Muted className="flex items-center gap-2">
          <UiIcon name="loader" size={14} spin className="text-muted-foreground" />
          {LOOKUP.servingsLoading}
        </Muted>
      ) : null}

      {selected && servings.length > 0 ? (
        <div className="grid min-w-0 gap-2 rounded-2xl bg-muted/25 px-3.5 py-3">
          <Caption>Serving</Caption>
          <ChoiceChipGroup>
            {servings.map((serving) => (
              <ChoiceChip
                key={serving.servingId}
                compact
                selected={serving.servingId === servingId}
                onClick={() => selectServing(serving.servingId)}
              >
                {serving.description}
              </ChoiceChip>
            ))}
          </ChoiceChipGroup>
        </div>
      ) : null}

      {selected && !isLoadingServings ? <Caption>{LOOKUP.suggested}</Caption> : null}
      {message ? <Muted>{message}</Muted> : null}

      {(message || selected || (!isSearching && foods.length > 0)) && (
        <Button type="button" variant="ghost" size="sm" className="w-fit rounded-full" onClick={enterManually}>
          {LOOKUP.enterManually}
        </Button>
      )}
    </div>
  );
}
