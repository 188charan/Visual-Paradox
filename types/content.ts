/**
 * Core content types for TheVisualParadox.
 *
 * These shapes intentionally mirror the planned Sanity CMS models so that in
 * Phase 5 the data source can switch from the local demo dataset to Sanity
 * without the frontend components changing. Keep them CMS-friendly.
 */

export type ImageOrientation = 'portrait' | 'landscape' | 'square';

/** A single image reference. In demo mode `src` is a remote placeholder URL. */
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  orientation?: ImageOrientation;
  order?: number;
}

/** Category slugs are the single source of truth for routing (/work/[category]). */
export type CategorySlug =
  | 'wedding'
  | 'pre-wedding'
  | 'portrait'
  | 'fashion'
  | 'maternity'
  | 'baby-kids'
  | 'birthday'
  | 'events'
  | 'product'
  | 'commercial';

export interface Category {
  name: string;
  slug: CategorySlug;
  description: string;
  heroImage: GalleryImage;
  hoverImage: GalleryImage;
  featured: boolean;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Project {
  title: string;
  slug: string;
  /** References Category.slug — keeps the relationship data-driven. */
  category: CategorySlug;
  description: string;
  location: string;
  year: number;
  coverImage: GalleryImage;
  gallery: GalleryImage[];
  featured: boolean;
  order: number;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
}

/** The read API every page uses. Phase 5 provides a Sanity-backed implementation. */
export interface ContentSource {
  getCategories: () => Promise<Category[]>;
  getCategory: (slug: string) => Promise<Category | null>;
  getProjects: () => Promise<Project[]>;
  getFeaturedProjects: () => Promise<Project[]>;
  getProjectsByCategory: (slug: string) => Promise<Project[]>;
  getProject: (categorySlug: string, projectSlug: string) => Promise<Project | null>;
}
