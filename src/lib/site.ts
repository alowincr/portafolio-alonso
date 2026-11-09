export function getSiteUrl(): string | undefined {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_PROJECT_PRODUCTION_URL;

  if (!raw) return undefined;
  return raw.startsWith("http") ? raw : `https://${raw}`;
}

export const fallbackSiteUrl = "http://localhost:3000";
