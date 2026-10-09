'use client';

import { createElement, useRef, type ElementType, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { gsap, useGSAP } from './gsap';

interface ParallaxProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Total travel in px across the scroll range. Positive = moves up. */
  amount?: number;
}

/**
 * Scrubbed parallax: translates its content as the section passes through the
 * viewport. GPU-friendly (transform only). Disabled under reduced motion.
 */
export function Parallax({ children, as: Tag = 'div', className, amount = 80 }: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { yPercent: 0 },
        {
          y: -amount,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return createElement(Tag, { ref, className }, children);
}
