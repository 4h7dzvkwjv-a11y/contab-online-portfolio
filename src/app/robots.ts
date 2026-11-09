import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/format";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    // Căutarea are noindex în HTML; crawlerul trebuie să poată citi această regulă.
    rules: { userAgent: "*", allow: "/" },
    sitemap: SITE_URL + "/sitemap.xml",
  };
}
