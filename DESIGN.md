# Prototo — Design System

The token system behind Prototo. Source of truth is `src/index.ts`; `tokens.json` is the generated
machine-readable copy.

This file covers what is **portable across surfaces**: brand, colour, type, spacing, shape,
elevation, and the rules that govern them. Anything specific to one surface lives in that repo's own
`DESIGN.md` (prototo.app's page layouts and shaders, Prototo Desktop's dark tool chrome).

> **Aesthetic in one line:** a pale, calm surface with warm near-black type, glass chrome that
> refracts what is behind it, and near-black sections where the product shows off.

---

## 1. Principles

The belief layer. Every rule below traces back to one of these; if it does not, the rule is
decoration.

> **The page is calm so the product isn't.**
> One pale neutral and one near-black. Colour, motion and 3D belong to the thing being demoed, not
> to the surface around it.

> **Depth comes from light, not from boxes.**
> Glass, something behind it to refract, and a single specular top edge. Not borders stacked on
> shadows stacked on gradients.

> **Pink is an event.**
> The brand pink is a logo, a live dot, a swatch. The moment it becomes a background it stops meaning
> anything, and it fails contrast on white anyway.

> **A scale you can't escape beats a rule you have to remember.**
> Named sizes and named surfaces exist so the wrong value has no name to reach for.

> **One system, three surfaces.**
> Values are plain numbers because React Native has no cascade. A token that only works in Tailwind
> is a stylesheet, not a design system.

---

## 2. Unitless, on purpose

Every dimension in this package is a **number**, not a string. `radius.btn` is `6`, never `'6px'`.

React Native's `borderRadius`, padding and font sizes are numbers. Each consumer adds the unit on
the way out: the web app spreads these into a Tailwind config, the desktop app emits CSS custom
properties, React Native uses them directly.

Colours are strings (hex or `rgba()`), which every platform accepts as-is.

---

## 3. Brand

| Token | Value | Use |
|---|---|---|
| `brand.pink` | `#E86A9C` | The logo mark. 3.0:1 on white, so never carry light text on it |
| `brand.pinkStrong` | `#C83C79` | The pink deepened so white text clears WCAG AA (4.80:1). Use for any pink button with light text |
| `brand.blush` | `#F0E4E8` | The pale tint |

These three are canonical across every Prototo surface: site, desktop app, docs, emails. Each surface
applies them through its own system. **Everything in `chrome` is local to the surface using it.**

### The pink is deliberately not a utility class

There is no `bg-brand-pink` in the consuming apps, and that is a decision rather than an omission. A
utility class puts the pink one keystroke from any surface, and the whole point is that it stays
rare. Import `brand` directly at the call site that genuinely needs it.

---

## 4. Colour

`chrome` is the neutral ramp for a light surface. A dark tool UI carries a different ramp under the
same brand; that belongs in its own repo.

| Token | Value | Use |
|---|---|---|
| `chrome.ink` | `#241820` | Primary text, dark CTAs. Warm near-black with a plum undertone that harmonises with the pink |
| `chrome.secondary` | `#6B7280` | Body and sub-headline text |
| `chrome.muted` | `#9CA3AF` | Fine print, eyebrows |
| `chrome.border` | `#E5E7EB` | Hairline borders |
| `chrome.page` | `#F3F5F8` | The page surface |
| `chrome.surfaceDark` | `#0E100F` | Full-bleed dark sections |
| `chrome.accent` | `#00A090` | Live indicator only |
| `chrome.accentBg` | `#F0FAF9` | Reserved |
| `chrome.badgeBg` | `#F3F4F6` | Legacy. Prefer the glass treatment |

**Never hardcode a colour in a component.** Add it here first.

---

## 5. Type

| Token | Size | Role |
|---|--:|---|
| `type.h1` | 36 | Section heading, wide viewports |
| `type.h2` | 28 | Section heading, narrow |
| `type.lede` | 18 | Sub-headline under a heading |
| `type.body` | 15 | Default body |
| `type.bodyMd` | 14 | Dense body, secondary blocks |
| `type.bodySm` | 13 | Small UI text |
| `type.fine` | 12 | Fine print |
| `type.eyebrow` | 11 | Uppercase section labels |

**Named from real usage, not from an intended scale.** These eight cover roughly 254 of 290 sized
elements on prototo.app. Hero sizes are deliberately absent: four of them exist and each is used
once, which is not a scale.

### Families and weights

| Token | Family | Use |
|---|---|---|
| `font.body` | Inter | Body copy |
| `font.display` | Unbounded | Headings |
| `font.mono` | Geist Mono | Code, terminal |

Each carries `family` (the real face name) and `cssVar` (the web binding). Weights: `light` 300 ·
`regular` 400 · `medium` 500 · `semibold` 600 · `bold` 700. **700 is the cap.**

---

## 6. Spacing

`space`: `xs` 4 · `sm` 8 · `md` 16 · `lg` 24 · `xl` 32.

A 4px grid. Web consumers can use their framework's default scale where it matches this grid, which
is usually simpler than a parallel set of named utilities. These names exist so the ramp is visible,
documented, and usable from platforms that have no utility classes.

---

## 7. Shape and elevation

`radius`: `btn` 6 · `card` 10.

`shadow` carries two web recipes, `glass` and `glassDark`. **These are CSS strings and do not travel
to React Native**, which wants `shadowOffset` / `shadowRadius` / `elevation`. A native consumer
decomposes them rather than reusing them.

The glass surface pairs a translucent white fill with a backdrop blur and the `glass` shadow: one
inset specular top edge, one outer drop, one near shadow, in that order.

---

## 8. Breakpoints

`screen`: `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280.

The one carrying real weight is **`md`**, where mobile layout rules flip.

---

## 9. Do's and Don'ts

| Principle | DO | DON'T |
|---|---|---|
| **The page is calm** | Use `chrome.page` and `chrome.surfaceDark` for surfaces | Introduce a third page-level background because a section "needs separation" |
| **Depth is light** | One specular edge, one ambient drop | Stack a border, a shadow and a gradient on the same card |
| **Pink is an event** | Import `brand.pink` at the one call site that needs it | Make it a utility class, or put white text on `#E86A9C` (3.0:1) |
| **The scale is closed** | `type.body`, `type.h2`, `type.eyebrow` | Reach for 19px because 18 looked small |
| **One system, three surfaces** | Add the value here as a unitless number | Write `'6px'`, or define a colour straight into a framework config |

---

## 10. What is not in here

**The product's theme presets.** `proto-components` in the `proto` repo ships `base`, `liquidGlass`
and `materialYou` to customers so they can theme the prototypes *they* build. Those are deliberately
unbranded and must stay that way: `create-proto` copies that source into every scaffolded project, so
a brand value there would land Prototo's colours in every customer's work.

Two design systems, one company. This package is the brand. That one is the product.
