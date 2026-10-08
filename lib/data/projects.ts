import type { CategorySlug, GalleryImage, ImageOrientation, Project } from '@/types';
import { demoImage } from './images';

/**
 * DEMO projects. ~18 shoots spread across categories, each with a cover and a
 * multi-image gallery. Content (titles, locations, descriptions) is placeholder
 * — no real client names or facts. Structured to scale: replacing this array
 * with Sanity data in Phase 5 requires no frontend changes.
 */

/** Builds a varied, editorial-feeling gallery of N images for a project. */
function buildGallery(slug: string, count: number): GalleryImage[] {
  // Deliberate orientation rhythm so galleries never feel like a uniform grid.
  const rhythm: ImageOrientation[] = [
    'landscape',
    'portrait',
    'portrait',
    'landscape',
    'square',
    'portrait',
    'landscape',
    'portrait',
  ];
  return Array.from({ length: count }, (_, i) => {
    const orientation = rhythm[i % rhythm.length];
    return demoImage(`${slug}-${i + 1}`, `Frame ${i + 1} from the ${slug} story`, orientation, {
      order: i + 1,
    });
  });
}

interface ProjectSeed {
  title: string;
  slug: string;
  category: CategorySlug;
  description: string;
  location: string;
  year: number;
  featured?: boolean;
  tags?: string[];
  galleryCount?: number;
  coverOrientation?: ImageOrientation;
}

