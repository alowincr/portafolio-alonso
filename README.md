# Portafolio — Alonso Carbajal

Portafolio personal **bilingüe (ES/EN)** de Alonso Carbajal, estudiante de Ingeniería de Sistemas y desarrollador fullstack. Reúne proyectos, experiencia en hackatones, stack técnico, certificaciones, descarga de CV y un formulario de contacto.

**Sitio en vivo:** [alonso-carbajal-portafolio.netlify.app](https://alonso-carbajal-portafolio.netlify.app/)

## Características

- Interfaz bilingüe español/inglés con cambio de idioma en tiempo real y persistencia en `localStorage`.
- Tema claro/oscuro/sistema con [next-themes](https://github.com/pacocoursey/next-themes).
- Diseño responsive, animaciones con [Framer Motion](https://motion.dev) y respeto por `prefers-reduced-motion`.
- SEO listo para producción: metadata, canonical, JSON-LD (`Person`), Open Graph, Twitter Cards e imagen OG generada dinámicamente.
- `sitemap.xml`, `robots.txt` y manifest PWA generados desde el App Router.
- Accesibilidad: enlace «Saltar al contenido», landmarks, `aria-label`, foco visible y textos alternativos.
- Formulario de contacto vía [Formspree](https://formspree.io) con validación y notificaciones tipo toast.
- Descarga del CV desde `/public/CV_AlonsoCarbajal2.pdf`.

## Stack

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org) | App Router, Turbopack por defecto, metadata API |
| [React 19](https://react.dev) | Componentes e interactividad |
| [TypeScript 5](https://www.typescriptlang.org) | Tipado estático |
| [Tailwind CSS 4](https://tailwindcss.com) | Estilos y utilidades |
| [Framer Motion](https://motion.dev) | Animaciones |
| [next-themes](https://github.com/pacocoursey/next-themes) | Tema claro/oscuro |
| [Lucide](https://lucide.dev) | Iconografía de interfaz |
| [simple-icons](https://simpleicons.org) | Logos del stack técnico |
| [Formspree](https://formspree.io) | Envío del formulario de contacto |

## Requisitos

- [Node.js](https://nodejs.org) **20.9 o superior** (requisito de Next.js 16).
- npm (incluido con Node.js).

## Puesta en marcha

```bash
git clone https://github.com/alowincr/portafolio-alonso.git
cd portafolio-alonso
npm install
```

Opcional: crea un archivo `.env.local` en la raíz con tus variables (ver la sección [Variables de entorno](#variables-de-entorno)):

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FORMSPREE_ID=tu_id_de_formspree
```

Sin este archivo el proyecto también funciona en desarrollo, porque todas las variables son opcionales.

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con Turbopack y recarga en caliente. |
| `npm run build` | Build de producción optimizado. |
| `npm run start` | Sirve el build de producción. |
| `npm run lint` | Ejecuta ESLint sobre el proyecto. |

## Variables de entorno

Todas son opcionales para desarrollo local. En producción se recomienda configurarlas.

| Variable | Uso | Requerida |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio, **sin barra final** (ej. `https://alonso-carbajal-portafolio.netlify.app`). | Recomendada (obligatoria en Netlify) |
| `NEXT_PUBLIC_FORMSPREE_ID` | ID del formulario de Formspree. | Opcional |
| `VERCEL_PROJECT_PRODUCTION_URL` | Solo la define Vercel; no existe en Netlify. | No configurar |

`src/lib/site.ts` resuelve la URL base en este orden:

1. `NEXT_PUBLIC_SITE_URL`
2. `VERCEL_PROJECT_PRODUCTION_URL` (solo si se despliega en Vercel)
3. `http://localhost:3000` como fallback

Si el valor no incluye protocolo, se antepone `https://`. Esa URL se usa en la metadata/canonical, el JSON-LD, `sitemap.xml` y `robots.txt`.

> **Netlify:** como `VERCEL_PROJECT_PRODUCTION_URL` no existe en esta plataforma, configura `NEXT_PUBLIC_SITE_URL` en las variables de entorno del sitio para evitar que el sitemap, `robots.txt` y las URLs canónicas apunten a `localhost`.

> El formulario incluye un ID de Formspree de respaldo en el código. Para recibir los mensajes en tu propia cuenta, define `NEXT_PUBLIC_FORMSPREE_ID` con tu ID real.

## Estructura del proyecto

```text
src/
├── app/
│   ├── layout.tsx           # metadata, fuentes, providers, JSON-LD y viewport
│   ├── page.tsx             # composición de las secciones y enlace de salto
│   ├── not-found.tsx        # página 404 bilingüe
│   ├── globals.css          # tema, utilidades y accesibilidad
│   ├── manifest.ts          # manifest PWA
│   ├── robots.ts            # robots.txt dinámico
│   ├── sitemap.ts           # sitemap.xml dinámico
│   └── opengraph-image.tsx  # imagen Open Graph generada
├── components/
│   ├── Navbar.tsx           # navegación, idioma y tema
│   ├── Hero.tsx             # presentación y descarga de CV
│   ├── About.tsx
│   ├── Experience.tsx       # experiencia y hackatones
│   ├── Stack.tsx            # tecnologías con simple-icons
│   ├── Certifications.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx          # formulario Formspree y enlaces sociales
│   ├── Footer.tsx
│   └── ScrollToTop.tsx
├── context/
│   ├── LanguageContext.tsx  # traducciones ES/EN y hook useLanguage
│   └── ThemeProvider.tsx    # wrapper de next-themes
└── lib/
    └── site.ts              # resolución de la URL del sitio

public/                      # CV, imágenes de proyectos, favicons e iconos PWA
```

## Contenido bilingüe

Los textos ES/EN viven en `src/context/LanguageContext.tsx`. Cada sección usa un prefijo de claves:

| Prefijo | Sección |
|---|---|
| `nav.*` | Navegación |
| `hero.*` | Portada |
| `about.*` | Sobre mí |
| `experience.*` | Experiencia y hackatones |
| `stack.*` | Stack técnico |
| `certs.*` | Certificaciones |
| `projects.*` | Proyectos |
| `contact.*`, `toast.*` | Contacto y notificaciones |
| `footer.*`, `notFound.*`, `scroll.*` | Footer, 404 y botón «volver arriba» |

Para añadir o editar un texto, actualiza su clave en **ambos** idiomas (`es` y `en`) para evitar textos sin traducir.

## Personalización rápida

- **Textos y traducciones:** `src/context/LanguageContext.tsx`.
- **Colores, tipografía y utilidades:** `src/app/globals.css`.
- **URL del sitio:** variable `NEXT_PUBLIC_SITE_URL` (o `src/lib/site.ts` para cambiar los fallbacks).
- **Formulario:** `NEXT_PUBLIC_FORMSPREE_ID` o el endpoint definido en `src/components/Contact.tsx`.
- **CV:** reemplaza `public/CV_AlonsoCarbajal2.pdf` y actualiza el `href` en `src/components/Hero.tsx` si cambias el nombre.
- **Metadatos y SEO:** `src/app/layout.tsx`, `manifest.ts`, `robots.ts`, `sitemap.ts` y `opengraph-image.tsx`.

## Despliegue

El proyecto está desplegado en **Netlify**:

**https://alonso-carbajal-portafolio.netlify.app/**

### Desde Netlify

1. Importa el repositorio en Netlify (Add new site → Import an existing project).
2. Netlify detecta Next.js automáticamente y configura el runtime oficial.
3. En **Site configuration → Environment variables**, define:
   - `NEXT_PUBLIC_SITE_URL=https://alonso-carbajal-portafolio.netlify.app` (sin barra final).
   - `NEXT_PUBLIC_FORMSPREE_ID` con tu ID de Formspree, si corresponde.
4. Despliega. Cada push a la rama principal genera un nuevo deploy.

### Desde la CLI de Netlify

```bash
npx netlify deploy --build --prod
```

El comando ejecuta el build en Netlify y publica el sitio en producción.

La imagen OG (`opengraph-image.tsx`) se genera en el build y no depende de `NEXT_PUBLIC_SITE_URL`. Esa variable sí afecta la metadata/canonical, el JSON-LD, `sitemap.xml` y `robots.txt`.

Si más adelante usas un dominio propio, actualiza `NEXT_PUBLIC_SITE_URL` con el nuevo dominio y vuelve a desplegar.

> El proyecto también puede desplegarse en cualquier plataforma compatible con Node.js 20.9+ ejecutando `npm run build` y `npm run start`.

## Contacto

- GitHub: [@alowincr](https://github.com/alowincr)
- LinkedIn: [alonso-carbajal-dev](https://www.linkedin.com/in/alonso-carbajal-dev/)
- Repositorio: [alowincr/portafolio-alonso](https://github.com/alowincr/portafolio-alonso)
