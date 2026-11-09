import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronRight } from "lucide-react";
import { articleSummaries } from "@/data/articles";
import { categories, getCategory } from "@/data/categories";
import {
  ArticleExplorer,
  ArticleSkeleton,
} from "@/components/article-explorer";
import { CategoryIcon } from "@/components/category-icon";
import { breadcrumbSchema, canonicalUrl, categorySeo, pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { ArticleDirectory } from "@/components/article-directory";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return { title: "Categorie inexistentă" };
  return pageMetadata({...categorySeo[slug],path:"/categorii/"+slug});
}

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return (
    <main id="main-content" className="container library-page">
      <StructuredData data={[
        breadcrumbSchema([{name:"Acasă",path:"/"},{name:"Categorii",path:"/categorii"},{name:category.name,path:"/categorii/"+slug}]),
        {"@context":"https://schema.org","@type":"CollectionPage",name:category.name,description:categorySeo[slug].description,url:canonicalUrl("/categorii/"+slug),inLanguage:"ro-RO",mainEntity:{"@type":"ItemList",itemListElement:articleSummaries.filter(a=>a.category===slug).map((a,i)=>({"@type":"ListItem",position:i+1,name:a.title,url:canonicalUrl("/articol/"+a.slug)}))}},
      ]} />
      <nav className="breadcrumbs" aria-label="Fir de navigare">
        <Link href="/">Acasă</Link>
        <ChevronRight size={13} />
        <Link href="/categorii">Categorii</Link>
        <ChevronRight size={13} />
        <span aria-current="page">{category.name}</span>
      </nav>
      <div className="page-heading category-page-heading">
        <CategoryIcon category={category.slug} />
        <h1>{category.name}</h1>
        <p>
          {category.description} Explicații și exemple pentru practica de zi cu
          zi.
        </p>
      </div>
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleExplorer
          articles={articleSummaries}
          lockedCategory={category.slug}
        />
      </Suspense>
      <ArticleDirectory category={category.slug} />
    </main>
  );
}
