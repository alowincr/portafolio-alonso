import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Stack from "@/components/Stack";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <main id="main" className="flex flex-col w-full min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Saltar al contenido / Skip to content
      </a>

      <Navbar />

      <div className="w-full max-w-5xl mx-auto flex flex-col pt-16 px-0">
        <Hero />
        <About />
        <Experience />
        <Stack />
        <Certifications />
        <Projects />
        <Contact />
      </div>

      <ScrollToTop />
      <Footer />
    </main>
  );
}
