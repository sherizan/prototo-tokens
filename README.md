# @sherizan/prototo-tokens

The design tokens behind [Prototo](https://prototo.app). Colour, type, spacing, shape and elevation,
as plain data.

```bash
npm i @sherizan/prototo-tokens
```

```ts
import { brand, chrome, type, space, radius } from "@sherizan/prototo-tokens";

chrome.page   // '#F3F5F8'
type.body     // 15
radius.btn    // 6
```

Or read [`tokens.json`](./tokens.json) directly if you are not in a TypeScript project.

## Why the numbers are unitless

`radius.btn` is `6`, not `'6px'`.

React Native's `borderRadius`, padding and font sizes are numbers, and it has no CSS cascade and no
utility classes. So each consumer adds the unit on the way out rather than the source carrying it.
That is the whole reason this is a package instead of a config file:

| consumer | how it reads these |
|---|---|
| prototo.app (Next.js) | spread into the Tailwind theme, `px` added there |
| Prototo Desktop (Electron) | emitted as CSS custom properties |
| Prototo Viewer (Expo) | used directly |

Colours are strings, which every platform takes as-is. The two `shadow` values are CSS strings and
are **web-only**; a native consumer decomposes them.

## What's here

| file | |
|---|---|
| `src/index.ts` | the source of truth |
| `tokens.json` | generated, for anything that cannot read TypeScript |
| `dist/tokens.css` | generated, CSS custom properties for consumers that want variables |
| `DESIGN.md` | the system: principles, the rules, and the do's and don'ts |
| `SKILL.md` | agent-skill entry point, so an agent can pick the system up whole |

```css
@import "@sherizan/prototo-tokens/tokens.css";
/* --brand-pink, --chrome-page, --type-body, --space-md, --radius-btn, --shadow-glass */
```

`tokens.json` is generated and committed. `npm run check` regenerates it and fails on any diff, so it
cannot drift from the source.

## Changing a token

1. Edit `src/index.ts`.
2. `npm run tokens:json`.
3. Commit both. `prepublishOnly` regenerates anyway, so a stale JSON cannot be published.

## What is deliberately not here

**The product's theme presets.** Prototo ships `base`, `liquidGlass` and `materialYou` to its users
so they can theme the prototypes *they* build. Those live in the `proto` repo, they are deliberately
unbranded, and they must stay that way: the scaffolder copies that source into every new project, so
a brand value there would land Prototo's colours in every customer's work.

Two design systems, one company. This is the brand. That is the product.
