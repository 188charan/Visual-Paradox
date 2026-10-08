/**
 * Central site configuration.
 *
 * Everything brand/contact related is read from env with safe placeholder
 * fallbacks so no real business facts are hardcoded. Phase 5/6 can override
 * these from Sanity (ContactSettings / StudioSettings) without touching the UI.
 */

export interface NavItem {
  label: string;
  href: string;
}

const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'hello@thevisualparadox.example',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? '+91 00000 00000',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '910000000000',
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'YOUR_INSTAGRAM_HANDLE',
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? 'https://instagram.com/YOUR_INSTAGRAM_HANDLE',
};

export const siteConfig = {
  name: 'TheVisualParadox',
  wordmark: 'THEVISUALPARADOX',
  tagline: 'Photography · Stories · Visual Experiences',
  description:
    'TheVisualParadox is a photography studio in Indiranagar, Bengaluru, crafting cinematic visual stories across weddings, portraits, fashion, and brands.',
  url: env.siteUrl,
  location: {
    area: 'Indiranagar',
    city: 'Bengaluru',
    region: 'Karnataka',
    country: 'India',
    short: 'INDIRANAGAR · BENGALURU',
  },
  // Contact details are placeholders until real values are configured.
  contact: {
    email: env.email,
    phone: env.phone,
    whatsapp: env.whatsapp,
    whatsappUrl: `https://wa.me/${env.whatsapp.replace(/[^0-9]/g, '')}`,
  },
  social: {
    instagramHandle: env.instagramHandle,
    instagramUrl: env.instagramUrl,
  },
  nav: [
    { label: 'WORK', href: '/work' },
    { label: 'STUDIO', href: '/studio' },
    { label: 'EXPERIENCE', href: '/#experience' },
    { label: 'ABOUT', href: '/about' },
    { label: 'CONTACT', href: '/contact' },
  ] satisfies NavItem[],
  cta: {
    label: 'BOOK A SHOOT',
    href: '/contact',
  },
} as const;

export type SiteConfig = typeof siteConfig;
