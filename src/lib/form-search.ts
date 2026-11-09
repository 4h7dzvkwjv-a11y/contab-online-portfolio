import MiniSearch from "minisearch";
import { officialForms, type OfficialForm } from "@/data/forms";
import { normalize, processTerm, tokenize } from "./search-normalize";

export interface FormSearchHit {
  form: OfficialForm;
  score: number;
}

// Vocabular de căutare, separat de instrucțiunile oficiale și de textele PDF.
const keywords: Record<string, string> = {
  "anaf-d100": "microîntreprindere microîntreprinderi impozit micro dividende buget stat obligații plată declarație rectificativă rectificare corectare D710",
  "anaf-d101": "impozit profit anual rezultat fiscal definitivare rectificare",
  "anaf-d112": "salarii salariu salariați angajați salarizare contribuții sociale CAS CASS CAM asigurări",
  "anaf-d205": "dividende chirii venituri reținute sursă beneficiari investiții anual",
  "anaf-d300": "TVA decont taxă valoare adăugată declarație TVA",
  "anaf-d700": "vector fiscal modificare înregistrare radiere mențiuni plătitor TVA cod special",
  "onrc-anexa-2a": "înființare SRL firmă societate înmatriculare înregistrare persoane juridice mențiuni CAEN Rev 3 registrul comerțului",
  "onrc-anexa-2b": "înființare PFA II IF întreprindere individuală familială înregistrare autorizare CAEN Rev 3 registrul comerțului",
  "onrc-anexa-4": "declarație funcționare sediu social profesional punct lucru terți autorizare activități CAEN",
  "onrc-beneficiari-reali-3a": "beneficiar real beneficiari reali declarație semnătură privată control persoană juridică",
};

const ignored = new Set([
  "formular", "formularul", "formulare", "formularele", "pdf", "editabil",
  "editabile", "completabil", "completabile", "descarc", "descarca", "descarcare",
  "depun", "depune", "depunere", "declaratie", "trebuie", "nevoie", "document",
  "documente", "oficial", "oficiale", "online", "caut", "gasesc",
]);
const aliases: Record<string, string> = {
  infiintez: "infiintare", infiintezi: "infiintare", infiinteaza: "infiintare",
  infiintarea: "infiintare", deschid: "infiintare", deschidere: "infiintare",
  firmei: "firma", firme: "firma", societatii: "societate", societati: "societate",
  beneficiarii: "beneficiar", beneficiarilor: "beneficiar", beneficiari: "beneficiar", beneficiarul: "beneficiar",
  reali: "real", functionarii: "functionare", functionarea: "functionare",
  vectorului: "vector", modific: "modificare", modificarea: "modificare",
};
const canonical = (value: string) => {
  const term = processTerm(value);
  return term && !ignored.has(term) ? (aliases[term] ?? term) : null;
};

const byId = new Map(officialForms.map((form) => [form.id, form]));
let index: MiniSearch | undefined;
function getIndex() {
  if (index) return index;
  index = new MiniSearch({
    idField: "id",
    fields: ["codes", "title", "officialTitle", "keywords", "description", "institution"],
    tokenize,
    processTerm: canonical,
    searchOptions: {
      boost: { codes: 20, title: 8, officialTitle: 4, keywords: 5, description: 1, institution: 3 },
      prefix: true,
      fuzzy: (term) => term.length >= 5 ? 0.16 : false,
      combineWith: "OR",
    },
  });
  index.addAll(officialForms.map((form) => ({
    ...form,
    codes: [form.code, ...form.references].join(" "),
    keywords: keywords[form.id] ?? "",
  })));
  return index;
}

export function searchForms(rawQuery: string): FormSearchHit[] {
  const query = rawQuery.slice(0, 200).trim();
  if (!query) return [];
  const normalized = normalize(query);
  const tokens = tokenize(query);
  // Un cod explicit are prioritate și nu este aproximat la alt formular.
  const codes = tokens.filter((term) => /^d\d{3}$/.test(term));
  if (/^\d{3}$/.test(normalized)) codes.push("d" + normalized);
  if (codes.length) {
    return officialForms
      .filter((form) => form.references.some((ref) => codes.includes(normalize(ref))))
      .map((form) => ({ form, score: 1000 }));
  }
  const onrcCode = normalized.match(/\banexa\s+(\d+[a-z]?)\b/)
    ?? normalized.match(/\bformular(?:ul)?\s+(3a)\b/);
  if (onrcCode) {
    return officialForms.filter((form) => form.institution === "ONRC"
      && normalize(form.code).endsWith(" " + onrcCode[1]))
      .map((form) => ({ form, score: 1000 }));
  }
  const terms = [...new Set(tokens.map(canonical).filter((term): term is string => Boolean(term)))];
  if (!terms.length) {
    if (/\bdeclarati(?:a|e|i|ile)\b/.test(normalized)) {
      return officialForms.filter((form) => normalize(form.officialTitle).startsWith("declaratie"))
        .map((form) => ({ form, score: 1 }));
    }
    return /\b(?:formular(?:e|ele|ul)?|pdf)\b/.test(normalized)
      ? officialForms.map((form) => ({ form, score: 1 }))
      : [];
  }
  const hits = getIndex().search(query);
  const maxCoverage = Math.max(0, ...hits.map((hit) => hit.queryTerms.length));
  // Nu afișa un formular care potrivește numai un cuvânt secundar dacă
  // există un rezultat care acoperă întrebarea completă.
  return hits
    .filter((hit) => hit.queryTerms.length >= Math.max(1, maxCoverage))
    .flatMap((hit) => {
      const form = byId.get(String(hit.id));
      return form ? [{ form, score: Math.round(hit.score * 10) / 10 }] : [];
    });
}
