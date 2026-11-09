import type { Metadata } from "next";
import { CalendarCheck2, CalendarDays } from "lucide-react";
import { UpdatesFeed } from "@/components/updates-feed";
import { getUpdates } from "@/lib/updates";
import { formatDate } from "@/lib/format";
import { UPDATES_REVIEWED_AT, UPDATES_TITLE } from "@/data/updates";
import { SITE_URL } from "@/lib/site";
import styles from "@/components/updates.module.css";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

const description = "Noutăți fiscale, contabile și legislative din România, în ordinea modificărilor reale. Explicații practice pentru contabili și antreprenori, cu surse oficiale și date de aplicare.";
export const metadata: Metadata = pageMetadata({...pageSeo["/actualizari"],path:"/actualizari"});

export default function UpdatesPage() {
  const entries = getUpdates();
  const schema = { "@context": "https://schema.org", "@type": "CollectionPage", name: UPDATES_TITLE + " | Contab", description,
    url: SITE_URL + "/actualizari/", inLanguage: "ro-RO", dateModified: UPDATES_REVIEWED_AT,
    mainEntity: { "@type": "ItemList", itemListOrder: "https://schema.org/ItemListOrderDescending", numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, url: SITE_URL + "/articol/" + entry.articleSlug + "/", name: entry.article.title })) } };
  return <main id="main-content" className={"container " + styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <header className={styles.hero}><div><p className={styles.eyebrow}>Actualizări Contab</p><h1>{UPDATES_TITLE}<span>.</span></h1><p className={styles.intro}>Ce se schimbă în contabilitate, fiscalitate și administrarea unei afaceri. Noutățile relevante, cu efectele și pașii de urmat.</p></div>
      <div className={styles.edition}><CalendarDays size={23} strokeWidth={1.6} aria-hidden="true" /><div><span>Perioadă urmărită</span><strong>Iulie – noiembrie 2026</strong><small>Revizuit la {formatDate(UPDATES_REVIEWED_AT, true)}</small></div></div>
    </header>
    <div className={styles.editorialNote}><CalendarCheck2 size={18} aria-hidden="true" /><p>Ordonăm după data publicării actului, a aplicării regulii sau a informării oficiale — nu după ziua în care publicăm articolul. Tipul datei este precizat la fiecare actualizare.</p></div>
    <UpdatesFeed entries={entries} />
  </main>;
}
