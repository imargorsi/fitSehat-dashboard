"use client";

import { useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

import { FitSehatAiResult } from "@/components/calories/fitsehat-ai-result";
import { MealWhenRow } from "@/components/calories/meal-when-row";
import { ActionButton } from "@/components/layout/action-button";
import { FormError } from "@/components/layout/form-error";
import { FormChunk, FormField, FormStack } from "@/components/layout/form-field";
import { UiIcon } from "@/components/icons/ui-icon";
import { Textarea } from "@/components/ui/form-controls";
import { Caption, Muted } from "@/components/ui/typography";
import { useFitSehatAi } from "@/hooks/useFitSehatAi.hook";
import { AI } from "@/lib/app-copy";
import type { TCalorieMeal } from "@/lib/constants";
import { dialogDockActionClass, dialogPanelClass, dialogScrollClass } from "@/lib/layout";
import { suggestedMealNow } from "@/lib/meals.utils";
import { EASE_OUT } from "@/lib/motion";

function AnalyzingNote() {
  const reduced = useReducedMotion();
  const steps = [AI.identifying, AI.portions, AI.nutrition];

  return (
    <div className="grid gap-3 rounded-2xl bg-muted/30 px-4 py-5">
      <Muted className="flex items-center gap-2">
        <UiIcon name="loader" size={16} spin className="text-muted-foreground" />
        {AI.analyzing}
      </Muted>
      <ul className="grid gap-1.5">
        {steps.map((step, index) => (
          <motion.li
            key={step}
            initial={reduced ? false : { opacity: 0.35 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduced ? 0 : index * 0.4, duration: 0.35, ease: EASE_OUT }}
          >
            <Caption>{step}</Caption>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

export function FitSehatAiPanel({
  today,
  onSuccess,
}: {
  today: string;
  onSuccess?: () => void;
}) {
  const ai = useFitSehatAi();
  const [meal, setMeal] = useState<TCalorieMeal>(() => suggestedMealNow());
  const [loggedOn, setLoggedOn] = useState(today);
  const canAnalyze = ai.description.trim().length > 0 && !ai.isBusy;
  const canRecalculate = ai.clarification.trim().length > 0 && !ai.isBusy;
  const showComposer = ai.phase === "idle" || (ai.phase === "analyzing" && !ai.analysis);
  const showResult = ai.analysis?.status === "success" && (ai.phase === "result" || ai.phase === "adjusting" || ai.phase === "reanalyzing");
  const showClarification =
    ai.phase === "adjusting" ||
    ai.phase === "reanalyzing" ||
    ai.analysis?.status === "clarification_required";

  function handleComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && canAnalyze) {
      event.preventDefault();
      ai.analyze();
    }
  }

  return (
    <div className={dialogPanelClass}>
      <div className={dialogScrollClass}>
        <FormStack className="gap-0">
          {showComposer ? (
            <FormChunk>
              <Textarea
                id="aiMeal"
                rows={5}
                autoFocus
                aria-label={AI.hint}
                value={ai.description}
                onChange={(event) => ai.setDescription(event.target.value)}
                onKeyDown={handleComposerKeyDown}
                placeholder={AI.placeholder}
                disabled={ai.isBusy}
              />
              {ai.phase === "analyzing" ? <AnalyzingNote /> : null}
            </FormChunk>
          ) : null}

          <FormChunk>
            <MealWhenRow
              meal={meal}
              onMeal={setMeal}
              dateId="aiLoggedOn"
              loggedOn={loggedOn}
              onLoggedOn={setLoggedOn}
            />
          </FormChunk>

          {showResult && ai.analysis?.status === "success" ? (
            <FormChunk>
              <Caption>{AI.understood}</Caption>
              <FitSehatAiResult
                analysis={ai.analysis}
                meal={meal}
                loggedOn={loggedOn}
                notes={ai.description}
                canConfirm={ai.phase === "result"}
                onAdjust={ai.startAdjust}
                onSuccess={onSuccess}
              />
            </FormChunk>
          ) : null}

          {showClarification ? (
            <FormChunk>
              <FormField
                label={ai.analysis?.status === "clarification_required" ? ai.analysis.message : AI.adjustHint}
                htmlFor="aiClarification"
              >
                <Textarea
                  id="aiClarification"
                  rows={3}
                  value={ai.clarification}
                  onChange={(event) => ai.setClarification(event.target.value)}
                  placeholder={AI.adjustPlaceholder}
                  disabled={ai.isBusy}
                />
              </FormField>
              {ai.phase === "reanalyzing" ? <AnalyzingNote /> : null}
            </FormChunk>
          ) : null}
        </FormStack>
      </div>

      {showComposer ? (
        <div className={dialogDockActionClass}>
          <ActionButton
            type="button"
            size="lg"
            icon="sparkles"
            pending={ai.phase === "analyzing"}
            pendingLabel={AI.analyzing}
            disabled={!canAnalyze}
            className="w-full rounded-full"
            onClick={ai.analyze}
          >
            {AI.analyze}
          </ActionButton>
          <FormError error={ai.error ?? undefined} />
        </div>
      ) : null}

      {showClarification ? (
        <div className={dialogDockActionClass}>
          <ActionButton
            type="button"
            size="lg"
            icon="sparkles"
            pending={ai.phase === "reanalyzing"}
            pendingLabel={AI.analyzing}
            disabled={!canRecalculate}
            className="w-full rounded-full"
            onClick={ai.recalculate}
          >
            {AI.recalculate}
          </ActionButton>
          <FormError error={ai.error ?? undefined} />
        </div>
      ) : null}

      {!showComposer && !showClarification && ai.error ? (
        <div className={dialogDockActionClass}>
          <FormError error={ai.error} />
        </div>
      ) : null}
    </div>
  );
}
