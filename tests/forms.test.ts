import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { officialForms, FORMS_REVIEWED_AT } from "../src/data/forms";

const audit = JSON.parse(readFileSync(resolve("docs/research/forms-20261103.json"), "utf8"));

test("biblioteca are 10 formulare oficiale distincte, cu surse și perioade explicite", () => {
  assert.equal(officialForms.length, 10);
  assert.equal(new Set(officialForms.map((form) => form.id)).size, 10);
  assert.equal(officialForms.filter((form) => form.institution === "ANAF").length, 6);
  assert.equal(officialForms.filter((form) => form.institution === "ONRC").length, 4);
  for (const form of officialForms) {
    assert.equal(form.reviewedAt, FORMS_REVIEWED_AT, form.id);
    assert.ok(form.description.length > 100, form.id);
    assert.ok(form.applicability.length > 20, form.id);
    for (const url of [form.sourcePage, form.officialFileUrl]) {
      const source = new URL(url);
      assert.equal(source.protocol, "https:", form.id);
      assert.ok(["static.anaf.ro", "www.onrc.ro"].includes(source.hostname), form.id);
    }
  }
});

test("PDF-urile publicate sunt identice cu originalele auditate și nu includ copiile QA", () => {
  assert.equal(readdirSync(resolve("public/formulare")).length, 10);
  for (const form of officialForms) {
    assert.match(form.filePath, /^\/formulare\/[a-z0-9-]+-[a-f0-9]{12}\.pdf$/);
    const bytes = readFileSync(resolve("public", form.filePath.slice(1)));
    assert.equal(bytes.subarray(0, 5).toString(), "%PDF-", form.id);
    assert.equal(bytes.length, form.bytes, form.id);
    assert.equal(createHash("sha256").update(bytes).digest("hex"), form.sha256, form.id);
    const checked = audit.forms.find((entry: { id: string }) => entry.id === form.id);
    assert.ok(checked, form.id);
    assert.equal(checked.sha256, form.sha256, form.id);
    assert.equal(checked.verification.originalUnchanged, true, form.id);
    assert.equal(checked.verification.encrypted, false, form.id);
  }
});

test("editabilitatea este verificată după structura reală XFA sau AcroForm", () => {
  for (const form of officialForms) {
    const checked = audit.forms.find((entry: { id: string }) => entry.id === form.id);
    assert.ok(checked, form.id);
    if (form.format === "xfa") {
      assert.equal(checked.verification.xfa, true, form.id);
      assert.ok(checked.verification.xfaFieldCount > 0, form.id);
      assert.ok(checked.verification.openInputCandidates > 0, form.id);
    } else {
      assert.equal(checked.verification.acroform, true, form.id);
      assert.ok(checked.verification.fieldCount > 0, form.id);
      assert.ok(checked.verification.widgetCount > 0, form.id);
      assert.deepEqual(checked.verification.orphanWidgetNames, [], form.id);
    }
  }
});
