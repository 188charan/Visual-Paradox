'use client';

import { useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { gsap, useGSAP, EASE } from '@/components/animations';
import { usePrefersReducedMotion } from '@/hooks';
import type { Category, Project } from '@/types';
import { ProjectPreview } from './ProjectPreview';
import { CategoryFilter } from './CategoryFilter';

interface WorkArchiveProps {
  projects: Project[];
  categories: Category[];
}

/**
 * Client archive: elegant filter + animated editorial grid. Changing the filter
 * re-reveals the matching projects with a staggered image reveal (via a
 * changing `key` + a keyed GSAP entrance) rather than snapping. Mixed column
 * spans keep it from reading like a card grid.
 */
export function WorkArchive({ projects, categories }: WorkArchiveProps) {
  const [active, setActive] = useState('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const nameFor = useMemo(
    () => (slug: string) => categories.find((c) => c.slug === slug)?.name ?? slug,
    [categories],
  );

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [active, projects],
  );

  useGSAP(
    () => {
      if (reduced || !gridRef.current) return;
      const items = gridRef.current.children;
      gsap.fromTo(
        items,
        { y: 32, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: EASE.out, stagger: 0.06 },
      );
    },
    { scope: gridRef, dependencies: [active, reduced] },
  );

  return (
    <div>
      <CategoryFilter categories={categories} active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <p className="py-24 text-center font-serif text-2xl font-light text-ash">
          No stories in this world yet.
        </p>
      ) : (
        <div
          ref={gridRef}
          key={active}
          className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:gap-y-20"
        >
          {filtered.map((project, i) => (
            <ProjectPreview
              key={project.slug}
              project={project}
              categoryName={nameFor(project.category)}
              aspect={i % 3 === 0 ? 'aspect-[3/2]' : 'aspect-[4/5]'}
              className={cn(i % 3 === 0 && 'sm:col-span-2')}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ))}
        </div>
      )}
    </div>
  );
}
