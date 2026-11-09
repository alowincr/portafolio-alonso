"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const projects = [
  {
    id: 1,
    key: "habity",
    title: "Habity",
    image: "/habity.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    links: {
      github: "https://github.com/alowincr/habity",
      live: "https://habity-jet.vercel.app",
    },
  },
  {
    id: 2,
    key: "edurate",
    title: "EduRate",
    image: "/edurate.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "RLS"],
    links: {
      github: "https://github.com/alowincr/edurate",
      live: "https://edurate-zeta.vercel.app",
    },
  },
];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="py-16 sm:py-20 relative">
      <div className="px-4 sm:px-6">
        {/* Header */}
        <div className="mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-serif mb-3"
          >
            {t("projects.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg"
          >
            {t("projects.desc")}
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl">
          {projects.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300"
            >
              {/* Screenshot */}
              <div className="relative aspect-video w-full overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${t("projects.view")}`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold mb-1.5">{project.title}</h3>
                <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                  {t(`projects.${project.key}.desc`)}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 pt-2 border-t border-border/60">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver código de ${project.title} en GitHub`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors pt-2"
                  >
                    <Code2 className="h-3.5 w-3.5" />
                    GitHub
                  </a>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver ${project.title} en vivo`}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors pt-2"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    {t("projects.view")}
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
