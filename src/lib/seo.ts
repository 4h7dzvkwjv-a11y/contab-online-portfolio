import type { Metadata } from "next";
import { articleSeo } from "@/data/seo-articles";
import type { Article } from "@/data/articles";
import { CONTACT_EMAIL, PHONE_INTERNATIONAL, BRAND_NAME as SITE_NAME, SITE_URL } from "./site";

export const SOCIAL_IMAGE = "/brand/contab-social-20261104.png";
export const LOGO_IMAGE = "/brand/contab-logo-square.png";
export const HOME_DESCRIPTION = "Contabilitate și fiscalitate în România. Caută articole, monografii, formulare ANAF și ONRC sau calculează taxe. Solicită consultanță Contab prin email ori WhatsApp.";

export function canonicalUrl(path = "/") {
  const pathname = path.split(/[?#]/, 1)[0];
  return SITE_URL.replace(/\/$/, "") + (pathname === "/" ? "/" : "/" + pathname.replace(/^\/+|\/+$/g, "") + "/");
}

export function seoTitle(title: string) {
  // Bara separă părțile titlului. Cratimele din coduri oficiale (SAF-T) se păstrează.
  return title.replace(/\s+[—–-]\s+/g, " | ") + " | " + SITE_NAME;
}

export function pageMetadata({title, description, path, index = true, article}: {
  title: string; description: string; path: string; index?: boolean; article?: Article;
}): Metadata {
  const fullTitle = seoTitle(title);
  const url = canonicalUrl(path);
  const image = {url: canonicalUrl("/").replace(/\/$/, "") + SOCIAL_IMAGE, width: 1200, height: 630, alt: "Logo Contab | Contabilitate și fiscalitate"};
  return {
    title: {absolute: fullTitle}, description, alternates: {canonical: url},
    robots: {index, follow: true, ...(index ? {maxImagePreview: "large" as const} : {})},
    openGraph: {type: article ? "article" : "website", locale: "ro_RO", siteName: SITE_NAME, title: fullTitle, description, url, images: [image],
      ...(article ? {publishedTime: article.publishedAt, modifiedTime: article.reviewedAt, authors: [SITE_NAME], tags: article.tags} : {})},
    twitter: {card: "summary_large_image", title: fullTitle, description, images: [{url: image.url, alt: image.alt}]},
  };
}

export function articleMetadata(article: Article) {
  return pageMetadata({title: articleSeo[article.slug]?.[0] ?? article.title, description: article.excerpt, path: "/articol/" + article.slug, article});
}

export const organization = {
  "@type": "Organization", "@id": canonicalUrl("/") + "#organization", name: SITE_NAME,
  alternateName: "contab-online.ro", url: canonicalUrl("/"),
  logo: {"@type": "ImageObject", "@id": canonicalUrl("/") + "#logo", url: SITE_URL + LOGO_IMAGE, contentUrl: SITE_URL + LOGO_IMAGE, width: 512, height: 512},
  email: CONTACT_EMAIL, telephone: PHONE_INTERNATIONAL,
  contactPoint: {"@type": "ContactPoint", contactType: "consultanță contabilă și fiscală", email: CONTACT_EMAIL, telephone: PHONE_INTERNATIONAL, availableLanguage: "ro", url: canonicalUrl("/contact")},
};

export function breadcrumbSchema(items: {name: string; path: string}[]) {
  return {"@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index)=>({"@type": "ListItem", position:index+1, name:item.name, item:canonicalUrl(item.path)}))};
}

export const categorySeo: Record<string, {title: string; description: string; keyword: string}> = {
  contabilitate: {title:"Monografii și înregistrări contabile", description:"Monografii contabile, plan de conturi, stocuri, mijloace fixe și închiderea lunii. Explicații, exemple și surse oficiale pentru contabili și antreprenori.", keyword:"monografii contabile"},
  fiscalitate: {title:"Fiscalitate în România | TVA și impozite", description:"TVA, impozit pe profit, microîntreprinderi, dividende și cheltuieli deductibile. Găsește explicații fiscale pentru firme și PFA, cu surse oficiale și exemple.", keyword:"fiscalitate România"},
  declaratii: {title:"Declarații fiscale ANAF și raportări", description:"Declarații fiscale ANAF, SAF-T, e-Factura și raportări contabile. Verifică obligațiile, termenele, corectările și formularele relevante în articolele Contab.", keyword:"declarații fiscale ANAF"},
  salarizare: {title:"Salarizare | Contribuții și contracte de muncă", description:"Salarii, contribuții, deduceri, concedii și contracte de muncă. Explicații pentru calculul drepturilor salariale, documente și raportări, cu surse oficiale.", keyword:"salarizare contribuții contracte"},
  antreprenoriat: {title:"Antreprenoriat | SRL, PFA și proceduri ONRC", description:"Înființare SRL și PFA, sediu social, administratori și modificări la ONRC. Ghiduri despre acte, obligații și decizii practice pentru afacerea ta din România.", keyword:"SRL PFA proceduri ONRC"},
  ghiduri: {title:"Ghiduri practice de contabilitate și fiscalitate", description:"Pași practici pentru SPV, plăți ANAF, documente contabile, facturi și controale. Găsește răspunsuri clare și verificări utile pentru situațiile firmei tale.", keyword:"ghiduri practice contabilitate fiscalitate"},
};
