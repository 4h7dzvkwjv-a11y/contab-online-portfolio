"use client";

import { usePathname } from "next/navigation";
import { ConsultationCallout } from "./consultation-callout";
import styles from "./footer-consultation.module.css";

// Contactul are deja canalele complete; paginile legale rămân fără această invitație.
const excludedPaths = new Set(["/contact", "/politica-de-confidentialitate", "/politica-de-cookie-uri", "/termeni", "/_not-found"]);

export function FooterConsultation() {
  const pathname = usePathname();
  const path = pathname.replace(/\/+$/, "") || "/";
  if (excludedPaths.has(path)) return null;
  return <div className={"container " + styles.wrap} data-consultation="footer">
    <ConsultationCallout variant="search" />
  </div>;
}