const seeds: ProjectSeed[] = [
  {
    title: 'The Long Afternoon',
    slug: 'the-long-afternoon',
    category: 'wedding',
    description:
      'A home wedding where the light did half the work. Shot across a single unhurried day.',
    location: 'Mysuru, Karnataka',
    year: 2025,
    featured: true,
    tags: ['home wedding', 'daylight', 'documentary'],
    galleryCount: 8,
  },
  {
    title: 'Monsoon Vows',
    slug: 'monsoon-vows',
    category: 'wedding',
    description: 'Rain refused to hold off, so we let it in. A wedding told through weather.',
    location: 'Coorg, Karnataka',
    year: 2024,
    featured: true,
    tags: ['rain', 'outdoor', 'cinematic'],
    galleryCount: 7,
  },
  {
    title: 'Between Two Cities',
    slug: 'between-two-cities',
    category: 'pre-wedding',
    description: 'A couple shot across the places they first met. A prelude in two acts.',
    location: 'Bengaluru, Karnataka',
    year: 2025,
    featured: true,
    tags: ['golden hour', 'urban', 'story'],
    galleryCount: 6,
  },
  {
    title: 'Coastline',
    slug: 'coastline',
    category: 'pre-wedding',
    description: 'Open sky, salt air, and a lot of walking. A quiet pre-wedding by the sea.',
    location: 'Gokarna, Karnataka',
    year: 2024,
    tags: ['beach', 'minimal'],
    galleryCount: 6,
  },
  {
    title: 'Studio No. 7',
    slug: 'studio-no-7',
    category: 'portrait',
    description: 'A single-light portrait series exploring stillness and shadow.',
    location: 'Indiranagar, Bengaluru',
    year: 2025,
    featured: true,
    tags: ['studio', 'low-key', 'black & white'],
    galleryCount: 8,
    coverOrientation: 'portrait',
  },
  {
    title: 'Daylight People',
    slug: 'daylight-people',
    category: 'portrait',
    description: 'Environmental portraits of makers in their own spaces.',
    location: 'Bengaluru, Karnataka',
    year: 2024,
    tags: ['environmental', 'natural light'],
    galleryCount: 6,
  },
  {
    title: 'Paper & Silk',
    slug: 'paper-and-silk',
    category: 'fashion',
    description: 'An editorial built around texture — handwoven fabric against hard studio light.',
    location: 'Bengaluru, Karnataka',
    year: 2025,
    featured: true,
    tags: ['editorial', 'textile', 'studio'],
    galleryCount: 8,
    coverOrientation: 'portrait',
  },
  {
    title: 'After Hours',
    slug: 'after-hours',
    category: 'fashion',
    description: 'A nocturnal lookbook shot on empty streets after midnight.',
    location: 'Bengaluru, Karnataka',
    year: 2024,
    tags: ['night', 'lookbook', 'neon-free'],
    galleryCount: 7,
  },
  {
    title: 'The Waiting Season',
    slug: 'the-waiting-season',
    category: 'maternity',
    description: 'A luminous, soft-light maternity session at home.',
    location: 'Bengaluru, Karnataka',
    year: 2025,
    tags: ['home', 'soft light'],
    galleryCount: 6,
    coverOrientation: 'portrait',
  },
  {
    title: 'First Light',
    slug: 'first-light',
    category: 'maternity',
    description: 'Early-morning frames, backlit and unhurried.',
    location: 'Bengaluru, Karnataka',
    year: 2024,
    tags: ['backlight', 'outdoor'],
    galleryCount: 5,
  },
  {
    title: 'Small Humans',
    slug: 'small-humans',
    category: 'baby-kids',
    description: 'A playful, honest set of a toddler at full tilt.',
    location: 'Bengaluru, Karnataka',
    year: 2025,
    tags: ['candid', 'play'],
    galleryCount: 6,
  },
  {
    title: 'Six Candles',
    slug: 'six-candles',
    category: 'birthday',
    description: 'A sixth birthday documented with colour and chaos intact.',
    location: 'Bengaluru, Karnataka',
    year: 2024,
    tags: ['celebration', 'candid'],
    galleryCount: 6,
  },
  {
    title: 'The Keynote',
    slug: 'the-keynote',
    category: 'events',
    description: 'Conference coverage with a documentary eye for the in-between.',
    location: 'Bengaluru, Karnataka',
    year: 2025,
    tags: ['corporate', 'documentary'],
    galleryCount: 7,
  },
  {
    title: 'Festival Nights',
    slug: 'festival-nights',
    category: 'events',
    description: 'A cultural evening shot in available light, start to finish.',
    location: 'Bengaluru, Karnataka',
    year: 2024,
    tags: ['cultural', 'available light'],
    galleryCount: 6,
  },
  {
    title: 'Matte Objects',
    slug: 'matte-objects',
    category: 'product',
    description: 'A controlled still-life series for a homeware label.',
    location: 'Indiranagar, Bengaluru',
    year: 2025,
    featured: true,
    tags: ['still life', 'studio', 'homeware'],
    galleryCount: 6,
    coverOrientation: 'square',
  },
  {
    title: 'Glassware',
    slug: 'glassware',
    category: 'product',
    description: 'Hard light and reflection studies for a drinkware range.',
    location: 'Indiranagar, Bengaluru',
    year: 2024,
    tags: ['reflection', 'hard light'],
    galleryCount: 6,
    coverOrientation: 'square',
  },
  {
    title: 'The Brand Film Stills',
    slug: 'the-brand-film-stills',
    category: 'commercial',
    description: 'Campaign stills shot alongside a brand film for a lifestyle label.',
    location: 'Bengaluru, Karnataka',
    year: 2025,
    featured: true,
    tags: ['campaign', 'lifestyle'],
    galleryCount: 8,
  },
  {
    title: 'Founders',
    slug: 'founders',
    category: 'commercial',
    description: 'A brand portrait series for an early-stage team.',
    location: 'Bengaluru, Karnataka',
    year: 2024,
    tags: ['brand', 'portrait'],
    galleryCount: 6,
  },
];

export const demoProjects: Project[] = seeds.map((s, index) => {
  const galleryCount = s.galleryCount ?? 6;
  return {
    title: s.title,
    slug: s.slug,
    category: s.category,
    description: s.description,
    location: s.location,
    year: s.year,
    coverImage: demoImage(
      `${s.slug}-cover`,
      `${s.title} — cover image`,
      s.coverOrientation ?? 'landscape',
    ),
    gallery: buildGallery(s.slug, galleryCount),
    featured: s.featured ?? false,
    order: index + 1,
    tags: s.tags ?? [],
  };
});
