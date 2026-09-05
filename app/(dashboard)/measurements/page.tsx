import { SceneIcon } from "@/components/icons/scene-icon";
import { UiIcon } from "@/components/icons/ui-icon";
import { deleteMeasurement } from "@/app/(dashboard)/measurements/actions";
import { BaselinesDialog } from "@/components/measurements/baselines-dialog";
import { CheckInDialog } from "@/components/measurements/check-in-dialog";
import { CheckInEditDialog } from "@/components/measurements/check-in-edit-dialog";
import { MeasurementTrendChart } from "@/components/measurements/measurement-trend-chart";
import { DeleteRowButton } from "@/components/layout/delete-row-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { ModulePanel } from "@/components/layout/module-panel";
import { PageShell } from "@/components/layout/page-shell";
import { StatGrid } from "@/components/layout/page-grids";
import { SoftRow } from "@/components/layout/soft-row";
import { StatCard } from "@/components/layout/stat-card";
import {
  EMPTY,
  formatSignedChange,
  progressCaption,
  progressShort,
  targetWeightCaption,
} from "@/lib/app-copy";
import { formatMediumDate, todayDateString } from "@/lib/date.utils";
import { listFlushClass } from "@/lib/layout";
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

export default async function MeasurementsPage() {
  const user = await requireAuthUser();
  const today = todayDateString();
  const profile = await ensureProfile(user.id);
  const rows = await listMeasurements(user.id);
  const chronological = [...rows].sort((a, b) =>
    String(a.measuredOn).slice(0, 10).localeCompare(String(b.measuredOn).slice(0, 10))
  );
  const history = [...chronological].reverse();
  const latest = chronological.at(-1);
  const startWeight = toNumber(profile.startWeightKg);
  const startWaist = toNumber(profile.startWaistCm);
  const latestWeight = latest ? toNumber(latest.weightKg) : null;
  const latestWaist = latest ? toNumber(latest.waistCm) : null;
  const weightLost = lostAmount(startWeight, latestWeight);
  const waistLost = lostAmount(startWaist, latestWaist);
  const hasTarget = toNumber(profile.targetWeightKg) != null;
  const compareTrend = chronological.slice(-12).map((row) => ({
    label: String(row.measuredOn).slice(0, 10),
    weight: toNumber(row.weightKg) ?? undefined,
    waist: toNumber(row.waistCm) ?? undefined,
  }));

  return (
    <PageShell
      action={
        <>
          <BaselinesDialog
            startWeightKg={profile.startWeightKg}
            targetWeightKg={profile.targetWeightKg}
            startWaistCm={profile.startWaistCm}
          />
          <CheckInDialog defaultDate={today} />
        </>
      }
    >
      <StatGrid>
        <StatCard
          scene
          icon={<SceneIcon src="/icons/3dicons-heart-front-color.png" delay={0} />}
          label="Latest"
          value={latestWeight != null ? formatNumber(latestWeight) : "—"}
          unit="kg"
          hint={latest ? formatMediumDate(String(latest.measuredOn).slice(0, 10)) : "Log a check-in to start tracking."}
        />
        <StatCard
          scene
          icon={<SceneIcon src="/icons/weightlifting-woman.png" delay={0.12} />}
          label="Change"
          value={formatSignedChange(weightLost)}
          unit="kg"
          hint={progressCaption(weightLost, "kg")}
        />
        <StatCard
          scene
          icon={<SceneIcon src="/icons/tailor-s-measuring-tape.png" delay={0.24} />}
          label="Waist"
          value={latestWaist != null ? formatNumber(latestWaist) : "—"}
          unit="cm"
          hint={progressCaption(waistLost, "cm")}
        />
        <StatCard
          scene
          icon={<SceneIcon src="/icons/3dicons-target-front-color.png" delay={0.36} />}
          label="Target"
          value={formatNumber(profile.targetWeightKg)}
          unit="kg"
          hint={targetWeightCaption(hasTarget)}
        />
      </StatGrid>

      <MeasurementTrendChart points={compareTrend} />

      <ModulePanel eyebrow="Check-in" title="History" description="Newest check-ins first.">
        {history.length === 0 ? (
          <EmptyNote title={EMPTY.measurements.title} body={EMPTY.measurements.body} icon="activity" tone="neon" />
        ) : (
          <div className="dashboard-scroll min-h-0 max-h-[min(32rem,70dvh)] flex-1 overflow-y-auto overscroll-contain pr-1 lg:max-h-none">
            <ul className={listFlushClass}>
              {history.map((row) => {
                const measuredOn = String(row.measuredOn).slice(0, 10);
                const lost = lostAmount(startWeight, toNumber(row.weightKg));
                const change = progressShort(lost, "kg");
                return (
                  <li key={row.id}>
                    <SoftRow
                      flush
                      title={`${formatNumber(row.weightKg)} kg${row.waistCm ? ` · ${formatNumber(row.waistCm)} cm` : ""}`}
                      subtitle={
                        <>
                          <UiIcon name="calendar" size={14} className="shrink-0 text-muted-foreground" />
                          <span className="min-w-0 truncate">
                            {formatMediumDate(measuredOn)}
                            {change ? ` · ${change}` : ""}
                          </span>
                        </>
                      }
                      action={
                        <div className="flex shrink-0 items-center gap-0.5">
                          <CheckInEditDialog
                            initial={{
                              id: row.id,
                              measuredOn,
                              weightKg: row.weightKg,
                              waistCm: row.waistCm,
                            }}
                          />
                          <DeleteRowButton compact action={deleteMeasurement} id={row.id} />
                        </div>
                      }
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </ModulePanel>
    </PageShell>
  );
}
