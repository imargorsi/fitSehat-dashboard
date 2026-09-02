/**
 * FitSehat design system reference.
 *
 * Raw color values live ONLY in `app/theme.css` as `--brand-dusk`, `--brand-blush`,
 * `--brand-rose`, and `--brand-gold`. Everything else is derived via color-mix.
 *
 * In components use:
 * - Tailwind semantic tokens: `bg-background`, `text-neon`, `border-border`, etc.
 * - Typography: `components/ui/typography` (see `doc/THEME.md`)
 * - Buttons: `components/ui/button` variants (filled, outline, ghost, transparent)
 * - Forms: `components/ui/form-controls` (TextInput, NumberInput, ChoiceChip, RangeInput, etc.)
 *
 * Never use hex, rgb, oklch, hsl, or named CSS colors outside theme.css.
 * Never hand-roll typography or form chrome in product UI.
 */

export const BRAND_PRIMITIVES = ["dusk", "blush", "rose", "gold"] as const;

export type TBrandPrimitive = (typeof BRAND_PRIMITIVES)[number];

/** Semantic color classes allowed in Tailwind (non-exhaustive — prefer these families). */
export const SEMANTIC_COLORS = {
  surface: ["background", "card", "popover", "muted", "secondary"] as const,
  text: ["foreground", "muted-foreground", "card-foreground"] as const,
  brand: ["neon", "rose", "gold", "violet", "sage"] as const,
  border: ["border", "input", "ring"] as const,
} as const;
