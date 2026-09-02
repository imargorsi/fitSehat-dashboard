"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode } from "react";

import { careIcons, type TCareIconName } from "@/components/icons/care-icons";
import { Button } from "@/components/ui/button";
import type { IconHandle } from "@animateicons/react";
import { navOutlineButtonClass } from "@/lib/layout";
import { cn } from "@/lib/utils";

const iconToneClass = {
  rose: "text-rose",
  gold: "text-gold",
  neon: "text-neon",
  muted: "text-muted-foreground",
  foreground: "text-foreground",
} as const;

function useIconHover() {
  const ref = useRef<IconHandle>(null);
  return {
    ref,
    animate: () => ref.current?.startAnimation(),
    stop: () => ref.current?.stopAnimation(),
  };
}

export function AppLinkButton({
  href,
  label,
  icon,
  className,
  iconTone = "rose",
}: {
  href: string;
  label: string;
  icon: TCareIconName;
  className?: string;
  iconTone?: keyof typeof iconToneClass;
}) {
  const { ref, animate, stop } = useIconHover();
  const Icon = careIcons[icon];

  return (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={<Link href={href} />}
      className={cn(navOutlineButtonClass, className)}
      onMouseEnter={animate}
      onMouseLeave={stop}
      onFocus={animate}
      onBlur={stop}
    >
      <Icon ref={ref} size={16} duration={0.85} className={iconToneClass[iconTone]} />
      {label}
    </Button>
  );
}

export function AppIconButton({
  children,
  icon,
  className,
  iconTone = "rose",
  ...props
}: Omit<ComponentProps<typeof Button>, "children"> & {
  children: ReactNode;
  icon: TCareIconName;
  iconTone?: keyof typeof iconToneClass;
}) {
  const { ref, animate, stop } = useIconHover();
  const Icon = careIcons[icon];

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(navOutlineButtonClass, className)}
      onMouseEnter={animate}
      onMouseLeave={stop}
      onFocus={animate}
      onBlur={stop}
      {...props}
    >
      <Icon ref={ref} size={16} duration={0.85} className={iconToneClass[iconTone]} />
      {children}
    </Button>
  );
}
