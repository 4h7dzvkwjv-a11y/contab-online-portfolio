import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { type ArticleSummary } from "@/data/articles";
import { articleTypes, getCategory } from "@/data/categories";
import { formatDate } from "@/lib/format";
import { CategoryIcon } from "./category-icon";

export function ArticleCard({
  article,
  headingLevel = 3,
}: {
  article: ArticleSummary;
  headingLevel?: 2 | 3;
}) {
  const category = getCategory(article.category)!;
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="article-card" data-article-card>
      <Link href={"/articol/" + article.slug} className="article-card-link" prefetch={false}>
        <div className="card-top">
          <div className="card-category">
            <CategoryIcon category={article.category} />
            <span>{category.shortName}</span>
          </div>
          <ArrowUpRight size={19} className="card-arrow" aria-hidden="true" />
        </div>
        <div className="card-body">
          <Heading>{article.title}</Heading>
          <p>{article.excerpt}</p>
        </div>
        <div className="card-format">{articleTypes[article.type]}</div>
        <div className="card-meta">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
          <span>
            <Clock3 size={14} aria-hidden="true" />
            {article.readingTime} min
          </span>
        </div>
      </Link>
    </article>
  );
}
