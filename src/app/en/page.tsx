import type { Metadata } from "next";
import SiteContent from "@/components/SiteContent";
import { getLanguageAlternates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Alonso Carbajal — Fullstack Developer",
  description:
    "Portfolio of Alonso Carbajal, a final-semester Systems Engineering student specializing in fullstack development (React, Next.js, Java, Spring Boot), data analysis and UX/UI. Available for internships and junior roles.",
  alternates: getLanguageAlternates("/en"),
  openGraph: {
    title: "Alonso Carbajal — Fullstack Developer",
    description: "Professional portfolio · React · Next.js · Java · Spring Boot",
    locale: "en_US",
  },
  twitter: {
    title: "Alonso Carbajal — Fullstack Developer",
    description: "Professional portfolio · React · Next.js · Java · Spring Boot",
  },
};

export default function EnglishHome() {
  return <SiteContent />;
}
