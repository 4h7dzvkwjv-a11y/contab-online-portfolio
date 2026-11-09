"use client";

import { useState } from "react";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import Link from "next/link";
import { categories, type CategorySlug } from "@/data/categories";
import type { UpdateEntry } from "@/lib/updates";
import { UpdateCard } from "./update-card";
import styles from "./updates.module.css";

const monthFormatter = new Intl.DateTimeFormat("ro-RO", { month: "long", year: "numeric", timeZone: "Europe/Bucharest" });

export function UpdatesFeed({ entries }: { entries: UpdateEntry[] }) {
  const [category, setCategory] = useState<CategorySlug | "all">("all");
  const visible = category === "all" ? entries : entries.filter(entry => entry.article.category === category);
  const months = [...new Set(visible.map(entry => entry.eventDate.slice(0, 7)))];
  return <>
    <div className={styles.filters} role="group" aria-label="Filtrează actualizările pe categorii">
      <button type="button" aria-pressed={category === "all"} onClick={() => setCategory("all")}>Toate <span>{entries.length}</span></button>
      {categories.map(item => <button key={item.slug} type="button" aria-pressed={category === item.slug} onClick={() => setCategory(item.slug)}>{item.shortName}<span>{entries.filter(entry => entry.article.category === item.slug).length}</span></button>)}
    </div>
    <div className={styles.feedMeta}><p role="status" aria-live="polite" aria-atomic="true">{visible.length} {visible.length === 1 ? "actualizare" : "actualizări"}{category !== "all" ? " · " + categories.find(item => item.slug === category)?.shortName : " din surse verificate"}</p><span><CalendarDays size={13} aria-hidden="true" />Data evenimentului · descrescător</span></div>
    <div className={styles.timeline}>
      {months.map(month => <section key={month} className={styles.monthGroup} aria-labelledby={"month-" + month}>
        <div className={styles.monthLabel}><span className={styles.monthDot} aria-hidden="true" /><h2 id={"month-" + month}>{monthFormatter.format(new Date(month + "-01T12:00:00Z"))}</h2></div>
        <div className={styles.monthCards}>{visible.filter(entry => entry.eventDate.startsWith(month)).map(entry => <UpdateCard key={entry.articleSlug} entry={entry} />)}</div>
      </section>)}
      {!visible.length ? <div className={styles.empty}><CalendarDays size={27} aria-hidden="true" /><h2>Nu sunt actualizări în această categorie.</h2><p>Poți reveni la cronologia completă.</p><button type="button" onClick={() => setCategory("all")}>Vezi toate actualizările</button></div> : null}
    </div>
    <div className={styles.libraryLink}><div><h2>Cauți explicația completă?</h2><p>Actualizările fac parte din aceeași bibliotecă de articole Contab.</p></div><Link href="/articole">Explorează articolele <ArrowUpRight size={17} aria-hidden="true" /></Link></div>
  </>;
}
