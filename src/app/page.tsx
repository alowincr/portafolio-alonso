import type { Metadata } from "next";
import SiteContent from "@/components/SiteContent";
import { getLanguageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  alternates: getLanguageAlternates("/"),
};

export default function Home() {
  return <SiteContent />;
}
