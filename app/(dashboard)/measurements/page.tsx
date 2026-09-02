import { AnimateIcon } from "@/components/icons/animate-icon";
import { deleteMeasurement } from "@/app/(dashboard)/measurements/actions";
import {
  MeasurementForm,
  ProfileBaselinesForm,
} from "@/components/measurements/measurement-form";
import { DeleteRowButton } from "@/components/layout/delete-row-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { ModulePanel } from "@/components/layout/module-panel";
import { PageShell } from "@/components/layout/page-shell";
import { SectionGrid, StatGrid } from "@/components/layout/page-grids";
import { SoftRow } from "@/components/layout/soft-row";
import { StatCard } from "@/components/layout/stat-card";
import { WeightTrendChart } from "@/components/measurements/weight-trend-chart";
import { EMPTY } from "@/lib/care-copy";
import { Meta } from "@/components/ui/typography";
import { formatMediumDate, latestTuesdayOnOrBefore, todayDateString } from "@/lib/date.utils";
import { listStackClass } from "@/lib/layout";
import { listMeasurements } from "@/lib/db/measurements";
import { ensureProfile } from "@/lib/db/profiles";
import { formatNumber, toNumber } from "@/lib/number.utils";
import { requireAuthUser } from "@/lib/session";

function lostAmount(start: number | null, current: number | null): number | null {
  if (start == null || current == null) {
    return null;
  }
  return Math.round((start - current) * 10) / 10;
}

function lostHint(lost: number | null, unit: string): string {
  if (lost == null) {
    return "Set a start when you are ready, Guddi.";
  }
  if (lost === 0) {
    return "Steady versus start, Love. Showing up is the glow.";
  }
  if (lost > 0) {
    return `↓ ${lost} ${unit} from start, Precious. Beautiful consistency.`;
  }
  return `↑ ${Math.abs(lost)} ${unit} from start, Jaan. Numbers move. You are still on your way.`;
}

export default async function MeasurementsPage() {
  const user = await requireAuthUser();
  const today = todayDateString();
  const profile = await ensureProfile(user.id);
  const rows = await listMeasurements(user.id);
  const latest = rows[0];
  const startWeight = toNumber(profile.startWeightKg);
  const startWaist = toNumber(profile.startWaistCm);
  const latestWeight = latest ? toNumber(latest.weightKg) : null;
  const latestWaist = latest ? toNumber(latest.waistCm) : null;
  const weightLost = lostAmount(startWeight, latestWeight);
  const waistLost = lostAmount(startWaist, latestWaist);
  const trend = [...rows]
    .reverse()
    .slice(-8)
    .flatMap((row) => {
      const value = toNumber(row.weightKg);
      if (value == null) {
        return [];
      }
      return [{ label: String(row.measuredOn).slice(0, 10), value }];
    });

  return (
    <PageShell>
      <StatGrid>
        <StatCard
          icon={<AnimateIcon name="trend" size={16} tone="violet" />}
          tone="violet"
          label="Latest"
          value={latestWeight != null ? formatNumber(latestWeight) : "—"}
          unit="kg"
          hint={latest ? formatMediumDate(String(latest.measuredOn).slice(0, 10)) : "Tuesday is a hug on the scale, Guddi — never a verdict."}
        />
        <StatCard
          icon={<AnimateIcon name="trend" size={16} tone="violet" />}
          tone="violet"
          label="Lost"
          value={weightLost != null ? formatNumber(Math.abs(weightLost)) : "—"}
          unit="kg"
          hint={lostHint(weightLost, "kg")}
        />
        <StatCard
          icon={<AnimateIcon name="activity" size={16} tone="neon" />}
          label="Waist"
          value={latestWaist != null ? formatNumber(latestWaist) : "—"}
          unit="cm"
          hint={lostHint(waistLost, "cm")}
        />
        <StatCard
          icon={<AnimateIcon name="star" size={16} tone="neon" />}
          label="North star"
          value={formatNumber(profile.targetWeightKg)}
          unit="kg"
          hint="A north star, Love. Rest days still count."
        />
      </StatGrid>

      <SectionGrid>
        <ModulePanel
          eyebrow="Start"
          title="Where we began, Precious"
          description="Loss is from these start values, Jaan. Change them whenever the story starts over."
        >
          <ProfileBaselinesForm
            key={String(profile.updatedAt)}
            startWeightKg={profile.startWeightKg}
            targetWeightKg={profile.targetWeightKg}
            startWaistCm={profile.startWaistCm}
          />
        </ModulePanel>
        <ModulePanel
          eyebrow="Tuesday"
          title="Weigh-in, Guddi"
          description="Saving the same date updates that day, Love. The number is never a verdict."
        >
          <MeasurementForm defaultDate={latestTuesdayOnOrBefore(today)} />
        </ModulePanel>
      </SectionGrid>

      <SectionGrid>
        <WeightTrendChart points={trend} />
        <ModulePanel eyebrow="Ledger" title="History, Precious" description="Newest first, Jaan. I kept every check-in.">
          {rows.length === 0 ? (
            <EmptyNote title={EMPTY.measurements.title} body={EMPTY.measurements.body} icon="activity" tone="neon" />
          ) : (
            <ul className={listStackClass}>
              {rows.map((row, index) => (
                <li key={row.id}>
                  <SoftRow
                    title={`${formatNumber(row.weightKg)} kg${row.waistCm ? ` · ${formatNumber(row.waistCm)} cm` : ""}`}
                    subtitle={`${formatMediumDate(String(row.measuredOn).slice(0, 10))} · lost ${lostAmount(startWeight, toNumber(row.weightKg)) ?? "—"} kg`}
                    value={<Meta className="tabular-nums">{rows.length - index}</Meta>}
                    action={<DeleteRowButton action={deleteMeasurement} id={row.id} />}
                  />
                </li>
              ))}
            </ul>
          )}
        </ModulePanel>
      </SectionGrid>
    </PageShell>
  );
}
