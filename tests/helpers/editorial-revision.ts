import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import type { Article } from "../../src/data/articles";

interface Revision {
  slug: string;
  action: "created" | "updated";
  beforeContentSha256?: string;
  beforeMetadataSha256?: string;
  contentSha256: string;
  metadataSha256?: string;
  authorAudit: { performedAfterDraft: boolean; contentSha256: string; unresolved: string[] };
  independentAudit?: { performedAfterDraft: boolean; contentSha256: string; unresolved: string[] };
  verificationAudit?: { performedAfterDraft: boolean; contentSha256: string; unresolved: string[] };
}
interface RevisionDocument { checkedAt: string; articles: Revision[] }
const index = JSON.parse(readFileSync("docs/research/maintenance/index.json", "utf8")) as { revisionFiles: string[] };
const documents: RevisionDocument[] = ["docs/research/updates-20261104/final-audits.json", ...index.revisionFiles]
  .map(file => JSON.parse(readFileSync(file, "utf8")));

function assertAudit(revision: Revision) {
  const second = revision.independentAudit ?? revision.verificationAudit;
  assert.ok(second, "Lipsește controlul factual ulterior: " + revision.slug);
  for (const audit of [revision.authorAudit, second]) {
    assert.equal(audit.performedAfterDraft, true, revision.slug);
    assert.equal(audit.contentSha256, revision.contentSha256, revision.slug);
    assert.deepEqual(audit.unresolved, [], revision.slug);
  }
}

function assertChain(article: Article, historicalHash: string, currentHash: string, kind: "Content" | "Metadata", historicalReviewDate?: string) {
  if (currentHash === historicalHash) {
    if (historicalReviewDate) assert.equal(article.reviewedAt, historicalReviewDate, article.slug);
    return;
  }
  let cursor = historicalHash;
  const visited = new Set<string>();
  let lastDate: string | undefined;
  while (cursor !== currentHash) {
    assert.ok(!visited.has(cursor), "Ciclu în lanțul auditurilor: " + article.slug);
    visited.add(cursor);
    const candidates = documents.flatMap(doc => doc.articles.filter(entry => entry.slug === article.slug && entry.action === "updated"
      && entry[kind === "Content" ? "beforeContentSha256" : "beforeMetadataSha256"] === cursor).map(entry => ({ doc, entry })));
    assert.equal(candidates.length, 1, "Revizie lipsă sau ambiguă: " + article.slug + " " + kind);
    const { doc, entry } = candidates[0];
    assertAudit(entry);
    assert.ok(!lastDate || doc.checkedAt >= lastDate, article.slug);
    lastDate = doc.checkedAt;
    const next = entry[kind === "Content" ? "contentSha256" : "metadataSha256"];
    assert.ok(next && next !== cursor, article.slug);
    cursor = next;
  }
  assert.equal(article.reviewedAt, lastDate, article.slug);
}

/** O revizie ulterioară trebuie să lege explicit ambele versiuni auditate. */
export function assertAuditedRevision(article: Article, historicalHash: string, historicalReviewDate?: string) {
  const currentHash = createHash("sha256").update(article.content).digest("hex");
  assertChain(article, historicalHash, currentHash, "Content", historicalReviewDate);
}

export function assertAuditedMetadataRevision(article: Article, historicalHash: string) {
  const { content: _content, ...metadata } = article;
  assertChain(article, historicalHash, createHash("sha256").update(JSON.stringify(metadata)).digest("hex"), "Metadata");
}
