import test from "node:test";
import assert from "node:assert/strict";
import { handleContact, validateContact, contactMime } from "../services/contact/handler.mjs";

const valid = { name: "Client Test", email: "portfolio@example.com", subject: "Altă solicitare", message: "Întrebare de test, cu diacritice: TVA și contabilitate.", consent: true, website: "" };
const env = { CONTACT_LIMIT: { limit: async () => ({ success: true }) } };
const request = (data: unknown, origin = "https://contab-online.ro", headers = {}) => new Request("https://mesaje.contab-online.ro/api/contact", { method: "POST", headers: { Origin: origin, "Content-Type": "application/json", "CF-Connecting-IP": "192.0.2.1", ...headers }, body: typeof data === "string" ? data : JSON.stringify(data) });

test("livrarea păstrează destinatarul Contab și Reply-To al clientului", async () => {
  let raw = "";
  const response = await handleContact(request(valid), env, async (message: string) => { raw = message; });
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.match(raw, /To: contact@contab-online\.ro\r\n/);
  assert.match(raw, /Reply-To: vemi\.fitness@gmail\.com\r\n/);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://contab-online.ro");
});

test("erorile de livrare nu produc confirmări false", async () => {
  const response = await handleContact(request(valid), env, async () => { throw new Error("provider unavailable"); });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, undefined);
});

test("validarea respinge injecția de antete, consimțământul absent și câmpul capcană", () => {
  for (const patch of [{ email: "client@example.ro\r\nBcc: other@example.ro" }, { name: "Nume\r\nTo: other@example.ro" }, { consent: false }, { website: "spam" }, { subject: "Subiect arbitrar" }, { message: "scurt" }, { message: "x".repeat(4001) }]) {
    assert.equal(validateContact({ ...valid, ...patch }), null);
  }
});

test("MIME include text și HTML sigur, cu caractere românești păstrate", () => {
  const data = validateContact({ ...valid, message: '<script>alert("x")</script>\nÎntrebare & răspuns' })!;
  const raw = contactMime(data, "cf1ca41e-e616-4220-b7ab-7831568ddc85");
  const bodies = [...raw.matchAll(/Content-Transfer-Encoding: base64\r\n\r\n([A-Za-z0-9+/=\r\n]+)\r\n--/g)].map(m => Buffer.from(m[1], "base64").toString("utf8"));
  assert.equal(bodies.length, 2);
  assert.match(bodies[0], /Întrebare & răspuns/);
  assert.match(bodies[1], /&lt;script&gt;/);
  assert.doesNotMatch(bodies[1], /<script>/);
});

test("numele lungi cu diacritice nu depășesc limita cuvintelor RFC 2047", () => {
  const name = "Ștefănescu Ăîâțș ".repeat(5).trim();
  const raw = contactMime(validateContact({ ...valid, name })!, "cf1ca41e-e616-4220-b7ab-7831568ddc85");
  const words = [...raw.matchAll(/=\?UTF-8\?B\?([^?]+)\?=/g)];
  assert.ok(words.length > 2);
  assert.ok(words.every(m => m[0].length <= 75));
  assert.ok(words.every(m => !Buffer.from(m[1], "base64").toString("utf8").includes("�")));
});

test("destinațiile externe, cererile prea mari și depășirea limitei nu trimit email", async () => {
  let sends = 0;
  const send = async () => { sends++; };
  assert.equal((await handleContact(request(valid, "https://external.example"), env, send)).status, 403);
  assert.equal((await handleContact(request(" ".repeat(20001)), env, send)).status, 400);
  const limited = { CONTACT_LIMIT: { limit: async () => ({ success: false }) } };
  const response = await handleContact(request(valid), limited, send);
  assert.equal(response.status, 429);
  assert.equal(response.headers.get("Retry-After"), "60");
  assert.equal(sends, 0);
});
