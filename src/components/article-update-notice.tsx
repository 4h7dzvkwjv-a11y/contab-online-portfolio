import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { UpdateSelection } from "@/data/updates";
import styles from "./updates.module.css";

export function ArticleUpdateNotice({ update }: { update: UpdateSelection }) {
  return <aside className={styles.articleNotice} aria-label="Data actualizării legislative sau instituționale">
    <CalendarDays size={20} aria-hidden="true" /><div><p>{update.eventLabel} · <time dateTime={update.eventDate}>{formatDate(update.eventDate, true)}</time></p><span>{update.summary}</span></div>
    <Link href="/actualizari">Vezi toate noutățile <ArrowRight size={14} aria-hidden="true" /></Link>
  </aside>;
}
