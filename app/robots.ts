import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// cada flor é um link pessoal: fica fora da busca
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/app/f/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
