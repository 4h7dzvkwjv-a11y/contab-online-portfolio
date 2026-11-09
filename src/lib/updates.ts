import { articles, type Article, type ArticleSummary } from "@/data/articles";
import { updateSelections, type UpdateSelection } from "@/data/updates";
import { sources } from "@/data/sources";

export type UpdateEntry = UpdateSelection & { article: ArticleSummary; source: { label: string; url: string } };

export function buildUpdates(selections: readonly UpdateSelection[], catalog: readonly Article[]): UpdateEntry[] {
  const bySlug = new Map(catalog.map(article => [article.slug, article]));
  const seen = new Set<string>();
  return selections.map(selection => {
    const article = bySlug.get(selection.articleSlug);
    if (!article) throw new Error("Actualizare fără articol în catalog: " + selection.articleSlug);
    if (seen.has(selection.articleSlug)) throw new Error("Actualizare duplicată: " + selection.articleSlug);
    seen.add(selection.articleSlug);
    const eventInstant = new Date(selection.eventDate + "T12:00:00Z");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(selection.eventDate) || !Number.isFinite(eventInstant.getTime()) || eventInstant.toISOString().slice(0, 10) !== selection.eventDate)
      throw new Error("Data evenimentului nu este validă: " + selection.articleSlug);
    const { content: _content, sources: _sources, ...summary } = article;
    const source = sources[selection.sourceId];
    if (!source || !article.sources.includes(selection.sourceId)) throw new Error("Actualizare fără sursă de dată în articol: " + selection.articleSlug);
    return { ...selection, article: summary, source };
  }).sort((a, b) => b.eventDate.localeCompare(a.eventDate) || a.articleSlug.localeCompare(b.articleSlug));
}

export function getUpdates() { return buildUpdates(updateSelections, articles); }
export function getArticleUpdate(slug: string) { return updateSelections.find(item => item.articleSlug === slug); }
