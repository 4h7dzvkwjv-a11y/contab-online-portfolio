import { articles } from "@/data/articles";
import { categories } from "@/data/categories";
import { createArticleSearch, type SearchHit } from "./article-search";
import { normalize, queryTerms } from "./search-normalize";
import { searchForms, type FormSearchHit } from "./form-search";

export type { SearchHit } from "./article-search";

export interface SearchProvider {
  search: (query: string) => SearchHit[] | Promise<SearchHit[]>;
  searchForms: (query: string) => FormSearchHit[] | Promise<FormSearchHit[]>;
  suggestCategories: (
    query: string,
  ) => (typeof categories)[number][] | Promise<(typeof categories)[number][]>;
}

export const localSearchProvider = {
  search: createArticleSearch(articles),
  searchForms,
  suggestCategories(query) {
    const q = normalize(query).trim();
    if (q.length < 2) return [];
    const terms = queryTerms(query);
    return categories
      .filter(category => {
        const text = normalize(category.name + " " + category.description);
        return text.includes(q) || terms.some(term => text.includes(term));
      })
      .slice(0, 2);
  },
} satisfies SearchProvider;
