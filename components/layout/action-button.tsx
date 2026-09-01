"use client";

import type { ComponentProps, ReactNode } from "react";

import type { TCareIconName } from "@/components/icons/care-icons";
import { UiIcon } from "@/components/icons/ui-icon";
import { Button } from "@/components/ui/button";

export function ActionButton({
  icon,
  pending = false,
  pendingLabel = "Saving…",
  children,
  disabled,
  ...props
}: ComponentProps<typeof Button> & {
  icon: TCareIconName;
  pending?: boolean;
  pendingLabel?: string;
  children: ReactNode;
}) {
  return (
    <Button disabled={disabled || pending} {...props}>
      {pending ? (
        <UiIcon name="loader" size={16} spin className="text-current" />
      ) : (
        <UiIcon name={icon} size={16} className="text-current" />
      )}
      {pending ? pendingLabel : children}
    </Button>
  );
}
