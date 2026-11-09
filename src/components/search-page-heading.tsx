"use client";

import { useSearchParams } from "next/navigation";
import { SearchBox } from "./search-box";

export function SearchPageHeading() {
  const params = useSearchParams();
  const query = (params.get("q") ?? "").slice(0, 200);

  return (
    <>
      <div className="search-page-heading">
        <h1>{query ? "Răspunsurile încep aici." : "Ce vrei să afli?"}</h1>
        <p>Caută articole, ghiduri practice și formulare oficiale.</p>
        <SearchBox initialQuery={query} compact />
      </div>
      {query ? (
        <p className="query-heading">
          Rezultate pentru <strong>„{query}”</strong>
        </p>
      ) : null}
    </>
  );
}
