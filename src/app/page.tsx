import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen } from "lucide-react";
import { BrandMark } from "@/components/logo";
import { SearchBox } from "@/components/search-box";
import { UpdatesSection } from "@/components/updates-section";
import { CategoryGrid } from "@/components/category-grid";
import { FormsSection } from "@/components/forms-section";
import { articleSummaries } from "@/data/articles";
import { categories } from "@/data/categories";
import { SITE_URL } from "@/lib/format";
import { BRAND_NAME as SITE_NAME } from "@/lib/site";
import styles from "./home.module.css";
import { organization, pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

export const metadata: Metadata = pageMetadata({...pageSeo["/"], path: "/"});
const popular = [
  "Monografii contabile",
  "TVA 2026",
  "SAF-T",
  "Salarizare",
  "Plan de conturi",
  "e-Factura",
];

export default function HomePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "ro-RO",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: SITE_URL + "/cautare?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context":"https://schema.org", "@graph":[organization, {...structuredData, "@id":SITE_URL+"/#website", alternateName:"contab-online.ro", publisher:{"@id":organization["@id"]}}]}).replace(/</g, "\\u003c"),
        }}
      />
      <section className="hero container" aria-labelledby="hero-title">
        <BrandMark large />
        <h1 id="hero-title">
          Contabilitate clară.
          <br />
          <span>Răspunsuri rapide.</span>
        </h1>
        <p className="hero-description">
          Caută orice din contabilitate și fiscalitate românească.
          <br className="desktop-break" /> Articole actualizate, monografii și
          explicații practice.
        </p>
        <div id="cauta" className="hero-search">
          <SearchBox />
        </div>
        <div className="popular-searches">
          <p>Căutări populare</p>
          <div>
            {popular.map((term) => (
              <Link key={term} href={"/cautare?q=" + encodeURIComponent(term)}>
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section
        id="biblioteca"
        className={"categories-section container " + styles.library}
        aria-labelledby="library-title"
      >
        <div className={"section-heading " + styles.libraryHeading}>
          <div>
            <p className={styles.libraryCount}><BookOpen size={15} aria-hidden="true" />{articleSummaries.length} articole · {categories.length} categorii</p>
            <h2 id="library-title">Biblioteca de articole</h2>
            <p className={styles.libraryIntro}>Ghiduri, monografii și explicații practice pentru contabili și antreprenori.</p>
          </div>
          <Link href="/articole" className={"button button-primary " + styles.allArticles}>Vezi toate articolele <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <p className={styles.categoryLabel}>Explorează pe categorii</p>
        <CategoryGrid />
      </section>
      <UpdatesSection />
      <FormsSection />
    </main>
  );
}
