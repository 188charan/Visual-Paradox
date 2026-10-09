'use client';

import { useRef, type ElementType } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { gsap, useGSAP, EASE } from './gsap';

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Delay before the reveal starts (seconds). */
  delay?: number;
  /** Reveal on scroll into view (default) or immediately on mount. */
  trigger?: 'scroll' | 'mount';
}

/**
 * Word-by-word masked reveal. Each word rises out of an overflow-hidden mask
 * (translateY 100% -> 0) with a stagger. Readable fallback: when reduced-motion
 * is on, the text simply renders in place.
 */
export function TextReveal({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  trigger = 'scroll',
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const words = text.split(' ');

  useGSAP(
    () => {
      if (reduced) return;
      const targets = ref.current?.querySelectorAll('[data-word-inner]');
      if (!targets || targets.length === 0) return;

      gsap.set(targets, { yPercent: 110 });
      gsap.to(targets, {
        yPercent: 0,
        duration: 0.9,
        ease: EASE.out,
        stagger: 0.07,
        delay,
        ...(trigger === 'scroll'
          ? {
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 85%',
                once: true,
              },
            }
          : {}),
      });
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          aria-hidden={reduced ? undefined : true}
        >
          <span data-word-inner className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
      {/* Accessible, unanimated copy for screen readers / reduced motion. */}
      {!reduced && <span className="sr-only">{text}</span>}
    </Tag>
  );
}
