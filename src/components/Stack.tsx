"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siHtml5,
  siCss,
  siTailwindcss,
  siOpenjdk,
  siSpring,
  siPython,
  siFastapi,
  siMysql,
  siPostgresql,
  siSupabase,
  siDbeaver,
  siGit,
  siGithub,
  siDocker,
  siVercel,
  siFigma,
  siInsomnia,
  siMaze,
  siVscodium,
} from "simple-icons";

/* ── Types ───────────────────────────────────────────────── */
interface SimpleIcon {
  svg: string;
  hex: string;
}

interface TechItem {
  name: string;
  icon: SimpleIcon;
  custom?: boolean; // flag for custom-rendered badges
}

/* ── Luminance helper ─────────────────────────────────────── */
function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

/* ── Power BI placeholder icon (not in simple-icons) ─────── */
const POWER_BI_ICON: SimpleIcon = {
  hex: "F2C811",
  svg: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="8" width="4" height="13" rx="1"/><rect x="7" y="4" width="4" height="17" rx="1"/><rect x="13" y="1" width="4" height="20" rx="1"/><rect x="19" y="5" width="4" height="16" rx="1"/></svg>`,
};

/* ── Badge component ──────────────────────────────────────── */
function TechBadge({ name, icon }: TechItem) {
  const brandColor = `#${icon.hex}`;
  const coloredSvg = icon.svg.replace(
    /^<svg /,
    `<svg width="20" height="20" fill="${brandColor}" `
  );
  const needsInvert = getLuminance(icon.hex) < 0.15;
  const needsDarken = getLuminance(icon.hex) > 0.9;

  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border/50 bg-background/50 hover:border-primary/40 hover:bg-muted/60 transition-colors cursor-default"
    >
      <span
        aria-hidden="true"
        className={`flex-shrink-0 leading-none${
          needsInvert ? " icon-dark-invert" : needsDarken ? " icon-light-darken" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: coloredSvg }}
      />
      <span className="font-medium text-xs sm:text-sm text-foreground/90 whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  );
}

/* ── Main component ───────────────────────────────────────── */
export default function Stack() {
  const { t } = useLanguage();

  const techCategories: Array<{
    title: string;
    gradient: string;
    accent: string;
    items: TechItem[];
  }> = [
    {
      title: t("stack.frontend"),
      gradient: "from-blue-500/10 to-cyan-500/10",
      accent: "border-blue-500/30",
      items: [
        { name: "React", icon: siReact },
        { name: "Next.js", icon: siNextdotjs },
        { name: "TypeScript", icon: siTypescript },
        { name: "JavaScript", icon: siJavascript },
        { name: "HTML5", icon: siHtml5 },
        { name: "CSS3", icon: siCss },
        { name: "Tailwind CSS", icon: siTailwindcss },
      ],
    },
    {
      title: t("stack.backend"),
      gradient: "from-green-500/10 to-emerald-500/10",
      accent: "border-green-500/30",
      items: [
        { name: "Java", icon: siOpenjdk },
        { name: "Spring Boot", icon: siSpring },
        { name: "Python", icon: siPython },
        { name: "FastAPI", icon: siFastapi },
        { name: "MySQL", icon: siMysql },
        { name: "PostgreSQL", icon: siPostgresql },
        { name: "Supabase", icon: siSupabase },
        { name: "DBeaver", icon: siDbeaver },
      ],
    },
    {
      title: t("stack.tools"),
      gradient: "from-purple-500/10 to-pink-500/10",
      accent: "border-purple-500/30",
      items: [
        { name: "Git", icon: siGit },
        { name: "GitHub", icon: siGithub },
        { name: "Docker", icon: siDocker },
        { name: "Vercel", icon: siVercel },
        { name: "Figma", icon: siFigma },
        { name: "Insomnia", icon: siInsomnia },
        { name: "Maze", icon: siMaze },
        { name: "Power BI", icon: POWER_BI_ICON },
        { name: "VS Code", icon: siVscodium },
      ],
    },
  ];

  return (
    <section id="stack" className="py-16 sm:py-20 relative">
      <div className="px-4 sm:px-6">
        <div className="mb-10 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-serif mb-3"
          >
            {t("stack.title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg"
          >
            {t("stack.desc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {techCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`glass p-5 sm:p-6 rounded-2xl border ${category.accent} bg-gradient-to-br ${category.gradient}`}
            >
              <h3 className="text-base sm:text-lg font-semibold mb-4 border-b border-border/50 pb-3">
                {category.title}
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {category.items.map((tech) => (
                  <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
