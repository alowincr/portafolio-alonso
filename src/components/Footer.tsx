"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-6 sm:py-8 border-t border-border mt-auto text-xs sm:text-sm text-muted-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex justify-center text-center">
        <p>
          © {new Date().getFullYear()} Alonso Carbajal. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
