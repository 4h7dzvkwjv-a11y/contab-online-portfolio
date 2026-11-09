import test from "node:test";
import assert from "node:assert/strict";
import {
  consultationEmailUrl,
  consultationMessage,
  whatsappUrl,
  whatsappAppUrl,
  whatsappWebUrl,
  consultationContactUrl,
} from "../src/lib/contact";

test("aplicația și WhatsApp Web păstrează destinatarul și mesajul complet", () => {
  for (const context of ["", "TVA & SAF-T? ajustări și sume"]) {
    for (const link of [whatsappAppUrl(context), whatsappWebUrl(context)]) {
      const url = new URL(link);
      assert.equal(url.searchParams.get("phone"), "40750461982");
      assert.equal(url.searchParams.get("text"), consultationMessage(context));
      assert.equal(url.searchParams.get("text"), new URL(whatsappUrl(context)).searchParams.get("text"));
    }
  }
});

test("formularul primește contextul fără a schimba ruta sau fragmentul", () => {
  const url = new URL(consultationContactUrl("TVA & #salarizare\r\n2026"), "https://contab-online.ro");
  assert.equal(url.pathname, "/contact");
  assert.equal(url.hash, "#solicita-consultanta");
  assert.equal(url.searchParams.get("context"), "TVA & #salarizare 2026");
});

test("WhatsApp păstrează destinatarul și codifică întrebarea în română", () => {
  const question = "TVA & D406? sumă 1.000 lei + ajustări";
  const url = new URL(whatsappUrl(question));
  assert.equal(url.origin, "https://wa.me");
  assert.equal(url.pathname, "/40750461982");
  assert.equal(url.searchParams.size, 1);
  assert.equal(url.searchParams.get("text"), consultationMessage(question));
  assert.ok(url.searchParams.get("text")?.includes(question));
});

test("emailul are destinatar fix și nu permite injectarea antetelor prin context", () => {
  const url = new URL(
    consultationEmailUrl(
      "TVA\r\n&bcc=extern@example.org",
      "Întrebare\ncu două rânduri",
    ),
  );
  assert.equal(url.protocol, "mailto:");
  assert.equal(url.pathname, "contact@contab-online.ro");
  assert.deepEqual([...url.searchParams.keys()], ["subject", "body"]);
  assert.doesNotMatch(url.searchParams.get("subject")!, /[\r\n]/);
  assert.equal(url.searchParams.get("body"), "Întrebare\ncu două rânduri");
});

test("contextul foarte lung și caracterele Unicode incomplete produc linkuri valide", () => {
  for (const value of [
    "a".repeat(239) + "💬".repeat(10),
    "\uD800",
    "  TVA\u0000  2026  ",
  ]) {
    const wa = new URL(whatsappUrl(value));
    const email = new URL(consultationEmailUrl(value));
    assert.ok(wa.searchParams.get("text"));
    assert.ok(email.searchParams.get("subject"));
    assert.doesNotMatch(wa.searchParams.get("text")!, /\u0000/);
  }
  assert.ok(consultationMessage("a".repeat(500)).length < 350);
});
