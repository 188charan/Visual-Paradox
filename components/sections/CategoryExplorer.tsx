import { content } from '@/lib/data';
import { Container, MetaLabel } from '@/components/ui';
import { CategoryExplorerClient } from './CategoryExplorerClient';

/**
 * Photography Worlds (server). Loads categories from the ContentSource and
 * hands them to the interactive client explorer. Stays data-driven — adding a
 * category in the data layer appears here automatically.
 */
export async function CategoryExplorer() {
  const categories = await content.getCategories();
  if (categories.length === 0) return null;

  return (
    <section className="relative border-t border-ink-500 bg-ink-800 py-24 sm:py-32">
      <Container>
        <div className="mb-12 flex items-end justify-between">
          <MetaLabel index={3}>Photography Worlds</MetaLabel>
          <span className="hidden font-sans text-[11px] uppercase tracking-meta text-ash-dim sm:block">
            {categories.length} disciplines
          </span>
        </div>
      </Container>
      <CategoryExplorerClient categories={categories} />
    </section>
  );
}
