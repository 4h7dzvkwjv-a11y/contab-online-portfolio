import { assertAuditedRevision, assertAuditedMetadataRevision } from "./helpers/editorial-revision";
import { assertDocumentedMaintenanceFileRevision } from "./helpers/maintenance-file-revision";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { articles, getArticle } from "../src/data/articles";
import { sources } from "../src/data/sources";
import { categories } from "../src/data/categories";
import { updateSelections } from "../src/data/updates";
import { headingId } from "../src/lib/format";
import { localSearchProvider } from "../src/lib/search";
import { articleFormDestinations } from "../src/data/form-reference-destinations";
import { assertAuthorizedPresentationRevision } from "./helpers/authorized-presentation-revision";

const dir = "docs/research/batch60-round3-20261105/";
const read = (name: string) => JSON.parse(readFileSync(dir + name, "utf8"));
const baseline = read("baseline-160.json");
const final = read("final-audits.json");
const plan = read("plan.json");
const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const oldSlugs = new Set<string>(baseline.articles.map((a: any) => a.slug));
// Lotul istoric rămâne legat de manifestul său; loturile ulterioare au propriile baze.
const plannedSlugs = new Set<string>(plan.articles.map((a: any) => a.slug));
const additions = articles.filter(article => plannedSlugs.has(article.slug));

test("lot3: exact60 articole distincte, câte10 pe categorie, peste baza160 nemodificată", () => {
  assert.equal(baseline.articleCount, 160);
  assert.equal(articles.filter(a => oldSlugs.has(a.slug) || plannedSlugs.has(a.slug)).length, 220);
  assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
  assert.equal(additions.length, 60);
  assert.equal(plan.articles.length, 60);
  assert.deepEqual(additions.map(a => a.slug).sort(), plan.articles.map((a: any) => a.slug).sort());
  for (const category of categories) assert.equal(additions.filter(a => a.category === category.slug).length, 10, category.slug);
  for (const old of baseline.articles) {
    const current = getArticle(old.slug)!;
    assert.ok(current, old.slug);
    const { content, ...metadata } = current;
    assertAuditedRevision(current, old.contentSha256);
    assertAuditedMetadataRevision(current, old.metadataSha256);
  }
  for (const [id, source] of Object.entries(baseline.sourceDetails)) assert.deepEqual(sources[id as keyof typeof sources], source, id);
});

test("lot3: Actualizări, interfața și formularele originale sunt păstrate", () => {
  assert.equal(baseline.updateSelections.length, 17);
  assert.deepEqual(updateSelections.filter(e => baseline.updateSelections.some((h: any) => h.articleSlug === e.articleSlug)), baseline.updateSelections);
  assert.equal(sha(JSON.stringify(baseline.updateSelections)), baseline.updatesSha256);
  for (const entry of baseline.protectedFiles) {
    // Referințele de articol pot primi numai destinații suplimentare verificate.
    if (["src/data/form-reference-destinations.ts", "src/lib/form-links.ts"].includes(entry.file)) continue;
    if (!assertDocumentedMaintenanceFileRevision(entry.file, entry.sha256)) assertAuthorizedPresentationRevision(entry.file, entry.sha256);
  }
  for (const previous of read("form-reference-baseline.json")) {
    assert.deepEqual(articleFormDestinations.find(form => form.id === previous.id), previous, previous.id);
  }
});

test("lot3: fiecare text final are audit după redactare și control al unui alt agent", () => {
  assert.equal(final.articles.length, 60);
  assert.equal(final.unresolved.length, 0);
  assert.equal(final.manifests.length, 6);
  for (const manifest of final.manifests) {
    assert.equal(sha(readFileSync(manifest.file, "utf8").replaceAll("\r\n", "\n")), manifest.sha256LfNormalized, manifest.file);
  }
  for (const article of additions) {
    const row = final.articles.find((a: any) => a.slug === article.slug);
    assert.ok(row, article.slug);
    assertAuditedRevision(article, row.contentSha256, "2026-11-05");
    const { content: _content, ...metadata } = article;
    assertAuditedMetadataRevision(article, row.metadataSha256);
    if (sha(article.content) === row.contentSha256) assert.equal(row.sourceFileSha256, sha(readFileSync("src/data/content/" + article.slug + ".ts", "utf8").replaceAll("\r\n", "\n")), article.slug);
    assert.notEqual(row.authorAudit.agent, row.independentAudit.agent, article.slug);
    for (const audit of [row.authorAudit, row.independentAudit]) {
      assert.equal(audit.performedAfterDraft, true, article.slug);
      assert.equal(audit.contentSha256, row.contentSha256, article.slug);
      assert.deepEqual(audit.unresolved, [], article.slug);
      assert.ok(audit.checks.length >= 3, article.slug);
    }
    assert.ok(row.evidence.length >= 2 && row.evidence.every((e: any) => e.claim && e.clause && /^https:\/\//.test(e.sourceUrl)), article.slug);
    assert.equal(row.duplicateCheck.catalogScanned, 160, article.slug);
    assert.ok(row.duplicateCheck.decision.length >= 60, article.slug);
    assert.ok(row.duplicateCheck.existingSlugs.every((slug: string) => oldSlugs.has(slug)), article.slug);
  }
});

test("lot3: articole substanțiale, headinguri și trimiteri interne valide, surse identificabile", () => {
  const known = new Set(articles.map(a => "/articol/" + a.slug));
  for (const article of additions) {
    assert.ok((article.content.match(/[\p{L}\p{N}]+/gu) ?? []).length >= 850, article.slug);
    assert.ok(article.excerpt.length >= 90, article.slug);
    assert.equal(article.publishedAt, "2026-11-05", article.slug);
    assertAuditedRevision(article, final.articles.find((r: any) => r.slug === article.slug).contentSha256, "2026-11-05");
    assert.ok(article.sources.length >= 1, article.slug);
    for (const id of article.sources) assert.ok(sources[id]?.label && /^https:\/\//.test(sources[id].url), id);
    const headings = [...article.content.matchAll(/^## (.+)$/gm)].map(m => headingId(m[1]));
    assert.ok(headings.length >= 5, article.slug);
    assert.equal(headings.length, new Set(headings).size, article.slug);
    const links = [...article.content.matchAll(/\]\((\/articol\/[^)#?]+)\)/g)].map(m => m[1].replace(/\/$/, ""));
    assert.ok(links.length >= 1, article.slug);
    for (const link of links) assert.ok(known.has(link), article.slug + " -> " + link);
    assert.doesNotMatch(article.content, /material demonstrativ|date editoriale de exemplu|lorem ipsum/i, article.slug);
  }
});

test("lot3: întrebările distincte găsesc răspunsul nou în căutarea internă", () => {
  for (const row of final.articles) {
    assert.ok(row.searchQueries.length >= 2, row.slug);
    for (const query of row.searchQueries) {
      const hits = localSearchProvider.search(query);
      assert.ok(hits.slice(0, 5).some(hit => hit.article.slug === row.slug), query + " -> " + row.slug);
    }
  }
});
