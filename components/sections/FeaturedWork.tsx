import Link from 'next/link';
import { content } from '@/lib/data';
import { Container, MetaLabel } from '@/components/ui';
import { FeaturedWorkClient } from './FeaturedWorkClient';

/**
 * Featured Work (server). Pulls the `featured` projects from the ContentSource
 * and resolves their category names, then hands them to the client component
 * that runs the scroll-driven editorial sequence.
 */
export async function FeaturedWork() {
  const [projects, categories] = await Promise.all([
    content.getFeaturedProjects(),
    content.getCategories(),
  ]);

  const nameFor = (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug;
  const items = projects.map((p) => ({ project: p, categoryName: nameFor(p.category) }));

  if (items.length === 0) return null;

  return (
    <section className="relative bg-ink-900 py-24 sm:py-32">
      <Container>
        <div className="mb-16 flex items-end justify-between">
          <MetaLabel index={2}>Featured Work</MetaLabel>
          <Link
            href="/work"
            data-cursor-interactive
            className="font-sans text-[11px] uppercase tracking-meta text-ash transition-colors duration-500 hover:text-bone"
          >
            All stories →
          </Link>
        </div>
      </Container>
      <FeaturedWorkClient items={items} />
    </section>
  );
}
