"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { CELEBRATIONS, type TCelebrateKind } from "@/lib/app-copy";
import type { TFormState } from "@/lib/form-state.types";
import { pickRandom } from "@/lib/random.utils";

export function useResettingForm(
  action: (prev: TFormState, data: FormData) => Promise<TFormState>,
  celebrate?: TCelebrateKind,
  onSuccess?: () => void,
  resetOnSuccess = true
) {
  const formRef = useRef<HTMLFormElement>(null);
  const notified = useRef<TFormState>(null);
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (!state || notified.current === state) {
      return;
    }
    notified.current = state;

    if ("ok" in state && state.ok) {
      if (resetOnSuccess) {
        formRef.current?.reset();
      }
      if (celebrate) {
        toast.success(pickRandom(CELEBRATIONS[celebrate]));
      }
      onSuccess?.();
      return;
    }

    if ("error" in state && state.error) {
      toast.error(state.error);
    }
  }, [state, celebrate, onSuccess, resetOnSuccess]);

  return { formRef, state, formAction, isPending };
}
