// Emit tokens.json from the built dist.
//
// tokens.ts is the source; this is the artifact for anything that cannot read
// TypeScript: a design tool importing this repo, a Figma plugin, a native build.
// It is committed so it shows up in a repo import, and `npm run check`
// regenerates and fails on any diff, so it cannot drift quietly.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { tokens } = await import(join(root, "dist/index.js"));

writeFileSync(
  join(root, "tokens.json"),
  `${JSON.stringify({ $comment: "Generated from src/index.ts by scripts/build-json.mjs. Do not edit. Run npm run tokens:json.", ...tokens }, null, 2)}\n`,
);
console.log("wrote tokens.json");
