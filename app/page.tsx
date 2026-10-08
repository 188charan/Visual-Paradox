import Link from 'next/link';
import { Hero } from '@/components/sections';
import { Container, MetaLabel, Section } from '@/components/ui';
import { content } from '@/lib/data';
import { siteConfig } from '@/lib/config';

/**
 * Homepage (Phase 1).
 *
 * Hero shell + an editorial intro statement + a data-driven category index.
 * The index reads from the ContentSource, demonstrating the architecture that
 * Phase 2 (immersive category explorer) and Phase 5 (Sanity) build on. All
 * motion/interaction is deliberately deferred to later phases.
 */
export default async function HomePage() {
  const categories = await content.getCategories();
  const featured = await content.getFeaturedProjects();

  return (
    <>
      <Hero />

      {/* Editorial intro statement */}
      <Section id="experience" spacing="lg" className="bg-ink-900">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="max-w-4xl font-serif text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.05] tracking-tight2 text-bone text-balance">
              We don&apos;t just take photographs.
              <span className="text-ash"> We create visual memories</span> — cinematic, considered,
              and made to be lived in.
            </h2>
            <p className="max-w-xs font-sans text-sm leading-relaxed text-ash">
              A photography studio in {siteConfig.location.area}, {siteConfig.location.city}, working
              across people, moments, and brands.
            </p>
          </div>
        </Container>
      </Section>

      {/* Data-driven category index */}
      <Section spacing="md" className="border-t border-ink-500 bg-ink-800">
        <Container>
          <div className="mb-12 flex items-end justify-between">
            <MetaLabel index={1}>Photography Worlds</MetaLabel>
            <Link
              href="/work"
              className="font-sans text-[11px] uppercase tracking-meta text-ash transition-colors duration-500 hover:text-bone"
            >
              View all work
            </Link>
          </div>

          <ul className="divide-y divide-ink-500 border-y border-ink-500">
            {categories.map((category, i) => (
              <li key={category.slug}>
                <Link
                  href={`/work/${category.slug}`}
                  className="group flex items-baseline justify-between gap-6 py-6 transition-colors duration-500 sm:py-8"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="font-sans text-[11px] tracking-meta text-ash-dim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif text-3xl font-light tracking-tight2 text-bone transition-colors duration-500 group-hover:text-champagne sm:text-5xl">
                      {category.name}
                    </span>
                  </span>
                  <span className="hidden max-w-sm text-right font-sans text-sm text-ash sm:block">
                    {category.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-8 font-sans text-[11px] uppercase tracking-meta text-ash-dim">
            {categories.length} disciplines · {featured.length} featured stories · Demo content
          </p>
        </Container>
      </Section>
    </>
  );
}
