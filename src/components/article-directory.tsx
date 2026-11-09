import Link from "next/link";
import { articleSummaries } from "@/data/articles";
import { categories, type CategorySlug } from "@/data/categories";

/** Index HTML accesibil și fără JavaScript, inclusiv pentru articolele de după pagina întâi. */
export function ArticleDirectory({category}: {category?: CategorySlug}) {
  const groups = categories.filter(c=>!category || c.slug===category);
  return <details className="article-directory">
    <summary>{category ? "Indexul articolelor din această categorie" : "Indexul complet al articolelor"}</summary>
    <div className="article-directory-groups">{groups.map(c=><section key={c.slug} aria-labelledby={"index-"+c.slug}>
      <h2 id={"index-"+c.slug}><Link href={"/categorii/"+c.slug}>{c.name}</Link></h2>
      <ul>{articleSummaries.filter(a=>a.category===c.slug).map(a=><li key={a.slug}><Link href={"/articol/"+a.slug} prefetch={false}>{a.title}</Link></li>)}</ul>
    </section>)}</div>
  </details>;
}
