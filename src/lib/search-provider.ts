import type { SearchProvider } from "./search";

// Un singur punct de înlocuit pentru un serviciu HTTP / index găzduit.
// Indexul local se încarcă la prima interacțiune, în afara bundle-ului inițial.
let provider: Promise<SearchProvider> | undefined;
export function getSearchProvider() {
  provider ??= import("./search")
    .then((module) => module.localSearchProvider)
    .catch((error) => {
      provider = undefined;
      throw error;
    });
  return provider;
}
