import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { content } from '@/lib/data';
import { Container } from '@/components/ui';
import { ImageReveal, TextReveal, FadeUp } from '@/components/animations';
import { ProjectPreview } from '@/components/work';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

/**
 * Categories are fully known at build time (data-driven). dynamicParams=false
 * makes any unknown slug a true 404. When Sanity arrives this can flip to true
 * with revalidation.
 */
export const dynamicParams = false;

/** Pre-render every category route from the data layer. */
export async function generateStaticParams() {
  const categories = await content.getCategories();
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = await content.getCategory(slug);
  if (!category) return { title: 'Not found' };
  return {
    title: category.seoTitle ?? category.name,
    description: category.seoDescription ?? category.description,
    alternates: { canonical: `/work/${category.slug}` },
    openGraph: category.heroImage.src ? { images: [{ url: category.heroImage.src }] } : undefined,
  };
}

/**
 * /work/[category] — dynamically generated from the ContentSource. Large
 * cinematic opening (name + statement + slow image reveal) then an editorial,
 * orientation-aware grid of that category's projects.
 */
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = await content.getCategory(slug);
  if (!category) notFound();

  const projects = await content.getProjectsByCategory(slug);

  return (
    <article className="pb-28 pt-36 sm:pt-44">
      {/* Hero */}
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-6">
            <p className="mb-6 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
              Photography World · {String(category.order).padStart(2, '0')}
            </p>
            <h1 className="font-serif text-display-sm font-light leading-[0.92] tracking-tight3 text-bone">
              <TextReveal text={category.name} trigger="mount" />
            </h1>
          </div>
          <p className="max-w-md font-sans text-base leading-relaxed text-ash lg:col-span-5 lg:col-start-8">
            {category.description}
          </p>
        </div>
      </Container>

      <Container className="mt-14">
        <ImageReveal
          src={category.heroImage.src}
          alt={category.heroImage.alt}
          aspect="aspect-[16/9]"
          sizes="100vw"
          priority
        />
      </Container>

      {/* Projects */}
      <Container className="mt-20 sm:mt-28">
        <div className="mb-12 flex items-end justify-between border-b border-ink-500 pb-5">
          <span className="font-sans text-[11px] uppercase tracking-meta text-ash">Stories</span>
          <span className="font-sans text-[11px] uppercase tracking-meta text-ash-dim">
            {String(projects.length).padStart(2, '0')} {projects.length === 1 ? 'story' : 'stories'}
          </span>
        </div>

        {projects.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-serif text-3xl font-light text-ash">
              This world is being written.
            </p>
            <Link
              href="/work"
              data-cursor-interactive
              className="mt-6 inline-block font-sans text-[11px] uppercase tracking-meta text-champagne transition-colors hover:text-bone"
            >
              Explore all work →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:gap-y-20">
            {projects.map((project, i) => (
              <FadeUp key={project.slug} className={i % 3 === 0 ? 'sm:col-span-2' : ''}>
                <ProjectPreview
                  project={project}
                  categoryName={category.name}
                  aspect={i % 3 === 0 ? 'aspect-[3/2]' : 'aspect-[4/5]'}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </FadeUp>
            ))}
          </div>
        )}
      </Container>
    </article>
  );
}
