import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({...pageSeo["/politica-de-confidentialitate"],path:"/politica-de-confidentialitate"});

export default function PrivacyPage() {
  return (
    <main id="main-content" className="container info-page legal-page">
      <div className="page-heading">
        <p className="page-kicker">Informații</p>
        <h1>Politică de confidențialitate</h1>
        <p>Actualizată la 4 noiembrie 2026</p>
      </div>
      <div className="prose">
        <h2>Contact pentru protecția datelor</h2>
        <p>
          Pentru întrebări despre datele folosite în legătură cu {SITE_NAME}, ne
          poți scrie la <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>.
          Descrie solicitarea și datele la care se referă, fără a transmite
          documente de identitate dacă nu sunt necesare soluționării.
        </p>
        <h2>Căutare și navigare</h2>
        <p>
          Articolele sunt căutate într-un index procesat în browser. Site-ul nu
          trimite întrebarea către un serviciu extern de inteligență
          artificială. Interogarea apare în adresa paginii de rezultate și poate
          fi păstrată în istoricul browserului și în jurnalele tehnice ale
          infrastructurii care servește pagina.
        </p>
        <p>
          Datele tehnice de navigare pot include adresa IP, momentul cererii și
          informații despre browser. Acestea servesc furnizării paginii,
          funcționării și securității serviciului. Nu introduce date personale
          ale clienților, CNP-uri sau informații confidențiale în câmpul de
          căutare.
        </p>
        <h2>Preferința de afișare</h2>
        <p>
          Preferința pentru tema luminoasă sau întunecată se păstrează în
          spațiul local al browserului, prin cheia „theme”. O poți modifica din
          interfață sau elimina din setările browserului. Site-ul nu include în
          prezent publicitate, instrumente de analiză a traficului sau
          cookie-uri de marketing.
        </p>
        <p>Detaliile despre stocarea locală și mecanismele tehnice sunt în <Link href="/politica-de-cookie-uri">Politica de cookie-uri</Link>.</p>
        <h2>Formularul de contact și emailul</h2>
        <p>
          Formularul folosește numele, adresa de email, subiectul și mesajul
          introduse de tine pentru a trimite o solicitare direct către
          {" "}{CONTACT_EMAIL}. Datele sunt transmise printr-o conexiune criptată
          către serviciul de contact al site-ului când apeși „Trimite solicitarea”.
          Nu este necesară deschiderea aplicației tale de email.
        </p>
        <p>
          Când alegi să trimiți mesajul, datele ajung la adresa de contact și
          sunt folosite pentru răspuns, clarificarea cererii și, dacă este
          cazul, pregătirea colaborării. Furnizarea datelor de contact este
          necesară pentru un răspuns individual; nu există obligația de a
          utiliza formularul.
        </p>
        <h2>Contactul prin WhatsApp</h2>
        <p>
          Butonul de consultanță deschide un link extern către WhatsApp. Nu
          încărcăm în pagină un widget de urmărire WhatsApp. Dacă folosești
          linkul dintr-un articol sau din rezultatele căutării, mesajul pregătit
          poate include titlul articolului sau întrebarea căutată. Îl poți edita
          înainte de expediere.
        </p>
        <p>
          Mesajul nu se trimite automat. Folosirea aplicației WhatsApp și a
          serviciilor externe de comunicare este supusă și politicilor acelor servicii.
          În prima solicitare sunt suficiente întrebarea și contextul;
          modalitatea de transmitere a documentelor de lucru se stabilește în
          cadrul discuției.
        </p>
        <h2>Scop, temei și păstrare</h2>
        <p>
          Datele din solicitări sunt folosite pentru demersurile cerute înaintea
          unei colaborări și pentru executarea acesteia, după caz, conform art.
          6 alin. (1) lit. b) din Regulamentul (UE) 2016/679. Pentru comunicarea
          cu reprezentanții unei societăți și protejarea serviciului, temeiul
          poate fi interesul legitim prevăzut de lit. f). Obligațiile de
          păstrare impuse de lege se întemeiază pe lit. c).
        </p>
        <p>
          Corespondența se păstrează cât este necesar soluționării solicitării
          și urmăririi aspectelor convenite. Dacă se încheie un contract,
          documentele aferente se păstrează potrivit obligațiilor legale și
          necesității de a constata, exercita sau apăra drepturi. Nu folosim
          solicitările de consultanță pentru înscriere automată la comunicări
          comerciale.
        </p>
        <h2>Destinatari și servicii externe</h2>
        <p>
          Formularul utilizează Cloudflare pentru procesarea și protejarea
          trimiterii, iar corespondența este gestionată în Resend. Mesajul și
          datele de contact sunt transmise acestor furnizori pentru livrare și
          răspuns. Nu creăm o bază de date separată a mesajelor pe site.
          Protecția împotriva abuzurilor folosește adresa IP pentru limitarea
          temporară a frecvenței solicitărilor; conținutul formularului nu este
          înscris în jurnalele aplicației de contact.
        </p>
        <p>
          Furnizorii tehnici utilizați pentru găzduire și comunicare pot
          prelucra datele necesare serviciilor lor, în condițiile aplicabile
          fiecărui serviciu. Accesarea surselor legislative sau a butonului
          LinkedIn deschide un serviciu extern la acțiunea ta. Butonul de
          copiere a linkului folosește clipboardul dispozitivului.
        </p>
        <h2>Drepturile tale</h2>
        <p>
          În condițiile Regulamentului (UE) 2016/679, poți solicita accesul la
          date, rectificarea, ștergerea, restricționarea prelucrării sau
          portabilitatea și poți formula opoziție față de prelucrările
          întemeiate pe interes legitim. Drepturile se exercită la{" "}
          <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>; se aplică
          limitele și excepțiile prevăzute de lege.
        </p>
        <p>
          Ai și dreptul de a depune o plângere la{" "}
          <a
            href="https://www.dataprotection.ro/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Autoritatea Națională de Supraveghere a Prelucrării Datelor cu
            Caracter Personal
          </a>
          . O prezentare oficială a drepturilor este disponibilă în{" "}
          <a
            href="https://www.dataprotection.ro/servlet/ViewDocument?id=1298"
            target="_blank"
            rel="noopener noreferrer"
          >
            documentul ANSPDCP privind drepturile persoanelor vizate
          </a>
          .
        </p>
      </div>
    </main>
  );
}
