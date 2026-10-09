import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ImageReveal } from '@/components/animations';
import type { Project } from '@/types';

interface ProjectPreviewProps {
  project: Project;
  categoryName?: string;
  className?: string;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Hide the metadata block (used where context already shows it). */
  minimalMeta?: boolean;
}

/**
 * Editorial project preview — image + title + small metadata, no card chrome.
 * The image lifts and scales subtly on hover; the custom cursor shows "OPEN".
 * Links to the project detail route.
 */
export function ProjectPreview({
  project,
  categoryName,
  className,
  aspect = 'aspect-[4/5]',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  minimalMeta = false,
}: ProjectPreviewProps) {
  return (
    <Link
      href={`/work/${project.category}/${project.slug}`}
      data-cursor="open"
      className={cn('group block', className)}
    >
      <div className="overflow-hidden">
        <div className="transition-transform duration-[900ms] ease-cinema-out group-hover:scale-[1.03]">
          <ImageReveal
            src={project.coverImage.src}
            alt={project.coverImage.alt}
            aspect={aspect}
            sizes={sizes}
            priority={priority}
          />
        </div>
      </div>

      {!minimalMeta && (
        <div className="mt-5 flex items-baseline justify-between gap-6">
          <div className="flex flex-col gap-1.5">
            <h3 className="font-serif text-2xl font-light tracking-tight2 text-bone transition-colors duration-500 group-hover:text-champagne sm:text-3xl">
              {project.title}
            </h3>
            <p className="font-sans text-[11px] uppercase tracking-meta text-ash">
              {categoryName ?? project.category} · {project.location}
            </p>
          </div>
          <span className="shrink-0 font-sans text-[11px] uppercase tracking-meta text-ash-dim">
            {project.year}
          </span>
        </div>
      )}
    </Link>
  );
}
