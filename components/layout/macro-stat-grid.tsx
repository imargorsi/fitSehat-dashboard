import { Caption, Meta } from "@/components/ui/typography";

function MacroCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <Caption className="tracking-widest">{label}</Caption>
      <Meta className="mt-1 block tabular-nums">{value}</Meta>
    </div>
  );
}

export function MacroStatGrid({
  calories,
  protein,
  carbs,
  fat,
}: {
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
}) {
  return (
    <>
      <div className="mt-3 grid gap-2 sm:hidden">
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/25 px-3 py-2.5">
          <MacroCell label="Calories" value={calories} />
          <MacroCell label="Protein" value={protein} />
        </div>
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-muted/25 px-3 py-2.5">
          <MacroCell label="Carbs" value={carbs} />
          <MacroCell label="Fat" value={fat} />
        </div>
      </div>
      <dl className="mt-3 hidden grid-cols-4 gap-3 sm:grid">
        {(
          [
            ["Calories", calories],
            ["Protein", protein],
            ["Carbs", carbs],
            ["Fat", fat],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="min-w-0">
            <Caption className="tracking-widest">{label}</Caption>
            <Meta className="mt-1 block tabular-nums">{value}</Meta>
          </div>
        ))}
      </dl>
    </>
  );
}
