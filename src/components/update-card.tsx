import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock3 } from "lucide-react";
import { getCategory } from "@/data/categories";
import { formatDate } from "@/lib/format";
import type { UpdateEntry } from "@/lib/updates";
import { CategoryIcon } from "./category-icon";
import styles from "./updates.module.css";

const kindLabels = { aplicare: "Aplicabil", publicare: "Act publicat", versiune: "Versiune tehnică", anunt: "Informare oficială", "date-economice": "Date oficiale" } as const;

export function UpdateCard({ entry, compact = false }: { entry: UpdateEntry; compact?: boolean }) {
  const category = getCategory(entry.article.category)!;
  const titleId = "update-title-" + entry.articleSlug;
  return <article className={styles.card} data-update-card data-event-date={entry.eventDate}>
    <Link href={"/articol/" + entry.articleSlug} className={styles.cardLink + (!compact ? " " + styles.withSource : "")} prefetch={false}>
    <div className={styles.cardTop}><div className={styles.category}><CategoryIcon category={entry.article.category} small /><span>{category.shortName}</span></div>
      <span className={styles.kind} title={entry.eventLabel}>{kindLabels[entry.eventKind]}</span></div>
    <div className={styles.titleLink}><h3 id={titleId}>{entry.article.title}</h3><ArrowUpRight size={19} aria-hidden="true" /></div>
    <p className={styles.summary}>{entry.summary}</p>
    <div className={styles.cardFooter}><span><time dateTime={entry.eventDate} title={entry.eventLabel}>{formatDate(entry.eventDate)}</time><span className={styles.reading}><Clock3 size={12} aria-hidden="true" />{entry.article.readingTime} min</span></span>
      <span className={styles.readAction}>Citește <ArrowRight size={15} aria-hidden="true" /></span></div>
    </Link>
    {!compact ? <a className={styles.sourceLink} href={entry.source.url} target="_blank" rel="noopener noreferrer">Sursa datei și a modificării <ArrowUpRight size={12} aria-hidden="true" /><span className="sr-only">: {entry.source.label}</span></a> : null}
  </article>;
}
