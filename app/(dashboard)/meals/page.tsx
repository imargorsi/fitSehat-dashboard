import { MealOptionDialog } from "@/app/(dashboard)/meals/meal-option-dialog";
import { MealLibrary } from "@/components/meals/meal-library";
import { PageShell } from "@/components/layout/page-shell";
import { todayDateString } from "@/lib/date.utils";
import { listMealOptions } from "@/lib/db/meals";
import { caloriesFromOption, mealKindFromOption } from "@/lib/meals.utils";
import { requireAuthUser } from "@/lib/session";

export default async function MealsPage() {
  const user = await requireAuthUser();
  const today = todayDateString();
  const rows = await listMealOptions(user.id);
  const meals = rows.map((row) => ({
    id: row.id,
    name: row.name,
    mealType: mealKindFromOption(row.mealType),
    calories: caloriesFromOption(row),
    proteinG: row.proteinG,
    carbsG: row.carbsG,
    fatsG: row.fatsG,
  }));

  return (
    <PageShell action={<MealOptionDialog />}>
      <MealLibrary today={today} meals={meals} />
    </PageShell>
  );
}
