# TheVisualParadox

A premium, cinematic website for **TheVisualParadox** — a photography studio in
Indiranagar, Bengaluru. A production-grade, data-driven Next.js application where
photography is the primary visual language, enhanced by restrained motion, a
signature 3D moment, and a real content-management backend.

## Tech stack

- **Next.js (App Router)** · **React 19** · **TypeScript** (strict)
- **Tailwind CSS** — theme tokens + CSS variables
- **GSAP + ScrollTrigger** and **Lenis** — scroll-driven motion & smooth scroll
- **Three.js / React Three Fiber / drei** — the hero optical lens (code-split)
- **Sanity** — headless CMS (behind a stable content interface)
- **Zod** — shared client + server validation
- **lucide-react** icons · **next/font** (Cormorant Garamond + Inter) · **pnpm**

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional — sensible fallbacks exist
pnpm dev                     # http://localhost:3000
```

Scripts: `pnpm build` · `pnpm start` · `pnpm lint` · `pnpm format` ·
`pnpm studio:dev` / `studio:build` / `studio:deploy` (Sanity Studio).

## Architecture

```
app/                      Routes, layout, template (page transition), sitemap, robots
  work/[category]/[project]   Dynamic, statically generated from content
  actions/booking.ts      Server action for enquiries (Zod-validated)
components/
  ui/                     Primitives (Button, Section, Container, SectionHeading…)
  sections/               Hero, IntroStatement, FeaturedWork, CategoryExplorer, Footer…
  work/                   ProjectPreview, CategoryFilter, WorkArchive
  gallery/                ProjectGallery + accessible fullscreen Lightbox
  animations/             SmoothScrollProvider, TextReveal, ImageReveal, FadeUp, Parallax, Magnetic
  three/                  HeroLens (guarded, dynamic) + procedural LensScene + WebGL check
  cursor/                 Custom cursor (desktop only)
  contact/                BookingForm
  providers/              AppProviders (smooth scroll + cursor)
  seo/                    StructuredData (JSON-LD)
lib/
  config.ts               Central site config (brand, contact, nav) via env
  data/                   Demo dataset + ContentSource switch (the single source toggle)
  sanity/                 Sanity client, image pipeline, GROQ queries, sanitySource
  validation/             Zod schemas
hooks/                    scroll state, body-scroll lock, reduced-motion, touch detection
types/                    Content types (Category, Project, GalleryImage…)
sanity/                   Studio schemas + config (run via the Sanity CLI)
```

### Content is data-driven (and CMS-ready)

Every page consumes a single `ContentSource` interface
(`content.getCategories()`, `getProjects()`, `getFeaturedProjects()`,
`getProjectsByCategory()`, `getProject()`). The implementation is selected in
one place, `lib/data/source.ts`:

- `demo` — the local demo dataset (default).
- `sanity` — the Sanity-backed source, used when `NEXT_PUBLIC_CONTENT_SOURCE=sanity`
  **and** a project id is set. It degrades to demo content on any query error,
  so the site never breaks.

Components never import the demo arrays directly, so swapping the backend
requires no component changes.

### Motion system

- `SmoothScrollProvider` runs Lenis on a single `gsap.ticker` loop and keeps
  ScrollTrigger synced — no competing scroll systems. Native `scroll-behavior`
  is intentionally not smooth (Lenis owns it).
- Reusable primitives (`TextReveal`, `ImageReveal`, `FadeUp`, `Parallax`,
  `Magnetic`) keep one motion language. Everything is **disabled under
  `prefers-reduced-motion`** and the custom cursor/magnetic effects are disabled
  on touch devices.

### Signature 3D

`components/three/HeroLens` renders a procedural optical lens only when the
device supports WebGL, is non-touch, and allows motion. It's **dynamically
imported (`ssr:false`)** so Three.js is never in the initial bundle, pauses when
off-screen or the tab is hidden, and falls back silently to the cinematic hero
photograph.

### Booking

`/contact` posts to a server action (`app/actions/booking.ts`) validated with
the shared Zod schema on both client and server. No email provider is wired yet
— enquiries are logged server-side (development-safe). To go live, send the
validated payload to an email/CRM provider from the action using a **server-only**
secret.

## Configuration

All brand/contact values come from env with safe placeholders (see
`.env.example`) — no real business facts are committed. Key vars:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG/sitemap base URL |
| `NEXT_PUBLIC_CONTENT_SOURCE` | `demo` or `sanity` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `_DATASET` / `_API_VERSION` | Sanity connection |
| `NEXT_PUBLIC_CONTACT_EMAIL` / `_PHONE` / `WHATSAPP_NUMBER` | Contact placeholders |
| `NEXT_PUBLIC_INSTAGRAM_HANDLE` / `_URL` | Social placeholders |

## Content management (Sanity)

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage); note the
   project id and dataset (default `production`).
2. Put them in `.env.local` and set `NEXT_PUBLIC_CONTENT_SOURCE=sanity`.
3. Run the studio locally: `pnpm studio:dev` (schemas live in `sanity/schemaTypes`).
4. Add **categories** first, then **projects** (each references a category and
   holds a gallery). Upload images with meaningful **alt text**; set
   orientation per image to drive editorial composition.
5. Edit homepage/about/testimonials/contact singletons as needed.
6. Deploy a hosted studio with `pnpm studio:deploy`.

Images use the Sanity image pipeline (`lib/sanity/image.ts`) with auto
format (AVIF/WebP) and are further optimized by `next/image`.

## SEO

Metadata + per-page titles/descriptions, OpenGraph/Twitter, canonical URLs,
a dynamic `sitemap.xml` and `robots.txt`, and `ProfessionalService` /
`PhotographicStudio` JSON-LD. No fabricated business data.

## Deployment

Target **Vercel**. `pnpm build` must pass. Set the env vars from `.env.example`
in the Vercel project. The Sanity Studio can be deployed separately
(`pnpm studio:deploy`) or hosted on Vercel as its own project.

## Accessibility & performance

Semantic HTML, keyboard navigation, focus states, an accessible lightbox dialog
(focus trap + restore, Escape), full reduced-motion support, and alt text on all
images. Three.js is code-split; images are lazy except above-the-fold; fonts use
`next/font` with `display: swap`.
