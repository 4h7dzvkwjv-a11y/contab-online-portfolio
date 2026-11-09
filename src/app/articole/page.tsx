import type { Metadata } from "next";
import { Suspense } from "react";
import {
  ArticleExplorer,
  ArticleSkeleton,
} from "@/components/article-explorer";
import { articleSummaries } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";
import { ArticleDirectory } from "@/components/article-directory";

export const metadata: Metadata = pageMetadata({...pageSeo["/articole"],path:"/articole"});

export default function ArticlesPage() {
  return (
    <main id="main-content" className="container library-page">
      <div className="page-heading">
        <p className="page-kicker">Bibliotecă de articole</p>
        <h1>Articole de contabilitate și fiscalitate.</h1>
        <p>
          Ghiduri, monografii și explicații pentru lucrurile cu care te
          întâlnești în fiecare zi.
        </p>
      </div>
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleExplorer articles={articleSummaries} />
      </Suspense>
      <ArticleDirectory />
    </main>
  );
}
