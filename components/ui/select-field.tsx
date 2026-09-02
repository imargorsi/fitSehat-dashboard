"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { UiIcon } from "@/components/icons/ui-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fieldControlClass } from "@/lib/field-control";
import { cn } from "@/lib/utils";

export type TSelectOption = {
  value: string;
  label: string;
};

export function SelectField({
  name,
  id,
  options,
  defaultValue,
  required,
}: {
  name: string;
  id?: string;
  options: readonly TSelectOption[] | readonly string[];
  defaultValue?: string;
  required?: boolean;
}) {
  const autoId = useId();
  const triggerId = id ?? autoId;
  const hiddenRef = useRef<HTMLInputElement>(null);
  const normalized = useMemo(
    () =>
      options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option
      ),
    [options]
  );
  const fallback = defaultValue ?? normalized[0]?.value ?? "";
  const [value, setValue] = useState(fallback);
  const selected = normalized.find((option) => option.value === value) ?? normalized[0];

  useEffect(() => {
    const form = hiddenRef.current?.form;
    if (!form) {
      return;
    }
    const onReset = () => setValue(fallback);
    form.addEventListener("reset", onReset);
    return () => form.removeEventListener("reset", onReset);
  }, [fallback]);

  return (
    <div className="w-full">
      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        value={value}
        required={required}
        readOnly
      />
      <DropdownMenu>
        <DropdownMenuTrigger
          type="button"
          id={triggerId}
          className={cn(
            fieldControlClass,
            "flex items-center justify-between gap-2 text-left font-normal"
          )}
        >
          <span className="min-w-0 truncate">{selected?.label ?? "Choose"}</span>
          <UiIcon name="chevronDown" size={16} className="text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={6}
          className="min-w-(--anchor-width) border-border bg-popover text-popover-foreground shadow-glow"
        >
          {normalized.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className={cn(
                "cursor-pointer rounded-xl px-3 py-2.5 text-base text-foreground focus:bg-rose/15 focus:text-foreground",
                option.value === value && "bg-neon/15 text-neon"
              )}
              onClick={() => setValue(option.value)}
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
