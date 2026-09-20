// Prototo design tokens — the source of truth for the Prototo brand.
//
// Consumed by prototo.app (Next.js), and shaped so Prototo Desktop (Electron) and
// the Prototo Viewer chrome (Expo / React Native) can read the same values.
//
// UNITLESS IS LOAD-BEARING. React Native's `borderRadius`, padding and font sizes
// are numbers, not strings. So `radius.btn` is `6`, never `'6px'`; each consumer
// adds the unit on the way out. Authoring it any other way makes this package
// unusable from RN, which is most of the reason it exists.
//
// NOT the product's theme presets. `proto-components` in the proto repo ships
// `base` / `liquidGlass` / `materialYou` to customers so they can theme the
// prototypes THEY build. Those are deliberately unbranded. Never put a Prototo
// brand value there: create-proto copies that source into every scaffolded
// project, so branding a preset lands your colours in every customer's work.

/**
 * Canonical across every Prototo surface: site, desktop app, docs, emails.
 * Agreed in writing by this repo's DESIGN.md and prototo-desktop/DESIGN.md (7625bff).
 * Each surface applies them per its own system; the hexes are shared.
 */
export const brand = {
  /** The logo-mark pink. 3.0:1 on white, so never put light text on it. */
  pink: '#E86A9C',
  /** The pink deepened for light surfaces so white text clears WCAG AA (4.80:1). */
  pinkStrong: '#C83C79',
  blush: '#F0E4E8',
} as const;

/**
 * This site's own chrome. Local by design — the desktop app is a dark tool UI and
 * carries a different neutral ramp under the same brand.
 */
export const chrome = {
  /** Primary text and dark CTAs. Warm near-black with a plum undertone. */
  ink: '#241820',
  secondary: '#6B7280',
  muted: '#9CA3AF',
  border: '#E5E7EB',
  /** Live-status indicator only. */
  accent: '#00A090',
  accentBg: '#F0FAF9',
  /** Legacy. Prefer the glass treatment. */
  badgeBg: '#F3F4F6',
  /** The page background. Was hardcoded 18 times and in no document. */
  page: '#F3F5F8',
  /** Full-bleed dark sections and the whole /download route. Also undocumented. */
  surfaceDark: '#0E100F',
} as const;

/**
 * Type scale, named from what the code actually does rather than from the DESIGN.md
 * table, which had drifted. Two corrections worth keeping:
 *
 *   - DESIGN.md called 13px "Mono / terminal". It is used 55 times and exactly ONE of
 *     those is on `font-mono`. It is the small UI size, so it is named that way.
 *   - DESIGN.md put the lede at 17px. That is used twice; 18px is used 23 times.
 *
 * These eight cover ~254 of the ~290 sized elements on the site. The remainder
 * (10, 16, 17, 20, 22, 24, 26, 30, 34) are drift, left arbitrary on purpose so they
 * stay visible rather than being laundered into names. See DESIGN.md.
 *
 * HERO IS DELIBERATELY ABSENT. 52 / 60 / 64 / 76px are used once each, which is four
 * hero sizes and no scale. Sheri's call which survive.
 */
export const type = {
  eyebrow: 11,
  fine: 12,
  bodySm: 13,
  bodyMd: 14,
  body: 15,
  lede: 18,
  /** Panel and card titles. Matches `headline` in the product's RN Text scale. */
  headline: 22,
  h2: 28,
  h1: 36,
} as const;

/**
 * The spacing ramp, in the same names the Prototo Viewer's theme already uses
 * (`proto-components/src/tokens`), so the two can eventually share one source.
 *
 * NOT wired into Tailwind's `spacing`. The site already uses Tailwind's default
 * 4px scale and uses it well: 13 steps, and exactly four off-grid values in
 * 13,674 lines. Adding `p-md` beside `p-4` would be two systems for one value.
 * This exists so the ramp is visible, documented, and portable to React Native,
 * which has no utility classes to inherit.
 */
export const space = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

/**
 * Type foundations.
 *
 * `family` is the real face name, which is what a design tool or React Native
 * needs. `cssVar` is the web binding, set by next/font in the consuming app.
 * A package that only exported `var(--font-inter)` would be telling every
 * non-web consumer nothing at all.
 */
export const font = {
  body: { family: 'Inter', cssVar: 'var(--font-inter)' },
  display: { family: 'Unbounded', cssVar: 'var(--font-unbounded)' },
  mono: { family: 'Geist Mono', cssVar: 'var(--font-geist-mono)' },
} as const;

/** Weights in use. The cap is 700; nothing on this site needs heavier. */
export const weight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** Tailwind's defaults, restated so they are visible rather than assumed. */
export const screen = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

/**
 * Shape, for the light web and desktop surfaces.
 *
 * Named for what they wrap, not t-shirt sizes, so a value cannot be reached for
 * because it "looked about right".
 *
 * NATIVE OVERRIDES THESE. iOS wants far rounder corners: cards at 22, modals at
 * 44. Those live in the platform's own theme rather than here, because a shared
 * `modal` token would be wrong for one of the two surfaces.
 */
export const radius = {
  /** Inline code chips and small controls. */
  chip: 5,
  btn: 6,
  card: 10,
  /** Desktop dialogs. Native sheets are much rounder; see the note above. */
  modal: 12,
} as const;

/**
 * Layout widths. `page` and `readable` are the two that appear across routes.
 *
 * Named `readable`, not `prose`, because `max-w-prose` is a Tailwind default (65ch)
 * and overriding it means anyone reaching for the built-in silently gets 680px
 * instead. Nothing uses it today; the name is the trap, so avoid the name.
 */
export const width = {
  /** Page container. Every section outer frame and the nav pill align here. */
  page: 1120,
  /** Readable text column. */
  readable: 680,
  /** Hero lede. */
  lede: 520,
  /** Hero body. */
  heroBody: 460,
} as const;

export const height = {
  /** Nav pill, fixed regardless of container width. */
  nav: 52,
} as const;

/**
 * WEB ONLY. CSS box-shadow strings do not travel to React Native, which wants
 * `shadowOffset` / `shadowRadius` / `elevation`. If the Viewer ever needs these they
 * get decomposed, not reused.
 *
 * `glass` existed twice in the codebase with the same three layers in two different
 * orders (sub-page-nav.tsx:27 led with the inset, not-found.tsx:19 led with the outer
 * drop). This is the DESIGN.md ordering. Reordering is visually safe: the two outer
 * layers keep their relative order and insets paint inside the border box while outers
 * paint outside, so the two never overlap.
 */
export const shadow = {
  glass:
    'inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 28px -12px rgba(15,23,42,0.18), 0 1px 2px rgba(15,23,42,0.06)',
  /** The glass recipe over a dark surface. */
  glassDark: '0 10px 30px -12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
} as const;

export const tokens = { brand, chrome, type, space, font, weight, screen, radius, width, height, shadow } as const;
export type Tokens = typeof tokens;
