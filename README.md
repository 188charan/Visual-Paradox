# TheVisualParadox

A premium, cinematic website for **TheVisualParadox** — a photography studio in
Indiranagar, Bengaluru. Built as a production-grade, data-driven Next.js
application where photography is the primary visual language.

> Status: **Phase 1 (Foundation)** complete. Visual experience, motion, 3D, CMS,
> booking, and SEO land in later phases (see Roadmap).

## Tech stack

- **Next.js (App Router)** + **React 19** + **TypeScript** (strict)
- **Tailwind CSS** (theme tokens + CSS variables)
- **next/font/google** — Cormorant Garamond (editorial serif) + Inter (sans)
- **lucide-react** icons
- **pnpm**

Coming in later phases: GSAP + ScrollTrigger, Lenis, Three.js / React Three
Fiber, Sanity CMS, Zod.

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional — sensible fallbacks exist
pnpm dev                     # http://localhost:3000
```

Other scripts:

```bash
pnpm build     # production build
pnpm start     # run the production build
pnpm lint      # eslint
pnpm format    # prettier
```

## Architecture

```
app/                     Routes + global layout and styles
components/
  ui/                    Reusable primitives (Button, Section, Container, ...)
  sections/              Page sections (Hero, Footer, ...)
  gallery/               Gallery + viewer            (Phase 2)
  navigation/            Navbar, mobile overlay, logo, links
  animations/            GSAP / Lenis wrappers        (Phase 3)
  three/                 R3F / Three.js hero element  (Phase 4)
lib/
  config.ts              Central site config (brand, contact, nav) via env
  utils.ts               Small helpers (cn)
  data/                  Demo dataset + content source switch
  sanity/                Sanity client + source        (Phase 5)
hooks/                   Client hooks (scroll state, body-scroll lock)
types/                   Content types (Category, Project, ...)
```

### Content is data-driven

Categories and projects are **never** hardcoded per layout. Everything renders
by iterating data from a single `ContentSource` interface
(`lib/data/source.ts`). Phase 5 swaps the demo source for a Sanity-backed one
behind the same interface — no frontend changes required.

- Content source is selected by `NEXT_PUBLIC_CONTENT_SOURCE` (`demo` | `sanity`).
- Types in `types/content.ts` mirror the planned Sanity models.

### Adding / editing demo content

- **Categories:** edit `lib/data/categories.ts` (the array is the source of
  truth for nav, the category index, and the dynamic `/work/[category]` routes).
- **Projects:** add a seed to the `seeds` array in `lib/data/projects.ts`.
- **Images:** demo images come from `picsum.photos` with deterministic seeds via
  `lib/data/images.ts`. This is the **only** file that changes when real
  photography (or the Sanity CDN) is wired in.

### Design tokens

Near-black cinematic palette (`#050505 / #0A0A0A / #111111`), warm off-white
text (`#F4F1EA`), muted gray, and a subtle champagne accent — **no blue/cyan**.
Defined in `tailwind.config.ts` and `app/globals.css`. Photography provides the
colour; the UI stays restrained.

## Configuration

All brand/contact values are read from env with safe placeholders — no real
business facts are committed. See `.env.example`. Replace placeholders (email,
phone, WhatsApp, Instagram) when real details are available; Phase 5 can also
drive these from Sanity.

## Roadmap

1. **Foundation** — architecture, theme, fonts, data layer, nav, footer, hero shell ✅
2. **Visual experience** — hero motion, featured work, category explorer, work + category + project pages
3. **Motion** — GSAP/ScrollTrigger, Lenis, page transitions, custom cursor, image reveals
4. **3D** — signature hero optical element with graceful 2D fallback
5. **CMS** — Sanity schemas and dynamic content
6. **Contact / booking** — validated enquiry form + premium success state
7. **SEO + performance** — metadata, structured data, image optimization
8. **Final polish** — responsive + accessibility + error-state audit

## Deployment

Target: **Vercel**. `pnpm build` must pass before deploy. Configure the env vars
from `.env.example` in the Vercel project settings.
