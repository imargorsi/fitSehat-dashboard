import { MeasurementForm } from "@/components/measurements/measurement-form";
import { AppLinkButton } from "@/components/layout/app-link-button";
import { GlassCard } from "@/components/layout/glass-card";
import { WidgetBody, WidgetHeader } from "@/components/layout/widget-header";

export function CheckInWidget({
  checkInDate,
  latestWeight,
}: {
  checkInDate: string;
  latestWeight: string | null;
}) {
  return (
    <GlassCard className="flex h-full flex-col">
      <WidgetHeader
        title="Check-in, Guddi"
        subtitle={
          latestWeight
            ? `Latest ${latestWeight} kg · Tuesday check-in`
            : "Tuesday is a hug on the scale, Love — never a verdict."
        }
        actions={<AppLinkButton href="/measurements" label="Details" icon="activity" iconTone="neon" />}
      />
      <WidgetBody className="pt-0">
        <MeasurementForm defaultDate={checkInDate} compact />
      </WidgetBody>
    </GlassCard>
  );
}
