import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CalendarCheck2, ShieldCheck } from "lucide-react";
import { TaxCalculator } from "@/components/tax-calculator";
import styles from "@/components/tax-calculator.module.css";
import { SITE_URL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

const description = "Calculator taxe 2026 pentru PFA în sistem real sau la normă, SRL micro, impozit pe profit și salarii. Calculează CAS, CASS, dividende, salariul net și costul angajatorului, cu formule și surse oficiale.";
export const metadata: Metadata = pageMetadata({...pageSeo["/calculator-taxe"],path:"/calculator-taxe"});

const sources = [
  ["Codul fiscal actualizat — baze, cote și contribuții", "https://static.anaf.ro/static/10/Anaf/legislatie/Cod_fiscal_norme_2023.htm"],
  ["ANAF — PFA, impozit și contribuții sociale, 2026", "https://static.anaf.ro/static/10/Cluj/cj_DU_activ_indep_22apr2026.pdf"],
  ["ANAF — modificările regimului micro din 2026", "https://static.anaf.ro/static/30/Ploiesti/20260317144006_comunicat%20ajfp%20arges%20-%20impozit%20micro%202026%20site.pdf"],
  ["HG 146/2026 — salariul minim de la 1 iulie", "https://static.anaf.ro/static/10/Anaf/legislatie/HG_146_2026.pdf"],
  ["OUG 89/2025 — facilitatea de 300 / 200 lei", "https://static.anaf.ro/static/10/Anaf/legislatie/OUG_89_2025.pdf"],
  ["ANAF — structura și validările D112, 07.09.2026", "https://static.anaf.ro/static/10/Anaf/Declaratii_R/AplicatiiDec/structura_D112_0726_070926.pdf"],
  ["Legea societăților — condițiile distribuirii dividendelor", "https://legislatie.just.ro/Public/DetaliiDocument/304533"],
] as const;

export default function TaxCalculatorPage() {
  return <main id="main-content" className={"container " + styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "WebApplication",
      name: "Calculator taxe Contab 2026", url: SITE_URL + "/calculator-taxe/", description, applicationCategory: "FinanceApplication", operatingSystem: "Web",
      inLanguage: "ro-RO", isAccessibleForFree: true, dateModified: "2026-11-04", offers: { "@type": "Offer", price: "0", priceCurrency: "RON" } }) }} />
    <div className={styles.hero}><div><p className={styles.eyebrow}>Instrumente Contab / An fiscal 2026</p><h1>Calculator <span>taxe.</span></h1>
      <p className={styles.intro}>De la venituri la suma care îți rămâne. Calculează taxele pentru PFA, SRL sau salarii și urmărește fiecare pas al rezultatului.</p></div>
      <div className={styles.reviewed}><CalendarCheck2 size={21} strokeWidth={1.6} aria-hidden="true" /><span><strong>Reguli verificate</strong>4 noiembrie 2026</span></div>
    </div>
    <TaxCalculator />
    <section className={styles.information} aria-label="Metodologie și surse fiscale">
      <div><p className={styles.eyebrow}>Înțelege rezultatul</p><h2>Regulile, la vedere.</h2>
        <details><summary>Ce acoperă calculatorul PFA?</summary><p>Un singur venit din activitate independentă, cu CAS la baza minimă legală sau la baza aleasă. Plafoanele anuale folosesc salariul minim de 4.050 lei de la 1 ianuarie 2026. CAS are pragurile de 48.600 și 97.200 lei. CASS aferentă venitului este plafonată la o bază de 291.600 lei, adică 72 de salarii minime.</p><p>Completarea CASS până la minimul de 2.430 lei, dacă este datorată, nu reduce baza impozitului pe venit. La normă se aplică 10% direct normei ajustate; CAS și CASS nu se deduc. Pentru contribuabilul la normă, venitul brut anual peste echivalentul a 25.000 euro, convertit la cursul mediu anual BNR, determină trecerea obligatorie la sistem real în anul următor, conform art.69 alin.(9).</p></details>
        <details><summary>Cum sunt separate taxele firmei de dividende?</summary><p>Impozitul micro este 1% din baza art.53; impozitul pe profit este 16% din rezultatul fiscal pozitiv. Plafonul micro de 100.000 euro se verifică separat, prin veniturile relevante proprii și ale întreprinderilor legate. Calculatorul micro presupune același regim pe tot anul; depășirile și ieșirile din regim necesită calcul pe trimestre.</p><p>Dividendele din acest scenariu provin din profitul anului, după impozit și sumele indisponibile introduse. Distribuirea trebuie să respecte rezervele, acoperirea pierderilor și condițiile activului net. Cota de 16% privește distribuiri și plăți în 2026 către o persoană fizică rezidentă adultă. Nu include dividende interimare distribuite în 2025 sau profituri reportate. Scenariul presupune o distribuire eligibilă plătită în 2026; nu afirmă că întreg profitul anual 2026 poate fi aprobat și retras în același an. Pentru profitul distribuit sau încasat ulterior se aplică regulile anului distribuirii și încasării efective.</p></details>
        <details><summary>De ce CASS pentru dividende diferă de CASS la PFA?</summary><p>La dividende se cumulează dividendele nete după impozitul reținut cu celelalte venituri relevante art.155 alin.(1) lit.c)–h). Pragurile de 24.300, 48.600 și 97.200 lei conduc la CASS de 2.430, 4.860 sau 9.720 lei. Salariul, pensia și PFA nu intră în acest coș.</p><p>În rezultat alocăm dividendelor creșterea CASS față de situația fără aceste dividende. În pașii de calcul vezi și CASS anuală totală. Această alocare evită atribuirea încă o dată dividendelor a unei obligații deja produse de celelalte venituri.</p></details>
        <details><summary>Ce reguli folosește calculatorul de salarii?</summary><p>CIM cu normă întreagă și lună completă, în condiții normale: CAS 25%, CASS 10%, impozit 10% și CAM 2,25%. Salariul minim este 4.050 lei în ianuarie–iunie și 4.325 lei în iulie–decembrie. Facilitatea de 300, respectiv 200 lei se aplică doar dacă bifezi condițiile contractuale și sunt respectate limitele de brut și funcția de bază.</p><p>Deducerea de bază se calculează după brut și persoanele întreținute. Deducerile suplimentare pentru tineri și copiii eligibili sunt distincte. Nu se includ tichete, beneficii în natură, concedii medicale, contracte part-time sau scutiri speciale.</p></details>
        <details><summary>Cum citesc valorile și mediile lunare?</summary><p>PFA și SRL afișează estimări în lei și bani pe regulile anului fiscal 2026, înaintea definitivării valorilor declarate în formularele aplicabile. Nu sunt calculate bonificații viitoare, plăți anticipate, accesorii sau diferențe rezultate din alte obligații. Mediile lunare sunt bugete anuale împărțite la 12, nu termene de plată.</p><p>Calculul salarial folosește brutul în lei întregi și rotunjirile scenariului D112. Pentru detalii despre instituții și documente poți consulta <Link href="/formulare">biblioteca de formulare</Link> și <Link href="/articole">articolele Contab</Link>.</p></details>
      </div>
      <div><p className={styles.eyebrow}>Bază legală</p><h2>Surse oficiale.</h2><p className={styles.sourcesIntro}>Cotele, plafoanele și condițiile sunt separate în formulele fiecărui calculator. Consultă actul normativ și perioada relevantă pentru situația calculată.</p>
        <ul className={styles.sources}>{sources.map(([name, url]) => <li key={url}><a href={url} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={14} aria-hidden="true" /></a></li>)}</ul>
        <p className={styles.sourceDate}><ShieldCheck size={14} aria-hidden="true" /> Revizie fiscală și verificare de calcul: 4 noiembrie 2026.</p>
      </div>
    </section>
  </main>;
}
