import type { Category } from '@/types';
import { demoImage } from './images';

/**
 * The ten photography disciplines TheVisualParadox offers.
 *
 * This is DEMO content. The list is fully data-driven: categories are rendered
 * by iterating this array, never by per-category hardcoded layouts. Adding or
 * removing a category here propagates to navigation, the category explorer, and
 * the dynamic /work/[category] routes automatically.
 */
export const demoCategories: Category[] = [
  {
    name: 'Wedding',
    slug: 'wedding',
    description:
      'Full-day cinematic coverage — the quiet rituals, the loud joy, and everything the light touches in between.',
    heroImage: demoImage('tvp-wedding-hero', 'Wedding photography by TheVisualParadox', 'landscape'),
    hoverImage: demoImage('tvp-wedding-hover', 'Wedding moment', 'portrait'),
    featured: true,
    order: 1,
  },
  {
    name: 'Pre-Wedding',
    slug: 'pre-wedding',
    description:
      'Story-led sessions in locations that mean something — a prelude shot like a short film.',
    heroImage: demoImage('tvp-prewedding-hero', 'Pre-wedding photography', 'landscape'),
    hoverImage: demoImage('tvp-prewedding-hover', 'Couple at golden hour', 'portrait'),
    featured: true,
    order: 2,
  },
  {
    name: 'Portrait',
    slug: 'portrait',
    description: 'Studio and environmental portraiture built around presence, not poses.',
    heroImage: demoImage('tvp-portrait-hero', 'Portrait photography', 'landscape'),
    hoverImage: demoImage('tvp-portrait-hover', 'Studio portrait', 'portrait'),
    featured: true,
    order: 3,
  },
  {
    name: 'Fashion',
    slug: 'fashion',
    description: 'Editorial fashion and lookbooks with a strong art direction and controlled light.',
    heroImage: demoImage('tvp-fashion-hero', 'Fashion editorial photography', 'landscape'),
    hoverImage: demoImage('tvp-fashion-hover', 'Fashion editorial frame', 'portrait'),
    featured: true,
    order: 4,
  },
  {
    name: 'Maternity',
    slug: 'maternity',
    description: 'Tender, luminous sessions that hold a season of waiting still.',
    heroImage: demoImage('tvp-maternity-hero', 'Maternity photography', 'landscape'),
    hoverImage: demoImage('tvp-maternity-hover', 'Maternity portrait', 'portrait'),
    featured: false,
    order: 5,
  },
  {
    name: 'Baby / Kids',
    slug: 'baby-kids',
    description: 'Unhurried, honest frames of small humans being entirely themselves.',
    heroImage: demoImage('tvp-babykids-hero', 'Baby and kids photography', 'landscape'),
    hoverImage: demoImage('tvp-babykids-hover', 'Child portrait', 'portrait'),
    featured: false,
    order: 6,
  },
  {
    name: 'Birthday',
    slug: 'birthday',
    description: 'Celebrations documented with energy, colour, and a sense of occasion.',
    heroImage: demoImage('tvp-birthday-hero', 'Birthday photography', 'landscape'),
    hoverImage: demoImage('tvp-birthday-hover', 'Birthday celebration', 'portrait'),
    featured: false,
    order: 7,
  },
  {
    name: 'Events',
    slug: 'events',
    description: 'Corporate and cultural events covered with a documentary eye for the real moments.',
    heroImage: demoImage('tvp-events-hero', 'Event photography', 'landscape'),
    hoverImage: demoImage('tvp-events-hover', 'Event stage', 'portrait'),
    featured: false,
    order: 8,
  },
  {
    name: 'Product',
    slug: 'product',
    description: 'Precise, sculpted product photography that makes objects feel considered.',
    heroImage: demoImage('tvp-product-hero', 'Product photography', 'landscape'),
    hoverImage: demoImage('tvp-product-hover', 'Product still life', 'portrait'),
    featured: true,
    order: 9,
  },
  {
    name: 'Commercial',
    slug: 'commercial',
    description: 'Campaign and brand photography built to carry a identity across every surface.',
    heroImage: demoImage('tvp-commercial-hero', 'Commercial photography', 'landscape'),
    hoverImage: demoImage('tvp-commercial-hover', 'Commercial campaign frame', 'portrait'),
    featured: true,
    order: 10,
  },
];
