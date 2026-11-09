import type { ArticleDefinition } from "./articles";
import type { UpdateSelection } from "./updates";
import logistics from "./content/taxa-logistica-colete-eliminata-noiembrie-2026";

export const maintenanceArticles: ArticleDefinition[] = [{
  slug: "taxa-logistica-colete-eliminata-noiembrie-2026",
  title: "Taxa logistică de 25 lei: eliminarea din noiembrie și restituirile",
  excerpt: "Data predării coletului separă obligațiile vechi de sumele care nu se mai datorează. Reguli pentru închidere și restituirea în 30 de zile.",
  category: "fiscalitate", type: "noutate",
  tags: ["taxă logistică", "colete", "25 lei", "OUG 43/2026", "restituire", "1 noiembrie 2026"],
  publishedAt: "2026-11-05", reviewedAt: "2026-11-05",
  sources: ["maintenanceOug43", "lege239"], content: logistics,
}];

export const maintenanceEvents: UpdateSelection[] = [
  { articleSlug: "taxa-logistica-colete-eliminata-noiembrie-2026", eventDate: "2026-11-01", eventKind: "aplicare", eventLabel: "OUG 43/2026 · eliminarea taxei logistice", summary: "Taxa națională nu se mai datorează pentru coletele predate de la 1 noiembrie; obligațiile pentru perioada veche și restituirile se separă.", sourceId: "maintenanceOug43" },
  { articleSlug: "import-bunuri-tva-taxe-vamale", eventDate: "2026-11-01", eventKind: "aplicare", eventLabel: "OUG 43/2026 · delimitarea față de taxele la import", summary: "Ghidul importului explică tranziția taxei logistice de 25 lei și de ce eliminarea acesteia nu înlătură TVA sau taxele vamale.", sourceId: "maintenanceOug43" },
  { articleSlug: "casa-de-marcat-cand-obligatorie", eventDate: "2026-10-30", eventKind: "publicare", eventLabel: "OUG 43/2026 · suspendarea sancțiunilor pentru elementele bonului", summary: "Suspendarea sancțiunilor expres indicate este prelungită până la 31 octombrie 2027 inclusiv, cu obligațiile generale AMEF păstrate.", sourceId: "maintenanceOug43" },
  { articleSlug: "bon-fiscal-cui-factura-deducere", eventDate: "2026-10-30", eventKind: "publicare", eventLabel: "OUG 43/2026 · sancțiunile bonului și deducerea TVA", summary: "Prelungirea suspendării unor sancțiuni nu schimbă condițiile facturii simplificate ori cerința codului TVA imprimat pentru deducere.", sourceId: "maintenanceOug43" },
];
