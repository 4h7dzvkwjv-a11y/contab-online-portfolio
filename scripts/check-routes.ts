import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { articles } from "../src/data/articles";
import { categories } from "../src/data/categories";
import { officialForms } from "../src/data/forms";

const baseUrl = process.env.CONTAB_BASE_URL ?? "http://localhost:3000";
const htmlRoutes = [
  "/",
  "/articole",
  "/categorii",
  "/formulare",
  "/calculator-taxe",
  "/actualizari",
  "/despre",
  "/contact",
  "/termeni",
  "/politica-de-confidentialitate",
  "/cautare?q=D406",
  ...categories.map(({ slug }) => "/categorii/" + slug),
  ...articles.map(({ slug }) => "/articol/" + slug),
];
const failures: string[] = [];

async function main() {
  for (let offset = 0; offset < htmlRoutes.length; offset += 4) {
    await Promise.all(
      htmlRoutes.slice(offset, offset + 4).map(async (path) => {
        try {
          const response = await fetch(baseUrl + path, {
            signal: AbortSignal.timeout(20000),
          });
          assert.equal(response.status, 200, "Status HTTP");
          const html = await response.text();
          assert.match(html, /<h1[\s>]/, "Lipsește titlul paginii");
          assert.match(html, /lang="ro"/, "Limba paginii");
          assert.match(html, /rel="canonical"/, "Lipsește URL-ul canonic");
          if (path.startsWith("/articol/"))
            assert.match(
              html,
              /application\/ld\+json/,
              "Lipsește schema articolului",
            );
        } catch (error) {
          failures.push(path + ": " + String(error));
        }
      }),
    );
  }

  for (const path of [
    "/robots.txt",
    "/sitemap.xml",
    "/icon.svg",
    "/opengraph-image.png",
    ...officialForms.map((form) => form.filePath),
  ]) {
    try {
      const response = await fetch(baseUrl + path, {
        signal: AbortSignal.timeout(20000),
      });
      assert.equal(response.status, 200, path);
      if (path === "/sitemap.xml")
        assert.match(await response.text(), /<urlset/);
      if (path === "/opengraph-image.png")
        assert.match(response.headers.get("content-type") ?? "", /image\/png/);
      if (path.endsWith(".pdf")) {
        assert.match(response.headers.get("content-type") ?? "", /application\/pdf/);
        const bytes = new Uint8Array(await response.arrayBuffer());
        assert.equal(new TextDecoder().decode(bytes.slice(0, 5)), "%PDF-", path);
        const expected = officialForms.find((form) => form.filePath === path)!;
        assert.equal(createHash("sha256").update(bytes).digest("hex"), expected.sha256, "Integritate PDF: " + path);
      }
      if (path !== "/sitemap.xml" && !path.endsWith(".pdf")) await response.arrayBuffer();
    } catch (error) {
      failures.push(path + ": " + String(error));
    }
  }

  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
  } else {
    console.log(
      "PASS: " +
        (htmlRoutes.length + 4 + officialForms.length) +
        " rute și resurse HTTP, inclusiv toate cele " +
        articles.length +
        " articole.",
    );
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
