/**
 * Unified form controls — always use these instead of raw <input>, <textarea>, or <select>.
 */

import type { ComponentProps, ReactNode } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField, type TSelectOption } from "@/components/ui/select-field";
import { Textarea } from "@/components/ui/textarea";
import { Unit } from "@/components/ui/typography";
import {
  choiceChipClass,
  choiceChipCompactClass,
  choiceChipCompactSelectedClass,
  choiceChipSelectedClass,
  rangeInputClass,
} from "@/lib/field-control";
import { cn } from "@/lib/utils";

export { SelectField, type TSelectOption };
export { Label as FormLabel };

export function TextInput(props: ComponentProps<typeof Input>) {
  return <Input {...props} />;
}

export function NumberInput(props: Omit<ComponentProps<typeof Input>, "type">) {
  return <Input type="number" {...props} />;
}

export function DateInput(props: Omit<ComponentProps<typeof Input>, "type">) {
  return <Input type="date" {...props} />;
}

export function HiddenInput(props: Omit<ComponentProps<typeof Input>, "type">) {
  return <Input type="hidden" {...props} />;
}

export function RangeInput(props: Omit<ComponentProps<typeof Input>, "type">) {
  return <Input type="range" className={cn(rangeInputClass, props.className)} {...props} />;
}

export { Textarea };

export function InputSuffix({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Unit className={cn("pointer-events-none absolute inset-y-0 right-4 flex items-center", className)}>
      {children}
    </Unit>
  );
}

export function ChoiceChip({
  selected,
  compact = false,
  className,
  ...props
}: ComponentProps<"button"> & { selected?: boolean; compact?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        compact
          ? selected
            ? choiceChipCompactSelectedClass
            : choiceChipCompactClass
          : selected
            ? choiceChipSelectedClass
            : choiceChipClass,
        className
      )}
      {...props}
    />
  );
}

export function ChoiceChipGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-wrap gap-1.5", className)}>{children}</div>;
}
