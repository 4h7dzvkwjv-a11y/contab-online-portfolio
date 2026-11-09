import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SearchBox } from "@/components/search-box";
import { SearchPageHeading } from "@/components/search-page-heading";
import {
  ArticleExplorer,
  ArticleSkeleton,
} from "@/components/article-explorer";
import { articleSummaries } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

export const metadata: Metadata = pageMetadata({...pageSeo["/cautare"],path:"/cautare",index:false});

export default function SearchPage() {
  return (
    <main id="main-content" className="container search-page">
      <Link href="/" className="back-link">
        <ArrowLeft size={15} />
        Înapoi la prima pagină
      </Link>
      <Suspense
        fallback={
          <div className="search-page-heading">
            <h1>Răspunsurile încep aici.</h1>
            <p>Caută articole, ghiduri practice și formulare oficiale.</p>
            <SearchBox compact />
          </div>
        }
      >
        <SearchPageHeading />
      </Suspense>
      <Suspense fallback={<ArticleSkeleton list />}>
        <ArticleExplorer articles={articleSummaries} search />
      </Suspense>
    </main>
  );
}
