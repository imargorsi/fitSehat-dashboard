"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { UiIcon } from "@/components/icons/ui-icon";
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
  const listId = `${triggerId}-list`;
  const hiddenRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const normalized = useMemo(
    () =>
      options.map((option) =>
        typeof option === "string" ? { value: option, label: option } : option
      ),
    [options]
  );
  const fallback = defaultValue ?? normalized[0]?.value ?? "";
  const [value, setValue] = useState(fallback);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
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

  useEffect(() => {
    if (!open) {
      return;
    }
    const place = () => {
      const trigger = triggerRef.current;
      if (!trigger) {
        return;
      }
      const rect = trigger.getBoundingClientRect();
      setCoords({ top: rect.bottom + 6, left: rect.left, width: rect.width });
    };
    place();
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) {
        return;
      }
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="relative w-full">
      <input
        ref={hiddenRef}
        type="hidden"
        name={name}
        value={value}
        required={required}
        readOnly
      />
      <button
        ref={triggerRef}
        type="button"
        id={triggerId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        className={cn(fieldControlClass, "flex items-center justify-between gap-2 text-left font-normal")}
        onClick={() => {
          const trigger = triggerRef.current;
          if (trigger) {
            const rect = trigger.getBoundingClientRect();
            setCoords({ top: rect.bottom + 6, left: rect.left, width: rect.width });
          }
          setOpen((current) => !current);
        }}
      >
        <span className="min-w-0 truncate">{selected?.label ?? "Choose"}</span>
        <UiIcon name="chevronDown" size={16} className="text-muted-foreground" />
      </button>
      {open
        ? createPortal(
            <div
              ref={menuRef}
              id={listId}
              role="listbox"
              aria-labelledby={triggerId}
              className="fixed z-[200] rounded-2xl border border-border bg-background p-1.5 shadow-glow"
              style={{ top: coords.top, left: coords.left, width: coords.width }}
            >
              {normalized.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  className={cn(
                    "flex w-full cursor-pointer rounded-xl px-3 py-2.5 text-left text-base text-foreground",
                    "hover:bg-rose/15 focus-visible:bg-rose/15 focus-visible:outline-none",
                    option.value === value && "bg-neon/15 text-neon"
                  )}
                  onClick={() => {
                    setValue(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
