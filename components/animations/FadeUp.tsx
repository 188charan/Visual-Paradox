'use client';

import { createElement, useRef, type ElementType, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { gsap, useGSAP, EASE } from './gsap';

interface FadeUpProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Pixel distance to travel. Kept small and tasteful. */
  y?: number;
  /** Stagger direct children instead of the element itself. */
  stagger?: boolean;
}

/**
 * Subtle entrance: a short translateY + opacity on scroll into view. The
 * restrained default (not a big fade on everything). Optionally staggers direct
 * children for lists.
 */
export function FadeUp({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 24,
  stagger = false,
}: FadeUpProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const targets = stagger ? ref.current?.children : ref.current;
      if (!targets) return;

      gsap.from(targets, {
        y,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.out,
        delay,
        stagger: stagger ? 0.1 : 0,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  // createElement avoids polymorphic JSX children inference (which collapses to
  // `never` once react-three-fiber augments the global JSX namespace).
  return createElement(Tag, { ref, className }, children);
}
