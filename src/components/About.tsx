"use client";

import { motion } from "framer-motion";
import { Code, Database, Palette, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay },
  }),
};

export default function About() {
  const { t } = useLanguage();

  const cards = [
    {
      icon: <Code className="h-5 w-5 text-primary" />,
      title: t("about.card1.title"),
      description: t("about.card1.desc"),
    },
    {
      icon: <Database className="h-5 w-5 text-accent" />,
      title: t("about.card2.title"),
      description: t("about.card2.desc"),
    },
    {
      icon: <Palette className="h-5 w-5 text-primary" />,
      title: t("about.card3.title"),
      description: t("about.card3.desc"),
    },
  ];

  const stats = [
    { value: "3+", label: t("about.stats.exp"), color: "text-primary" },
    { value: "5+", label: t("about.stats.projects"), color: "text-accent" },
    { value: "10+", label: t("about.stats.certs"), color: "text-primary" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 relative">
      <div className="px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          {/* Left: text + stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="w-full lg:w-1/2 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-serif">
              {t("about.title")}
            </h2>

            {/* Location badge */}
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>{t("contact.location.value")}</span>
            </div>

            <div className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed space-y-4">
              {t("about.desc").split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-2">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-start">
                  <span className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: cards */}
          <div className="w-full lg:w-1/2 grid gap-4 sm:gap-5">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={index * 0.12}
                className="glass p-4 sm:p-6 rounded-2xl border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-muted rounded-xl flex-shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg">{card.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-1 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
