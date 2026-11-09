import { assertAuditedRevision, assertAuditedMetadataRevision } from "./helpers/editorial-revision";
import { assertDocumentedMaintenanceFileRevision } from "./helpers/maintenance-file-revision";
import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { articles, getArticle } from "../src/data/articles";
import { sources } from "../src/data/sources";
import { officialForms } from "../src/data/forms";
import { updateSelections } from "../src/data/updates";
import { localSearchProvider } from "../src/lib/search";
import { normalize } from "../src/lib/search-normalize";
import { headingId } from "../src/lib/format";
import { SITE_NAME } from "../src/lib/site";
import { articleFormDestinations } from "../src/data/form-reference-destinations";
import { articleFormDestinations as previousFormDestinations } from "../docs/research/batch60-round4-20261106/form-reference-baseline";
import { splitFormReferences, formDownloadTitle } from "../src/lib/form-links";

const dir = "docs/research/batch60-round4-20261106/";
const read = (name: string) => JSON.parse(readFileSync(dir + name, "utf8"));
const baseline = read("baseline-220.json");
const plan = read("plan.json");
const final = read("final-audits.json");
const searches = read("search-verification.json");
const sha = (value: string | Buffer) => createHash("sha256").update(value).digest("hex");
const lfSha = (file: string) => sha(readFileSync(file, "utf8").replaceAll("\r\n", "\n"));
const oldSlugs = new Set<string>(baseline.articles.map((a: any) => a.slug));
const plannedSlugs = new Set<string>(plan.articles.map((a: any) => a.slug));
const additions = articles.filter(article => plannedSlugs.has(article.slug));
const fold = (value: string) => normalize(value).replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
  .replace(/[^\p{L}\p{N}]+/gu, " ").trim();

test("lot4: 60 intenții noi, 20 pentru fiecare categorie cerută, peste cele 220 păstrate integral", () => {
  assert.equal(baseline.articleCount, 220);
  assert.equal(articles.filter(a => oldSlugs.has(a.slug) || plannedSlugs.has(a.slug)).length, 280);
  assert.equal(new Set(articles.map(a => a.slug)).size, articles.length);
  assert.equal(additions.length, 60);
  assert.equal(plan.articles.length, 60);
  assert.deepEqual(additions.map(a => a.slug).sort(), plan.articles.map((a: any) => a.slug).sort());
  for (const category of ["salarizare", "antreprenoriat", "ghiduri"]) {
    assert.equal(additions.filter(a => a.category === category).length, 20, category);
  }
  for (const previous of baseline.articles) {
    const current = getArticle(previous.slug)!;
    assert.ok(current, previous.slug);
    const {content, ...metadata} = current;
    assertAuditedRevision(current, previous.contentSha256);
    assertAuditedMetadataRevision(current, previous.metadataSha256);
  }
  for (const [id, source] of Object.entries(baseline.sources)) assert.deepEqual(sources[id as keyof typeof sources], source, id);
});

test("lot4: selecția Actualizări, prezentarea și cele 10 PDF-uri oficiale sunt nemodificate", () => {
  assert.deepEqual(updateSelections.filter(e => baseline.updateSelections.some((h: any) => h.articleSlug === e.articleSlug)), baseline.updateSelections);
  assert.equal(baseline.updateSelections.length, 17);
  assert.deepEqual(officialForms, baseline.forms);
  for (const previous of previousFormDestinations) {
    assert.deepEqual(articleFormDestinations.find(form => form.id === previous.id), previous, previous.id);
  }
  for (const entry of baseline.protectedFiles) if (!assertDocumentedMaintenanceFileRevision(entry.file, entry.sha256Lf)) assert.equal(lfSha(entry.file), entry.sha256Lf, entry.file);
  for (const form of officialForms) assert.equal(sha(readFileSync("public" + form.filePath)), form.sha256, form.id);
});

