import test from "node:test";
import assert from "node:assert/strict";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkOfficialForms } from "../src/lib/remark-official-forms";
import { remarkResponsiveTables } from "../src/lib/remark-responsive-tables";

const render = (text: string, responsive: boolean) => renderToStaticMarkup(createElement(ReactMarkdown, {
  remarkPlugins: responsive ? [remarkGfm, remarkOfficialForms, remarkResponsiveTables] : [remarkGfm, remarkOfficialForms],
  children: text,
}));

test("tabelele mobile păstrează textul, linkurile, alinierea și relațiile antet-celulă", () => {
  const text = "| Operațiune | Documente **necesare** | Sumă |\n| --- | --- | ---: |\n| **Depunere** D100 | [Dosar](https://www.onrc.ro/) și `contract` | 1.234,56 lei |";
  const before = render(text, false), after = render(text, true);
  assert.equal(after.replace(/<[^>]*>/g, ""), before.replace(/<[^>]*>/g, ""));
  assert.equal((after.match(/role="columnheader"/g) ?? []).length, 3);
  assert.equal((after.match(/scope="col"/g) ?? []).length, 3);
  assert.match(after, /data-label="Documente necesare"/);
  assert.match(after, /data-mobile-layout="stacked"/);
  assert.match(after, /style="text-align:right"/);
  assert.match(after, /href="https:\/\/www.onrc.ro\/"/);
  assert.equal((after.match(/href=/g) ?? []).length, (before.match(/href=/g) ?? []).length);
});

test("tabelele cu două coloane și antet gol păstrează conținutul fără etichete inventate", () => {
  const after = render("| | Control |\n| --- | --- |\n| Semnare | Calitate și reprezentare |", true);
  assert.match(after, /data-mobile-layout="compact"/);
  assert.match(after, /data-label=""/);
  assert.doesNotMatch(after, /Coloana 1|Column 1/);
  assert.match(after, /Calitate și reprezentare/);
});

