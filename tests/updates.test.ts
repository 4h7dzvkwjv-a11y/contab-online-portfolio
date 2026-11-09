import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { articles, getArticle, type Article } from "../src/data/articles";
import { categories } from "../src/data/categories";
import { updateSelections, UPDATE_PERIOD_START, UPDATES_REVIEWED_AT } from "../src/data/updates";
import { buildUpdates, getUpdates } from "../src/lib/updates";
import { localSearchProvider } from "../src/lib/search";
import { headingId } from "../src/lib/format";
import { assertAuditedMetadataRevision, assertAuditedRevision } from "./helpers/editorial-revision";

const digest = (text: string) => createHash("sha256").update(text).digest("hex");
const baseline = JSON.parse(readFileSync("docs/research/updates-20261104/baseline-150.json", "utf8")) as {
  articleCount: number; articles: (Omit<Article, "content"> & { contentSha256: string; metadataSha256: string })[];
  preservedUi: Record<string, string>; homeHeroSha256: string;
};
interface FinalAudit {
  slug: string; category: string; action: "created" | "updated";
  beforeContentSha256?: string; beforeMetadataSha256?: string;
  contentSha256: string; metadataSha256: string;
  lexicalWords: number; eventDate: string;
  duplicateCheck: { catalogScanned: number; existingSlugs: string[]; decision: string };
  evidence: { claim: string; source: string; clause: string }[];
  authorAudit: { performedAfterDraft: boolean; contentSha256: string; unresolved: string[] };
  independentAudit: { performedAfterDraft: boolean; contentSha256: string; checks: unknown[]; unresolved: string[] };
}
const finalAudit = JSON.parse(readFileSync("docs/research/updates-20261104/final-audits.json", "utf8")) as {
  checkedAt: string; articles: FinalAudit[];
};
// Lotul istoric rămâne verificat distinct de extensiile auditate ulterior.
const historicalSlugs = new Set([...baseline.articles.map(a => a.slug), ...finalAudit.articles.map(a => a.slug)]);
const historicalCatalog = articles.filter(a => historicalSlugs.has(a.slug));
const historicalSelections = updateSelections.filter(e => finalAudit.articles.some(a => a.slug === e.articleSlug));

