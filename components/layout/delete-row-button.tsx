"use client";

import { useActionState, useCallback, useState } from "react";
import { toast } from "sonner";

import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HiddenInput } from "@/components/ui/form-controls";
import { ACTIONS, CONFIRM, DELETE_TOAST } from "@/lib/app-copy";
import type { TFormState } from "@/lib/form-state.types";

export function DeleteRowButton({
  action,
  id,
  successMessage = DELETE_TOAST,
  compact = false,
}: {
  action: (prev: TFormState, formData: FormData) => Promise<TFormState>;
  id: string;
  successMessage?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const handleAction = useCallback(
    async (prev: TFormState, formData: FormData) => {
      const result = await action(prev, formData);
      if (!result) {
        return result;
      }
      if ("ok" in result && result.ok) {
        setOpen(false);
        toast.success(successMessage);
      } else if ("error" in result && result.error) {
        toast.error(result.error);
      }
      return result;
    },
    [action, successMessage]
  );
  const [, formAction, isPending] = useActionState(handleAction, null);

  return (
    <>
      <Button
        type="button"
        variant={compact ? "ghost" : "outline"}
        size={compact ? "icon" : "sm"}
        disabled={isPending}
        aria-label={ACTIONS.delete}
        className="rounded-full text-muted-foreground hover:text-rose"
        onClick={() => setOpen(true)}
      >
        <UiIcon name={isPending ? "loader" : "close"} size={14} className="text-current" spin={isPending} />
        {compact ? null : ACTIONS.delete}
      </Button>
      <Dialog open={open} onOpenChange={(next) => { if (!isPending) setOpen(next); }}>
        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{CONFIRM.deleteTitle}</DialogTitle>
            <DialogDescription>{CONFIRM.deleteBody}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="border-0 bg-transparent p-0 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
              {CONFIRM.deleteCancel}
            </Button>
            <form action={formAction}>
              <HiddenInput name="id" value={id} />
              <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending ? "Releasing…" : CONFIRM.deleteConfirm}
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
