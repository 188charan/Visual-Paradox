import type { Category, CategorySlug, ContentSource, Project } from '@/types';
import { demoCategories } from '@/lib/data/categories';
import { demoProjects } from '@/lib/data/projects';
import { client } from './client';
import { toGalleryImage, type SanityImageField } from './image';
import {
  categoriesQuery,
  categoryQuery,
  featuredProjectsQuery,
  projectQuery,
  projectsByCategoryQuery,
  projectsQuery,
} from './queries';

/** Raw shapes returned by the GROQ projections. */
interface RawCategory {
  name: string;
  slug: string;
  description: string;
  heroImage?: SanityImageField;
  hoverImage?: SanityImageField;
  featured?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}

interface RawProject {
  title: string;
  slug: string;
  category: string;
  description: string;
  location: string;
  year: number;
  coverImage?: SanityImageField;
  gallery?: SanityImageField[];
  tags?: string[];
  featured?: boolean;
  order?: number;
  seoTitle?: string;
  seoDescription?: string;
}

function mapCategory(raw: RawCategory): Category {
  return {
    name: raw.name,
    slug: raw.slug as CategorySlug,
    description: raw.description,
    heroImage: toGalleryImage(raw.heroImage, `${raw.name} hero image`, 2000),
    hoverImage: toGalleryImage(raw.hoverImage, `${raw.name}`, 1200),
    featured: raw.featured ?? false,
    order: raw.order ?? 0,
    seoTitle: raw.seoTitle,
    seoDescription: raw.seoDescription,
  };
}

function mapProject(raw: RawProject): Project {
  return {
    title: raw.title,
    slug: raw.slug,
    category: raw.category as CategorySlug,
    description: raw.description,
    location: raw.location,
    year: raw.year,
    coverImage: toGalleryImage(raw.coverImage, `${raw.title} cover`, 2000),
    gallery: (raw.gallery ?? []).map((g, i) =>
      toGalleryImage(g, `${raw.title} — frame ${i + 1}`, 2000),
    ),
    tags: raw.tags ?? [],
    featured: raw.featured ?? false,
    order: raw.order ?? 0,
    seoTitle: raw.seoTitle,
    seoDescription: raw.seoDescription,
  };
}

// --- Demo fallbacks (used if a live query fails, so the site never breaks) ---
const sortByOrder = <T extends { order: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.order - b.order);

async function withFallback<T>(label: string, run: () => Promise<T>, fallback: T): Promise<T> {
  if (!client) return fallback;
  try {
    return await run();
  } catch (err) {
    console.warn(`[sanity] ${label} failed, serving demo fallback:`, err);
    return fallback;
  }
}

/**
 * Sanity-backed ContentSource. Same interface the whole frontend already
 * consumes — swapping to it changes nothing in the components. Every method
 * degrades to demo content on error (graceful failure, per spec 5.10).
 */
export const sanitySource: ContentSource = {
  getCategories: () =>
    withFallback(
      'getCategories',
      async () => (await client!.fetch<RawCategory[]>(categoriesQuery)).map(mapCategory),
      sortByOrder(demoCategories),
    ),

  getCategory: (slug) =>
    withFallback(
      'getCategory',
      async () => {
        const raw = await client!.fetch<RawCategory | null>(categoryQuery, { slug });
        return raw ? mapCategory(raw) : null;
      },
      demoCategories.find((c) => c.slug === slug) ?? null,
    ),

  getProjects: () =>
    withFallback(
      'getProjects',
      async () => (await client!.fetch<RawProject[]>(projectsQuery)).map(mapProject),
      sortByOrder(demoProjects),
    ),

  getFeaturedProjects: () =>
    withFallback(
      'getFeaturedProjects',
      async () => (await client!.fetch<RawProject[]>(featuredProjectsQuery)).map(mapProject),
      sortByOrder(demoProjects.filter((p) => p.featured)),
    ),

  getProjectsByCategory: (slug) =>
    withFallback(
      'getProjectsByCategory',
      async () =>
        (await client!.fetch<RawProject[]>(projectsByCategoryQuery, { slug })).map(mapProject),
      sortByOrder(demoProjects.filter((p) => p.category === slug)),
    ),

  getProject: (category, project) =>
    withFallback(
      'getProject',
      async () => {
        const raw = await client!.fetch<RawProject | null>(projectQuery, { category, project });
        return raw ? mapProject(raw) : null;
      },
      demoProjects.find((p) => p.category === category && p.slug === project) ?? null,
    ),
};
