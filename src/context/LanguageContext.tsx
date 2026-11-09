"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "es" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

type TranslationMap = Record<string, string>;
type Translations = Record<Language, TranslationMap>;

const translations: Translations = {
  es: {
    // Navigation
    "nav.about": "Sobre Mí",
    "nav.experience": "Experiencia",
    "nav.stack": "Stack",
    "nav.certs": "Certificaciones",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",

    // Accessibility
    "a11y.toggleLanguage": "Cambiar idioma",
    "a11y.toggleTheme": "Cambiar tema",
    "a11y.toggleMenu": "Abrir menú de navegación",
    "a11y.home": "Ir al inicio",
    "a11y.github": "GitHub de Alonso Carbajal",
    "a11y.linkedin": "LinkedIn de Alonso Carbajal",

    // Hero
    "hero.badge": "Disponible para prácticas y primer empleo",
    "hero.title1": "Desarrollador Fullstack",
    "hero.desc": "Estudiante de Ing. de Sistemas (10mo ciclo) con foco en desarrollo web, análisis de datos y UX/UI. Construyo soluciones escalables desde el frontend hasta el backend, con código limpio y arquitecturas que escalan.",
    "hero.btn.projects": "Ver Proyectos",
    "hero.btn.contact": "Contactar",
    "hero.btn.cv": "Descargar CV",

    // About
    "about.title": "Sobre mí",
    "about.desc": "Estudiante de Ingeniería de Sistemas e Informática en la Universidad Tecnológica del Perú (10mo ciclo), especializado en desarrollo fullstack con Java, Spring Boot y Next.js, bases de datos SQL y UX/UI. Con conocimientos en gestión de proyectos (PMBOK, Scrum, ITIL v4, COBIT) y análisis de datos con Python, Power BI y Lingo. Busco incorporarme como practicante preprofesional o desarrollador junior para aportar al equipo y seguir aprendiendo en proyectos reales.",
    "about.card1.title": "Desarrollo Fullstack",
    "about.card1.desc": "Aplicaciones web end-to-end con React, Next.js y Spring Boot. APIs RESTful, autenticación JWT y despliegue en Vercel.",
    "about.card2.title": "Datos & Análisis",
    "about.card2.desc": "Análisis de datos con Python, Power BI, Lingo y SQL. Diseño de esquemas en PostgreSQL, MySQL y Supabase.",
    "about.card3.title": "UX/UI & Diseño",
    "about.card3.desc": "Interfaces responsivas con Figma, pruebas de usabilidad en Maze. Normas ISO 9001, ISO 25010, ISO 27001 e ISO 9241-210.",
    "about.stats.exp": "Años desarrollando",
    "about.stats.projects": "Proyectos clave",
    "about.stats.certs": "Certificaciones",

    // Experience
    "experience.title": "Experiencia & Hackathons",
    "experience.desc": "Proyectos colaborativos y hackathons donde apliqué desarrollo fullstack, trabajo en equipo y metodologías ágiles.",
    "experience.role": "Rol",
    "experience.result.participant": "Participante",
    "experience.details.show": "Ver detalles",
    "experience.details.hide": "Ocultar detalles",
    "experience.1.org": "Hackathon ONE Latam (G9) · NoCountry",
    "experience.1.date": "Ago. 2026",
    "experience.1.type": "Hackathon",
    "experience.1.title": "EnergiAI",
    "experience.1.role": "Frontend / UX Developer",
    "experience.1.desc": "Plataforma web de diagnóstico y eficiencia energética que analiza el consumo eléctrico de hogares y pequeños establecimientos, genera un score de eficiencia y recomendaciones personalizadas.",
    "experience.1.b1": "Diseñé e implementé la interfaz en React con formularios alineados a los contratos de la API para perfiles residenciales y comerciales.",
    "experience.1.b2": "Desarrollé la visualización histórica de consumo y el módulo de exportación de reportes en PDF.",
    "experience.1.b3": "Validé la experiencia de usuario y colaboré con un equipo multidisciplinario bajo Scrum, desplegando la aplicación en OCI con Docker.",
    "experience.2.org": "Hackathon ONE Latam (G10) · NoCountry",
    "experience.2.date": "Oct. 2026",
    "experience.2.type": "Hackathon",
    "experience.2.title": "MediFlow",
    "experience.2.role": "Backend & Fullstack Developer",
    "experience.2.desc": "Plataforma web hospitalaria con agentes de IA para optimizar el triaje clínico, el seguimiento de pacientes y la gestión de episodios médicos.",
    "experience.2.b1": "Implementé endpoints REST para el ciclo de vida de episodios clínicos y un repositorio transaccional de auditoría asíncrona con FastAPI.",
    "experience.2.b2": "Aseguré trazabilidad inmutable, validación de esquemas y control de acceso RBAC con mecanismos Human-in-the-Loop.",
    "experience.2.b3": "Diseñé y ejecuté pruebas unitarias y de integración con pytest, con documentación interactiva en OpenAPI y Scalar.",
    "experience.stack": "Tecnologías",
    "experience.repo": "Ver repositorio en GitHub",

    // Stack
    "stack.title": "Tech Stack",
    "stack.desc": "Herramientas y tecnologías que uso a lo largo de todo el ciclo de desarrollo.",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend & Base de Datos",
    "stack.tools": "Herramientas & Otros",

    // Projects
    "projects.title": "Proyectos",
    "projects.desc": "Una selección de productos reales que he diseñado, arquitecturado y desplegado de inicio a fin.",
    "projects.view": "Ver Proyecto",

    // Contact

    // Projects descriptions
    "projects.habity.desc": "App de tracking de hábitos con arquitectura full-stack. Autenticación y base de datos en tiempo real con Supabase, paneles de análisis con Recharts y exportación de reportes en PDF, con una interfaz responsiva en Tailwind CSS.",
    "projects.edurate.desc": "Plataforma de evaluación docente universitaria con anonimato garantizado. Diseñé la arquitectura de la base de datos relacional en producción, con Supabase RLS para privacidad y Next.js SSR para rendimiento.",

    // Certifications
    "certs.title": "Certificaciones",
    "certs.desc": "Una selección de las certificaciones que respaldan mi conocimiento técnico y profesional.",
    "certs.view": "Ver credencial",
    "certs.1.org": "Oracle",
    "certs.1.name": "Oracle Cloud Infrastructure 2025 Foundations Associate",
    "certs.1.date": "may. 2026",
    "certs.1.url": "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2D5275C9774064CF557A76CC38ADEED33D634AB5B36178A96EAD37B446CA654C",
    "certs.2.org": "Alura Latam — Oracle ONE",
    "certs.2.name": "Programa ONE Tech Foundation G9 - Back End",
    "certs.2.date": "mar. 2026",
    "certs.2.url": "https://app.aluracursos.com/program/certificate/961af040-68d1-4372-bc77-aabc5c2f6191?lang",
    "certs.3.org": "Udemy",
    "certs.3.name": "Microsoft Excel: Fórmulas y funciones de la A a la Z",
    "certs.3.date": "nov. 2025",
    "certs.3.url": "https://www.udemy.com/certificate/UC-b139a11d-a59f-400f-9dc4-328f5636b57d/",
    "certs.4.org": "Código Facilito",
    "certs.4.name": "Curso de ingeniería de prompts",
    "certs.4.date": "jul. 2025",
    "certs.4.url": "https://codigofacilito.com/certificates/9f880cb0-bd2c-4c0c-8449-380d854e67ca",
    "certs.5.org": "freeCodeCamp",
    "certs.5.name": "Responsive Web Design",
    "certs.5.date": "jun. 2025",
    "certs.5.url": "https://www.freecodecamp.org/certification/fcc-85d18331-5175-45a2-80c0-41e3cca27cb7/responsive-web-design",
    "certs.6.org": "Cisco",
    "certs.6.name": "CCNAv7: Introduction to Networks",
    "certs.6.date": "nov. 2022",
    "certs.6.url": "https://www.credly.com/badges/e9b17ce3-dc81-4b03-8509-4b943b78a9a0/public_url",
    "certs.7.org": "Udemy",
    "certs.7.name": "Power BI: Visualización de Datos",
    "certs.7.date": "2025",
    "certs.7.url": "",
    "certs.8.org": "Ministerio de Trabajo",
    "certs.8.name": "Desarrollo Front-End",
    "certs.8.date": "2024",
    "certs.8.url": "",
    "certs.9.org": "Británico",
    "certs.9.name": "Inglés Fase Básica",
    "certs.9.date": "2022",
    "certs.9.url": "",

    "contact.title": "Contacto",
    "contact.desc": "Ya sea para un proyecto, una posición o simplemente conectar — escríbeme y te respondo en menos de 24 horas.",
    "contact.info": "Información",
    "contact.location.label": "Ubicación",
    "contact.location.value": "Lima, Perú",
    "contact.phone.label": "Teléfono",
    "contact.phone.value": "+51 988 422 298",
    "contact.social": "Encuéntrame en",
    "contact.form.title": "Envíame un mensaje",
    "contact.form.name": "Nombre",
    "contact.form.name.placeholder": "Tu nombre completo",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "tu@email.com",
    "contact.form.msg": "Mensaje",
    "contact.form.msg.placeholder": "Cuéntame sobre tu proyecto o propuesta...",
    "contact.form.subject": "Nuevo mensaje desde el portafolio",
    "contact.form.submit": "Enviar Mensaje",
    "contact.form.sending": "Enviando...",

    // Toast
    "toast.success.title": "¡Mensaje enviado!",
    "toast.success.desc": "Te responderé en menos de 24 horas.",
    "toast.error.title": "Error al enviar",
    "toast.error.desc": "Inténtalo de nuevo o escríbeme por LinkedIn.",
    "toast.close": "Cerrar notificación",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
    "notFound.title": "Página no encontrada",
    "notFound.desc": "La página que buscas no existe o fue movida.",
    "notFound.home": "Volver al inicio",
    "scroll.top": "Volver arriba",
  },
  en: {
    // Navigation
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.stack": "Stack",
    "nav.certs": "Certifications",
    "nav.projects": "Projects",
    "nav.contact": "Contact",

    // Accessibility
    "a11y.toggleLanguage": "Toggle language",
    "a11y.toggleTheme": "Toggle theme",
    "a11y.toggleMenu": "Toggle navigation menu",
    "a11y.home": "Go to home",
    "a11y.github": "Alonso Carbajal's GitHub",
    "a11y.linkedin": "Alonso Carbajal's LinkedIn",

    // Hero
    "hero.badge": "Open to internships & entry-level roles",
    "hero.title1": "Fullstack Developer",
    "hero.desc": "Systems Engineering student (10th semester) focused on software development, data analysis and UX/UI. I build scalable solutions from frontend to backend with clean code and architectures that scale.",
    "hero.btn.projects": "View Projects",
    "hero.btn.contact": "Contact Me",
    "hero.btn.cv": "Download CV",

    // About
    "about.title": "About me",
    "about.desc": "10th-semester Systems Engineering and Computer Science student at Universidad Tecnológica del Perú (UTP), specialized in fullstack development with Java, Spring Boot and Next.js, SQL databases and UX/UI. Knowledgeable in project management (PMBOK, Scrum, ITIL v4, COBIT) and data analysis with Python, Power BI and Lingo. Seeking a pre-professional internship or junior developer role to contribute to the team and keep learning in real projects.",
    "about.card1.title": "Fullstack Development",
    "about.card1.desc": "End-to-end web apps with React, Next.js and Spring Boot. RESTful APIs, JWT auth, and deployment on Vercel.",
    "about.card2.title": "Data & Analytics",
    "about.card2.desc": "Data analysis with Python, Power BI, Lingo and SQL. Schema design in PostgreSQL, MySQL and Supabase.",
    "about.card3.title": "UX/UI & Design",
    "about.card3.desc": "Responsive interfaces with Figma, usability testing in Maze. ISO 9001, ISO 25010, and ISO 9241-210 standards.",
    "about.stats.exp": "Years developing",
    "about.stats.projects": "Key projects",
    "about.stats.certs": "Certifications",

    // Experience
    "experience.title": "Experience & Hackathons",
    "experience.desc": "Collaborative projects and hackathons where I applied fullstack development, teamwork and agile methodologies.",
    "experience.role": "Role",
    "experience.result.participant": "Participant",
    "experience.details.show": "View details",
    "experience.details.hide": "Hide details",
    "experience.1.org": "Hackathon ONE Latam (G9) · NoCountry",
    "experience.1.date": "Aug 2026",
    "experience.1.type": "Hackathon",
    "experience.1.title": "EnergiAI",
    "experience.1.role": "Frontend / UX Developer",
    "experience.1.desc": "Web platform for energy diagnosis and efficiency that analyzes electricity consumption for households and small businesses, generates an efficiency score and personalized recommendations.",
    "experience.1.b1": "Designed and implemented the React interface with forms aligned to the API contracts for residential and commercial profiles.",
    "experience.1.b2": "Built the historical consumption visualization and the PDF report export module.",
    "experience.1.b3": "Validated the user experience and collaborated with a multidisciplinary Scrum team, deploying the app on OCI with Docker.",
    "experience.2.org": "Hackathon ONE Latam (G10) · NoCountry",
    "experience.2.date": "Oct 2026",
    "experience.2.type": "Hackathon",
    "experience.2.title": "MediFlow",
    "experience.2.role": "Backend & Fullstack Developer",
    "experience.2.desc": "Hospital web platform with AI agents to optimize clinical triage, patient follow-up and medical episode management.",
    "experience.2.b1": "Implemented REST endpoints for the clinical episode lifecycle and an asynchronous transactional audit repository with FastAPI.",
    "experience.2.b2": "Ensured immutable traceability, schema validation and RBAC access control with Human-in-the-Loop mechanisms.",
    "experience.2.b3": "Designed and ran unit and integration tests with pytest, with interactive documentation in OpenAPI and Scalar.",
    "experience.stack": "Technologies",
    "experience.repo": "View repository on GitHub",

    // Stack
    "stack.title": "Tech Stack",
    "stack.desc": "Tools and technologies I use throughout the development lifecycle.",
    "stack.frontend": "Frontend",
    "stack.backend": "Backend & Database",
    "stack.tools": "Tools & Others",

    // Projects
    "projects.title": "Projects",
    "projects.desc": "A selection of real products I've designed, architected and shipped end to end.",
    "projects.view": "View Project",

    // Projects descriptions
    "projects.habity.desc": "Habit tracking app with a full-stack architecture. Real-time authentication and database with Supabase, analytics dashboards with Recharts and PDF report export, with a responsive Tailwind CSS interface.",
    "projects.edurate.desc": "University teacher evaluation platform with guaranteed anonymity. I designed the production relational database architecture, with Supabase RLS for privacy and Next.js SSR for performance.",

    // Certifications
    "certs.title": "Certifications",
    "certs.desc": "A selection of the certifications that back my technical and professional knowledge.",
    "certs.view": "View credential",
    "certs.1.org": "Oracle",
    "certs.1.name": "Oracle Cloud Infrastructure 2025 Foundations Associate",
    "certs.1.date": "May 2026",
    "certs.1.url": "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2D5275C9774064CF557A76CC38ADEED33D634AB5B36178A96EAD37B446CA654C",
    "certs.2.org": "Alura Latam — Oracle ONE",
    "certs.2.name": "ONE Tech Foundation G9 - Back End",
    "certs.2.date": "Mar 2026",
    "certs.2.url": "https://app.aluracursos.com/program/certificate/961af040-68d1-4372-bc77-aabc5c2f6191?lang",
    "certs.3.org": "Udemy",
    "certs.3.name": "Microsoft Excel: Formulas & Functions A to Z",
    "certs.3.date": "Nov 2025",
    "certs.3.url": "https://www.udemy.com/certificate/UC-b139a11d-a59f-400f-9dc4-328f5636b57d/",
    "certs.4.org": "Código Facilito",
    "certs.4.name": "Prompt Engineering Course",
    "certs.4.date": "Jul 2025",
    "certs.4.url": "https://codigofacilito.com/certificates/9f880cb0-bd2c-4c0c-8449-380d854e67ca",
    "certs.5.org": "freeCodeCamp",
    "certs.5.name": "Responsive Web Design",
    "certs.5.date": "Jun 2025",
    "certs.5.url": "https://www.freecodecamp.org/certification/fcc-85d18331-5175-45a2-80c0-41e3cca27cb7/responsive-web-design",
    "certs.6.org": "Cisco",
    "certs.6.name": "CCNAv7: Introduction to Networks",
    "certs.6.date": "Nov 2022",
    "certs.6.url": "https://www.credly.com/badges/e9b17ce3-dc81-4b03-8509-4b943b78a9a0/public_url",
    "certs.7.org": "Udemy",
    "certs.7.name": "Power BI: Data Visualization",
    "certs.7.date": "2025",
    "certs.7.url": "",
    "certs.8.org": "Ministry of Labor",
    "certs.8.name": "Front-End Development",
    "certs.8.date": "2024",
    "certs.8.url": "",
    "certs.9.org": "Británico",
    "certs.9.name": "Basic English",
    "certs.9.date": "2022",
    "certs.9.url": "",

    "contact.title": "Contact",
    "contact.desc": "Whether it's a project, a job opportunity, or just to connect — write to me and I'll reply within 24 hours.",
    "contact.info": "Information",
    "contact.location.label": "Location",
    "contact.location.value": "Lima, Peru",
    "contact.phone.label": "Phone",
    "contact.phone.value": "+51 988 422 298",
    "contact.social": "Find me on",
    "contact.form.title": "Send me a message",
    "contact.form.name": "Name",
    "contact.form.name.placeholder": "Your full name",
    "contact.form.email": "Email",
    "contact.form.email.placeholder": "you@email.com",
    "contact.form.msg": "Message",
    "contact.form.msg.placeholder": "Tell me about your project or proposal...",
    "contact.form.subject": "New message from the portfolio",
    "contact.form.submit": "Send Message",
    "contact.form.sending": "Sending...",

    // Toast
    "toast.success.title": "Message sent!",
    "toast.success.desc": "I'll reply within 24 hours.",
    "toast.error.title": "Error sending message",
    "toast.error.desc": "Try again or reach out on LinkedIn.",
    "toast.close": "Close notification",

    // Footer
    "footer.rights": "All rights reserved.",
    "notFound.title": "Page not found",
    "notFound.desc": "The page you are looking for does not exist or has been moved.",
    "notFound.home": "Back to home",
    "scroll.top": "Back to top",
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved === "es" || saved === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
