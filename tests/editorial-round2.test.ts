import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { articles, getArticle } from "../src/data/articles";
import { categories } from "../src/data/categories";
import { sources } from "../src/data/sources";
import { localSearchProvider } from "../src/lib/search";
import { assertAuditedRevision } from "./helpers/editorial-revision";

function document<T>(name: string): T {
  return JSON.parse(readFileSync(resolve("docs/research/batch60-round2", name), "utf8"));
}
interface Audit {
  slug: string;
  category: string;
  query: string;
  status: "passed";
  contentSha256: string;
  lexicalWords: number;
  informationGain: string;
  duplicateCheck: { existingSlugs: string[]; distinction: string };
  evidence: { claim: string; source: string; clause: string; period: string }[];
  authorAudit: { performedAfterDraft: boolean; unresolved: string[] };
  independentAudit: { status: "passed"; contentSha256: string; performedAfterDraft: boolean; checks: string[]; unresolved: string[] };
}
const baseline = document<{
  articleCount: number;
  articles: { slug: string; category: string; contentSha256: string }[];
}>("baseline-90.json");
const audit = document<{ checkedAt: string; articles: Audit[] }>("final-audits.json");
const round2Slugs = new Set([...baseline.articles.map(item => item.slug), ...audit.articles.map(item => item.slug)]);
const round2Catalog = articles.filter(article => round2Slugs.has(article.slug));

test("lotul al doilea păstrează cele 90 de texte și adaugă 10 în fiecare categorie", () => {
  assert.equal(baseline.articleCount, 90);
  assert.equal(baseline.articles.length, 90);
  assert.equal(round2Catalog.length, 150);
  assert.equal(audit.articles.length, 60);
  assert.equal(new Set(audit.articles.map((entry) => entry.slug)).size, 60);
  const previous = new Set(baseline.articles.map((entry) => entry.slug));
  for (const original of baseline.articles) {
    const current = getArticle(original.slug);
    assert.ok(current, original.slug);
    assertAuditedRevision(current, original.contentSha256);
  }
  for (const entry of audit.articles) assert.ok(!previous.has(entry.slug), entry.slug);
  for (const category of categories) {
    const before = baseline.articles.filter((entry) => entry.category === category.slug).length;
    assert.equal(audit.articles.filter((entry) => entry.category === category.slug).length, 10);
    assert.equal(round2Catalog.filter((entry) => entry.category === category.slug).length, before + 10);
  }
});

test("fiecare articol nou corespunde auditului final, surselor și delimitării verificate", () => {
  for (const entry of audit.articles) {
    const article = getArticle(entry.slug);
    assert.ok(article, entry.slug);
    assert.equal(entry.status, "passed", entry.slug);
    assertAuditedRevision(article, entry.contentSha256, audit.checkedAt);
    assert.equal(entry.authorAudit.performedAfterDraft, true, entry.slug);
    assert.equal(entry.independentAudit.performedAfterDraft, true, entry.slug);
    assert.equal(entry.independentAudit.status, "passed", entry.slug);
    assert.equal(entry.independentAudit.contentSha256, entry.contentSha256, entry.slug);
    assert.deepEqual(entry.authorAudit.unresolved, [], entry.slug);
    assert.deepEqual(entry.independentAudit.unresolved, [], entry.slug);
    assert.ok(entry.independentAudit.checks.length >= 2, entry.slug);
    assert.ok(entry.evidence.length > 0, entry.slug);
    assert.ok(entry.lexicalWords >= 850, entry.slug);
    assert.ok(entry.informationGain.length > 30, entry.slug);
    assert.ok(entry.duplicateCheck.existingSlugs.length > 0, entry.slug);
    assert.ok(entry.duplicateCheck.distinction.length > 30, entry.slug);
    assert.ok(article.sources.every((key) => key in sources), entry.slug);
    assert.ok(entry.evidence.every((proof) => proof.claim && proof.clause && proof.period
      && /^https:\/\//.test(proof.source)), entry.slug);
  }
});

test("întrebările celor 60 de articole din lotul al doilea găsesc materialul dedicat", () => {
  for (const entry of audit.articles) {
    assert.equal(localSearchProvider.search(entry.query)[0]?.article.slug, entry.slug, entry.query);
  }
});

test("noile declarații sunt găsite și după număr sau cerere, fără prefixul D", () => {
  const targets: Record<string, string> = {
    "107": "declaratia-d107-sponsorizari-beneficiari",
    "177": "formular-d177-redirectionare-impozit",
    "204": "declaratia-d204-asocieri-fara-personalitate",
    "230": "formular-d230-redirectionare-impozit",
    "307": "declaratia-d307-ajustari-tva",
    "311": "declaratia-d311-tva-cod-anulat",
    "318": "formular-d318-rambursare-tva-ue",
  };
  for (const [code, slug] of Object.entries(targets)) {
    for (const query of ["D " + code, "formular " + code, "cererea " + code]) {
      assert.equal(localSearchProvider.search(query)[0]?.article.slug, slug, query);
    }
  }
});
