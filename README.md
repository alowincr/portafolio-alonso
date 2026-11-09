# Portafolio — Alonso Carbajal

Portafolio personal bilingüe (ES/EN) de Alonso Carbajal, estudiante de Ingeniería de Sistemas y desarrollador fullstack. Incluye proyectos, experiencia en hackatones, stack técnico, certificaciones y formulario de contacto.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router + Turbopack)
- React 19 + TypeScript
- Tailwind CSS 4
- Framer Motion
- next-themes (tema claro/oscuro)
- simple-icons
- Formspree para el formulario de contacto

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run start    # servidor de producción
npm run lint     # ESLint
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # metadata, fuentes, providers y JSON-LD
│   ├── page.tsx            # composición de las secciones
│   ├── not-found.tsx       # página 404 bilingüe
│   ├── globals.css         # tema, utilidades y accesibilidad
│   ├── manifest.ts         # manifest PWA
│   ├── robots.ts           # robots.txt
│   ├── sitemap.ts          # sitemap.xml
│   └── opengraph-image.tsx # imagen OG generada
├── components/             # Navbar, Hero, About, Experience, Stack,
│                           # Certifications, Projects, Contact, Footer
├── context/                # LanguageContext y ThemeProvider
└── lib/                    # utilidades compartidas (URL del sitio)
```

## Contenido bilingüe

Los textos ES/EN viven en `src/context/LanguageContext.tsx`. Para editar una sección, busca su prefijo (`hero.*`, `about.*`, `experience.*`, `projects.*`, `certs.*`, `contact.*`).

## Contacto

- GitHub: [alowincr](https://github.com/alowincr)
- LinkedIn: [alonso-carbajal-dev](https://www.linkedin.com/in/alonso-carbajal-dev/)

## Despliegue

El proyecto está pensado para desplegarse en Vercel. Si configuras un dominio propio, define `NEXT_PUBLIC_SITE_URL` para que las URLs canónicas, el sitemap, `robots.txt`, el JSON-LD y la imagen OG usen la URL correcta (sin barra final).

Variables de entorno disponibles (ver `.env.example`):

| Variable | Uso | Requerida |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio | Recomendada |
| `NEXT_PUBLIC_FORMSPREE_ID` | ID del formulario de Formspree | Opcional (tiene fallback) |
