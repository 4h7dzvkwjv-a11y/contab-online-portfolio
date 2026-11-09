import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

export const metadata: Metadata = pageMetadata({...pageSeo["/termeni"],path:"/termeni"});

export default function TermsPage() {
  return (
    <main id="main-content" className="container info-page legal-page">
      <div className="page-heading">
        <p className="page-kicker">Informații</p>
        <h1>Termeni de utilizare</h1>
        <p>Actualizați la 4 noiembrie 2026</p>
      </div>
      <div className="prose">
        <h2>Obiectul site-ului</h2>
        <p>
          {SITE_NAME} publică articole, monografii și analize de contabilitate
          și fiscalitate românească și pune la dispoziție canale pentru
          solicitarea consultanței. Accesul la articole și la căutare este
          gratuit.
        </p>
        <h2>Perioada și ipotezele analizelor</h2>
        <p>
          Articolele precizează perioada fiscală, ipotezele exemplelor și baza
          legală utilizată. Data revizuirii arată momentul verificării
          editoriale. Aplicarea unui tratament unei operațiuni concrete
          presupune încadrarea în condițiile descrise: forma de organizare,
          regimul fiscal, documentele și data operațiunii.
        </p>
        <p>
          Exemplele numerice au ipoteze proprii. Schimbarea unei condiții,
          precum statutul de TVA, dreptul de deducere sau rezidența
          beneficiarului, poate schimba rezultatul. Sursele oficiale sunt
          indicate pentru urmărirea regulii și a versiunii aplicabile.
        </p>
        <h2>Solicitarea consultanței</h2>
        <p>
          Poți iniția o solicitare prin formularul de contact, prin WhatsApp sau la{" "}
          <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>. Obiectul
          analizei, informațiile necesare, termenul, onorariul și condițiile
          colaborării se stabilesc explicit înaintea prestării serviciului.
        </p>
        <p>
          Deschiderea unui link de contact sau completarea formularului nu
          confirmă încheierea unui contract și nu inițiază o plată. Butonul
          „Trimite solicitarea” expediază mesajul direct din site. Confirmarea
          automată indică trimiterea mesajului; obiectul și acceptarea
          colaborării se stabilesc în cadrul corespondenței.
        </p>
        <h2>Căutare și relevanță</h2>
        <p>
          Rezultatele sunt selectate din articolele publicate pe site. Scorul de
          relevanță exprimă potrivirea termenilor întrebării cu titlul,
          conținutul și clasificarea articolului. Acesta nu reprezintă un
          procent de certitudine juridică sau o opinie individuală generată
          automat.
        </p>
        <h2>Folosirea conținutului</h2>
        <p>
          Materialele originale și identitatea vizuală sunt protejate potrivit
          legislației aplicabile. Poți distribui linkuri către articole și poți
          cita fragmente în limitele legii, cu indicarea sursei. Preluarea
          integrală sau republicarea sistematică necesită acordul titularului
          drepturilor, în afara excepțiilor legale.
        </p>
        <p>
          Documentele oficiale și serviciile externe păstrează propriile
          condiții de utilizare. Trimiterea la ANAF, Ministerul Finanțelor sau
          Portalul Legislativ indică sursa documentării și nu reprezintă
          afiliere instituțională.
        </p>
        <h2>Utilizare și comunicare</h2>
        <p>
          Nu folosi site-ul pentru afectarea funcționării serviciului,
          transmiterea de conținut ilegal sau încălcarea drepturilor altor
          persoane. Nu introduce în căutare date confidențiale ale clienților
          ori identificatori personali. Documentele necesare unei analize se
          transmit prin modalitatea convenită în cadrul solicitării.
        </p>
        <h2>Actualizări și contact</h2>
        <p>
          Conținutul și funcționalitățile pot fi actualizate pentru modificări
          legislative și îmbunătățiri. Pentru o neconcordanță identificată
          într-un articol, trimite titlul, pasajul și sursa relevantă la{" "}
          <a href={"mailto:" + CONTACT_EMAIL}>{CONTACT_EMAIL}</a>, pentru
          verificare și corecție.
        </p>
      </div>
    </main>
  );
}
