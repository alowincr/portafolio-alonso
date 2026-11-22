import type { MetadataRoute } from "next";
import { fallbackSiteUrl, getSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl() ?? fallbackSiteUrl;

  const languages = {
    es: `${base}/`,
    en: `${base}/en`,
    "x-default": `${base}/`,
  };

  return [
    {
      url: `${base}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${base}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
