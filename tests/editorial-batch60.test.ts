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
  return JSON.parse(readFileSync(resolve("docs/research/batch60", name), "utf8"));
}

interface AuditedArticle {
  slug: string;
  category: string;
  query: string;
  contentSha256: string;
  lexicalWords: number;
  status: "passed";
  authorAudit: { performedAfterDraft: boolean; unresolved: string[] };
  independentAudit: {
    performedAfterDraft: boolean;
    checks: string[];
    unresolved: string[];
  };
  evidence: { claim: string; source: string; clause: string; period: string }[];
}

const audit = document<{ checkedAt: string; articles: AuditedArticle[] }>("final-audits.json");
const baseline = document<{
  articles: { slug: string; category: string; contentSha256: string }[];
}>("baseline-30.json");
const firstBatchSlugs = new Set([
  ...baseline.articles.map((article) => article.slug),
  ...audit.articles.map((article) => article.slug),
]);
const firstBatchCatalog = articles.filter((article) => firstBatchSlugs.has(article.slug));

// Aceste teste protejează inventarul, versiunea auditată și căutarea.
// Verificarea juridică este documentată separat, pentru fiecare articol.
test("primul lot păstrează cele 30 de texte și cele 10 adăugări în fiecare categorie", () => {
  assert.equal(baseline.articles.length, 30);
  assert.equal(audit.articles.length, 60);
  assert.equal(firstBatchCatalog.length, 90);
  assert.equal(new Set(audit.articles.map((article) => article.slug)).size, 60);
  for (const original of baseline.articles) {
    const current = getArticle(original.slug);
    assert.ok(current, original.slug);
    assertAuditedRevision(current, original.contentSha256);
    assert.ok(!audit.articles.some((article) => article.slug === original.slug));
  }
  for (const category of categories) {
    assert.equal(audit.articles.filter((article) => article.category === category.slug).length, 10);
    const before = baseline.articles.filter((article) => article.category === category.slug).length;
    assert.equal(firstBatchCatalog.filter((article) => article.category === category.slug).length, before + 10);
  }
});

test("fiecare text publicat corespunde versiunii auditate de două ori și are dovezi primare", () => {
  for (const entry of audit.articles) {
    const article = getArticle(entry.slug);
    assert.ok(article, entry.slug);
    assert.equal(entry.status, "passed", entry.slug);
    assertAuditedRevision(article, entry.contentSha256, audit.checkedAt);
    assert.equal(entry.authorAudit.performedAfterDraft, true, entry.slug);
    assert.equal(entry.independentAudit.performedAfterDraft, true, entry.slug);
    assert.deepEqual(entry.authorAudit.unresolved, [], entry.slug);
    assert.deepEqual(entry.independentAudit.unresolved, [], entry.slug);
    assert.ok(entry.independentAudit.checks.length >= 2, entry.slug);
    assert.ok(entry.evidence.length > 0, entry.slug);
    assert.ok(entry.lexicalWords >= 850, entry.slug);
    assert.ok(article.sources.every((source) => source in sources), entry.slug);
    assert.ok(entry.evidence.every((evidence) =>
      evidence.claim && evidence.clause && evidence.period && /^https:\/\//.test(evidence.source)
    ), entry.slug);
  }
});

test("întrebările celor 60 de articole găsesc materialul dedicat pe primul loc", () => {
  for (const entry of audit.articles) {
    assert.equal(localSearchProvider.search(entry.query)[0]?.article.slug,
      entry.slug, entry.query);
  }
});

test("formularele noi sunt găsite după număr, inclusiv în formulări fără prefix D", () => {
  const forms = {
    "100": "declaratia-d100-obligatii-corectare",
    "101": "declaratia-d101-completare-depunere",
    "112": "declaratia-d112-completare-corectare",
    "205": "declaratia-d205-venituri-retinere-sursa",
    "207": "declaratia-d207-nerezidenti",
    "300": "decont-tva-d300-verificare-corectare",
    "301": "decont-special-tva-d301",
    "390": "declaratia-d390-vies-operatiuni",
  };
  for (const [number, slug] of Object.entries(forms)) {
    for (const query of [`D${number}`, `formular ${number}`]) {
      assert.equal(localSearchProvider.search(query)[0]?.article.slug, slug, query);
    }
  }
});
