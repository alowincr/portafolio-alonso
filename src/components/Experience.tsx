"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  HeartPulse,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const experienceMeta = [
  {
    id: 2,
    icon: HeartPulse,
    accent: "from-emerald-500/20 to-cyan-500/10",
    tags: ["FastAPI", "Python", "pytest", "OpenAPI", "RBAC", "Scrum"],
    repo: "https://github.com/No-Country-simulation/G10-LATAM-TEAM-02-MediFlowI-Agente-IA",
  },
  {
    id: 1,
    icon: Zap,
    accent: "from-primary/20 to-accent/10",
    tags: ["React", "JavaScript", "Tailwind CSS", "Docker", "OCI"],
    repo: "https://github.com/No-Country-simulation/EnergiAI-G9-Latam-Team15",
  },
];

export default function Experience() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="experience" className="py-16 sm:py-20 relative">
      <div className="px-4 sm:px-6">
        <div className="mb-8 sm:mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-serif mb-3"
          >
            {t("experience.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-2xl text-muted-foreground text-sm sm:text-base md:text-lg"
          >
            {t("experience.desc")}
          </motion.p>
        </div>

        <div className="relative max-w-4xl">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-5 top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-border to-transparent" />

          {experienceMeta.map((meta, idx) => {
            const Icon = meta.icon;
            const isOpen = openId === meta.id;
            const panelId = `experience-panel-${meta.id}`;

            return (
              <motion.article
                key={meta.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.12 }}
                viewport={{ once: true }}
                className="relative pl-12 sm:pl-16 pb-4 last:pb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-primary/30 bg-background shadow-sm">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>

                <div
                  className={`glass overflow-hidden rounded-2xl border bg-gradient-to-br ${meta.accent} transition-colors ${
                    isOpen ? "border-primary/40" : "border-border/50 hover:border-primary/30"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : meta.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-start gap-3 p-4 sm:p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1.5">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {t(`experience.${meta.id}.type`)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <CalendarDays className="h-3.5 w-3.5" />
                          {t(`experience.${meta.id}.date`)}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          {t("experience.result.participant")}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold tracking-tight">
                        {t(`experience.${meta.id}.title`)}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {t(`experience.${meta.id}.org`)}
                      </p>
                      <p className="mt-1 text-xs sm:text-sm font-medium text-primary">
                        {t("experience.role")}: {t(`experience.${meta.id}.role`)}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1 text-muted-foreground">
                      <ChevronDown
                        className={`h-5 w-5 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                      <span className="hidden sm:block text-[10px] uppercase tracking-wider">
                        {isOpen
                          ? t("experience.details.hide")
                          : t("experience.details.show")}
                      </span>
                    </div>
                  </button>

                  <motion.div
                    id={panelId}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                    aria-hidden={!isOpen}
                    inert={!isOpen}
                  >
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                          <div className="border-t border-border/50 pt-4">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {t(`experience.${meta.id}.desc`)}
                            </p>

                            <ul className="mt-4 space-y-2">
                              {[1, 2, 3].map((n) => (
                                <li
                                  key={n}
                                  className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground leading-relaxed"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/70" />
                                  {t(`experience.${meta.id}.b${n}`)}
                                </li>
                              ))}
                            </ul>

                            <div className="mt-4 pt-4 border-t border-border/50">
                              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                                {t("experience.stack")}
                              </p>
                              <div className="flex flex-wrap gap-1.5">
                                {meta.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-full bg-background/60 border border-border/60 text-xs font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <a
                              href={meta.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:underline underline-offset-4"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {t("experience.repo")}
                            </a>
                          </div>
                        </div>
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
