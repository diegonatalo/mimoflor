import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// o site é uma página só: a flor escolhida vai na query string
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date().toISOString().slice(0, 10),
    },
  ];
}
