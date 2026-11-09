"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, LoaderCircle, Send } from "lucide-react";

const ENDPOINT = "https://mesaje.contab-online.ro/api/contact";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [context, setContext] = useState("");
  const pending = useRef(false);
  const status = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setContext(Array.from(new URLSearchParams(window.location.search).get("context") ?? "").slice(0, 240).join("").replace(/[\u0000-\u001f\u007f]/g, " "));
  }, []);

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current || state === "sent") return;
    const element = event.currentTarget;
    if (!element.reportValidity()) return;
    const form = new FormData(element);
    pending.current = true;
    setState("sending");
    setError("");
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        signal: AbortSignal.timeout(25_000),
        body: JSON.stringify({
          name: String(form.get("name") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
          subject: String(form.get("subject") ?? ""),
          message: String(form.get("message") ?? "").trim(),
          website: String(form.get("website") ?? ""),
          consent: form.get("consent") === "on",
          context,
        }),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) {
        throw new Error(response.status === 429 ? "Ai trimis mai multe solicitări într-un timp scurt. Așteaptă un minut și încearcă din nou." : response.status === 400 ? "Verifică numele, adresa de email și mesajul, apoi încearcă din nou." : "Nu am putut confirma trimiterea. Datele au rămas în formular. Încearcă din nou sau contactează-ne pe WhatsApp.");
      }
      setState("sent");
      element.reset();
      status.current?.focus();
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "TypeError" ? cause.message : "Nu am putut confirma trimiterea. Datele au rămas în formular. Verifică conexiunea și încearcă din nou.");
      setState("error");
    } finally {
      pending.current = false;
    }
  }

  return (
    <form id="solicita-consultanta" className="contact-form" onSubmit={sendMessage} aria-busy={state === "sending"}>
      <h2>Trimite o solicitare de consultanță</h2>
      <p className="form-intro">Descrie întrebarea ta. Mesajul ajunge direct la echipa Contab, iar răspunsul îl primești la adresa de email indicată.</p>
      {context && <p className="form-context">Referitor la: <strong>{context}</strong></p>}
      <fieldset disabled={state === "sending" || state === "sent"} className="contact-form-fields">
        <div className="form-row">
          <div className="form-field">
            <label htmlFor="contact-name">Nume</label>
            <input id="contact-name" name="name" autoComplete="name" required minLength={2} maxLength={100} placeholder="Numele tău" />
          </div>
          <div className="form-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={150} placeholder="nume@exemplu.ro" />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="contact-subject">Subiect</label>
          <select id="contact-subject" name="subject">
            <option>Consultanță contabilă și fiscală</option>
            <option>TVA și operațiuni fiscale</option>
            <option>Monografii și înregistrări contabile</option>
            <option>Salarizare și contribuții</option>
            <option>Altă solicitare</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="contact-message">Mesaj</label>
          <textarea id="contact-message" name="message" rows={5} required minLength={10} maxLength={4000} placeholder="Descrie operațiunea, perioada și întrebarea pentru care soliciți consultanță…" />
        </div>
        <div className="contact-trap" aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="form-consent">
          <input type="checkbox" name="consent" required />
          <span>Am citit <Link href="/politica-de-confidentialitate">politica de confidențialitate</Link>. Solicit să fiu contactat pentru analiza situației descrise.</span>
        </label>
        <button type="submit" className="button button-primary">
          {state === "sending" ? <><LoaderCircle size={17} className="contact-spinner" aria-hidden="true" /> Se trimite…</> : state === "sent" ? <><Check size={17} aria-hidden="true" /> Mesaj trimis</> : <><Send size={17} aria-hidden="true" /> Trimite solicitarea</>}
        </button>
      </fieldset>
      <p className="form-note">Trimitere direct din site către contact@contab-online.ro.</p>
      <div ref={status} tabIndex={-1}>
        {state === "sent" && <div className="form-status" role="status"><Check size={16} aria-hidden="true" /> Mesajul tău a fost trimis. Îți răspundem la adresa de email indicată.</div>}
        {state === "error" && <div className="form-status form-status-error" role="alert">{error}</div>}
      </div>
      {state === "sent" && <button type="button" className="contact-send-another" onClick={() => { setState("idle"); requestAnimationFrame(() => document.getElementById("contact-name")?.focus()); }}>Trimite altă solicitare</button>}
    </form>
  );
}
