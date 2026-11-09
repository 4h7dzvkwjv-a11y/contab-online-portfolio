export const CONTACT_SUBJECTS = [
  "Consultanță contabilă și fiscală",
  "TVA și operațiuni fiscale",
  "Monografii și înregistrări contabile",
  "Salarizare și contribuții",
  "Altă solicitare",
];

const origins = new Set([
  "https://contab-online.ro",
  "https://www.contab-online.ro",
  "https://contab-online.deca-andrei.chatgpt.site",
]);
const MAX_BYTES = 20_000;
const controls = /[\u0000-\u001f\u007f]/;

function json(data, status, origin, extra = {}) {
  return Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Vary": "Origin",
      ...(origins.has(origin) ? { "Access-Control-Allow-Origin": origin } : {}),
      ...extra,
    },
  });
}

async function boundedJson(request) {
  if (Number(request.headers.get("content-length")) > MAX_BYTES) throw new Error("size");
  const reader = request.body?.getReader();
  if (!reader) throw new Error("body");
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BYTES) {
        await reader.cancel();
        throw new Error("size");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}

export function validateContact(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const { name, email, subject, message, consent, website, context = "" } = value;
  if (![name, email, subject, message, context].every(v => typeof v === "string")) return null;
  const result = { name: name.trim(), email: email.trim(), subject, message: message.trim(), context: context.trim() };
  if (consent !== true || (website !== undefined && website !== "")) return null;
  if (result.name.length < 2 || result.name.length > 100 || controls.test(result.name)) return null;
  if (result.email.length > 150 || !/^[^\s<>@,;()\[\]\\":]+@[^\s<>@,;()\[\]\\":]+\.[^\s<>@,;()\[\]\\":]+$/.test(result.email) || controls.test(result.email)) return null;
  if (!CONTACT_SUBJECTS.includes(subject)) return null;
  if (result.message.length < 10 || result.message.length > 4000 || /[\u0000\u000b\u000c\u007f]/.test(result.message)) return null;
  if (result.context.length > 240 || controls.test(result.context)) return null;
  return result;
}

const escapeHtml = value => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const base64 = value => btoa(Array.from(new TextEncoder().encode(value), b => String.fromCharCode(b)).join(""));
const wrapBase64 = value => base64(value).match(/.{1,76}/g)?.join("\r\n") ?? "";

function encodedHeader(value) {
  // RFC 2047 words must stay below 75 bytes; split on Unicode boundaries.
  const words = [];
  let chunk = "";
  for (const char of value) {
    if (new TextEncoder().encode(chunk + char).length > 42) {
      words.push("=?UTF-8?B?" + base64(chunk) + "?=");
      chunk = "";
    }
    chunk += char;
  }
  if (chunk) words.push("=?UTF-8?B?" + base64(chunk) + "?=");
  return words.join("\r\n ");
}

export function contactMime(data, reference) {
  const boundary = "contab_" + reference.replaceAll("-", "");
  const context = data.context ? "\nContext: " + data.context : "";
  const text = `Solicitare de consultanță | Contab\n\nNume: ${data.name}\nEmail: ${data.email}\nSubiect: ${data.subject}${context}\n\n${data.message}\n\nReferință: ${reference}\nTrimis din formularul de pe contab-online.ro. Folosește Răspunde pentru a contacta solicitantul.`;
  const html = `<html lang="ro"><body><h2>Solicitare de consultanță | Contab</h2><p><strong>Nume:</strong> ${escapeHtml(data.name)}<br><strong>Email:</strong> ${escapeHtml(data.email)}<br><strong>Subiect:</strong> ${escapeHtml(data.subject)}${data.context ? "<br><strong>Context:</strong> " + escapeHtml(data.context) : ""}</p><div style="white-space:pre-wrap">${escapeHtml(data.message)}</div><hr><p>Referință: ${reference}<br>Trimis din formularul de pe contab-online.ro. Folosește Răspunde pentru a contacta solicitantul.</p></body></html>`;
  return [
    "From: " + encodedHeader(data.name + " | Contab") + "\r\n <formular@contab-online.ro>",
    "To: contact@contab-online.ro",
    "Reply-To: " + data.email,
    "Subject: " + encodedHeader("Solicitare consultanță | " + data.subject + " | " + data.name),
    "Date: " + new Date().toUTCString(),
    `Message-ID: <${reference}@contab-online.ro>`,
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
    "",
    `--${boundary}`,
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(text),
    `--${boundary}`,
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    wrapBase64(html),
    `--${boundary}--`,
    "",
  ].join("\r\n");
}

export async function handleContact(request, env, send) {
  const origin = request.headers.get("Origin") ?? "";
  if (new URL(request.url).pathname !== "/api/contact") return json({ error: "not_found" }, 404, origin);
  if (!origins.has(origin)) return json({ error: "forbidden" }, 403, origin);
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "600",
    "Vary": "Origin",
  } });
  if (request.method !== "POST") return json({ error: "method" }, 405, origin, { Allow: "POST, OPTIONS" });
  if (!(request.headers.get("Content-Type") ?? "").toLowerCase().startsWith("application/json")) return json({ error: "invalid_request" }, 415, origin);
  try {
    // The edge supplies this header; never trust an IP supplied in the form.
    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip || !(await env.CONTACT_LIMIT.limit({ key: "contact:" + ip })).success) {
      return json({ error: "rate_limit" }, 429, origin, { "Retry-After": "60" });
    }
    let data;
    try { data = validateContact(await boundedJson(request)); }
    catch { return json({ error: "invalid_request" }, 400, origin); }
    if (!data) return json({ error: "invalid_fields" }, 400, origin);
    const reference = crypto.randomUUID();
    // Await provider acceptance before displaying the confirmation. No visitor data in logs.
    try { await send(contactMime(data, reference)); }
    catch {
      console.error(JSON.stringify({ event: "contact_delivery_failed", reference }));
      return json({ error: "delivery_failed" }, 503, origin);
    }
    return json({ ok: true, reference }, 200, origin);
  } catch {
    return json({ error: "unavailable" }, 503, origin);
  }
}
