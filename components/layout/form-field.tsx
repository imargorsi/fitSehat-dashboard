import { Children, cloneElement, type ReactElement, type ReactNode } from "react";

import { FormLabel, InputPrefix } from "@/components/ui/form-controls";
import { Eyebrow } from "@/components/ui/typography";
import { fieldControlIconPadClass } from "@/lib/field-control";
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

export function FormChunk({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3 border-t border-border pt-5 first:border-t-0 first:pt-0", className)}>
      {children}
    </div>
  );
}

export function IconField({
  icon,
  suffix,
  align = "center",
  className,
  children,
}: {
  icon: ReactNode;
  suffix?: ReactNode;
  align?: "center" | "start";
  className?: string;
  children: ReactElement<{ className?: string }>;
}) {
  const child = Children.only(children);
  return (
    <div className={cn("relative min-w-0", className)}>
      <InputPrefix align={align}>{icon}</InputPrefix>
      {cloneElement(child, {
        className: cn(fieldControlIconPadClass, child.props.className),
      })}
      {suffix}
    </div>
  );
}

export function FormSection({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("grid gap-2", className)}>
      <Eyebrow className="flex items-center gap-1.5">
        {icon}
        {title}
      </Eyebrow>
      {children}
    </section>
  );
}

export function OptionalMacroSection({
  title = "Macros · optional",
  icon,
  children,
}: {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className={optionalMacroSectionClass}>
      <Eyebrow className="flex items-center gap-1.5">
        {icon}
        {title}
      </Eyebrow>
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
