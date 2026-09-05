"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode } from "react";

import { appIcons, type TAppIconName } from "@/components/icons/app-icons";
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
  variant = "outline",
}: {
  href: string;
  label: string;
  icon: TAppIconName;
  className?: string;
  iconTone?: keyof typeof iconToneClass;
  variant?: "outline" | "filled";
}) {
  const { ref, animate, stop } = useIconHover();
  const Icon = appIcons[icon];
  const isFilled = variant === "filled";

  return (
    <Button
      variant={isFilled ? "filled" : "outline"}
      size="sm"
      nativeButton={false}
      render={<Link href={href} />}
      className={cn(isFilled ? "w-full rounded-full" : navOutlineButtonClass, className)}
      onMouseEnter={animate}
      onMouseLeave={stop}
      onFocus={animate}
      onBlur={stop}
    >
      <Icon
        ref={ref}
        size={16}
        duration={0.85}
        className={isFilled ? "text-neon-foreground" : iconToneClass[iconTone]}
      />
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
  icon: TAppIconName;
  iconTone?: keyof typeof iconToneClass;
}) {
  const { ref, animate, stop } = useIconHover();
  const Icon = appIcons[icon];

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