test("lot4: fiecare versiune finală este verificată după redactare de autor și de un alt agent", () => {
  assert.equal(final.articles.length, 60);
  assert.equal(final.authorAuditCount, 60);
  assert.equal(final.independentAuditCount, 60);
  assert.deepEqual(final.unresolved, []);
  assert.equal(final.manifests.length, 6);
  for (const manifest of final.manifests) assert.equal(lfSha(manifest.file), manifest.sha256Lf, manifest.file);
  assert.equal(final.auditFiles.length, 6);
  for (const report of final.auditFiles) assert.equal(lfSha(report.file), report.sha256Lf, report.file);
  for (const article of additions) {
    const row = final.articles.find((a: any) => a.slug === article.slug);
    assert.ok(row, article.slug);
    const {content, ...metadata} = article;
    assertAuditedRevision(article, row.contentSha256, "2026-11-06");
    assertAuditedMetadataRevision(article, row.metadataSha256);
    if (sha(content) === row.contentSha256) assert.equal(row.sourceFileSha256Lf, lfSha("src/data/content/" + article.slug + ".ts"), article.slug);
    assert.notEqual(row.authorAudit.agent, row.independentAudit.agent, article.slug);
    for (const audit of [row.authorAudit, row.independentAudit]) {
      assert.equal(audit.performedAfterDraft, true, article.slug);
      assert.equal(audit.contentSha256, row.contentSha256, article.slug);
      assert.ok(audit.checks.length >= 3, article.slug);
      assert.deepEqual(audit.unresolved, [], article.slug);
    }
    assert.ok(row.evidence.length >= 2 && row.evidence.every((e: any) => e.claim && e.clause && /^https:\/\//.test(e.sourceUrl)), article.slug);
    assert.equal(row.duplicateCheck.catalogScanned, 220, article.slug);
    assert.ok(row.duplicateCheck.existingSlugs.length >= 1 && row.duplicateCheck.existingSlugs.every((s: string) => oldSlugs.has(s)), article.slug);
    assert.ok(row.duplicateCheck.boundary.length >= 60, article.slug);
  }
});

test("lot4: răspunsuri substanțiale, cuprins valid, surse și legături interne reale", () => {
  const known = new Set(articles.map(a => "/articol/" + a.slug));
  for (const article of additions) {
    assert.ok((article.content.match(/[\p{L}\p{N}]+/gu) ?? []).length >= 850, article.slug);
    assert.ok(article.excerpt.length >= 90, article.slug);
    assert.equal(article.author, SITE_NAME);
    assert.equal(article.publishedAt, "2026-11-06", article.slug);
    assertAuditedRevision(article, final.articles.find((r: any) => r.slug === article.slug).contentSha256, "2026-11-06");
    const headings = [...article.content.matchAll(/^## (.+)$/gm)].map(m => headingId(m[1]));
    assert.ok(headings.length >= 5, article.slug);
    assert.equal(new Set(headings).size, headings.length, article.slug);
    const links = [...article.content.matchAll(/\]\((\/articol\/[^)#?]+)\)/g)].map(m => m[1].replace(/\/$/, ""));
    assert.ok(new Set(links).size >= 2, article.slug);
    for (const link of links) assert.ok(known.has(link), article.slug + " -> " + link);
    assert.doesNotMatch(article.content, /\]\(\/articole\/[^)#?]+\)/, article.slug + " prefix greșit al articolului");
    for (const id of article.sources) assert.ok(sources[id]?.label && /^https:\/\//.test(sources[id].url), article.slug + " -> " + id);
    assert.doesNotMatch(article.content, /material demonstrativ|date editoriale de exemplu|lorem ipsum/i, article.slug);
  }
});

test("lot4: întrebarea, un subtitlu unic și o frază din fiecare articol sunt căutabile", () => {
  assert.equal(searches.articleCount, 60);
  assert.equal(searches.queryCount, 180);
  assert.deepEqual(searches.failures, []);
  for (const row of searches.rows) {
    assert.equal(row.queries.length, 3, row.slug);
    for (const query of row.queries) {
      const hits = localSearchProvider.search(query.query);
      const rank = hits.findIndex(hit => hit.article.slug === row.slug) + 1;
      assert.ok(rank > 0 && rank <= query.maxRank, row.slug + " | " + query.query);
      if (query.type !== "reader-question") assert.ok(fold(hits[rank - 1].snippet ?? "").includes(fold(query.query)), row.slug + " snippet");
    }
  }
});

test("lot4: formularele noi au resurse verificate, iar contul 231 nu devine formular", () => {
  const proof = read("form-destinations-ghiduri.json");
  assert.equal(proof.destinations.length, 6);
  for (const observed of proof.destinations) {
    const destination = articleFormDestinations.find(form => form.code === observed.code)!;
    assert.ok(destination, observed.code);
    assert.equal(destination.filePath, observed.resourceUrl, observed.code);
    assert.equal(destination.sourcePage, observed.officialPage, observed.code);
    assert.equal(observed.httpStatus, 200, observed.code);
    assert.equal(observed.contentType, "application/pdf", observed.code);
    assert.match(observed.sha256, /^[a-f0-9]{64}$/, observed.code);
    if (observed.hasXfa) {
      assert.equal(destination.resourceType, "pdf", observed.code);
      assert.match(formDownloadTitle(destination), /Adobe Acrobat Reader desktop/);
    } else {
      assert.equal(destination.resourceType, "document", observed.code);
      assert.doesNotMatch(formDownloadTitle(destination), /PDF completabil/, observed.code);
    }
  }
  assert.ok(splitFormReferences("contul 231 și soldurile conturilor 232 și 233").every(part => !part.form));
  for (const reference of ["F1129", "OPME", "Z01", "formularul 030", "cererea 231", "modelul 232", "modelul 233"]) {
    assert.ok(splitFormReferences(reference).some(part => part.form), reference);
  }
});
