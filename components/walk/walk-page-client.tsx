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
  const title = isToday ? "Log today's walk, Love" : `Log walk for ${formatMediumDate(selectedDate)}`;

  return (
    <>
      <ModulePanel
        eyebrow={isToday ? "Today" : "Past day"}
        title={title}
        description={
          isToday
            ? "Slide to the steps you took, Guddi. We keep a soft calorie estimate beside it."
            : "Tap a day on the calendar to switch, Precious. Future days stay empty."
        }
      >
        <WalkSlider key={`${selectedDate}-${steps}-${goal}`} walkedOn={selectedDate} today={today} goal={goal} initialSteps={steps} />
        {!isToday ? (
          <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={() => setSelectedDate(today)}>
            Back to today, Jaan
          </Button>
        ) : null}
      </ModulePanel>

      <SectionGrid className="lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <ModulePanel
          eyebrow="Rhythm"
          title="Your days, Precious"
          description="Tap a day to log or edit steps. Peach met the goal. Gold walked. Empty can be rest."
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
        <ModulePanel eyebrow="Pace" title="Daily goal, Love" description="Change this whenever you like, Guddi.">
          <WalkGoalForm goal={goal} />
        </ModulePanel>
      </SectionGrid>
    </>
  );
}
