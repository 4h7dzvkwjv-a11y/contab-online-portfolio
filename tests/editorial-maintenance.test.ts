import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { articles, getArticle } from "../src/data/articles";
import { updateSelections, UPDATES_REVIEWED_AT } from "../src/data/updates";
import { maintenanceEvents } from "../src/data/maintenance-20261105";
import { getUpdates } from "../src/lib/updates";
import { localSearchProvider } from "../src/lib/search";
import { assertAuditedMetadataRevision, assertAuditedRevision } from "./helpers/editorial-revision";
import { assertAuthorizedPresentationRevision } from "./helpers/authorized-presentation-revision";

const dir = "docs/research/maintenance/20261105-pilot/";
const read = (file: string) => JSON.parse(readFileSync(dir + file, "utf8"));
const before = read("inventory.json");
const final = read("final-audits.json");
const digest = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");

test("pilot: toate URL-urile istorice, datele inițiale și lanțul auditurilor se păstrează", () => {
  assert.equal(before.articleCount, 159);
  const pilotSlugs = new Set<string>([...before.articles, ...final.articles].map((a: any) => a.slug));
  const pilotCatalog = articles.filter(a => pilotSlugs.has(a.slug));
  assert.equal(pilotSlugs.size, 160);
  assert.equal(pilotCatalog.length, 160);
  assert.equal(new Set(pilotCatalog.map(a => a.slug)).size, 160);
  for (const old of before.articles) {
    const current = getArticle(old.slug)!;
    assert.ok(current, old.slug);
    assert.equal(current.publishedAt, old.publishedAt, old.slug);
    assert.equal(current.category, old.category, old.slug);
    assertAuditedRevision(current, old.contentSha256);
    assertAuditedMetadataRevision(current, old.metadataSha256);
    if (!final.articles.some((a: any) => a.slug === old.slug)) assertAuditedRevision(current, old.contentSha256, old.reviewedAt);
  }
  for (const old of before.historicalAuditFiles) assert.equal(digest(readFileSync(old.file)), old.sha256, old.file);
  for (const old of before.publicSourceBaseline.filter((f: any) => /src\/(components|app)\//.test(f.file))) assertAuthorizedPresentationRevision(old.file, old.sha256);
});

test("pilot: trei revizii și o întrebare nouă au textul exact auditat după redactare", () => {
  assert.equal(final.updatedCount, 3); assert.equal(final.addedCount, 1);
  assert.equal(final.articles.length, 4);
  for (const row of final.articles) {
    const article = getArticle(row.slug)!;
    const { content, ...metadata } = article;
    assert.equal(digest(content), row.contentSha256, row.slug);
    assert.equal(digest(JSON.stringify(metadata)), row.metadataSha256, row.slug);
    assert.equal(digest(readFileSync("src/data/content/" + row.slug + ".ts", "utf8").replaceAll("\r\n", "\n")), row.sourceFileSha256, row.slug);
    for (const pass of [row.authorAudit, row.verificationAudit]) {
      assert.equal(pass.performedAfterDraft, true); assert.equal(pass.contentSha256, row.contentSha256);
      assert.deepEqual(pass.unresolved, []); assert.ok(pass.checks.length >= 3);
    }
    assert.equal(row.duplicateCheck.catalogScanned, 159);
    assert.ok(row.duplicateCheck.decision.length > 60);
  }
});

test("pilot: aceeași pagină apare în catalog, categoria sa și cronologia evenimentului real", () => {
  assert.ok(UPDATES_REVIEWED_AT >= "2026-11-05");
  const historical = JSON.parse(readFileSync("docs/research/maintenance/20261106-live/baseline-280.json", "utf8")).updateSelections;
  const historicalCurrent = updateSelections.filter(e => historical.some((h: any) => h.articleSlug === e.articleSlug));
  assert.deepEqual(historicalCurrent, historical);
  assert.equal(historicalCurrent.length, 17);
  assert.equal(new Set(historicalCurrent.map(e => e.articleSlug)).size, 17);
  const entries = getUpdates();
  assert.deepEqual(entries.map(e => e.eventDate), entries.map(e => e.eventDate).sort().reverse());
  assert.equal(entries.filter(e => historical.some((h: any) => h.articleSlug === e.articleSlug))[0].eventDate, "2026-11-03");
  for (const event of maintenanceEvents) {
    const article = getArticle(event.articleSlug)!;
    assert.equal(entries.find(e => e.articleSlug === article.slug)?.article.slug, article.slug);
    assert.ok(event.eventDate < article.reviewedAt);
    assert.ok(article.sources.includes(event.sourceId));
  }
  assert.equal(localSearchProvider.search("taxa logistica colete restituire")[0]?.article.slug, "taxa-logistica-colete-eliminata-noiembrie-2026");
});

test("pilot: evidența accesului nu echivalează un eșec cu absența schimbărilor", () => {
  const access = read("source-access.json");
  const expected = new Set(read("source-catalogue.json").map((s: any) => s.url));
  assert.equal(expected.size, 220);
  assert.deepEqual(new Set(access.rows.map((r: any) => r.url)), expected);
  for (const row of access.rows.filter((r: any) => r.status == null)) assert.equal(row.intervalAdvanced, false);
  const state = JSON.parse(readFileSync("docs/research/maintenance/index.json", "utf8"));
  assert.equal(state.lastCompleteMonthlyAudit, null);
});
