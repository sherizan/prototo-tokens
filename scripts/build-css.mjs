// Emit dist/tokens.css from the built dist.
//
// The TypeScript is the source. This is the CSS custom-property layer, for the
// two consumers that want variables rather than a JS import: Prototo Desktop
// (plain CSS, no build) and anything that links a stylesheet.
//
// Generated rather than hand-written, on purpose. A hand-kept CSS mirror is a
// fourth copy of the same values, and the whole reason this package exists is
// that the repo already had three.
//
// Names follow the shape Claude Design derived when it read this repo:
// --brand-*, --chrome-*, --type-*, --space-*, --radius-*, --width-*, --shadow-*.
// Run: npm run tokens:css

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const t = await import(join(root, "dist/index.js"));

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

/** Groups that emit as-is, with the unit a CSS value needs. */
const GROUPS = [
  { key: "brand", prefix: "brand", unit: "", note: "Brand. Pink is an event, never a page background." },
  { key: "chrome", prefix: "chrome", unit: "", note: "Chrome. The light-surface neutral ramp." },
  { key: "type", prefix: "type", unit: "px", note: "Type scale, named from real usage." },
  { key: "space", prefix: "space", unit: "px", note: "Spacing ramp. A 4px grid." },
  { key: "radius", prefix: "radius", unit: "px", note: "Shape." },
  { key: "width", prefix: "width", unit: "px", note: "Layout widths." },
  { key: "height", prefix: "height", unit: "px", note: "Fixed heights." },
  { key: "screen", prefix: "screen", unit: "px", note: "Breakpoints. md is the one where layout flips." },
  { key: "weight", prefix: "weight", unit: "", note: "Weights. 700 is the cap." },
  { key: "shadow", prefix: "shadow", unit: "", note: "Elevation. Web only: these do not travel to React Native." },
];

const lines = [
  "/* Prototo design tokens.",
  " *",
  " * GENERATED from src/index.ts by scripts/build-css.mjs. Do not edit.",
  " * Run `npm run tokens:css` after changing a token.",
  " */",
  ":root {",
];

for (const { key, prefix, unit, note } of GROUPS) {
  lines.push(`  /* ${note} */`);
  for (const [name, value] of Object.entries(t[key])) {
    lines.push(`  --${prefix}-${kebab(name)}: ${value}${typeof value === "number" ? unit : ""};`);
  }
  lines.push("");
}

// Font families carry both the real face and the web binding; CSS wants both,
// for different reasons: the var for a consumer that loads the font itself, the
// literal name for one that does not.
lines.push("  /* Type families. `-name` is the real face; use it when you are not");
lines.push("     binding the font yourself. */");
for (const [name, f] of Object.entries(t.font)) {
  lines.push(`  --font-${name}: ${f.cssVar};`);
  lines.push(`  --font-${name}-name: "${f.family}";`);
}

lines.push("}", "");
writeFileSync(join(root, "dist/tokens.css"), lines.join("\n"));
console.log("wrote dist/tokens.css");
