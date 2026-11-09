const stopWords = new Set([
  "a",
  "ai",
  "al",
  "ale",
  "am",
  "ar",
  "as",
  "au",
  "avea",
  "ca",
  "care",
  "cat",
  "ce",
  "cel",
  "cea",
  "cu",
  "cum",
  "da",
  "de",
  "din",
  "doar",
  "este",
  "eu",
  "ex",
  "face",
  "fac",
  "fi",
  "fie",
  "in",
  "intr",
  "la",
  "le",
  "lor",
  "ma",
  "mai",
  "mi",
  "o",
  "pe",
  "pentru",
  "pot",
  "poti",
  "sa",
  "se",
  "si",
  "sunt",
  "un",
  "unei",
  "unui",
  "va",
  "vreau",
  "despre",
  "explica",
  "ajuta",
  "te",
  "rog",
]);

const forms: Record<string, string> = {
  monografia: "monografie",
  monografii: "monografie",
  monografiile: "monografie",
  monografiei: "monografie",
  contabila: "contabilitate",
  contabile: "contabilitate",
  contabil: "contabilitate",
  contabili: "contabilitate",
  conturilor: "conturi",
  contul: "conturi",
  cont: "conturi",
  stocurilor: "stocuri",
  stoc: "stocuri",
  marfurilor: "stocuri",
  marfuri: "stocuri",
  marfa: "stocuri",
  dividendelor: "dividende",
  dividend: "dividende",
  dividendele: "dividende",
  impozitului: "impozit",
  impozitul: "impozit",
  impozite: "impozit",
  salarii: "salarizare",
  salariilor: "salarizare",
  salariul: "salarizare",
  salariului: "salarizare",
  salariu: "salarizare",
  salarial: "salarizare",
  salariale: "salarizare",
  deductibila: "deductibil",
  deductibile: "deductibil",
  deductibilitate: "deductibil",
  amenda: "amenzi",
  amenzile: "amenzi",
  penalitate: "penalitati",
  penalitatile: "penalitati",
  deducere: "deductibil",
  deducerea: "deductibil",
  deduc: "deductibil",
  facturi: "factura",
  facturii: "factura",
  facturilor: "factura",
  facturile: "factura",
  client: "clienti",
  clientul: "clienti",
  clientului: "clienti",
  clientii: "clienti",
  clientilor: "clienti",
  furnizor: "furnizori",
  furnizorul: "furnizori",
  furnizorului: "furnizori",
  furnizorii: "furnizori",
  furnizorilor: "furnizori",
  sold: "solduri",
  soldul: "solduri",
  soldului: "solduri",
  soldurile: "solduri",
  soldurilor: "solduri",
  compensez: "compensare",
  compensarea: "compensare",
  compensari: "compensare",
  confirm: "confirmare",
  confirma: "confirmare",
  confirmi: "confirmare",
  confirmarea: "confirmare",
  poprirea: "poprire",
  popririi: "poprire",
  popriri: "poprire",
  retin: "retinere",
  retine: "retinere",
  retinerea: "retinere",
  masina: "autoturism",
  masini: "autoturism",
  masinii: "autoturism",
  masinilor: "autoturism",
  autoturismul: "autoturism",
  autoturismului: "autoturism",
  autoturisme: "autoturism",
  firmei: "firma",
  firme: "firma",
  firmelor: "firma",
  bonul: "bon",
  bonului: "bon",
  bonuri: "bon",
  bonurile: "bon",
  declaratii: "declaratie",
  declaratia: "declaratie",
  declaratiilor: "declaratie",
  cheltuielile: "cheltuieli",
  cheltuielilor: "cheltuieli",
  cheltuiala: "cheltuieli",
  amortizarea: "amortizare",
  incasarilor: "incasare",
  incasari: "incasare",
  saft: "d406",
  d406: "d406",
  efactura: "efactura",
};

export function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function tokenize(value: string) {
  // Numărul este interpretat ca formular numai lângă un indiciu explicit.
  // De exemplu, „declarația 112” devine D112; „TVA 100 euro” păstrează suma.
  const formNumbers: Record<string, string> = {
    "070": "d070", "100": "d100", "101": "d101", "107": "d107", "112": "d112",
    "177": "d177", "204": "d204", "205": "d205", "207": "d207", "212": "d212",
    "230": "d230", "300": "d300", "301": "d301", "307": "d307",
    "311": "d311", "318": "d318", "390": "d390",
    "394": "d394", "406": "d406", "700": "d700", "710": "d710",
    "1046": "s1046",
  };
  return (
    normalize(value)
      .replace(
        /\b(?:declarati(?:a|e)|formular(?:ul)?|decont(?:ul)?|cerere(?:a)?)\s*(?:d\s*[-–]?\s*)?(\d{3,4})\b/g,
        (match, number: string) => formNumbers[number] ?? match,
      )
      .replace(
        /\bd\s*[-–]?\s*(\d{3})\b/g,
        (match, number: string) => formNumbers[number] ?? match,
      )
      .replace(/\bsaf[\s-]*t\b/g, "saft")
      .replace(/\be[\s-]*factur[ai](?:le|lor)?\b/g, "efactura")
      .match(/[\p{L}\p{N}]+/gu) ?? []
  );
}

export function processTerm(term: string) {
  const clean = normalize(term);
  if (stopWords.has(clean) || clean.length < 2) return null;
  return forms[clean] ?? clean;
}

export function queryTerms(query: string) {
  return [
    ...new Set(
      tokenize(query)
        .map(processTerm)
        .filter((term): term is string => Boolean(term)),
    ),
  ];
}
