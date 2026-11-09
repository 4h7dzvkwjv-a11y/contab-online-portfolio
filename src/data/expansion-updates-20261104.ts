import { businessUpdateArticles } from "./expansion-updates-business-20261104";
import { financeUpdateArticles } from "./expansion-updates-finance-20261104";
import { peopleUpdateArticles } from "./expansion-updates-people-20261104";
import { updateSelections } from "./updates";

const eventDates = new Map(updateSelections.map(entry => [entry.articleSlug, entry.eventDate]));

export const novemberUpdateArticles = [...businessUpdateArticles, ...financeUpdateArticles, ...peopleUpdateArticles]
  .sort((a, b) => (eventDates.get(b.slug) ?? "").localeCompare(eventDates.get(a.slug) ?? "") || a.slug.localeCompare(b.slug));
