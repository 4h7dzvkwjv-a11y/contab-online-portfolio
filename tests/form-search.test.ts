import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { officialForms } from "../src/data/forms";
import { localSearchProvider as provider } from "../src/lib/search";
import { FormSearchResults } from "../src/components/form-search-results";

test("toate cele zece formulare sunt căutabile după cod, cu destinații PDF auditate", () => {
  for (const form of officialForms) {
    const hits = provider.searchForms(form.code);
    assert.equal(hits[0]?.form.id, form.id, form.code);
    assert.equal(hits[0]?.form.filePath, form.filePath);
  }
});

test("codurile ANAF acceptă spații, număr și întrebări naturale; D710 are original comun", () => {
  for (const query of ["d100", "D 100", "D-100", "100", "formular 100", "vreau să descarc declarația 100 PDF"]) {
    assert.deepEqual(provider.searchForms(query).map(({ form }) => form.id), ["anaf-d100"], query);
  }
  assert.equal(provider.searchForms("D710")[0]?.form.id, "anaf-d100");
  assert.equal(provider.searchForms("formularul 112")[0]?.form.id, "anaf-d112");
});

test("întrebările după scop găsesc formularul relevant, cu diacritice sau greșeli minore", () => {
  for (const [query, id] of [
    ["cum fac un SRL", "onrc-anexa-2a"],
    ["cum înființez un SRL", "onrc-anexa-2a"],
    ["cum deschid PFA", "onrc-anexa-2b"],
    ["beneficiarul real", "onrc-beneficiari-reali-3a"],
    ["declaratie TVA", "anaf-d300"],
    ["decont TVA 2026", "anaf-d300"],
    ["salarizare", "anaf-d112"],
    ["salarizre", "anaf-d112"],
    ["impozit pe profit", "anaf-d101"],
    ["modific vectorul fiscal", "anaf-d700"],
    ["declaratie functionare sediu", "onrc-anexa-4"],
  ]) assert.equal(provider.searchForms(query)[0]?.form.id, id, query);
});

test("formularele lipsă și căutările fără sens nu primesc un PDF aproximat", () => {
  for (const query of ["D212", "D406 SAF-T", "D394", "D999", "grrg", "cum să fac", ""]) {
    assert.deepEqual(provider.searchForms(query), [], query);
  }
  assert.ok(!provider.searchForms("TVA 100 euro").some(({ form }) => form.id === "anaf-d100"));
});

test("căutarea generică poate găsi catalogul sau instituția fără a ascunde formulare", () => {
  assert.equal(provider.searchForms("formulare PDF editabile").length, 10);
  assert.equal(provider.searchForms("formulare ANAF").length, 6);
  assert.equal(provider.searchForms("ONRC").length, 4);
});

test("rezultatele oferă PDF direct, perioadă vizibilă, Reader și sursa oficială", () => {
  const hits = provider.searchForms("D112");
  const html = renderToStaticMarkup(createElement(FormSearchResults, { hits, query: "D112" }));
  assert.match(html, /download="anaf-d112.pdf"/);
  assert.match(html, /href="\/formulare\/anaf-d112-[a-f0-9]+\.pdf"/);
  assert.match(html, /iulie 2026/);
  assert.match(html, /Acrobat Reader desktop/);
  assert.match(html, /https:\/\/static\.anaf\.ro/);
  assert.equal(renderToStaticMarkup(createElement(FormSearchResults, { hits: [], query: "D999" })), "");
});
