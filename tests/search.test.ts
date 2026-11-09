import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { localSearchProvider as provider } from "../src/lib/search";
import { articles } from "../src/data/articles";
import { categories } from "../src/data/categories";
import { headingId } from "../src/lib/format";
import { queryTerms } from "../src/lib/search-normalize";

test("întrebare naturală cu forme flexionate: monografia stocurilor", () => {
  assert.equal(
    provider.search("cum se face monografia pentru stocuri")[0]?.article.slug,
    "monografia-contabila-stocuri",
  );
});
test("căutarea ignoră diacriticele", () => {
  const withAccents = provider
    .search("cheltuieli deductibile")
    .map((hit) => hit.article.slug);
  const withoutAccents = provider
    .search("CHELTUIELI DEDUCTIBILE")
    .map((hit) => hit.article.slug);
  assert.deepEqual(withAccents, withoutAccents);
  assert.equal(
    provider.search("salarizare")[0]?.article.category,
    "salarizare",
  );
});
test("aliasurile SAF-T, SAFT și D406 găsesc același ghid", () => {
  for (const query of ["SAF-T", "SAF T", "saft", "D406"]) {
    assert.equal(
      provider.search(query)[0]?.article.slug,
      "saf-t-d406-pregatire-validare",
    );
  }
});

test("numerele formularelor sunt recunoscute în întrebări naturale", () => {
  assert.deepEqual(queryTerms("declarația 112"), queryTerms("D112"));
  assert.deepEqual(queryTerms("formularul 394"), queryTerms("D394"));
  assert.deepEqual(queryTerms("decont 300"), queryTerms("D300"));
  assert.deepEqual(queryTerms("D 406"), queryTerms("D406"));
  assert.deepEqual(queryTerms("formular 1046"), queryTerms("S1046"));
  assert.equal(provider.search("declarația 112")[0]?.article.slug,
    provider.search("D112")[0]?.article.slug);
});

test("sumele nu sunt confundate cu numerele formularelor", () => {
  const terms = queryTerms("TVA 100 euro");
  assert.ok(terms.includes("100"));
  assert.ok(!terms.includes("d100"));
  assert.ok(queryTerms("factura 300 lei").includes("300"));
});
test("aliasurile e-Factura au același rezultat principal", () => {
  for (const query of ["e-Factura", "e factura", "efactura"]) {
    assert.equal(provider.search(query)[0]?.article.slug, "ro-e-factura-ghid");
  }
});
test("titlul și tagurile primesc prioritate față de simple mențiuni", () => {
  assert.equal(
    provider.search("impozit pe dividende")[0]?.article.slug,
    "impozit-dividende-repartizare-declarare",
  );
  assert.equal(
    provider.search("TVA deductibil 2026")[0]?.article.slug,
    "tva-deductibil-conditii-documente-exemple",
  );
  assert.equal(
    provider.search("plan de conturi OMFP 1802")[0]?.article.slug,
    "plan-conturi-omfp-1802-2014",
  );
});
test("o greșeală minoră nu blochează găsirea", () => {
  assert.equal(provider.search("salarizre")[0]?.article.category, "salarizare");
});
test("căutarea include conținutul integral", () => {
  const result = provider
    .search("pro-rata")
    .find(
      (hit) => hit.article.slug === "tva-deductibil-conditii-documente-exemple",
    );
  assert.ok(result);
  assert.match(result.snippet ?? "", /pro-rata/i);
});
test("interogările fără sens sau cuvintele de legătură au empty state", () => {
  for (const query of ["", "   ", "cum se face", "zxqvv12345nonsense"]) {
    assert.deepEqual(provider.search(query), []);
  }
});
test("sugestiile includ categorii reale", () => {
  assert.ok(
    provider
      .suggestCategories("fiscalitate")
      .some((category) => category.slug === "fiscalitate"),
  );
  assert.ok(
    provider
      .suggestCategories("salarizare")
      .some((category) => category.slug === "salarizare"),
  );
});
test("catalogul păstrează baza280 și adăugirile auditate, cu URL-uri unice, categorii și cuprins valide", () => {
  const baseline = JSON.parse(readFileSync("docs/research/maintenance/20261106-live/baseline-280.json", "utf8"));
  assert.equal(baseline.articleCount, 280);
  assert.equal(articles.length, 281);
  for (const old of baseline.articles) assert.ok(articles.some(a => a.slug === old.slug));
  assert.equal(
    new Set(articles.map((article) => article.slug)).size,
    articles.length,
  );
  for (const article of articles) {
    assert.ok(
      categories.some((category) => category.slug === article.category),
    );
    assert.ok(article.excerpt.length > 50);
    assert.ok(article.content.length > 1000);
    const headings = [...article.content.matchAll(/^## (.+)$/gm)].map((match) =>
      headingId(match[1]),
    );
    assert.ok(headings.length >= 3);
    assert.equal(new Set(headings).size, headings.length);
    assert.ok(article.sources.length > 0);
    assert.ok(article.tags.length >= 3);
  }
});

test("întrebările practice găsesc ghidul dedicat din fiecare categorie", () => {
  const queries = [
    ["cum citesc o balanta de verificare", "balanta-de-verificare-cum-se-citeste"],
    ["cum imprumut firma ca asociat", "creditare-firma-asociat-monografie"],
    ["cand devin platitor de TVA", "plafon-tva-inregistrare-395000"],
    ["cod special TVA servicii UE", "cod-special-tva-servicii-ue"],
    ["termen D394", "declaratia-d394-termen-corectare"],
    ["cum modific vectorul fiscal D700", "d700-modificare-vector-fiscal"],
    ["salariu minim net 2026", "salariul-minim-2026-brut-net"],
    ["cum angajez primul salariat", "primul-angajat-contract-reges-online"],
    ["cum fac un SRL", "cum-infiintezi-un-srl-2026"],
    ["SRL fara activitate ce declaratii depun", "srl-fara-activitate-obligatii"],
    ["cum verific o factura inainte de plata", "cum-verifici-o-factura-inainte-de-plata"],
    ["cum corectez o factura in e-Factura", "corectare-factura-storno-efactura"],
  ];
  for (const [query, slug] of queries) {
    assert.equal(provider.search(query)[0]?.article.slug, slug, query);
  }
});

test("fiecare categorie primește două ghiduri noi și legăturile interne duc la articole reale", () => {
  const additions = new Set([
    "balanta-de-verificare-cum-se-citeste",
    "creditare-firma-asociat-monografie",
    "plafon-tva-inregistrare-395000",
    "cod-special-tva-servicii-ue",
    "declaratia-d394-termen-corectare",
    "d700-modificare-vector-fiscal",
    "salariul-minim-2026-brut-net",
    "primul-angajat-contract-reges-online",
    "cum-infiintezi-un-srl-2026",
    "srl-fara-activitate-obligatii",
    "cum-verifici-o-factura-inainte-de-plata",
    "corectare-factura-storno-efactura",
  ]);
  for (const category of categories) {
    assert.equal(
      articles.filter((article) => additions.has(article.slug) && article.category === category.slug).length,
      2,
      category.name,
    );
  }
  const slugs = new Set(articles.map((article) => article.slug));
  for (const article of articles) {
    for (const link of article.content.matchAll(/\]\(\/articol\/([a-z0-9-]+)\/?\)/g)) {
      assert.ok(slugs.has(link[1]), `${article.slug}: legătură lipsă ${link[1]}`);
    }
  }
});
