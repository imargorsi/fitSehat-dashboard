"use client";

import { useMemo, useState } from "react";

import { ModulePanel } from "@/components/layout/module-panel";
import { SectionGrid } from "@/components/layout/page-grids";
import { WalkCalendar, type TWalkStamp } from "@/components/walk/walk-calendar";
import { WalkGoalForm } from "@/components/walk/walk-goal-form";
import { WalkSlider } from "@/components/walk/walk-slider";
import { Button } from "@/components/ui/button";
import { Muted } from "@/components/ui/typography";
import { formatMediumDate } from "@/lib/date.utils";

export function WalkPageClient({
  today,
  goal,
  stamps,
  monthStart,
}: {
  today: string;
  goal: number;
  stamps: TWalkStamp[];
  monthStart: string;
}) {
  const [selectedDate, setSelectedDate] = useState(today);
  const byDate = useMemo(() => new Map(stamps.map((row) => [row.date, row])), [stamps]);
  const selected = byDate.get(selectedDate);
  const steps = selected?.steps ?? 0;
  const isToday = selectedDate === today;
  const title = isToday ? "Log today's walk" : `Log walk for ${formatMediumDate(selectedDate)}`;

  return (
    <>
      <ModulePanel
        eyebrow={isToday ? "Today" : "Past day"}
        title={title}
        description={
          isToday
            ? "Slide to the steps you took. We estimate calories burned beside it."
            : "Tap a day on the calendar to switch dates. Future days cannot be logged."
        }
      >
        <WalkSlider key={`${selectedDate}-${steps}-${goal}`} walkedOn={selectedDate} today={today} goal={goal} initialSteps={steps} />
        {!isToday ? (
          <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={() => setSelectedDate(today)}>
            Back to today
          </Button>
        ) : null}
      </ModulePanel>

      <SectionGrid className="lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <ModulePanel
          eyebrow="Rhythm"
          title="Activity calendar"
          description="Tap a day to log or edit steps. Highlighted days met the goal."
        >
          <WalkCalendar
            today={today}
            monthStart={monthStart}
            stamps={stamps}
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />
          {!isToday ? (
            <Muted className="mt-3 block">
              Logging {formatMediumDate(selectedDate)} · {steps > 0 ? `${steps} steps saved` : "not logged yet"}
            </Muted>
          ) : null}
        </ModulePanel>
        <ModulePanel eyebrow="Pace" title="Daily step goal" description="Update your daily step target anytime.">
          <WalkGoalForm goal={goal} />
        </ModulePanel>
      </SectionGrid>
    </>
  );
}
