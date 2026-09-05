"use client";

import { deleteMealOption } from "@/app/(dashboard)/meals/actions";
import { MealOptionEditDialog } from "@/app/(dashboard)/meals/meal-option-edit-dialog";
import { SceneIcon } from "@/components/icons/scene-icon";
import { DeleteRowButton } from "@/components/layout/delete-row-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { ModulePanel } from "@/components/layout/module-panel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MealFilterTabsList, MealTypeChip, type TMealFilter } from "@/components/meals/meal-filter-chips";
import { MealQuickAddButton } from "@/components/meals/meal-quick-add-button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Caption, Meta, Strong } from "@/components/ui/typography";
import { EMPTY } from "@/lib/app-copy";
import { CALORIE_MEALS, type TCalorieMeal } from "@/lib/constants";
import { sceneHeroIconClass } from "@/lib/layout";
import { formatInt, formatNumber } from "@/lib/number.utils";
import { typeCaption } from "@/lib/typography";

export type TMealLibraryItem = {
  id: string;
  name: string;
  mealType: TCalorieMeal;
  calories: number;
  proteinG: string | null;
  carbsG: string | null;
  fatsG: string | null;
};

function macroCell(value: string | null): string {
  return value ? formatNumber(value) : "—";
}

function MealTable({
  items,
  today,
  empty = EMPTY.mealBand,
}: {
  items: TMealLibraryItem[];
  today: string;
  empty?: { title: string; body: string };
}) {
  if (items.length === 0) {
    return <EmptyNote title={empty.title} body={empty.body} icon="utensils" tone="gold" />;
  }

  return (
    <>
      <ul className="grid gap-2.5 sm:hidden">
        {items.map((item) => (
          <li key={item.id} className="rounded-2xl border border-border bg-muted/20 p-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <MealTypeChip meal={item.mealType} />
                <Strong className="mt-2 block truncate">{item.name}</Strong>
              </div>
              <div className="flex shrink-0 items-center">
                <MealQuickAddButton mealId={item.id} today={today} />
                <MealOptionEditDialog initial={item} />
                <DeleteRowButton compact action={deleteMealOption} id={item.id} />
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-4 gap-2">
              <div>
                <Caption>Calories</Caption>
                <Meta className="mt-1 block tabular-nums">{formatInt(item.calories)}</Meta>
              </div>
              <div>
                <Caption>Protein</Caption>
                <Meta className="mt-1 block tabular-nums">{macroCell(item.proteinG)}</Meta>
              </div>
              <div>
                <Caption>Carbs</Caption>
                <Meta className="mt-1 block tabular-nums">{macroCell(item.carbsG)}</Meta>
              </div>
              <div>
                <Caption>Fat</Caption>
                <Meta className="mt-1 block tabular-nums">{macroCell(item.fatsG)}</Meta>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-transparent">
              <TableHead className={typeCaption}>Meal</TableHead>
              <TableHead className={typeCaption}>Name</TableHead>
              <TableHead className={typeCaption}>Calories</TableHead>
              <TableHead className={typeCaption}>Protein</TableHead>
              <TableHead className={typeCaption}>Carbs</TableHead>
              <TableHead className={typeCaption}>Fat</TableHead>
              <TableHead className="w-28">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id} className="border-border/50">
                <TableCell>
                  <MealTypeChip meal={item.mealType} />
                </TableCell>
                <TableCell>
                  <Strong>{item.name}</Strong>
                </TableCell>
                <TableCell className="tabular-nums">{formatInt(item.calories)}</TableCell>
                <TableCell className="tabular-nums">{macroCell(item.proteinG)}</TableCell>
                <TableCell className="tabular-nums">{macroCell(item.carbsG)}</TableCell>
                <TableCell className="tabular-nums">{macroCell(item.fatsG)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end">
                    <MealQuickAddButton mealId={item.id} today={today} />
                    <MealOptionEditDialog initial={item} />
                    <DeleteRowButton compact action={deleteMealOption} id={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export function MealLibrary({ today, meals }: { today: string; meals: TMealLibraryItem[] }) {
  const counts = {
    All: meals.length,
    ...Object.fromEntries(
      CALORIE_MEALS.map((type) => [type, meals.filter((meal) => meal.mealType === type).length])
    ),
  } as Record<TMealFilter, number>;

  return (
    <Tabs defaultValue="All" className="w-full min-w-0 gap-0">
      <ModulePanel
        magic={false}
        bordered={false}
        icon={<SceneIcon src="/icons/healthy-food.png" alt="" delay={0} className={sceneHeroIconClass} />}
        eyebrow="Meals"
        title="Saved meals"
        description={
          meals.length === 0
            ? EMPTY.quickAdd.body
            : `${formatInt(meals.length)} saved. Filter by meal, or add one to today.`
        }
        action={<MealFilterTabsList counts={counts} />}
      >
        <TabsContent value="All">
          <MealTable items={meals} today={today} empty={EMPTY.quickAdd} />
        </TabsContent>
        {CALORIE_MEALS.map((type) => (
          <TabsContent key={type} value={type}>
            <MealTable items={meals.filter((meal) => meal.mealType === type)} today={today} />
          </TabsContent>
        ))}
      </ModulePanel>
    </Tabs>
  );
}
