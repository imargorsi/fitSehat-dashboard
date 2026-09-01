import { MeasurementForm } from "@/app/(dashboard)/measurements/measurement-form";
import { AppLinkButton } from "@/components/layout/app-link-button";
import { GlassCard } from "@/components/layout/glass-card";
import { WidgetHeader } from "@/components/layout/widget-header";

export function CheckInWidget({
  today,
  latestWeight,
}: {
  today: string;
  latestWeight: string | null;
}) {
  return (
    <GlassCard className="flex h-full flex-col">
      <WidgetHeader
        title="Check-in, Guddi"
        subtitle={
          latestWeight
            ? `Latest ${latestWeight} kg`
            : "Tuesday is a hug on the scale, Love — never a verdict."
        }
        actions={<AppLinkButton href="/measurements" label="Details" icon="activity" iconTone="neon" />}
      />
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <MeasurementForm defaultDate={today} compact />
      </div>
    </GlassCard>
  );
}
