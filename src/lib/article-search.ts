import MiniSearch from "minisearch";
import type { Article, ArticleSummary } from "@/data/articles";
import { getCategory } from "@/data/categories";
import { normalize, processTerm, queryTerms, tokenize } from "./search-normalize";

export interface SearchHit {
  article: ArticleSummary;
  score: number;
  snippet?: string;
}

// Indexăm textul citit de vizitator, fără a transforma URL-urile citărilor
// sau destinațiile linkurilor interne în potriviri pentru articolul gazdă.
function plainText(markdown: string) {
  return markdown
    .normalize("NFC")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\|[\s:|-]+\|$/gm, " ")
    .replace(/[#*`|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function phraseKey(text: string) {
  return (normalize(text).match(/[\p{L}\p{N}]+/gu) ?? []).join(" ");
}

interface SearchDocument {
  article: ArticleSummary;
  content: string;
  headings: string;
  titleKey: string;
  headingKeys: string[];
  contentKey: string;
  excerptKey: string;
  primaryTerms: string[];
}

const containsPhrase = (text: string, phrase: string) =>
  (" " + text + " ").includes(" " + phrase + " ");

function excerptAround(text: string, start: number, end: number) {
  let from = Math.max(0, start - 55);
  let to = Math.min(text.length, Math.max(from + 240, end + 65));
  // Nu tăiem cuvintele la marginile fragmentului.
  if (from > 0) {
    while (from < start && /[\p{L}\p{N}]/u.test(text[from - 1])) from++;
  }
  while (to < text.length && /[\p{L}\p{N}]/u.test(text[to])) to++;
  return (from ? "…" : "") + text.slice(from, to).trim() + (to < text.length ? "…" : "");
}

function snippetFor(document: SearchDocument, terms: string[], phrase: string) {
  const excerpt = document.article.excerpt;
  if (containsPhrase(document.excerptKey, phrase)) return excerpt;

  if (containsPhrase(document.contentKey, phrase)) {
    // În textul NFC românesc, eliminarea diacriticelor păstrează pozițiile.
    // Separatorii flexibili recunosc și text copiat cu alte ghilimele sau cratime.
    const pattern = new RegExp(
      "(?:^|[^\\p{L}\\p{N}])(" + phrase.split(" ").join("[^\\p{L}\\p{N}]+") + ")(?=$|[^\\p{L}\\p{N}])",
      "u",
    );
    const match = pattern.exec(normalize(document.content));
    if (match) {
      const start = match.index + match[0].length - match[1].length;
      return excerptAround(document.content, start, start + match[1].length);
    }
  }

  const matchesTerm = (word: string) => {
    const canonical = processTerm(word);
    return canonical && terms.some(term => canonical === term ||
      (term.length >= 3 && canonical.startsWith(term)));
  };
  if (tokenize(excerpt).some(matchesTerm)) return excerpt;
  const match = [...document.content.matchAll(/[\p{L}\p{N}]+/gu)]
    .find(word => matchesTerm(word[0]));
  return match ? excerptAround(document.content, match.index, match.index + match[0].length) : excerpt;
}

/** Catalogul unic este sursa indexului; articolele noi nu cer reguli per slug. */
export function createArticleSearch(catalog: readonly Article[]) {
  let documents: SearchDocument[] | undefined;
  let index: MiniSearch | undefined;
  let bySlug: Map<string, SearchDocument>;

  function prepare() {
    if (index && documents) return { index, documents };
    documents = catalog.map(({ content, sources: _sources, ...article }) => {
      const text = plainText(content);
      const headings = [...content.matchAll(/^#{2,6}\s+(.+)$/gm)].map(match => plainText(match[1]));
      return {
        article,
        content: text,
        headings: headings.join("\n"),
        titleKey: phraseKey(article.title),
        headingKeys: headings.map(phraseKey),
        contentKey: phraseKey(text),
        excerptKey: phraseKey(article.excerpt),
        primaryTerms: queryTerms(article.tags[0] ?? ""),
      };
    });
    bySlug = new Map(documents.map(document => [document.article.slug, document]));
    index = new MiniSearch({
      idField: "slug",
      fields: ["title", "headings", "excerpt", "content", "tags", "category", "year", "type"],
      tokenize,
      processTerm,
      searchOptions: {
        boost: { title: 8, headings: 4, tags: 6, category: 3, excerpt: 2, content: 1, year: 0.5 },
        prefix: true,
        fuzzy: term => term.length >= 5 ? 0.17 : false,
        combineWith: "AND",
      },
    });
    index.addAll(documents.map(({ article, content, headings }) => ({
      ...article,
      content,
      headings,
      tags: article.tags.join(" "),
      category: getCategory(article.category)?.name ?? article.category,
      year: article.publishedAt.slice(0, 4),
      type: article.type === "monografie" ? "monografie" :
        article.type === "noutate" ? "noutate legislativa" : "ghid practic",
    })));
    return { index, documents };
  }

  return function searchArticles(rawQuery: string): SearchHit[] {
    const query = rawQuery.slice(0, 200).trim();
    const terms = queryTerms(query);
    if (!terms.length) return [];
    const { index: engine, documents } = prepare();
    const phrase = phraseKey(query);
    const quoted = /^["„“«].+["”»]$/u.test(query);
    // O frază copiată sau un subtitlu complet sunt dovezi mai puternice decât
    // cuvinte răspândite în titlu/taguri. Căutările scurte rămân tematice.
    const passageQuery = terms.length >= 3 || (quoted && phrase.includes(" "));
    const phraseRanks = new Map<string, number>();
    for (const document of documents) {
      let rank = 0;
      if (document.titleKey === phrase) rank = 4;
      else if (document.headingKeys.includes(phrase)) rank = 3;
      else if (passageQuery) {
        if (containsPhrase(document.titleKey, phrase)) rank = 4;
        else if (document.headingKeys.some(heading => containsPhrase(heading, phrase))) rank = 3;
        else if (containsPhrase(document.excerptKey, phrase) || containsPhrase(document.contentKey, phrase)) rank = 2;
      }
      if (rank) phraseRanks.set(document.article.slug, rank);
    }

    const hits = engine.search(query, { combineWith: terms.length > 1 ? "OR" : "AND" });
    const minimumCoverage = Math.max(1, ...hits.map(hit => hit.queryTerms.length - 1));
    const candidates = new Map<string, { document: SearchDocument; lexical: number }>();
    for (const hit of hits) {
      const document = bySlug.get(String(hit.id));
      if (!document || (hit.queryTerms.length < minimumCoverage && !phraseRanks.has(document.article.slug))) continue;
      const primary = document.primaryTerms;
      const primaryMatch = primary.length === terms.length && primary.every(term => terms.includes(term));
      const overlap = primary.length ? primary.filter(term => terms.includes(term)).length / primary.length : 0;
      candidates.set(document.article.slug, { document, lexical: hit.score * (primaryMatch ? 3 : 1 + 0.3 * overlap) });
    }
    // Potrivirea exactă nu poate dispărea printr-un prag al căutării aproximative.
    for (const slug of phraseRanks.keys()) {
      if (!candidates.has(slug)) candidates.set(slug, { document: bySlug.get(slug)!, lexical: 0 });
    }
    const band = Math.max(0, ...[...candidates.values()].map(hit => hit.lexical)) + 1;
    return [...candidates.values()].map(({ document, lexical }) => ({
      article: document.article,
      score: Math.round((lexical + (phraseRanks.get(document.article.slug) ?? 0) * band) * 10) / 10,
      snippet: snippetFor(document, terms, phrase),
    })).sort((a, b) => b.score - a.score || a.article.slug.localeCompare(b.article.slug));
  };
}
