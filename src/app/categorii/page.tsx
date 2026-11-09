import type { Metadata } from "next";
import { CategoryGrid } from "@/components/category-grid";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

export const metadata: Metadata = pageMetadata({...pageSeo["/categorii"],path:"/categorii"});

export default function CategoriesPage() {
  return (
    <main id="main-content" className="container categories-page">
      <div className="page-heading">
        <p className="page-kicker">Bibliotecă de articole</p>
        <h1>Categorii de articole.</h1>
        <p>Alege un domeniu și găsește explicațiile de care ai nevoie.</p>
      </div>
      <CategoryGrid headingLevel={2} />
    </main>
  );
}
