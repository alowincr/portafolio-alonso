"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const certIds = [1, 2, 3, 4, 5, 7, 8, 6, 9];

export default function Certifications() {
  const { t } = useLanguage();

  return (
    <section id="certs" className="py-16 sm:py-20 relative">
      <div className="px-4 sm:px-6">
        <div className="mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-serif mb-3"
          >
            {t("certs.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg"
          >
            {t("certs.desc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {certIds.map((id, idx) => {
            const url = t(`certs.${id}.url`);
            const hasUrl = url.startsWith("http");

            const card = (
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="p-2.5 sm:p-3 bg-primary/10 rounded-xl flex-shrink-0 mt-0.5">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full mb-2">
                    {t(`certs.${id}.org`)}
                  </span>
                  <h3 className="font-semibold text-sm sm:text-base leading-snug mb-1.5">
                    {t(`certs.${id}.name`)}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {t(`certs.${id}.date`)}
                  </p>
                  {hasUrl && (
                    <span className="inline-block text-xs font-medium text-primary group-hover:underline">
                      {t("certs.view")} &rarr;
                    </span>
                  )}
                </div>
              </div>
            );

            return (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                viewport={{ once: true }}
                className={`glass p-5 sm:p-6 rounded-2xl border border-border/50 transition-colors group ${
                  hasUrl
                    ? "hover:border-primary/40 cursor-pointer"
                    : ""
                }`}
              >
                {hasUrl ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
