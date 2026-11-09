import { november9Events } from "./maintenance-20261109";
import { liveMaintenanceEvents } from "./maintenance-live-20261106";
import type { SourceId } from "./sources";
import { businessUpdateEvents } from "./update-events-business-20261104";
import { financeUpdateEvents } from "./update-events-finance-20261104";
import { peopleUpdateEvents } from "./update-events-people-20261104";
import { maintenanceEvents } from "./maintenance-20261105";

export type UpdateKind = "aplicare" | "publicare" | "versiune" | "anunt" | "date-economice";

/** Data evenimentului verificat în sursa primară, niciodată data publicării noastre. */
export interface UpdateSelection {
  articleSlug: string;
  eventDate: string;
  eventKind: UpdateKind;
  eventLabel: string;
  summary: string;
  sourceId: SourceId;
}

export const UPDATE_PERIOD_START = "2026-07-01";
export const UPDATES_REVIEWED_AT = "2026-11-09";
export const UPDATES_TITLE = "Noutăți fiscale și contabile";

// Selecție editorială din catalogul unic de articole, nu o a doua colecție de texte.
export const updateSelections: UpdateSelection[] = [...businessUpdateEvents, ...financeUpdateEvents, ...peopleUpdateEvents, ...maintenanceEvents, ...liveMaintenanceEvents, ...november9Events];
