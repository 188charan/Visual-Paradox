import type { Category, ContentSource, Project } from '@/types';
import { isSanityConfigured } from '@/lib/sanity/env';
import { sanitySource } from '@/lib/sanity/source';
import { demoCategories } from './categories';
import { demoProjects } from './projects';

/**
 * The content-source switch.
 *
 * Phase 1 ships only the `demo` implementation. Phase 5 adds a `sanity`
 * implementation of the same `ContentSource` interface and flips the switch via
 * NEXT_PUBLIC_CONTENT_SOURCE. Pages import `content` from here and never know or
 * care which backend answered — that is the whole point.
 */

const sortByOrder = <T extends { order: number }>(items: T[]): T[] =>
  [...items].sort((a, b) => a.order - b.order);

const demoSource: ContentSource = {
  async getCategories(): Promise<Category[]> {
    return sortByOrder(demoCategories);
  },
  async getCategory(slug: string): Promise<Category | null> {
    return demoCategories.find((c) => c.slug === slug) ?? null;
  },
  async getProjects(): Promise<Project[]> {
    return sortByOrder(demoProjects);
  },
  async getFeaturedProjects(): Promise<Project[]> {
    return sortByOrder(demoProjects.filter((p) => p.featured));
  },
  async getProjectsByCategory(slug: string): Promise<Project[]> {
    return sortByOrder(demoProjects.filter((p) => p.category === slug));
  },
  async getProject(categorySlug: string, projectSlug: string): Promise<Project | null> {
    return (
      demoProjects.find((p) => p.category === categorySlug && p.slug === projectSlug) ?? null
    );
  },
};

const sourceName = process.env.NEXT_PUBLIC_CONTENT_SOURCE ?? 'demo';

/**
 * Resolve the active content source.
 * - `sanity` + a configured project → the Sanity-backed source (which itself
 *   degrades to demo content on any query error).
 * - otherwise → the local demo source.
 * This is the ONLY place that knows which backend answers; components always
 * import `content` and stay decoupled.
 */
function resolveSource(): ContentSource {
  if (sourceName === 'sanity' && isSanityConfigured) {
    return sanitySource;
  }
  return demoSource;
}

export const content: ContentSource = resolveSource();
