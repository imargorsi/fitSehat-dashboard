"use client";

import { useMemo, useState, type ReactNode } from "react";

import { ModulePanel } from "@/components/layout/module-panel";
import { SectionGrid } from "@/components/layout/page-grids";
import { PageShell } from "@/components/layout/page-shell";
import { WalkCalendar, type TWalkStamp } from "@/components/walk/walk-calendar";
import { WalkGoalDialog } from "@/components/walk/walk-goal-dialog";
import { WalkHistoryList } from "@/components/walk/walk-history-list";
import { WalkLogDialog } from "@/components/walk/walk-log-dialog";

export function WalkPageClient({
  today,
  goal,
  stamps,
  monthStart,
  children,
}: {
  today: string;
  goal: number;
  stamps: TWalkStamp[];
  monthStart: string;
  children: ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState(today);
  const [logOpen, setLogOpen] = useState(false);
  const byDate = useMemo(() => new Map(stamps.map((row) => [row.date, row])), [stamps]);
  const selected = byDate.get(selectedDate);
  const steps = selected?.steps ?? 0;

  function openLog(date: string) {
    setSelectedDate(date);
    setLogOpen(true);
  }

  return (
    <PageShell
      action={
        <>
          <WalkGoalDialog goal={goal} />
          <WalkLogDialog
            today={today}
            walkedOn={selectedDate}
            goal={goal}
            initialSteps={steps}
            open={logOpen}
            onOpenChange={setLogOpen}
            onTrigger={() => setSelectedDate(today)}
          />
        </>
      }
    >
      {children}
      <SectionGrid className="lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)] lg:items-stretch">
        <ModulePanel
          eyebrow="Move"
          title="Walking calendar"
          description="Tap a day to log or edit. Logged days show your step count."
        >
          <WalkCalendar
            today={today}
            monthStart={monthStart}
            stamps={stamps}
            selectedDate={selectedDate}
            onSelectDate={openLog}
          />
        </ModulePanel>
        <ModulePanel eyebrow="Move" title="History" description="Newest walks first.">
          <WalkHistoryList logs={stamps} onEdit={openLog} />
        </ModulePanel>
      </SectionGrid>
    </PageShell>
  );
}
