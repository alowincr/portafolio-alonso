import type { Metadata, Viewport } from "next";
import { Karla, Delius } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";
import { fallbackSiteUrl, getSiteUrl } from "@/lib/site";

const karla = Karla({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const delius = Delius({
  weight: "400",
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? fallbackSiteUrl),
  applicationName: "Portafolio de Alonso Carbajal",
  title: "Alonso Carbajal — Desarrollador Fullstack",
  description:
    "Portafolio de Alonso Carbajal, estudiante de Ingeniería de Sistemas especializado en desarrollo fullstack (React, Next.js, Java, Spring Boot), análisis de datos y UX/UI. Disponible para prácticas preprofesionales y roles junior.",
  keywords: [
    "Alonso Carbajal",
    "Fullstack Developer",
    "React",
    "Next.js",
    "Java",
    "Spring Boot",
    "FastAPI",
    "Peru",
    "Portafolio",
  ],
  authors: [{ name: "Alonso Carbajal" }],
  creator: "Alonso Carbajal",
  category: "technology",
  formatDetection: { email: false, address: false, telephone: false },
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Alonso Carbajal — Desarrollador Fullstack",
    description: "Portafolio profesional · React · Next.js · Java · Spring Boot",
    type: "website",
    locale: "es_PE",
    siteName: "Alonso Carbajal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alonso Carbajal — Desarrollador Fullstack",
    description: "Portafolio profesional · React · Next.js · Java · Spring Boot",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${karla.variable} ${delius.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alonso Carbajal Ramos",
              alternateName: "Alonso Carbajal",
              jobTitle: "Fullstack Developer",
              description:
                "Estudiante de Ingeniería de Sistemas y desarrollador fullstack especializado en React, Next.js, Java y Spring Boot.",
              url: siteUrl,
              telephone: "+51 988 422 298",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lima",
                addressCountry: "PE",
              },
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Universidad Tecnológica del Perú",
              },
              sameAs: [
                "https://github.com/alowincr",
                "https://www.linkedin.com/in/alonso-carbajal-dev/",
              ],
              knowsAbout: [
                "React",
                "Next.js",
                "TypeScript",
                "Java",
                "Spring Boot",
                "Python",
                "FastAPI",
                "SQL",
                "UX/UI",
              ],
            }),
          }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
