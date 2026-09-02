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
        title="Check-in"
        subtitle={
          latestWeight
            ? `Latest ${latestWeight} kg · weekly check-in`
            : "Log weight and waist to track progress over time."
        }
        actions={<AppLinkButton href="/measurements" label="Details" icon="activity" iconTone="neon" />}
      />
      <WidgetBody className="pt-0">
        <MeasurementForm defaultDate={checkInDate} compact />
      </WidgetBody>
    </GlassCard>
  );
}
