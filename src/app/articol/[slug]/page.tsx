import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowRight, ChevronRight, Clock3 } from "lucide-react";
import { articles, getArticle, getRelatedArticles } from "@/data/articles";
import { articleTypes, getCategory } from "@/data/categories";
import { sources } from "@/data/sources";
import { formatDate, headingId, SITE_URL } from "@/lib/format";
import { ArticleTools, ArticleNavigation } from "@/components/article-tools";
import { ArticleCard } from "@/components/article-card";
import { ArticleTable, ArticleTableCell } from "@/components/article-table";
import { remarkResponsiveTables } from "@/lib/remark-responsive-tables";
import { SITE_NAME } from "@/lib/site";
import { FormReferenceText } from "@/components/form-reference-text";
import { formActionLabel, formDownloadTitle, formForFile, nodeText } from "@/lib/form-links";
import { remarkOfficialForms } from "@/lib/remark-official-forms";
import { getArticleUpdate } from "@/lib/updates";
import { ArticleUpdateNotice } from "@/components/article-update-notice";
import { articleMetadata, breadcrumbSchema, canonicalUrl, organization } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Articol inexistent" };
  return articleMetadata(article);
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const category = getCategory(article.category)!;
  const headings = [...article.content.matchAll(/^## (.+)$/gm)].map(
    (match) => ({ text: match[1], id: headingId(match[1]) }),
  );
  const related = getRelatedArticles(article);
  const update = getArticleUpdate(article.slug);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt + "T12:00:00+02:00",
    dateModified: article.reviewedAt + "T12:00:00+02:00",
    inLanguage: "ro-RO",
    author: { "@type": "Organization", "@id": organization["@id"], name: SITE_NAME, url: canonicalUrl("/despre") },
    publisher: organization,
    mainEntityOfPage: canonicalUrl("/articol/" + article.slug),
    articleSection: category.name,
    keywords: article.tags.join(", "),
    image: SITE_URL + "/brand/contab-social-20261104.png",
    isAccessibleForFree: true,
  };

  return (
    <main id="main-content" className="container article-shell">
      <StructuredData data={breadcrumbSchema([{name:"Acasă",path:"/"},{name:"Articole",path:"/articole"},{name:category.name,path:"/categorii/"+category.slug},{name:article.title,path:"/articol/"+article.slug}])} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <nav className="breadcrumbs" aria-label="Fir de navigare">
        <Link href="/">Acasă</Link>
        <ChevronRight size={13} />
        <Link href="/articole">Articole</Link>
        <ChevronRight size={13} />
        <Link href={"/categorii/" + category.slug}>{category.name}</Link>
      </nav>
      <article>
        <header className="article-header">
          <div className="result-top">
            <Link
              href={"/categorii/" + category.slug}
              className={"category-label text-" + category.color}
            >
              {category.name}
            </Link>
            <span className="result-type">{articleTypes[article.type]}</span>
          </div>
          <h1><FormReferenceText text={article.title} /></h1>
          <p className="article-lead"><FormReferenceText text={article.excerpt} /></p>
          <div className="article-byline">
            <div className="author-block">
              <span className="author-avatar" aria-hidden="true">
                C
              </span>
              <div>
                <p className="author-name">{article.author}</p>
                <div className="author-meta">
                  <time dateTime={article.reviewedAt}>
                    Revizuit la {formatDate(article.reviewedAt, true)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>
                    <Clock3 size={12} />
                    {article.readingTime} min de citit
                  </span>
                </div>
              </div>
            </div>
            <ArticleTools />
          </div>
        </header>
        {update ? <ArticleUpdateNotice update={update} /> : null}
        <div className="article-content-layout">
          <div>
            <details className="mobile-toc">
              <summary>În acest articol</summary>
              <ol>
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a href={"#" + heading.id}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </details>
            <div className="prose" id="article-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkOfficialForms, remarkResponsiveTables]}
                components={{
                  h2: ({ children, node }) => (
                    <h2 id={headingId(nodeText(node))}>{children}</h2>
                  ),
                  table: ({ node: _node, ...props }) => <ArticleTable {...props} />,
                  thead: ({ children }) => <thead role="rowgroup">{children}</thead>,
                  tbody: ({ children }) => <tbody role="rowgroup">{children}</tbody>,
                  td: ({ node: _node, ...props }) => <ArticleTableCell {...props} />,
                  a: ({ href, children, title, node }) => {
                    const form = formForFile(href);
                    return (
                    <a
                      href={href}
                      title={form ? title ?? formDownloadTitle(form) : title}
                      download={form?.downloadName}
                      data-official-form={form?.id}
                      className={form ? "official-form-reference" : undefined}
                      aria-label={form ? nodeText(node) + " — " + formActionLabel(form) : undefined}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href?.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {children}
                    </a>
                    );
                  },
                }}
              >
                {article.content}
              </ReactMarkdown>
              <section
                className="article-sources"
                aria-labelledby="sources-title"
              >
                <h2 id="sources-title">Bază legală și surse oficiale</h2>
                <ul>
                  {article.sources.map((sourceId) => (
                    <li key={sourceId}>
                      <a
                        href={sources[sourceId].url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {sources[sourceId].label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="source-check">
                  Revizie legislativă și contabilă:{" "}
                  {formatDate(article.reviewedAt, true)}. Regulile și calculele
                  privesc perioadele și ipotezele precizate în articol.
                </p>
              </section>
            </div>
            <div className="article-tags" aria-label="Subiectele articolului">
              {article.tags.map((tag) => (
                <Link key={tag} href={"/cautare?q=" + encodeURIComponent(tag)}>
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <ArticleNavigation headings={headings} />
        </div>
      </article>
      <section className="related-section" aria-labelledby="related-title">
        <div className="section-heading">
          <h2 id="related-title">Continuă să explorezi</h2>
          <Link href="/articole" className="text-link">
            Toate articolele <ArrowRight size={16} />
          </Link>
        </div>
        <div className="article-grid">
          {related.map((item) => (
            <ArticleCard key={item.slug} article={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
