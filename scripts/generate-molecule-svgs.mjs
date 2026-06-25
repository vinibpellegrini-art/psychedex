// Generates themed 2D molecule SVGs from the SMILES map, once, at build time,
// writing one static file per substance to public/structures/<id>.svg.
//
// This keeps OpenChemLib (a ~2.4 MB library) OUT of the browser bundle and
// out of the JS payload entirely — the app just lazy-loads the small static
// SVGs (CDN-cached, only the visible ones). Re-run after adding substances:
//
//   node scripts/generate-molecule-svgs.mjs
//
import { createRequire } from "module";
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const require = createRequire(import.meta.url);
const OCL = require("openchemlib");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "structures");
mkdirSync(outDir, { recursive: true });

// Theme: light bonds, brighter N, soft O — to read on the dark panels.
const RECOLOR = [
  ["rgb(0,0,0)", "rgb(228,226,242)"], // bonds / carbon skeleton
  ["rgb(48,80,248)", "rgb(129,140,248)"], // nitrogen
  ["rgb(255,13,13)", "rgb(248,113,113)"], // oxygen
];

// Parse the id -> SMILES map out of src/data/smiles.ts.
const smilesSrc = readFileSync(join(root, "src/data/smiles.ts"), "utf8");
const entries = [];
const re = /(\d+):\s*("(?:[^"\\]|\\.)*")/g;
let m;
while ((m = re.exec(smilesSrc)) !== null) {
  entries.push([Number(m[1]), JSON.parse(m[2])]);
}

let count = 0;
for (const [id, smiles] of entries) {
  try {
    const mol = OCL.Molecule.fromSmiles(smiles);
    let svg = mol.toSVG(300, 300, "mol" + id, {
      autoCrop: true,
      autoCropMargin: 6,
      strokeWidth: 1.5,
    });
    for (const [from, to] of RECOLOR) svg = svg.split(from).join(to);
    writeFileSync(join(outDir, `${id}.svg`), svg);
    count++;
  } catch (e) {
    console.warn(`skip id ${id}: ${e.message}`);
  }
}

console.log(`generated ${count} molecule SVGs -> public/structures/`);
