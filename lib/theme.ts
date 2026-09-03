/**
 * FitSehat design system reference.
 *
 * Raw color values live ONLY in `app/theme.css` as four brand primitives
 * from DESIGN.md (Kinetic Dark Evolution):
 *
 *   midnight, perrywinkle, lime, cyan
 *
 * Components consume semantic Tailwind aliases (neon, rose, gold, violet)
 * mapped to those primitives — do not reference hex in UI code.
 *
 * In components use:
 * - Tailwind semantic tokens: `bg-background`, `text-neon`, `border-border`, etc.
 * - Typography: `components/ui/typography` (see `doc/THEME.md`)
 * - Buttons: `components/ui/button` variants (filled, outline, ghost, transparent)
 * - Forms: `components/ui/form-controls`
 *
 * Never use hex, rgb, oklch, hsl, or named CSS colors outside theme.css.
 */

export const BRAND_PRIMITIVES = ["midnight", "perrywinkle", "lime", "cyan"] as const;

export type TBrandPrimitive = (typeof BRAND_PRIMITIVES)[number];

/** Semantic color classes allowed in Tailwind (non-exhaustive — prefer these families). */
export const SEMANTIC_COLORS = {
  surface: ["background", "card", "popover", "muted", "secondary"] as const,
  text: ["foreground", "muted-foreground", "card-foreground"] as const,
  brand: ["neon", "rose", "gold", "violet", "sage"] as const,
  border: ["border", "input", "ring"] as const,
} as const;

/** Maps Tailwind alias → DESIGN.md role */
export const BRAND_ALIAS_MAP = {
  neon: "perrywinkle — primary actions, active nav, key metrics",
  gold: "lime — success, growth, positive progress",
  rose: "cyan — charts, tertiary accents, gradient end",
  violet: "deep perrywinkle — secondary data series",
} as const;
