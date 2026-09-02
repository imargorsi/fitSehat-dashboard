import { deleteMealOption } from "@/app/(dashboard)/meals/actions";
import { MealOptionForm } from "@/app/(dashboard)/meals/meal-option-form";
import { DeleteRowButton } from "@/components/layout/delete-row-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { ModulePanel } from "@/components/layout/module-panel";
import { PageShell } from "@/components/layout/page-shell";
import { SectionGrid } from "@/components/layout/page-grids";
import { SoftRow } from "@/components/layout/soft-row";
import { GlowIcon } from "@/components/layout/stat-card";
import { InitialBadge, Meta, Strong } from "@/components/ui/typography";
import { EMPTY } from "@/lib/care-copy";
import { listStackClass } from "@/lib/layout";
import { CALORIE_MEALS } from "@/lib/constants";
import { listMealOptions } from "@/lib/db/meals";
import { caloriesFromOption, mealKindFromOption } from "@/lib/meals.utils";
import { formatInt, formatNumber } from "@/lib/number.utils";
import { requireAuthUser } from "@/lib/session";

export default async function MealsPage() {
  const user = await requireAuthUser();
  const rows = await listMealOptions(user.id);

  return (
    <PageShell>
      <ModulePanel
        eyebrow="Board"
        title="Add a meal you like, Guddi"
        description="Same fields as Fuel, Precious — name, type, energy, macros, and a note. Quick add copies them onto today."
      >
        <MealOptionForm />
      </ModulePanel>

      <SectionGrid>
        {CALORIE_MEALS.map((type) => {
          const items = rows.filter((row) => mealKindFromOption(row.mealType) === type);
          return (
            <ModulePanel key={type} eyebrow="Saved for you" title={type} description="Tap-ready for Today, Jaan">
              {items.length === 0 ? (
                <EmptyNote title={EMPTY.mealBand.title} body={EMPTY.mealBand.body} icon="sparkles" tone="gold" />
              ) : (
                <ul className={listStackClass}>
                  {items.map((item) => {
                    const calories = caloriesFromOption(item);
                    return (
                      <li key={item.id}>
                        <SoftRow
                          icon={
                            <GlowIcon>
                              <InitialBadge>{item.name.slice(0, 1).toUpperCase()}</InitialBadge>
                            </GlowIcon>
                          }
                          title={item.name}
                          subtitle={item.notes ?? undefined}
                          value={
                            <span>
                              <Strong className="block">{formatInt(calories)} kcal</Strong>
                              {item.proteinG ? (
                                <Meta className="block">
                                  {formatNumber(item.proteinG)}g P
                                  {item.carbsG ? ` · ${formatNumber(item.carbsG)}g C` : ""}
                                </Meta>
                              ) : null}
                            </span>
                          }
                          action={<DeleteRowButton action={deleteMealOption} id={item.id} />}
                        />
                      </li>
                    );
                  })}
                </ul>
              )}
            </ModulePanel>
          );
        })}
      </SectionGrid>
    </PageShell>
  );
}
