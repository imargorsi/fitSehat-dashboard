---
name: Kinetic Dark Evolution
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#c8c4d4'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#928f9d'
  outline-variant: '#474552'
  surface-tint: '#c5c0ff'
  primary: '#c5c0ff'
  on-primary: '#2a1c84'
  primary-container: '#8d85ed'
  on-primary-container: '#23137f'
  inverse-primary: '#5950b5'
  secondary: '#aad54c'
  on-secondary: '#253500'
  secondary-container: '#769d13'
  on-secondary-container: '#202e00'
  tertiary: '#38d8f9'
  on-tertiary: '#003640'
  tertiary-container: '#00a0bb'
  on-tertiary-container: '#003039'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e4dfff'
  primary-fixed-dim: '#c5c0ff'
  on-primary-fixed: '#140067'
  on-primary-fixed-variant: '#41379b'
  secondary-fixed: '#c5f265'
  secondary-fixed-dim: '#aad54c'
  on-secondary-fixed: '#141f00'
  on-secondary-fixed-variant: '#384e00'
  tertiary-fixed: '#abedff'
  tertiary-fixed-dim: '#38d8f9'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 24px
  gutter: 16px
  card-padding: 20px
  section-gap: 32px
---

## Brand & Style

The design system is an ultra-modern, high-performance interface designed for elite fitness and wellness tracking. It evokes a sense of "Athletic Futurism"—combining the precision of biometric data with the atmospheric depth of a premium training environment.

The visual style is a hybrid of **Glassmorphism** and **Corporate Modern**, set against a deep midnight canvas. It prioritizes data clarity through high-fidelity visualizations while using translucent layers and subtle glowing accents to create a sense of three-dimensional space. The brand personality is focused, sophisticated, and motivating, targeting users who value both aesthetic refinement and technical depth in their digital tools.

## Colors

The palette is anchored by a deep **Midnight Neutral (#0F1115)**, providing a high-contrast foundation for vibrant functional accents. 

- **Primary (Perrywinkle):** Used for primary actions, active states, and as a soft glow in data visualizations.
- **Secondary (Lime):** Reserved for positive growth metrics, success states, and high-energy focal points.
- **Tertiary (Cyan):** Used for supplementary data streams and subtle gradients to add chromatic depth to surfaces.
- **Surface Strategy:** Backgrounds are not flat black; they utilize subtle radial gradients from the center (#1A1D23 to #0F1115) to create a sense of an expansive, physical environment.

## Typography

Typography leverages a sophisticated scale to establish a clear hierarchy within data-heavy views. 

**Plus Jakarta Sans** provides a friendly yet geometric structure for headings, making large numbers and titles feel modern and approachable. **Hanken Grotesk** is used for secondary text and labels to ensure maximum legibility at smaller scales. 

Contrast is achieved not just through size, but through intentional "de-emphasis" of secondary information using reduced opacity (70% for body text, 50% for tertiary labels) rather than shifting to lighter gray tones, which maintains the "deep" aesthetic of the design system.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous safe areas to maintain a premium, "un-cluttered" feel. 

- **Mobile:** 4-column grid with 24px side margins. 
- **Desktop:** 12-column grid with a max-width of 1440px, centered.
- **Rhythm:** An 8px linear scale is used for all internal component spacing, while 32px or 48px gaps are used between major content sections to allow the glassmorphic surfaces "room to breathe."
- **Visual Overlays:** Photography should use a 40% black-to-transparent linear gradient overlay to ensure that white typography remains readable regardless of the image content.

## Elevation & Depth

Hierarchy is established through **Tonal Layering** and **Glassmorphism** rather than traditional heavy shadows.

1.  **Base Level:** Deep Midnight (#0F1115).
2.  **Surface Level (Cards):** Semi-transparent fills (White at 5-8% opacity) with a 20px background blur.
3.  **Accent Level (Modals/Popovers):** Higher opacity fills with a subtle 1px inner border (White at 10%) to simulate a glass edge catching the light.
4.  **Shadows:** When used, shadows are "Ambient Glows"—highly diffused, using the primary or secondary color at very low opacity (10-15%) to make components feel like they are emitting light onto the surface below.

## Shapes

The shape language is consistently **Rounded**, reflecting the organic nature of human movement. 

Standard components use a 16px (1rem) corner radius. Large feature cards and containers use a 24px (1.5rem) radius. Progress indicators and chips should use "Pill" shapes (full rounding) to contrast against the structured grid of the layout.

## Components

- **Buttons:** Primary buttons use a solid Perrywinkle-to-Cyan gradient with white text. Secondary buttons utilize the "glass" style with a 1px white border.
- **Cards:** Must feature generous padding (20px+) and background blur. Information density should be kept low to emphasize key metrics.
- **Data Visualizations:** Graphs should use "smooth" interpolation (Bezier curves) rather than jagged lines. Lines should have a "neon" glow effect using an outer glow of the same color.
- **Progress Rings:** Use thick strokes (8pt+) with rounded caps. The background track of the ring should be a dark, semi-transparent version of the accent color.
- **Inputs:** Minimalist bottom-border only or fully enclosed glass fields with floating labels. Focus states are indicated by a perrywinkle outer glow.
- **Navigation:** A floating bottom bar using a high-blur glass effect, keeping the interface feeling lightweight and expansive.

---

## Implementation (FitSehat dashboard)

This guide is merged into the live app via `app/theme.css`. The clean Geist + glass chrome stays; only the palette shifts to match Kinetic Dark Evolution.

### Four primitives → CSS

| DESIGN.md | CSS variable | Tailwind alias |
|-----------|--------------|----------------|
| Midnight Neutral `#111317` | `--brand-midnight` | `background`, surfaces |
| Perrywinkle `#c5c0ff` | `--brand-perrywinkle` | `neon`, `primary` |
| Lime `#aad54c` | `--brand-lime` | `gold` (success / growth) |
| Cyan `#38d8f9` | `--brand-cyan` | `rose` (charts / depth) |

Legacy class names (`neon`, `gold`, `rose`, `violet`) are **aliases** so components did not need a wide refactor. Read `doc/THEME.md` for the full alias table.

### What changed in code

- **Primary gradient** (`bg-brand`): perrywinkle → cyan (was peach → champagne).
- **Body wash**: centered midnight depth + low-opacity perrywinkle / cyan / lime radials.
- **Glow shadows**: perrywinkle + cyan ambient glow (DESIGN.md elevation).
- **Progress ring**: perrywinkle → cyan stroke; track uses translucent perrywinkle.
- **Magic Card hover**: perrywinkle → cyan border spotlight.
- **Radius**: `1rem` (16px) default per shape language.

### What stayed the same

- Geist typography (not Plus Jakarta / Hanken yet).
- Glass panels, Magic Card, structured grid, AppDock / AppBar chrome.
- Semantic-token rule: no hex in components.

### Typography note

When ready to adopt Plus Jakarta Sans (headings) and Hanken Grotesk (body), add fonts in `app/layout.tsx` and update `lib/typography.ts` — do not mix ad-hoc font classes in product UI.