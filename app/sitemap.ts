import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// o site é uma página só: a flor escolhida vai na query string
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["/"].map((route) => ({ url: `${SITE_URL}${route}`, lastModified }));
}
