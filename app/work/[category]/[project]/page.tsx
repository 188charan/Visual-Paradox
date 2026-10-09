import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { content } from '@/lib/data';
import { Container } from '@/components/ui';
import { ImageReveal, TextReveal, FadeUp } from '@/components/animations';
import { ProjectGallery } from '@/components/gallery';
import { ProjectPreview } from '@/components/work';

interface ProjectPageProps {
  params: Promise<{ category: string; project: string }>;
}

/** Projects are fully known at build time; unknown paths 404 (see category page note). */
export const dynamicParams = false;

/** Pre-render every project route from the data layer. */
export async function generateStaticParams() {
  const projects = await content.getProjects();
  return projects.map((p) => ({ category: p.category, project: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { category, project: projectSlug } = await params;
  const project = await content.getProject(category, projectSlug);
  if (!project) return { title: 'Not found' };
  return {
    title: project.seoTitle ?? project.title,
    description: project.seoDescription ?? project.description,
    alternates: { canonical: `/work/${project.category}/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.seoDescription ?? project.description,
      images: project.coverImage.src ? [{ url: project.coverImage.src }] : undefined,
      type: 'article',
    },
  };
}

/**
 * /work/[category]/[project] — opens like a photography editorial: title block,
 * cinematic cover reveal, statement, editorial gallery (with the fullscreen
 * viewer), then previous / next / related work.
 */
export default async function ProjectPage({ params }: ProjectPageProps) {
  const { category: categorySlug, project: projectSlug } = await params;
  const project = await content.getProject(categorySlug, projectSlug);
  if (!project) notFound();

  const [category, categoryProjects] = await Promise.all([
    content.getCategory(categorySlug),
    content.getProjectsByCategory(categorySlug),
  ]);

  const index = categoryProjects.findIndex((p) => p.slug === project.slug);
  const prev = index > 0 ? categoryProjects[index - 1] : null;
  const next =
    index >= 0 && index < categoryProjects.length - 1 ? categoryProjects[index + 1] : null;
  const related = categoryProjects.filter((p) => p.slug !== project.slug).slice(0, 2);
  const categoryName = category?.name ?? project.category;

  return (
    <article className="pb-28 pt-36 sm:pt-44">
      {/* Title block */}
      <Container>
        <Link
          href={`/work/${project.category}`}
          data-cursor-interactive
          className="mb-10 inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-meta text-ash transition-colors hover:text-bone"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> {categoryName}
        </Link>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h1 className="font-serif text-[clamp(2.5rem,8vw,7rem)] font-light leading-[0.92] tracking-tight3 text-bone lg:col-span-8">
            <TextReveal text={project.title} trigger="mount" />
          </h1>
          <div className="flex flex-col gap-2 lg:col-span-3 lg:col-start-10">
            <span className="font-sans text-[11px] uppercase tracking-meta text-champagne/70">
              {categoryName}
            </span>
            <span className="font-sans text-[11px] uppercase tracking-meta text-ash">
              {project.location} · {project.year}
            </span>
          </div>
        </div>
      </Container>

      {/* Cover */}
      <Container className="mt-12">
        <ImageReveal
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          aspect="aspect-[16/9]"
          sizes="100vw"
          priority
        />
      </Container>

      {/* Statement */}
      <Container className="mt-16 sm:mt-24">
        <FadeUp>
          <p className="max-w-3xl font-serif text-2xl font-light leading-relaxed tracking-tight2 text-bone sm:text-3xl">
            {project.description}
          </p>
        </FadeUp>
        {project.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-ink-500 px-3 py-1.5 font-sans text-[10px] uppercase tracking-meta text-ash"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Container>

      {/* Gallery */}
      <Container className="mt-16 sm:mt-24">
        <ProjectGallery images={project.gallery} />
      </Container>

      {/* Prev / Next */}
      <Container className="mt-24 border-t border-ink-500 pt-10">
        <div className="flex items-center justify-between gap-6">
          {prev ? (
            <Link
              href={`/work/${prev.category}/${prev.slug}`}
              data-cursor="open"
              className="group flex flex-col gap-1"
            >
              <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-meta text-ash">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </span>
              <span className="font-serif text-xl font-light text-bone transition-colors group-hover:text-champagne sm:text-2xl">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.category}/${next.slug}`}
              data-cursor="open"
              className="group flex flex-col items-end gap-1 text-right"
            >
              <span className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-meta text-ash">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="font-serif text-xl font-light text-bone transition-colors group-hover:text-champagne sm:text-2xl">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>
      </Container>

      {/* Related */}
      {related.length > 0 && (
        <Container className="mt-24">
          <p className="mb-10 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
            Related work
          </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2">
            {related.map((rel) => (
              <ProjectPreview key={rel.slug} project={rel} categoryName={categoryName} />
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
