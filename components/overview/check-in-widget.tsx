import { MeasurementForm } from "@/app/(dashboard)/measurements/measurement-form";
import { GlassCard } from "@/components/layout/glass-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CheckInWidget({
  today,
  latestWeight,
}: {
  today: string;
  latestWeight: string | null;
}) {
  return (
    <GlassCard className="flex h-full flex-col">
      <div className="flex flex-col gap-3 px-5 pt-5 pb-4 sm:flex-row sm:items-start sm:justify-between sm:px-6 sm:pt-6">
        <div>
          <p className="font-heading text-lg font-semibold tracking-tight">Check-in</p>
          <p className="text-sm text-muted-foreground">
            {latestWeight ? `Latest ${latestWeight} kg` : "Tuesday is a check-in, not a verdict."}
          </p>
        </div>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/measurements" />}>
          Details
        </Button>
      </div>
      <div className="px-5 pb-5 sm:px-6 sm:pb-6">
        <MeasurementForm defaultDate={today} compact />
      </div>
    </GlassCard>
  );
}
