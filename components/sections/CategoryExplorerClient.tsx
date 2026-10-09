'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Container } from '@/components/ui';
import { ImageReveal, gsap, useGSAP } from '@/components/animations';
import { useIsTouch, usePrefersReducedMotion } from '@/hooks';
import type { Category } from '@/types';

/**
 * Interactive category index.
 *
 * Desktop: a single floating preview follows the pointer with smooth inertia
 * (gsap.quickTo — no React state per move). Hovering a row swaps which image is
 * visible and dims the other rows. Mobile: no hover, so each row reveals its
 * image inline as it scrolls into view.
 */
export function CategoryExplorerClient({ categories }: { categories: Category[] }) {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const pointerEnabled = !touch && !reduced;

  const listRef = useRef<HTMLUListElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!pointerEnabled) return;
      const follower = followerRef.current;
      const list = listRef.current;
      if (!follower || !list) return;

      gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0.9, autoAlpha: 0 });
      const xTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const onEnter = () => gsap.to(follower, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power3.out' });
      const onLeave = () => {
        gsap.to(follower, { autoAlpha: 0, scale: 0.9, duration: 0.4, ease: 'power3.out' });
        setActive(null);
      };

      window.addEventListener('mousemove', onMove);
      list.addEventListener('mouseenter', onEnter);
      list.addEventListener('mouseleave', onLeave);
      return () => {
        window.removeEventListener('mousemove', onMove);
        list.removeEventListener('mouseenter', onEnter);
        list.removeEventListener('mouseleave', onLeave);
      };
    },
    { dependencies: [pointerEnabled] },
  );

  return (
    <Container>
      <ul ref={listRef} className="border-t border-ink-500">
        {categories.map((category, i) => (
          <li key={category.slug} className="border-b border-ink-500">
            <Link
              href={`/work/${category.slug}`}
              data-cursor="explore"
              onMouseEnter={() => setActive(i)}
              className={cn(
                'group flex items-center justify-between gap-6 py-6 transition-opacity duration-500 sm:py-8',
                pointerEnabled && active !== null && active !== i ? 'opacity-35' : 'opacity-100',
              )}
            >
              <span className="flex items-baseline gap-5 sm:gap-8">
                <span className="font-sans text-[11px] tracking-meta text-ash-dim">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-serif text-4xl font-light tracking-tight2 text-bone transition-all duration-500 group-hover:translate-x-2 group-hover:text-champagne sm:text-6xl lg:text-7xl">
                  {category.name}
                </span>
              </span>

              {/* Mobile / touch: inline revealed thumbnail. */}
              {!pointerEnabled && (
                <span className="block w-24 shrink-0 sm:w-32">
                  <ImageReveal
                    src={category.hoverImage.src}
                    alt={category.hoverImage.alt}
                    aspect="aspect-[3/4]"
                    sizes="128px"
                  />
                </span>
              )}

              {/* Desktop: description hint. */}
              {pointerEnabled && (
                <span className="hidden max-w-xs text-right font-sans text-sm text-ash lg:block">
                  {category.description}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {/* Desktop floating follower. */}
      {pointerEnabled && (
        <div
          ref={followerRef}
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-30 h-[22rem] w-[16rem] will-change-transform"
          style={{ rotate: '-3deg' }}
        >
          {categories.map((category, i) => (
            <div
              key={category.slug}
              className={cn(
                'absolute inset-0 overflow-hidden transition-opacity duration-300',
                active === i ? 'opacity-100' : 'opacity-0',
              )}
            >
              <Image
                src={category.hoverImage.src}
                alt=""
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
