import type { ReactNode } from "react";

import { FormLabel } from "@/components/ui/form-controls";
import { Eyebrow } from "@/components/ui/typography";
import {
  formGridClass,
  formStackClass,
  optionalMacroSectionClass,
} from "@/lib/layout";
import { cn } from "@/lib/utils";

export function FormGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(formGridClass, className)}>{children}</div>;
}

export function FormStack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn(formStackClass, className)}>{children}</div>;
}

export function FormField({
  label,
  htmlFor,
  children,
  className,
  labelClassName,
}: {
  label: ReactNode;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className={cn("grid gap-2", className)}>
      <FormLabel htmlFor={htmlFor} className={labelClassName}>
        {label}
      </FormLabel>
      {children}
    </div>
  );
}

export function FormSection({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("grid gap-2", className)}>
      <Eyebrow>{title}</Eyebrow>
      {children}
    </section>
  );
}

export function OptionalMacroSection({
  title = "Macros · optional",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <section className={optionalMacroSectionClass}>
      <Eyebrow>{title}</Eyebrow>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{children}</div>
    </section>
  );
}

export function FormSubmitRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end sm:col-span-2 lg:col-span-4", className)}>{children}</div>
  );
}

export function FormErrorRow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("sm:col-span-2 lg:col-span-4", className)}>{children}</div>;
}
