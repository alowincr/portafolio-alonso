"use client";

import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 text-primary">
        <SearchX className="h-10 w-10" />
      </div>

      <p className="mt-6 text-6xl font-bold tracking-tighter font-serif text-primary">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
        {t("notFound.title")}
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground sm:text-base">
        {t("notFound.desc")}
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90"
      >
        <Home className="h-4 w-4" />
        {t("notFound.home")}
      </Link>
    </main>
  );
}
