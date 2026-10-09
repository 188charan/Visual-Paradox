'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { usePrefersReducedMotion } from '@/hooks';
import { gsap, useGSAP, EASE } from './gsap';

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  /** Aspect ratio utility class, e.g. 'aspect-[4/5]'. */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Reveal direction of the mask. */
  from?: 'bottom' | 'left';
}

/**
 * Luxury image reveal: the container is clipped shut, the image sits slightly
 * over-scaled, then the mask opens and the image settles to scale 1 as it
 * scrolls into view. No cheesy curtain — a single smooth clip + scale.
 */
export function ImageReveal({
  src,
  alt,
  className,
  aspect = 'aspect-[4/3]',
  sizes = '100vw',
  priority = false,
  from = 'bottom',
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const clip = ref.current?.querySelector('[data-reveal-clip]');
      const img = ref.current?.querySelector('[data-reveal-img]');
      if (!clip || !img) return;

      const closed =
        from === 'bottom' ? 'inset(100% 0% 0% 0%)' : 'inset(0% 100% 0% 0%)';

      gsap.set(clip, { clipPath: closed });
      gsap.set(img, { scale: 1.18 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: 'top 82%', once: true },
      });
      tl.to(clip, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: EASE.cinema });
      tl.to(img, { scale: 1, duration: 1.4, ease: EASE.out }, 0);
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className={cn('relative overflow-hidden', aspect, className)}>
      <div data-reveal-clip className="absolute inset-0 overflow-hidden">
        <div data-reveal-img className="relative h-full w-full will-change-transform">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