test("actualizările reutilizează patru URL-uri și adaugă nouă teme distincte, cu două selecții pe categorie", () => {
  assert.equal(baseline.articleCount, 150);
  assert.equal(historicalCatalog.length, 159);
  const old = new Set(baseline.articles.map(article => article.slug));
  for (const previous of baseline.articles) {
    const article = getArticle(previous.slug);
    assert.ok(article, previous.slug);
    const { content, ...metadata } = article;
    const revision = finalAudit.articles.find(entry => entry.slug === previous.slug && entry.action === "updated");
    if (revision) {
      assert.equal(revision.beforeContentSha256, previous.contentSha256, previous.slug);
      assert.equal(revision.beforeMetadataSha256, previous.metadataSha256, previous.slug);
      assert.equal(digest(content), revision.contentSha256, previous.slug);
      assert.equal(digest(JSON.stringify(metadata)), revision.metadataSha256, previous.slug);
      for (const key of ["title", "category", "type", "author", "publishedAt"] as const)
        assert.deepEqual(article[key], previous[key], previous.slug + ": " + key);
      assert.ok(previous.tags.every(tag => article.tags.includes(tag)), previous.slug);
      assert.ok(previous.sources.every(source => article.sources.includes(source)), previous.slug);
      assert.equal(article.reviewedAt, finalAudit.checkedAt, previous.slug);
    } else {
      assertAuditedRevision(article, previous.contentSha256);
      assertAuditedMetadataRevision(article, previous.metadataSha256);
    }
  }
  const additions = historicalCatalog.filter(article => !old.has(article.slug));
  assert.equal(additions.length, 9);
  assert.equal(finalAudit.articles.filter(entry => entry.action === "updated").length, 4);
  for (const category of categories) assert.ok(getUpdates().filter(entry => entry.article.category === category.slug).length >= 2, category.slug);
  for (const article of additions) {
    assert.equal(article.type, "noutate");
    assert.equal(article.publishedAt, "2026-11-04");
    assert.equal(article.reviewedAt, "2026-11-04");
    assert.ok((article.content.match(/[\p{L}\p{N}]+/gu) ?? []).length >= 850, article.slug);
    const headings = [...article.content.matchAll(/^## (.+)$/gm)].map(match => headingId(match[1]));
    assert.ok(headings.length >= 6, article.slug);
    assert.equal(headings.length, new Set(headings).size, article.slug);
  }
  for (const retired of ["aplicatii-anaf-saft-d406-d300-noiembrie-2026", "concediu-neefectuat-prescriptie-iccj-august-2026", "rambursare-tva-2026-criterii-risc-opanaf-1425"])
    assert.equal(getArticle(retired), undefined, retired);
});

test("fiecare selecție corespunde textului verificat de autor și unui audit independent final", () => {
  assert.equal(finalAudit.checkedAt, "2026-11-04");
  assert.equal(finalAudit.articles.length, 13);
  assert.deepEqual(finalAudit.articles.map(entry => entry.slug).sort(), historicalSelections.map(entry => entry.articleSlug).sort());
  for (const entry of finalAudit.articles) {
    const article = getArticle(entry.slug)!;
    assert.equal(digest(article.content), entry.contentSha256, entry.slug);
    assert.equal(entry.category, article.category, entry.slug);
    assert.equal(entry.eventDate, updateSelections.find(update => update.articleSlug === entry.slug)?.eventDate, entry.slug);
    assert.ok(entry.lexicalWords >= 850, entry.slug);
    for (const audit of [entry.authorAudit, entry.independentAudit]) {
      assert.equal(audit.performedAfterDraft, true, entry.slug);
      assert.equal(audit.contentSha256, entry.contentSha256, entry.slug);
      assert.deepEqual(audit.unresolved, [], entry.slug);
    }
    assert.ok(entry.independentAudit.checks.length >= 2, entry.slug);
    assert.equal(entry.duplicateCheck.catalogScanned, 150, entry.slug);
    assert.ok(entry.duplicateCheck.decision.length > 30, entry.slug);
    assert.ok(entry.duplicateCheck.existingSlugs.every(slug => baseline.articles.some(article => article.slug === slug)), entry.slug);
    assert.ok(entry.evidence.length >= 2 && entry.evidence.every(proof => proof.claim && proof.clause && /^https:\/\//.test(proof.source)), entry.slug);
  }
});

test("cronologia este o selecție unică de articole și date reale, fără copii ale corpurilor", () => {
  const entries = getUpdates().filter(e => historicalSelections.some(old => old.articleSlug === e.articleSlug));
  assert.equal(entries.length, 13);
  assert.equal(new Set(entries.map(entry => entry.articleSlug)).size, 13);
  assert.deepEqual(entries.map(entry => entry.eventDate), entries.map(entry => entry.eventDate).sort().reverse());
  assert.equal(entries[0].eventDate, "2026-11-03");
  for (const entry of entries) {
    assert.ok(entry.eventDate >= UPDATE_PERIOD_START && entry.eventDate <= UPDATES_REVIEWED_AT, entry.articleSlug);
    assert.equal(entry.article.slug, entry.articleSlug);
    assert.ok(!("content" in entry.article));
    assert.equal(entry.article.title, getArticle(entry.articleSlug)?.title);
    assert.ok(entry.eventLabel.length > 10 && entry.summary.length > 60, entry.articleSlug);
    assert.ok(getArticle(entry.articleSlug)?.sources.includes(entry.sourceId));
    assert.ok(/^(https:\/\/)(static\.anaf\.ro|www\.anaf\.ro|www\.onrc\.ro|legislatie\.just\.ro|www\.iccj\.ro)\//.test(entry.source.url), entry.source.url);
  }
});

test("data editorială nu influențează ordonarea evenimentelor", () => {
  const article = getArticle(updateSelections[0].articleSlug)!;
  const make = (slug: string, publishedAt: string): Article => ({ ...article, slug, publishedAt });
  const catalog = [make("older-event", "2026-11-04"), make("newer-event", "2026-07-01")];
  const first = { ...updateSelections[0], articleSlug: "older-event", eventDate: "2026-08-01" };
  const second = { ...updateSelections[0], articleSlug: "newer-event", eventDate: "2026-10-01" };
  assert.equal(buildUpdates([first, second], catalog)[0].articleSlug, "newer-event");
  assert.throws(() => buildUpdates([first, first], catalog), /duplicată/);
  assert.throws(() => buildUpdates([{ ...first, articleSlug: "missing" }], catalog), /fără articol/);
  assert.throws(() => buildUpdates([{ ...first, eventDate: "2026-02-30" }], catalog), /Data evenimentului/);
  assert.throws(() => buildUpdates([{ ...first, eventDate: "2026-13-01" }], catalog), /Data evenimentului/);
});

test("home păstrează categoriile și hero; meniul respectă ordinea și destinațiile aprobate", () => {
  // Meniul, logo-ul, contrastul și linkul legal au fost autorizate în taskurile ulterioare.
  for (const [file, hash] of Object.entries(baseline.preservedUi)) {
    if (!["src/components/header.tsx", "src/components/footer.tsx", "src/app/globals.css"].includes(file)) assert.equal(digest(readFileSync(file, "utf8")), hash, file);
  }
  const home = readFileSync("src/app/page.tsx", "utf8");
  assert.equal(digest(home.match(/<section className="hero container"[\s\S]*?<\/section>/)![0]), baseline.homeHeroSha256);
  assert.match(home, /<UpdatesSection \/>/);
  assert.doesNotMatch(home, /<RecentArticles/);
  assert.match(home, /<CategoryGrid \/>/);
  const page = readFileSync("src/app/actualizari/page.tsx", "utf8");
  assert.doesNotMatch(page, /SearchBox|type="search"/);
  const header = readFileSync("src/components/header.tsx", "utf8");
  const navigation = header.match(/const navigation = \[[\s\S]*?\];/)![0];
  const destinations = [...navigation.matchAll(/href: "([^"]+)", label: "([^"]+)"/g)].map(match => [match[2], match[1]]);
  assert.deepEqual(destinations, [
    ["Actualizări", "/actualizari"], ["Formulare", "/formulare"], ["Articole", "/categorii"],
    ["Calculator taxe", "/calculator-taxe"], ["Consultanță", "/contact"],
  ]);
  const footer=readFileSync("src/components/footer.tsx","utf8");
  for(const path of ["/politica-de-confidentialitate","/termeni","/politica-de-cookie-uri","/contact"])
    assert.ok(footer.includes('href="'+path+'"'),path);
});

test("noile întrebări găsesc analiza dedicată fără a înlocui ghidurile generale", () => {
  const questions = [
    ["Registrul de evidență fiscală OMF 808 2026", "registrul-evidenta-fiscala-omf-808-2026"],
    ["raportare durabilitate OMF 1281", "raportare-durabilitate-omf-1281-2026"],
    ["casierii ONRC închise plata tarife", "plata-tarife-onrc-casierii-inchise-2026"],
    ["preschimbare termen ONRC audienta", "preschimbare-termen-onrc-audienta-2026"],
    ["SFIA procedura OMF 1128", "sfia-2026-procedura-omf-1128"],
    ["rambursare TVA criterii risc 1425", "rambursare-tva-decont-negativ"],
    ["formular 081 scoatere registrul optional", "formular-081-efactura-optional-scoatere-2026"],
    ["D300 nedepus impunere oficiu", "d300-nedepus-impunere-oficiu-2026"],
    ["FNUASS cerere J1.5 recuperare", "fnuass-cerere-recuperare-rubrici-iulie-2026"],
    ["ICCJ 40 2026 compensare concediu", "concediu-odihna-indemnizatie-calcul"],
    ["TestSafT aplicații 3 noiembrie", "saf-t-d406-pregatire-validare"],
    ["TollRo tarife 8 octombrie electrice", "tollro-tarife-plata-firme-octombrie-2026"],
    ["dosar preturi transfer OPANAF 828 praguri", "persoane-afiliate-preturi-transfer"],
  ];
  for (const [query, slug] of questions) assert.equal(localSearchProvider.search(query)[0]?.article.slug, slug, query);
  assert.equal(localSearchProvider.search("SAF-T")[0]?.article.slug, "saf-t-d406-pregatire-validare");
});
