"use client";

import { CalorieJournalBoard, type TCalorieJournalItem } from "@/components/calories/calorie-journal-board";
import { SceneIcon } from "@/components/icons/scene-icon";
import { ModulePanel } from "@/components/layout/module-panel";
import { EMPTY } from "@/lib/app-copy";
import { sceneHeroIconClass } from "@/lib/layout";
import { formatInt } from "@/lib/number.utils";

export type { TCalorieJournalItem };

export function CalorieJournal({ today, logs }: { today: string; logs: TCalorieJournalItem[] }) {
  return (
    <ModulePanel
      magic={false}
      bordered={false}
      icon={<SceneIcon src="/icons/healthy-eating.png" alt="" delay={0} className={sceneHeroIconClass} />}
      eyebrow="Fuel"
      title="Journal"
      description={
        logs.length === 0
          ? EMPTY.calories.body
          : `${formatInt(logs.length)} logged. Newest days first.`
      }
    >
      <CalorieJournalBoard today={today} logs={logs} empty={EMPTY.calories} />
    </ModulePanel>
  );
}
