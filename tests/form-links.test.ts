import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { articles } from "../src/data/articles";
import { officialForms } from "../src/data/forms";
import { articleFormDestinations } from "../src/data/form-reference-destinations";
import { headingId } from "../src/lib/format";
import { formActionLabel, formDownloadTitle, nodeText, splitFormReferences } from "../src/lib/form-links";
import { remarkOfficialForms } from "../src/lib/remark-official-forms";
import { FormReferenceText } from "../src/components/form-reference-text";

test("referințele recunosc spații și litere mici, păstrând textul și limitele codurilor", () => {
  const text = "D100, d 112 și D-700; XD100, D1000 și D999.";
  const parts = splitFormReferences(text);
  assert.equal(parts.map((part) => part.text).join(""), text);
  assert.deepEqual(parts.flatMap((part) => part.form ? [part.form.code] : []), ["D100", "D112", "D700"]);
  const alias = splitFormReferences("D710")[0];
  assert.equal(alias.form?.id, "anaf-d100");
  assert.match(formDownloadTitle(alias.form!, "D710"), /Selectează D710/);
});

test("anexele ONRC sunt legate numai când instituția este explicită", () => {
  assert.ok(splitFormReferences("Anexa 4 și Anexa 2a").every((part) => !part.form));
  assert.equal(splitFormReferences("ONRC Anexa 4")[0].form?.id, "onrc-anexa-4");
  assert.equal(splitFormReferences("Formularul 3a ONRC")[0].form?.id, "onrc-beneficiari-reali-3a");
});

test("Markdown leagă codurile și păstrează ghidurile descriptive, citările și blocurile de cod", () => {
  const markdown = "D100 și `D112`.\n\n[D100](/articol/declaratia-d100-obligatii-corectare)\n\n[ghidul D101](/articol/declaratia-d101-completare-depunere)\n\n[D300](https://static.anaf.ro/static/10/Anaf/Declaratii_R/300.html)\n\n```text\nD100\n```";
  const html = renderToStaticMarkup(createElement(ReactMarkdown, {
    remarkPlugins: [remarkGfm, remarkOfficialForms], children: markdown,
  }));
  const d100 = officialForms.find((form) => form.code === "D100")!;
  assert.equal(html.split(`href="${d100.filePath}"`).length - 1, 2);
  assert.match(html, /href="\/formulare\/anaf-d112-[a-f0-9]+\.pdf"/);
  assert.match(html, /href="\/articol\/declaratia-d101-completare-depunere"/);
  assert.match(html, /href="https:\/\/static\.anaf\.ro\/static\/10\/Anaf\/Declaratii_R\/300.html"/);
  assert.match(html, /<pre><code class="language-text">D100/);
});

test("titlurile și leadurile au descărcare directă și perioadă explicită în explicația linkului", () => {
  const html = renderToStaticMarkup(createElement(FormReferenceText, { text: "Cum depui D112?" }));
  assert.match(html, /download="anaf-d112.pdf"/);
  assert.match(html, /data-official-form="anaf-d112"/);
  assert.match(html, /iulie 2026/);
});

test("legăturile automate păstrează identificatoarele cuprinsurilor din întregul catalog", () => {
  for (const article of articles) {
    const html = renderToStaticMarkup(createElement(ReactMarkdown, {
      remarkPlugins: [remarkGfm, remarkOfficialForms],
      components: {
        h2: ({ node, children }) => createElement("h2", { id: headingId(nodeText(node)) }, children),
      },
      children: article.content,
    }));
    const actual = [...html.matchAll(/<h2 id="([^"]+)"/g)].map((match) => match[1]);
    const expected = [...article.content.matchAll(/^## (.+)$/gm)].map((match) => headingId(match[1]));
    assert.deepEqual(actual, expected, article.slug);
  }
});

test("referințele lotului3 păstrează resursa oficială și diferențiază modelul, aplicația și programul", () => {
  const dir = "docs/research/batch60-round3-20261105/";
  const authorProof = JSON.parse(readFileSync(dir + "form-destinations-reporting.json", "utf8")).forms;
  const rootProof = JSON.parse(readFileSync(dir + "form-resources-root.json", "utf8")).rows.filter((r: any) => r.status === 200);
  const financeProof = JSON.parse(readFileSync(dir + "form-d110-proof-finance.json", "utf8"));
  const proofs = [...authorProof, ...rootProof, { code: "D110", resource: financeProof.url }];
  const codes = ["C168", "D010", "D110", "D163", "D207", "D212", "D216", "D224", "D301", "D390", "D394", "D406", "F4109", "F7000"];
  assert.equal(officialForms.length, 10);
  for (const code of codes) {
    const destination = splitFormReferences(code)[0].form!;
    assert.ok(destination, code);
    assert.equal(destination.filePath, proofs.find((r: any) => r.code === code)?.resource, code);
    const html = renderToStaticMarkup(createElement(FormReferenceText, { text: code }));
    assert.ok(html.includes(`href="${destination.filePath}"`), code);
    assert.match(html, /rel="noopener noreferrer"/, code);
  }
  const model = splitFormReferences("D010")[0].form!;
  assert.equal(model.resourceType, "document");
  assert.doesNotMatch(formDownloadTitle(model), /completabil|Reader/);
  const declaration = splitFormReferences("D212")[0].form!;
  assert.equal(declaration.resourceType, "application");
  assert.match(declaration.applicability, /2025/);
  for (const code of ["F7000", "D406"]) {
    const program = splitFormReferences(code)[0].form!;
    assert.equal(program.resourceType, "program");
    assert.match(program.filePath, /\.zip$/);
    assert.doesNotMatch(formActionLabel(program), /PDF/);
  }
});


test("noile coduri din articole duc la resursa ANAF verificată, cu tipul și perioada corecte", () => {
  const codes = ["D107", "D177", "D204", "D230", "D307", "D311", "D318"];
  const proof = JSON.parse(readFileSync(resolve("docs/research/batch60-round2/form-reference-destinations.json"), "utf8"));
  assert.equal(codes.filter(code => articleFormDestinations.some(form => form.code === code)).length, codes.length);
  for (const code of codes) {
    const form = splitFormReferences(code)[0].form;
    assert.ok(form, code);
    const url = new URL(form.filePath);
    assert.equal(url.protocol, "https:", code);
    assert.ok(["www.anaf.ro", "static.anaf.ro"].includes(url.hostname), code);
    assert.ok(form.applicability.length > 20, code);
    const verified = proof.forms.find((item: { code: string }) => item.code === code);
    assert.ok(verified, code);
    assert.equal(form.filePath, verified.url, code);
    assert.equal(form.applicability, verified.applicablePeriod, code);
    if (form.resourceType === "application") {
      assert.doesNotMatch(formActionLabel(form), /PDF/);
      assert.doesNotMatch(formDownloadTitle(form), /PDF completabil/);
    } else {
      assert.equal(form.resourceType, "pdf", code);
      assert.ok(url.pathname.toLowerCase().endsWith(".pdf"), code);
    }
  }
});
