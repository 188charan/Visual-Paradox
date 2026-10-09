import type { MetadataRoute } from 'next';
import { content } from '@/lib/data';
import { siteConfig } from '@/lib/config';

/** Dynamic sitemap built from the ContentSource (static pages + all work routes). */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, '');
  const now = new Date();

  const [categories, projects] = await Promise.all([
    content.getCategories(),
    content.getProjects(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = ['', '/work', '/studio', '/about', '/contact'].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : 0.7,
    }),
  );

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${base}/work/${c.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/work/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...projectRoutes];
}
