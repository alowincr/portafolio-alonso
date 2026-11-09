"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Loader2, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";

/* ── Social icons ─────────────────────────────────────────── */
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* ── Toast ─────────────────────────────────────────────────── */
type ToastType = "success" | "error" | null;

function Toast({ type, onClose }: { type: ToastType; onClose: () => void }) {
  const { t } = useLanguage();
  const isSuccess = type === "success";

  useEffect(() => {
    const timer = setTimeout(onClose, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      role="alert"
      aria-live="polite"
      className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-2xl border max-w-[calc(100vw-2rem)] sm:max-w-sm ${
        isSuccess
          ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-100"
          : "bg-red-950/90 border-red-500/40 text-red-100"
      } backdrop-blur-md`}
    >
      {isSuccess ? (
        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
      ) : (
        <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">
          {isSuccess ? t("toast.success.title") : t("toast.error.title")}
        </p>
        <p className="text-xs opacity-75 mt-0.5">
          {isSuccess ? t("toast.success.desc") : t("toast.error.desc")}
        </p>
      </div>
      <button
        onClick={onClose}
        className="p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity ml-1 flex-shrink-0"
        aria-label={t("toast.close")}
      >
        ✕
      </button>
    </motion.div>
  );
}

const FORMSPREE_ENDPOINT = `https://formspree.io/f/${
  process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "xrejgjjr"
}`;

/* ── Component ─────────────────────────────────────────────── */
export default function Contact() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [toast, setToast] = useState<ToastType>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        setToast("success");
        form.reset();
      } else {
        setStatus("error");
        setToast("error");
      }
    } catch {
      setStatus("error");
      setToast("error");
    } finally {
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <>
      <section id="contact" className="py-16 sm:py-20 relative">
        <div className="px-4 sm:px-6">
          {/* Header */}
          <div className="flex flex-col items-center justify-center space-y-3 text-center mb-10 sm:mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter font-serif"
            >
              {t("contact.title")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="max-w-xl text-muted-foreground text-sm sm:text-base md:text-lg"
            >
              {t("contact.desc")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto">
            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="glass p-6 sm:p-8 rounded-2xl border border-border h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl sm:text-2xl font-semibold mb-2">
                    {t("contact.info")}
                  </h3>

                  <div className="space-y-3 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        {t("contact.location.value")}
                      </span>
                    </div>
                    <a
                      href={`tel:${t("contact.phone.value").replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                      {t("contact.phone.value")}
                    </a>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5">
                    {t("contact.social")}
                  </p>

                  <div className="space-y-4">
                    {/* GitHub */}
                    <a
                      href="https://github.com/alowincr"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("a11y.github")}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all group"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <GithubIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">GitHub</p>
                        <p className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors">
                          /alowincr
                        </p>
                      </div>
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://www.linkedin.com/in/alonso-carbajal-dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t("a11y.linkedin")}
                      className="flex items-center gap-4 p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-muted/50 transition-all group"
                    >
                      <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <LinkedinIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">LinkedIn</p>
                        <p className="font-medium text-sm sm:text-base group-hover:text-primary transition-colors">
                          /alonso-carbajal-dev
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <form
                onSubmit={handleSubmit}
                className="glass p-6 sm:p-8 rounded-2xl border border-border space-y-5"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value={t("contact.form.subject")}
                />
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <h3 className="text-xl sm:text-2xl font-semibold">
                  {t("contact.form.title")}
                </h3>

                <div>
                  <label
                    htmlFor="contact-name"
                    className="text-xs sm:text-sm font-medium mb-2 block text-muted-foreground"
                  >
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    disabled={status === "loading"}
                    placeholder={t("contact.form.name.placeholder")}
                    className="w-full h-11 sm:h-12 px-4 rounded-md bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-xs sm:text-sm font-medium mb-2 block text-muted-foreground"
                  >
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    required
                    maxLength={120}
                    autoComplete="email"
                    disabled={status === "loading"}
                    placeholder={t("contact.form.email.placeholder")}
                    className="w-full h-11 sm:h-12 px-4 rounded-md bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all disabled:opacity-50 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="text-xs sm:text-sm font-medium mb-2 block text-muted-foreground"
                  >
                    {t("contact.form.msg")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={1500}
                    rows={4}
                    disabled={status === "loading"}
                    placeholder={t("contact.form.msg.placeholder")}
                    className="w-full p-4 rounded-md bg-background/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none disabled:opacity-50 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-11 sm:h-12 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t("contact.form.sending")}</span>
                    </>
                  ) : (
                    t("contact.form.submit")
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast type={toast} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </>
  );
}
