'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { gsap, useGSAP, EASE } from '@/components/animations';
import { usePrefersReducedMotion } from '@/hooks';
import type { Project } from '@/types';

interface FeaturedItem {
  project: Project;
  categoryName: string;
}

/**
 * Scroll-driven editorial sequence of featured projects. Alternating asymmetric
 * layout (not a grid of cards). Each cover scales 0.86 -> 1 and its metadata
 * drifts as the block passes through the viewport. Hover lifts the image; the
 * cursor shows "OPEN". Mobile keeps a simpler stacked layout.
 */
export function FeaturedWorkClient({ items }: { items: FeaturedItem[] }) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const blocks = gsap.utils.toArray<HTMLElement>('[data-feat-block]');
      blocks.forEach((block) => {
        const img = block.querySelector('[data-feat-img]');
        const meta = block.querySelector('[data-feat-meta]');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 0.86 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: { trigger: block, start: 'top bottom', end: 'top center', scrub: true },
            },
          );
        }
        if (meta) {
          gsap.from(meta, {
            y: 40,
            autoAlpha: 0,
            duration: 0.9,
            ease: EASE.out,
            scrollTrigger: { trigger: block, start: 'top 80%', once: true },
          });
        }
      });
    },
    { scope: root, dependencies: [reduced, items.length] },
  );

  return (
    <div ref={root} className="flex flex-col">
      {items.map(({ project, categoryName }, i) => {
        const flip = i % 2 === 1;
        return (
          <Container key={project.slug} className="py-10 sm:py-16">
            <article
              data-feat-block
              className={cn(
                'grid items-center gap-8 lg:grid-cols-12 lg:gap-12',
              )}
            >
              {/* Image */}
              <Link
                href={`/work/${project.category}/${project.slug}`}
                data-cursor="open"
                className={cn(
                  'group relative block overflow-hidden lg:col-span-8',
                  flip ? 'lg:order-2 lg:col-start-5' : 'lg:order-1',
                )}
              >
                <div
                  data-feat-img
                  className="relative aspect-[16/10] w-full overflow-hidden will-change-transform"
                >
                  <div className="h-full w-full transition-transform duration-[1000ms] ease-cinema-out group-hover:scale-[1.04]">
                    <Image
                      src={project.coverImage.src}
                      alt={project.coverImage.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 66vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>

              {/* Metadata */}
              <div
                data-feat-meta
                className={cn(
                  'lg:col-span-4',
                  flip ? 'lg:order-1 lg:col-start-1' : 'lg:order-2',
                )}
              >
                <p className="mb-4 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
                  {String(i + 1).padStart(2, '0')} / {categoryName}
                </p>
                <Link href={`/work/${project.category}/${project.slug}`} data-cursor="open">
                  <h3 className="font-serif text-4xl font-light leading-[1.02] tracking-tight2 text-bone transition-colors duration-500 hover:text-champagne sm:text-6xl">
                    {project.title}
                  </h3>
                </Link>
                <p className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-ash">
                  {project.description}
                </p>
                <p className="mt-6 font-sans text-[11px] uppercase tracking-meta text-ash-dim">
                  {project.location} · {project.year}
                </p>
              </div>
            </article>
          </Container>
        );
      })}
    </div>
  );
}
