import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Loturile editoriale păstrează invarianta inițială, cu tranziții explicite pentru UI cerut ulterior.
export function assertAuthorizedPresentationRevision(file: string, originalSha256: string) {
  const current = createHash("sha256").update(readFileSync(file)).digest("hex");
  if (current === originalSha256) return;
  const revisions = JSON.parse(readFileSync("docs/AUTHORIZED-PRESENTATION-REVISIONS.json", "utf8"));
  let accepted = originalSha256;
  for (const revision of revisions) {
    const change = revision.files.find((entry: any) => entry.file === file && entry.beforeSha256 === accepted);
    if (change) {
      assert.ok(revision.userRequest && revision.scope && revision.date, file);
      accepted = change.afterSha256;
    }
  }
  assert.equal(current, accepted, file + ": modificare fără tranziție autorizată");
}

