import type { MetadataRoute } from "next";

// o site é uma página só: a flor escolhida vai na query string
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mimoflor.vercel.app/",
      lastModified: new Date().toISOString().slice(0, 10),
    },
  ];
}
