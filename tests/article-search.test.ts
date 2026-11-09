import test from "node:test";
import assert from "node:assert/strict";
import { articles, type Article } from "../src/data/articles";
import { createArticleSearch } from "../src/lib/article-search";
import { localSearchProvider } from "../src/lib/search";
import { normalize, queryTerms } from "../src/lib/search-normalize";

const fold = (text: string) => normalize(text)
  .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
  .replace(/[^\p{L}\p{N}]+/gu, " ").trim();

test("o frază copiată din corp are prioritate și apare în fragment, chiar dacă excerptul conține termeni comuni", () => {
  const query = "TVA se verifică potrivit art. 297–299 și regimului firmei. Un neplătitor nu";
  const hit = localSearchProvider.search(query)[0];
  assert.equal(hit.article.slug, "cheltuieli-constituire-201-amortizare-dividende");
  assert.ok(fold(hit.snippet ?? "").includes(fold(query)));
  assert.ok(!hit.snippet?.includes("https://"));
});

test("subtitlurile raportate de audit sunt primele și fără diacritice, la alte majuscule sau cu ghilimele", () => {
  const cases = [
    ["Ce trebuie să spună contractul", "garantii-buna-executie-retinute-monografie"],
    ["Exemplu: cost eligibil de 6.000 lei", "cheltuieli-constituire-201-amortizare-dividende"],
    ["Factura anuală nu produce automat venit pentru un an întreg", "venituri-in-avans-472-abonamente"],
    ["Evidența proprietarului și a clientului", "ambalaje-returnabile-garantii-nonsgr"],
  ];
  for (const [query, slug] of cases) {
    for (const variant of [query, normalize(query).toUpperCase(), "„" + query + "”"]) {
      assert.equal(localSearchProvider.search(variant)[0]?.article.slug, slug, variant);
    }
  }
});

test("subtitlurile unice ale întregului catalog rămân găsibile pe primul loc, inclusiv după articole viitoare", () => {
  const corpus = articles.map(article => ({ slug: article.slug, text: " " + fold(article.content) + " " }));
  let checked = 0;
  for (const article of articles) {
    for (const match of article.content.matchAll(/^#{2,6}\s+(.+)$/gm)) {
      const heading = match[1].replace(/[*`]/g, "").trim();
      if (heading.length > 200 || queryTerms(heading).length < 3) continue;
      const headingKey = " " + fold(heading) + " ";
      const owners = corpus.filter(document => document.text.includes(headingKey));
      if (owners.length !== 1 || owners[0].slug !== article.slug) continue;
      assert.equal(localSearchProvider.search(heading)[0]?.article.slug, article.slug, article.slug + " | " + heading);
      checked++;
    }
  }
  assert.ok(checked >= 600, "verificarea trebuie să acopere biblioteca reală");
});

const fixture = (slug: string, title: string, content: string, tags: string[] = []): Article => ({
  ...articles[0], slug, title, content, tags,
  excerpt: "Un excerpt despre documente și taxe, fără pasajul căutat.",
});

test("indexul include automat subtitluri și pasaje de la finalul unui articol nou, fără etichete ajutătoare", () => {
  const future = fixture("viitor", "Operațiunea particulară", "## Reconcilierea documentelor după cesiunea contractuală\n\n" +
    "Explicații generale. ".repeat(500) + "\n\nDosarul include decizia administratorului și centralizatorul operațiunilor închise.");
  const other = fixture("concurent", "Dosarul, administratorul și documentele", "Documentele se păstrează. Centralizatorul se verifică separat. Operațiunile se analizează.");
  const search = createArticleSearch([other, future]);
  for (const query of ["Reconcilierea documentelor după cesiunea contractuală", "Dosarul include decizia administratorului și centralizatorul operațiunilor închise"]) {
    const hits = search(query);
    assert.equal(hits[0]?.article.slug, "viitor");
    assert.ok(fold(hits[0].snippet ?? "").includes(fold(query)));
    assert.ok(hits.every(hit => Number.isFinite(hit.score)));
  }
});

test("fraza exactă respectă limitele cuvintelor, numerele, Markdown și separatorii", () => {
  const search = createArticleSearch([
    fixture("aproximativ", "Prag 100 lei și alte taxe", "Pragul este 1000 lei. Documentele sunt disponibile."),
    fixture("exact", "Valoare documentată", "## Un calcul practic\n\nPrag **100 lei**, pentru [operațiunea verificată](https://example.com/extern)."),
  ]);
  const hit = search("„prag 100 lei pentru operațiunea verificată”")[0];
  assert.equal(hit?.article.slug, "exact");
  assert.ok(fold(hit.snippet ?? "").includes("prag 100 lei pentru operatiunea verificata"));
});

test("destinația unui link nu este confundată cu textul articolului", () => {
  const search = createArticleSearch([
    fixture("gazda", "Documente", "[Sursa oficială](https://example.com/xylocerus-unic-verificabil)."),
    fixture("continut", "Ghid separat", "## Xylocerus unic verificabil\n\nTextul relevant."),
  ]);
  const hits = search("xylocerus unic verificabil");
  assert.equal(hits[0]?.article.slug, "continut");
  assert.ok(!hits.some(hit => hit.article.slug === "gazda"));
});

test("comparațiile numerice și exemplele XML rămân căutabile în textul complet", () => {
  const search = createArticleSearch([
    fixture("comparatie", "Controlul valorilor", "## Un exemplu tehnic\n\nVenit < 100000 lei, iar profit > 0 lei.\n\nÎn XML, `<Cod_document>` identifică documentul transmis."),
    fixture("general", "Venit, profit și documente", "Venitul și profitul se verifică separat. Documentele sunt disponibile."),
  ]);
  for (const query of ["venit 100000 lei iar profit 0 lei", "Cod_document identifică documentul transmis"]) {
    assert.equal(search(query)[0]?.article.slug, "comparatie", query);
  }
});

test("un subtitlu comun nu favorizează un articol care conține doar cuvinte răspândite", () => {
  const heading = "Documente obligatorii pentru verificarea dosarului";
  const search = createArticleSearch([
    fixture("cuvinte", "Documente obligatorii verificarea dosarului", "Verificarea este necesară. Dosarului îi lipsesc documente obligatorii."),
    fixture("primul", "Prima situație", "## " + heading + "\n\nExplicația primei situații."),
    fixture("al-doilea", "A doua situație", "## " + heading + "\n\nExplicația celei de-a doua situații."),
  ]);
  assert.deepEqual(new Set(search(heading).slice(0, 2).map(hit => hit.article.slug)), new Set(["primul", "al-doilea"]));
});
