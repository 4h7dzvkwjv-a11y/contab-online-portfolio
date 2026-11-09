import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getUpdates } from "@/lib/updates";
import { UPDATES_TITLE } from "@/data/updates";
import { UpdateCard } from "./update-card";
import styles from "./updates.module.css";

export function UpdatesSection() {
  const entries = getUpdates().slice(0, 3);
  return <section className={"container " + styles.homeSection} aria-labelledby="home-updates-title" id="actualizari">
    <div className={styles.homeHeading}><div><p className={styles.eyebrow}><span className={styles.liveDot} aria-hidden="true" /> Legislație și proceduri</p><h2 id="home-updates-title">{UPDATES_TITLE}</h2></div>
      <Link href="/actualizari" className={styles.allUpdates}>Vezi toate noutățile <ArrowRight size={17} aria-hidden="true" /></Link></div>
    <p className={styles.homeIntro}>Modificări legislative și proceduri oficiale, explicate pentru contabili și antreprenori.</p>
    <div className={styles.homeGrid}>{entries.map(entry => <UpdateCard key={entry.articleSlug} entry={entry} compact />)}</div>
    <p className={styles.dateExplanation}><CalendarDays size={14} aria-hidden="true" /> Data afișată este data modificării sau informării oficiale.</p>
  </section>;
}
