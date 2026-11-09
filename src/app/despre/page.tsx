import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Search, ShieldCheck } from "lucide-react";
import { SITE_NAME } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

export const metadata: Metadata = pageMetadata({...pageSeo["/despre"],path:"/despre"});

export default function AboutPage() {
  return (
    <main id="main-content" className="container info-page">
      <div className="page-heading">
        <p className="page-kicker">Despre {SITE_NAME}</p>
        <h1>
          Contabilitate clară.
          <br />
          Consultanță aplicată.
        </h1>
        <p>
          {SITE_NAME} reunește articole de contabilitate și fiscalitate,
          monografii și consultanță pentru situațiile concrete din activitatea
          firmelor.
        </p>
      </div>
      <div className="about-grid">
        <section className="about-feature">
          <Search size={27} strokeWidth={1.6} />
          <h2>Găsești subiectul relevant</h2>
          <p>
            Caută o operațiune, un cont sau o declarație. Accesezi articole
            organizate pe domenii, cu explicații și înregistrări contabile.
          </p>
        </section>
        <section className="about-feature">
          <BookOpen size={27} strokeWidth={1.6} />
          <h2>Urmărești tratamentul aplicabil</h2>
          <p>
            Ipotezele, documentele și calculele sunt prezentate împreună.
            Distincțiile dintre tratamentul contabil și cel fiscal sunt
            explicate pentru fiecare situație.
          </p>
        </section>
        <section className="about-feature">
          <ShieldCheck size={27} strokeWidth={1.6} />
          <h2>Ai baza legală la îndemână</h2>
          <p>
            Articolele indică actele normative, sursele oficiale și data
            actualizării. Regimul analizat și perioada de aplicare sunt
            precizate în conținut.
          </p>
        </section>
      </div>
      <div className="about-copy prose">
        <h2>De la documentare la analiza situației tale</h2>
        <p>
          Un tratament contabil corect pornește de la natura operațiunii,
          documentele justificative, regimul fiscal și perioada în care are loc
          tranzacția. Aceste elemente stau la baza articolelor și monografiilor
          publicate pe {SITE_NAME}.
        </p>
        <p>
          Pentru întrebări care necesită examinarea documentelor sau corelarea
          mai multor reguli, poți solicita consultanță direct pe WhatsApp sau
          prin email. Obiectul analizei și condițiile colaborării se stabilesc
          înainte de începerea lucrului.
        </p>
        <h2>Documentare, calcule și înregistrări verificabile</h2>
        <p>
          Conținutul este structurat în jurul operațiunilor întâlnite în
          practică: achiziții și vânzări, TVA, salarizare, distribuirea
          dividendelor, raportări și închiderea perioadelor contabile. Exemplele
          precizează condițiile folosite în calcul și conturile aferente.
        </p>
        <Link className="button button-primary" href="/articole">
          Explorează articolele <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
