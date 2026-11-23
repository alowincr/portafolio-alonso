"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-16 sm:py-20"
    >
      <div className="px-4 sm:px-6 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-6 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs sm:text-sm font-medium text-primary shadow-sm ring-1 ring-primary/10"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter font-serif"
          >
            <span className="text-gradient">{t("hero.title1")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-pretty max-w-xl sm:max-w-2xl text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
          >
            {t("hero.desc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto justify-center"
          >
            <a
              href="#projects"
              className="inline-flex h-11 sm:h-12 items-center justify-center rounded-md bg-primary px-6 sm:px-8 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {t("hero.btn.projects")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="glass inline-flex h-11 sm:h-12 items-center justify-center rounded-md border border-border px-6 sm:px-8 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border"
            >
              {t("hero.btn.contact")}
            </a>
            <a
              href="/CV_AlonsoCarbajal.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="CV_Alonso_Carbajal.pdf"
              className="inline-flex h-11 sm:h-12 items-center justify-center rounded-md border border-primary/40 px-6 sm:px-8 text-sm font-medium text-primary transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/10 active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Download className="mr-2 h-4 w-4" />
              {t("hero.btn.cv")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
