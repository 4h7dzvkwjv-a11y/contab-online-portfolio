import { readFileSync, readdirSync, existsSync, copyFileSync } from "node:fs";
import { createRequire } from "node:module";
import { spawnSync } from "node:child_process";
import path from "node:path";

const require = createRequire(import.meta.url);
const info = JSON.parse(
  readFileSync(new URL("../.openai/site.json", import.meta.url), "utf8"),
);
const origin = new URL(info.site_url);
if (origin.protocol !== "https:")
  throw new Error("Sites necesită o adresă HTTPS validă.");

// Originea publică este configurație de publicare, fără credențiale.
const result = spawnSync(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "build"],
  {
    stdio: "inherit",
    env: {
      ...process.env,
      CONTAB_STATIC_EXPORT: "1",
      NEXT_PUBLIC_SITE_URL: origin.origin,
    },
  },
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;

if (result.status === 0) {
  // Next 16 generează segmente RSC în subdirectoare; clientul solicită și
  // numele aplatizat cu puncte. Aliasurile evită cereri 404 pe un host static.
  const out = path.resolve("out");
  for (const entry of readdirSync(out, {
    recursive: true,
    withFileTypes: true,
  })) {
    if (!entry.isFile() || !entry.name.endsWith(".txt")) continue;
    const filename = path.join(entry.parentPath, entry.name);
    const parts = path.relative(out, filename).split(path.sep);
    const start = parts.findIndex((part) => part.startsWith("__next."));
    if (start < 0 || start === parts.length - 1) continue;
    const alias = path.join(
      out,
      ...parts.slice(0, start),
      parts.slice(start).join("."),
    );
    if (!existsSync(alias)) copyFileSync(filename, alias);
  }
}
