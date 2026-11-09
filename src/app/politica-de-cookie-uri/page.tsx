import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

export const metadata=pageMetadata({...pageSeo["/politica-de-cookie-uri"],path:"/politica-de-cookie-uri"});

export default function CookiePolicyPage() {
  return <main id="main-content" className="container info-page legal-page">
    <div className="page-heading"><p className="page-kicker">Informații</p><h1>Politică de cookie-uri</h1><p>Actualizată la 4 noiembrie 2026</p></div>
    <div className="prose">
      <p>Contab folosește stocarea locală pentru preferința de afișare. Site-ul nu încarcă Google Analytics, pixeli publicitari sau instrumente de marketing. Căutarea în articole și formulare, precum și calculele fiscale sunt procesate în browser.</p>
      <h2>Preferința de afișare</h2>
      <div className="table-scroll" role="region" tabIndex={0} aria-label="Tehnologii de stocare folosite de Contab"><table><thead><tr><th>Denumire</th><th>Tehnologie și scop</th><th>Păstrare</th></tr></thead><tbody><tr><td><code>theme</code></td><td>Stocare locală pe contab-online.ro. Reține tema luminoasă, întunecată sau preferința sistemului.</td><td>Până când schimbi preferința ori ștergi datele site-ului din browser.</td></tr></tbody></table></div>
      <p>Stocarea locală nu este trimisă automat către server la fiecare accesare, așa cum se întâmplă cu un cookie. Poți schimba tema din butonul de afișare al site-ului.</p>
      <h2>Mecanismele tehnice ale infrastructurii</h2>
      <p>Site-ul este livrat prin infrastructură Cloudflare. Mecanismele de protecție împotriva traficului automat pot emite cookie-uri tehnice în funcție de verificările aplicate vizitei. Ele nu sunt instrumente de publicitate instalate de Contab.</p>
      <div className="table-scroll" role="region" tabIndex={0} aria-label="Cookie-uri Cloudflare condiționate de protecțiile activate"><table><thead><tr><th>Denumire</th><th>Utilizare condiționată</th><th>Durată</th></tr></thead><tbody><tr><td><code>cf_clearance</code></td><td>Dacă este emis, păstrează rezultatul verificărilor de securitate Cloudflare.</td><td>Conform configurației de verificare a infrastructurii; expirarea efectivă este afișată în browser.</td></tr><tr><td><code>__cf_bm</code></td><td>Dacă protecția împotriva roboților îl emite, contribuie la identificarea traficului automat.</td><td>Potrivit Cloudflare, expiră după 30 de minute de inactivitate.</td></tr></tbody></table></div>
      <p>Aceste denumiri descriu mecanismele condiționate ale furnizorului, nu o afirmație că fiecare cookie este emis la fiecare vizită. Poți verifica lista și termenele efective în secțiunea de date ale site-ului din browser. Detalii: <a href="https://developers.cloudflare.com/fundamentals/reference/policies-compliances/cloudflare-cookies/" target="_blank" rel="noopener noreferrer">documentația oficială Cloudflare despre cookie-uri</a>.</p>
      <h2>Servicii externe și măsurarea în Google</h2>
      <p>Formularul de consultanță trimite mesajul direct către serviciul de contact, fără a deschide aplicația de email. Procesarea și livrarea folosesc Cloudflare și Resend, conform <Link href="/politica-de-confidentialitate">Politicii de confidențialitate</Link>. Linkurile către WhatsApp și instituțiile publice deschid servicii externe la cererea ta. Site-ul nu încorporează în pagină widgeturi de urmărire ale acestor servicii. După deschiderea lor se aplică politicile furnizorilor respectivi.</p>
      <p>Verificarea proprietății în Google Search Console permite administrarea prezenței site-ului în Google. Fișierul de verificare nu adaugă un script de analiză sau cookie-uri de marketing în paginile vizitatorilor.</p>
      <h2>Controlul preferințelor</h2>
      <p>Poți vedea, bloca și șterge cookie-urile și stocarea locală din setările browserului, în zona de confidențialitate și date ale site-urilor. Ștergerea cheii <code>theme</code> resetează preferința de afișare; blocarea mecanismelor de securitate poate afecta accesul la site.</p>
      <p>În configurația actuală nu solicităm acceptarea unor cookie-uri de analiză sau marketing, deoarece acestea nu sunt încărcate de site. Dacă introducem asemenea servicii, vom actualiza politica și mecanismul de alegere înainte de activarea lor.</p>
      <h2>Contact</h2>
      <p>Pentru întrebări, scrie la <a href={"mailto:"+CONTACT_EMAIL}>{CONTACT_EMAIL}</a>. Consultă și <Link href="/politica-de-confidentialitate">Politica de confidențialitate</Link> pentru informații despre datele personale.</p>
    </div>
  </main>;
}
