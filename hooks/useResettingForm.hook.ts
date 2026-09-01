"use client";

import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";

import { CELEBRATIONS, type TCelebrateKind } from "@/lib/care-copy";
import { pickRandom } from "@/lib/care-notes";
import type { TFormState } from "@/lib/form-state.types";

export function useResettingForm(
  action: (prev: TFormState, data: FormData) => Promise<TFormState>,
  celebrate?: TCelebrateKind,
  onSuccess?: () => void
) {
  const formRef = useRef<HTMLFormElement>(null);
  const toasted = useRef<TFormState>(null);
  const [state, formAction, isPending] = useActionState(action, null);

  useEffect(() => {
    if (state && "ok" in state && state.ok && toasted.current !== state) {
      toasted.current = state;
      formRef.current?.reset();
      if (celebrate) {
        toast.success(pickRandom(CELEBRATIONS[celebrate]));
      }
      onSuccess?.();
    }
  }, [state, celebrate, onSuccess]);

  return { formRef, state, formAction, isPending };
}
