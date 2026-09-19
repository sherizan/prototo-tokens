---
name: prototo-design
description: Use when designing or building any Prototo surface — the marketing site, the iOS viewer chrome, the desktop app, docs, emails, decks or throwaway mocks. Carries the brand tokens (colour, type, spacing, shape, elevation), the rules that govern them, and the reasoning behind each one.
user-invocable: true
---

# Prototo brand design system

Read `DESIGN.md` in this package first. It is the system: principles, the token reference, and the
do's and don'ts. `README.md` covers how to consume the package.

## The values

| you want | read |
|---|---|
| the numbers, in code | `src/index.ts` |
| the numbers, as data | `tokens.json` |
| the numbers, as CSS variables | `dist/tokens.css` (generated) |
| the rules and the reasoning | `DESIGN.md` |

Import in TypeScript:

```ts
import { brand, chrome, type, space, radius, shadow } from "@sherizan/prototo-tokens";
```

Or link the stylesheet and use `--brand-pink`, `--chrome-page`, `--type-body`, `--space-md`.

## The five rules that matter most

1. **Pink is an event.** `brand.pink` is a logo, a live dot, a single CTA. Never a background. It is
   3.0:1 on white, so light text never sits on it. Use `brand.pinkStrong` (4.80:1) for any pink
   button carrying white text.
2. **The page is calm so the product isn't.** One pale neutral (`chrome.page`) and one near-black
   (`chrome.surfaceDark`). Colour and motion belong to the thing being demoed.
3. **Depth is light, not boxes.** The glass recipe is three layers in order: inset specular top edge,
   outer drop, near shadow. Never stack a border, a shadow and a gradient on the same card.
4. **The scale is closed.** Eight type sizes, five space steps. If a value has no name, do not reach
   for it; add it here first.
5. **Unitless.** Every dimension is a number, never `'6px'`. Each consumer adds the unit. This is
   what lets the same file serve a web app and a React Native app.

## The one hard boundary

**This is the brand, not the product.** Prototo ships theme presets (`base`, `liquidGlass`,
`materialYou`) to its users so they can theme the prototypes *they* build. Those live in the `proto`
repo, they are deliberately unbranded, and the scaffolder copies them into every new customer
project. **A Prototo brand value in there lands in every customer's work.** Two design systems, one
company; never merge them.

## Building something

If the output is a mock, a deck or a throwaway prototype, produce static HTML linking
`dist/tokens.css` and use the variables directly.

If the output is production code, read `DESIGN.md` in full and use the tokens through whatever layer
that surface already has — the Tailwind theme on the site, CSS variables on desktop, the theme
object in React Native.

Ask what is being built before designing it. The rules above constrain the answer; they do not
supply it.
