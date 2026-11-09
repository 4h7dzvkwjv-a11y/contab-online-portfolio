import { batch2FinanceSources } from "./sources-batch2-finance";
import { batch2PeopleSources } from "./sources-batch2-people";
import { batch2ReportingSources } from "./sources-batch2-reporting";

export const batch2Sources = {
  ...batch2FinanceSources,
  ...batch2PeopleSources,
  ...batch2ReportingSources,
} as const;
