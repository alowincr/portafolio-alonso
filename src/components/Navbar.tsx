"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "next-themes";
import { Sun, Moon, Languages, Menu, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setScrollProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sectionIds = ["home", "about", "experience", "stack", "certs", "projects", "contact"];

    const handleScrollSpy = () => {
      let current = "home";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScrollSpy();
    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const toggleLanguage = () => setLanguage(language === "es" ? "en" : "es");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const navLinks = [
    { href: "#about", id: "about", label: t("nav.about") },
    { href: "#experience", id: "experience", label: t("nav.experience") },
    { href: "#stack", id: "stack", label: t("nav.stack") },
    { href: "#certs", id: "certs", label: t("nav.certs") },
    { href: "#projects", id: "projects", label: t("nav.projects") },
    { href: "#contact", id: "contact", label: t("nav.contact") },
  ];

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Small delay so menu closes before scroll
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 glass">
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent transition-none"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="text-xl font-bold tracking-tighter" aria-label={t("a11y.home")}>
            Alonso<span className="text-primary">.dev</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-4 text-sm font-medium items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-1 transition-colors ${
                    isActive ? "text-primary" : "hover:text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}

            <div className="flex items-center gap-2 border-l border-border pl-4 ml-2">
              <button
                onClick={toggleLanguage}
                className="p-2 rounded-md hover:bg-muted transition-colors flex items-center gap-2"
                aria-label={t("a11y.toggleLanguage")}
              >
                <Languages className="h-4 w-4" />
                <span className="uppercase text-xs font-bold">{language}</span>
              </button>

              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md hover:bg-muted transition-colors"
                  aria-label={t("a11y.toggleTheme")}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Mobile: controls + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-md hover:bg-muted transition-colors flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Languages className="h-4 w-4" />
              <span className="uppercase text-xs font-bold">{language}</span>
            </button>

            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            )}

            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
              aria-label={t("a11y.toggleMenu")}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-border/50 md:hidden"
          >
            <nav id="mobile-menu" className="flex flex-col px-4 py-4 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={activeSection === link.id ? "page" : undefined}
                  className={`text-left py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/20 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
