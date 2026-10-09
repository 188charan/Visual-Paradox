import type { Metadata } from 'next';
import { content } from '@/lib/data';
import { Container } from '@/components/ui';
import { TextReveal } from '@/components/animations';
import { WorkArchive } from '@/components/work';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Work',
  description: `The visual archive of ${siteConfig.name} — cinematic photography across weddings, portraits, fashion, and brands.`,
  alternates: { canonical: '/work' },
};

/**
 * /work — the main photography archive. Editorial header + elegant category
 * filter + animated grid. Data comes from the ContentSource (demo today,
 * Sanity later).
 */
export default async function WorkPage() {
  const [projects, categories] = await Promise.all([
    content.getProjects(),
    content.getCategories(),
  ]);

  return (
    <Container className="pb-28 pt-36 sm:pt-44">
      <header className="mb-16 max-w-4xl">
        <p className="mb-6 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
          The Visual Archive
        </p>
        <h1 className="font-serif text-display-sm font-light leading-[0.95] tracking-tight3 text-bone">
          <TextReveal text="Work" trigger="mount" />
        </h1>
        <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ash">
          A living index of stories across people, moments, and brands. Filter by discipline, or
          wander through everything.
        </p>
      </header>

      <WorkArchive projects={projects} categories={categories} />
    </Container>
  );
}
