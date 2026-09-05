"use client";

import { deleteWalkDay } from "@/app/(dashboard)/workouts/actions";
import { UiIcon } from "@/components/icons/ui-icon";
import { DeleteRowButton } from "@/components/layout/delete-row-button";
import { EmptyNote } from "@/components/layout/empty-note";
import { SoftRow } from "@/components/layout/soft-row";
import type { TWalkStamp } from "@/components/walk/walk-calendar";
import { Button } from "@/components/ui/button";
import { ACTIONS, EMPTY } from "@/lib/app-copy";
import { formatMediumDate } from "@/lib/date.utils";
import { listFlushClass } from "@/lib/layout";
import { formatInt } from "@/lib/number.utils";
import { walkAchieved } from "@/lib/walk.utils";

export function WalkHistoryList({
  logs,
  onEdit,
}: {
  logs: TWalkStamp[];
  onEdit: (date: string) => void;
}) {
  const recent = [...logs].sort((a, b) => b.date.localeCompare(a.date));

  if (recent.length === 0) {
    return <EmptyNote title={EMPTY.walk.title} body={EMPTY.walk.body} icon="footprints" tone="gold" />;
  }

  return (
    <div className="dashboard-scroll min-h-0 max-h-[min(32rem,70dvh)] flex-1 overflow-y-auto overscroll-contain pr-1 lg:max-h-none">
      <ul className={listFlushClass}>
        {recent.map((row) => {
          const met = walkAchieved(row.steps, row.goalSteps);
          return (
            <li key={row.id}>
              <SoftRow
                flush
                title={`${formatInt(row.steps)} steps`}
                subtitle={
                  <>
                    <UiIcon name="calendar" size={14} className="shrink-0 text-muted-foreground" />
                    <span className="min-w-0 truncate">
                      {formatMediumDate(row.date)}
                      {` · ${formatInt(row.caloriesBurned)} kcal`}
                      {met ? " · goal met" : ""}
                    </span>
                  </>
                }
                action={
                  <div className="flex shrink-0 items-center gap-0.5">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      aria-label={ACTIONS.edit}
                      className="rounded-full text-muted-foreground hover:text-foreground"
                      onClick={() => onEdit(row.date)}
                    >
                      <UiIcon name="pencil" size={14} className="text-current" />
                    </Button>
                    <DeleteRowButton compact action={deleteWalkDay} id={row.id} />
                  </div>
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
