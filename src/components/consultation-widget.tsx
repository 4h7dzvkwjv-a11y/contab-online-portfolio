"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Mail, X } from "lucide-react";
import Link from "next/link";
import { CONTACT_EMAIL, PHONE_DISPLAY } from "@/lib/site";
import { consultationContactUrl } from "@/lib/contact";
import { WhatsAppIcon } from "./whatsapp-icon";
import { WhatsAppLink } from "./whatsapp-link";

export function ConsultationWidget() {
  const [open, setOpen] = useState(false);
  const [inlineVisible, setInlineVisible] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const id = useId();

  function close(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) launcher.current?.focus();
  }

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const visible = new Set<Element>();
    const blocks = document.querySelectorAll('[data-consultation="footer"], #solicita-consultanta');
    setInlineVisible(false);
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting && entry.intersectionRatio >= .4) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setInlineVisible(visible.size > 0);
    }, { threshold: .4 });
    blocks.forEach(block => observer.observe(block));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    closeButton.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        launcher.current?.focus();
      }
    };
    const onOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);

  return (
    <div className="consultation-widget" ref={root}
      hidden={inlineVisible && !open && !hasFocus}
      onFocusCapture={() => setHasFocus(true)}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHasFocus(false); }}>
      {open ? (
        <section
          id={id}
          role="dialog"
          aria-modal="false"
          aria-labelledby={id + "-title"}
          className="consultation-popup"
        >
          <div className="consultation-popup-top">
            <span className="consultation-symbol">
              <WhatsAppIcon size={24} />
            </span>
            <button
              type="button"
              className="icon-button"
              ref={closeButton}
              onClick={() => close()}
              aria-label="Închide fereastra de consultanță"
            >
              <X size={18} />
            </button>
          </div>
          <h2 id={id + "-title"}>Cere consultanță</h2>
          <p>
            Ai o întrebare de contabilitate sau fiscalitate? Trimite-ne situația
            ta și stabilim analiza necesară.
          </p>
          <WhatsAppLink
            className="button button-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} />
            Deschide WhatsApp
            <ArrowUpRight size={16} />
          </WhatsAppLink>
          <span className="consultation-phone">{PHONE_DISPLAY}</span>
          <div className="consultation-popup-divider">
            <span>sau trimite un mesaj din site</span>
          </div>
          <Link className="consultation-email-link" href={consultationContactUrl()} onClick={() => close(false)}>
            <Mail size={15} />
            {CONTACT_EMAIL}
          </Link>
        </section>
      ) : null}
      <button
        ref={launcher}
        type="button"
        className="consultation-launcher"
        aria-label={
          open
            ? "Închide fereastra de consultanță WhatsApp"
            : "Cere consultanță pe WhatsApp"
        }
        aria-expanded={open}
        aria-controls={open ? id : undefined}
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? <X size={21} /> : <WhatsAppIcon size={21} />}
        <span>Cere consultanță</span>
      </button>
    </div>
  );
}
