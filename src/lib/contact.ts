import { CONTACT_EMAIL, SITE_NAME, WHATSAPP_NUMBER } from "./site";

function cleanContext(value: string) {
  return Array.from(
    value
      .toWellFormed()
      .replace(/[\u0000-\u001f\u007f]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  )
    .slice(0, 240)
    .join("");
}

export function consultationMessage(context = "") {
  const subject = cleanContext(context);
  return subject
    ? "Bună ziua! Doresc consultanță contabilă și fiscală în legătură cu: " +
        subject
    : "Bună ziua! Doresc să solicit consultanță contabilă și fiscală prin " +
        SITE_NAME +
        ".";
}

export function whatsappUrl(context = "") {
  return (
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(consultationMessage(context))
  );
}

export function whatsappAppUrl(context = "") {
  return "whatsapp://send?" + new URLSearchParams({ phone: WHATSAPP_NUMBER, text: consultationMessage(context) }).toString();
}

export function whatsappWebUrl(context = "") {
  return "https://web.whatsapp.com/send?" + new URLSearchParams({ phone: WHATSAPP_NUMBER, text: consultationMessage(context) }).toString();
}

export function consultationContactUrl(context = "") {
  const value = cleanContext(context);
  return "/contact" + (value ? "?" + new URLSearchParams({ context: value }).toString() : "") + "#solicita-consultanta";
}

export function consultationEmailUrl(context = "", body?: string) {
  const subject =
    "Solicitare consultanță — " + (cleanContext(context) || SITE_NAME);
  return (
    "mailto:" +
    CONTACT_EMAIL +
    "?subject=" +
    encodeURIComponent(subject) +
    "&body=" +
    encodeURIComponent((body ?? consultationMessage(context)).toWellFormed())
  );
}
