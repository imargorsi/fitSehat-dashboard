"use client";

import Link from "next/link";
import { useRef, type ComponentProps, type ReactNode } from "react";

import { careIcons, type TCareIconName } from "@/components/icons/care-icons";
import { Button } from "@/components/ui/button";
import type { IconHandle } from "@animateicons/react";
import { cn } from "@/lib/utils";

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
  iconTone?: "rose" | "gold" | "neon" | "muted" | "foreground";
}) {
  const ref = useRef<IconHandle>(null);
  const Icon = careIcons[icon];

  const toneClass = {
    rose: "text-rose",
    gold: "text-gold",
    neon: "text-neon",
    muted: "text-muted-foreground",
    foreground: "text-foreground",
  }[iconTone];

  const animate = () => ref.current?.startAnimation();
  const stop = () => ref.current?.stopAnimation();

  return (
    <Button
      variant="outline"
      size="sm"
      nativeButton={false}
      render={<Link href={href} />}
      className={cn(
        "h-9 shrink-0 rounded-full border-border/55 bg-transparent px-3.5 text-[0.8125rem] font-medium text-muted-foreground shadow-none hover:border-rose/35 hover:bg-transparent hover:text-foreground",
        className
      )}
      onMouseEnter={animate}
      onMouseLeave={stop}
      onFocus={animate}
      onBlur={stop}
    >
      <Icon ref={ref} size={16} duration={0.85} className={toneClass} />
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
  iconTone?: "rose" | "gold" | "neon" | "muted" | "foreground";
}) {
  const ref = useRef<IconHandle>(null);
  const Icon = careIcons[icon];

  const toneClass = {
    rose: "text-rose",
    gold: "text-gold",
    neon: "text-neon",
    muted: "text-muted-foreground",
    foreground: "text-foreground",
  }[iconTone];

  const animate = () => ref.current?.startAnimation();
  const stop = () => ref.current?.stopAnimation();

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        "h-9 shrink-0 rounded-full border-border/55 bg-transparent px-3.5 text-[0.8125rem] font-medium text-muted-foreground shadow-none hover:border-rose/35 hover:bg-transparent hover:text-foreground",
        className
      )}
      onMouseEnter={animate}
      onMouseLeave={stop}
      onFocus={animate}
      onBlur={stop}
      {...props}
    >
      <Icon ref={ref} size={16} duration={0.85} className={toneClass} />
      {children}
    </Button>
  );
}
