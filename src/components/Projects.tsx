"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Code2, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

interface Project {
  id: number;
  key: string;
  title: string;
  image: string;
  tags: string[];
  links: {
    github: string;
    live: string;
  };
}

const projects: Project[] = [
  {
    id: 3,
    key: "chanlievet",
    title: "ChanlieVet",
    image: "/chanlievet.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "Socket.io",
      "Docker",
    ],
    links: {
      github: "https://github.com/alowincr/chanlievet",
      live: "https://chanlievet.vercel.app",
    },
  },
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

interface CarouselMetrics {
  step: number;
  maxIndex: number;
}

export default function Projects() {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pages, setPages] = useState(projects.length);

  const getMetrics = useCallback((): CarouselMetrics | null => {
    const track = trackRef.current;
    if (!track) return null;

    const firstSlide = track.firstElementChild as HTMLElement | null;
    const cardWidth = firstSlide?.offsetWidth ?? track.clientWidth;
    const gap =
      parseFloat(getComputedStyle(track).columnGap || "0") || 0;
    const step = cardWidth + gap;
    const visible = Math.max(
      1,
      Math.round((track.clientWidth + gap) / step)
    );
    const maxIndex = Math.max(0, projects.length - visible);

    return { step, maxIndex };
  }, []);

  const handleScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const metrics = getMetrics();
    if (!metrics) return;

    const index = Math.round(track.scrollLeft / metrics.step);
    setActive(Math.max(0, Math.min(metrics.maxIndex, index)));
  }, [getMetrics]);

  useEffect(() => {
    const updatePages = () => {
      const metrics = getMetrics();
      if (!metrics) return;

      setPages(metrics.maxIndex + 1);
      setActive((current) => Math.min(current, metrics.maxIndex));
    };

    updatePages();
    window.addEventListener("resize", updatePages);
    return () => window.removeEventListener("resize", updatePages);
  }, [getMetrics]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;

      const metrics = getMetrics();
      if (!metrics) return;

      const target = Math.max(0, Math.min(metrics.maxIndex, index));
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      track.scrollTo({
        left: target * metrics.step,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      setActive(target);
    },
    [getMetrics]
  );

  const goPrev = () => goTo(active === 0 ? pages - 1 : active - 1);
  const goNext = () => goTo(active === pages - 1 ? 0 : active + 1);

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

        {/* Carousel */}
        <div
          className="relative max-w-4xl rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          role="region"
          aria-roledescription="carousel"
          aria-label={t("projects.title")}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              goPrev();
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              goNext();
            }
          }}
        >
          <div className="sr-only" aria-live="polite">
            {`${active + 1} / ${pages}`}
          </div>
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden motion-reduce:scroll-auto"
          >
            {projects.map((project, idx) => (
              <div
                key={project.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} / ${projects.length}`}
                className="w-full shrink-0 snap-start sm:w-[calc(50%-0.75rem)]"
              >
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  viewport={{ once: true }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 transition-all duration-300"
                >
                  {/* Screenshot */}
                  <div className="relative aspect-video w-full overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${t("projects.view")}`}
                      fill
                      quality={90}
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 448px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold mb-1.5">
                      {project.title}
                    </h3>
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
                    <div className="mt-auto flex gap-4 border-t border-border/60 pt-3">
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} — GitHub`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Code2 className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} — ${t("projects.view")}`}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        {t("projects.view")}
                      </a>
                    </div>
                  </div>
                </motion.article>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="mt-5 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={goPrev}
              aria-label={t("projects.prev")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goTo(idx)}
                  aria-label={`${t("projects.goTo")} ${idx + 1}: ${
                    projects[idx]?.title ?? ""
                  }`}
                  aria-current={active === idx ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                    active === idx
                      ? "w-6 bg-primary"
                      : "w-2.5 bg-border hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label={t("projects.next")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
