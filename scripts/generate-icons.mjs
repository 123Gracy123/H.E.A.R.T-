/** Generate PWA PNG icons from SVG (requires sharp: optional) */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../public/icons");
mkdirSync(outDir, { recursive: true });

// Minimal PNG placeholders (1x1 red pixel expanded) — replace with sharp in production
const png192 = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64"
);
writeFileSync(join(outDir, "icon-192.png"), png192);
writeFileSync(join(outDir, "icon-512.png"), png192);
console.log("Icons written to public/icons/");
