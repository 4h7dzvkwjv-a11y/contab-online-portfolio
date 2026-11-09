import type { Metadata } from "next";
import { Mail } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/lib/site";
import { consultationContactUrl } from "@/lib/contact";
import { WhatsAppLink } from "@/components/whatsapp-link";
import { pageMetadata } from "@/lib/seo";
import { pageSeo } from "@/data/seo-pages";

export const metadata: Metadata = pageMetadata({...pageSeo["/contact"],path:"/contact"});

export default function ContactPage() {
  return (
    <main id="main-content" className="container info-page">
      <div className="page-heading">
        <p className="page-kicker">Contact și consultanță</p>
        <h1>
          Consultanță contabilă
          <br />
          și fiscală.
        </h1>
        <p>
          Solicită o analiză contabilă sau fiscală. Contactează-ne direct pe
          WhatsApp sau trimite solicitarea direct din formular.
        </p>
      </div>
      <div className="contact-layout">
        <aside className="contact-aside">
          <h2>Discutăm concret întrebarea ta.</h2>
          <p>
            Descrie activitatea firmei, operațiunea și perioada la care te
            referi. Stabilim informațiile necesare pentru o analiză adaptată
            situației tale.
          </p>
          <div className="contact-methods">
            <WhatsAppLink
              target="_blank"
              rel="noopener noreferrer"
              className="contact-method"
            >
              <WhatsAppIcon size={23} />
              <span>
                <span className="contact-method-label">
                  Consultanță pe WhatsApp
                </span>
                <span className="contact-method-value">{PHONE_DISPLAY}</span>
              </span>
            </WhatsAppLink>
            <Link href={consultationContactUrl()} className="contact-method">
              <Mail size={23} />
              <span>
                <span className="contact-method-label">
                  Trimite un mesaj din site
                </span>
                <span className="contact-method-value">{CONTACT_EMAIL}</span>
              </span>
            </Link>
          </div>
          <div className="contact-process">
            <h2>Cum decurge solicitarea</h2>
            <ol>
              <li>Ne trimiți întrebarea și contextul operațiunii.</li>
              <li>Stabilim documentele și informațiile necesare.</li>
              <li>Agreăm obiectul analizei și condițiile colaborării.</li>
            </ol>
          </div>
          <p className="form-note">
            Documentele de lucru și modalitatea de transmitere se stabilesc în
            cadrul discuției.
          </p>
        </aside>
        <ContactForm />
      </div>
      <section className="consultation-faq prose" aria-labelledby="consultation-faq-title">
        <h2 id="consultation-faq-title">Întrebări despre consultanță</h2>
        <details><summary>Cum solicit o analiză contabilă sau fiscală?</summary><p>Completează <Link href={consultationContactUrl()}>formularul de contact</Link> sau folosește butonul WhatsApp. Mesajul din formular ajunge direct la {CONTACT_EMAIL}, iar răspunsul îl primești la adresa indicată. Prezintă întrebarea, activitatea firmei și perioada operațiunii.</p></details>
        <details><summary>Ce informații includ în prima solicitare?</summary><p>Descrie situația și ce vrei să clarifici. Stabilim în cadrul discuției documentele necesare analizei și modalitatea de transmitere. Nu este necesar să trimiți din primul mesaj documente de identitate.</p></details>
        <details><summary>Cum se stabilesc condițiile colaborării?</summary><p>Obiectul analizei și condițiile colaborării se stabilesc înainte de începerea lucrului, în funcție de situația prezentată și documentele relevante.</p></details>
      </section>
    </main>
  );
}
