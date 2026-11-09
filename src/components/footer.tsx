import Link from "next/link";
import { Logo } from "./logo";
import { CONTACT_EMAIL, PHONE_DISPLAY, SITE_NAME } from "@/lib/site";
import { consultationContactUrl } from "@/lib/contact";
import { WhatsAppLink } from "./whatsapp-link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              Contabilitate și fiscalitate.
              <br />
              Consultanță pentru situații concrete.
            </p>
          </div>
          <div className="footer-column">
            <h2>Resurse</h2>
            <Link href="/articole">Articole</Link>
            <Link href="/categorii">Categorii</Link>
            <Link href="/formulare">Formulare</Link>
            <Link href="/calculator-taxe">Calculator taxe</Link>
          </div>
          <div className="footer-column">
            <h2>Consultanță</h2>
            <Link href="/despre">Despre</Link>
            <Link href="/contact">Contact</Link>
            <WhatsAppLink>
              WhatsApp: {PHONE_DISPLAY}
            </WhatsAppLink>
            <Link href={consultationContactUrl()} title="Trimite un mesaj prin formularul Contab">{CONTACT_EMAIL}</Link>
          </div>
          <div className="footer-column footer-legal">
            <h2>Informații</h2>
            <Link href="/politica-de-confidentialitate">
              Politică de confidențialitate
            </Link>
            <Link href="/termeni">Termeni de utilizare</Link>
            <Link href="/politica-de-cookie-uri">Politică de cookie-uri</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 {SITE_NAME}. Toate drepturile rezervate.</p>
          <p>Contabilitate. Fiscalitate. Consultanță.</p>
        </div>
      </div>
    </footer>
  );
}
