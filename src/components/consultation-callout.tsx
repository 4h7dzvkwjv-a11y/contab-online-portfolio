import { Mail, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { consultationContactUrl } from "@/lib/contact";
import { WhatsAppIcon } from "./whatsapp-icon";
import { WhatsAppLink } from "./whatsapp-link";

export function ConsultationCallout({
  context = "",
  variant = "article",
}: {
  context?: string;
  variant?: "article" | "search";
}) {
  if (variant === "article")
    return (
      <div
        className="editorial-note consultation-note"
        data-consultation="article"
      >
        <strong>Consultanță contabilă și fiscală.</strong> Pentru o analiză
        adaptată situației tale, trimite-ne un mesaj prin{" "}
        <Link href={consultationContactUrl(context)}>formularul de contact</Link> sau{" "}
        <WhatsAppLink context={context}>
          contactează-ne pe WhatsApp
          <ArrowUpRight size={12} />
        </WhatsAppLink>
        .
      </div>
    );

  return (
    <section
      className="search-consultation"
      aria-label="Solicită consultanță"
      data-consultation="search"
    >
      <span className="consultation-symbol">
        <WhatsAppIcon size={25} />
      </span>
      <div className="search-consultation-copy">
        <h2>Ai nevoie de o analiză pentru situația ta?</h2>
        <p>
          Cere consultanță contabilă și fiscală. Discutăm întrebarea ta și
          documentele relevante.
        </p>
      </div>
      <div className="search-consultation-actions">
        <WhatsAppLink
          context={context}
          className="button button-whatsapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={16} />
          Cere consultanță
        </WhatsAppLink>
        <Link
          href={consultationContactUrl(context)}
          className="consultation-email-link"
          title="Trimite un mesaj prin formularul Contab"
        >
          <Mail size={13} />
          {CONTACT_EMAIL}
        </Link>
      </div>
    </section>
  );
}
