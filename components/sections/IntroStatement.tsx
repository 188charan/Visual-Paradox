'use client';

import { useRef } from 'react';
import { Container } from '@/components/ui';
import { gsap, useGSAP, EASE } from '@/components/animations';
import { usePrefersReducedMotion } from '@/hooks';
import { siteConfig } from '@/lib/config';

/**
 * Editorial statement that reveals progressively on scroll. The muted opening
 * lines fade up first; the key phrase ("visual memories") brightens from ash to
 * bone as the section settles. Readable immediately under reduced motion.
 */
export function IntroStatement() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const lines = gsap.utils.toArray<HTMLElement>('[data-intro-line]');
      const key = root.current.querySelector('[data-intro-key]');

      gsap.from(lines, {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: EASE.out,
        stagger: 0.15,
        scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
      });
      if (key) {
        gsap.fromTo(
          key,
          { color: '#5A5A54' },
          {
            color: '#F4F1EA',
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 60%', end: 'top 25%', scrub: true },
          },
        );
      }
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} id="experience" className="relative bg-ink-900 py-32 sm:py-44">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2 className="max-w-4xl font-serif text-[clamp(2rem,6.5vw,5rem)] font-light leading-[1.03] tracking-tight2 text-balance">
            <span data-intro-line className="block text-ash">We don&apos;t just</span>
            <span data-intro-line className="block text-bone">take photographs.</span>
            <span data-intro-line className="mt-6 block text-ash">
              We create <span data-intro-key className="text-ash">visual memories</span> —
            </span>
            <span data-intro-line className="block text-bone">
              cinematic, considered, made to be lived in.
            </span>
          </h2>
          <p
            data-intro-line
            className="max-w-xs font-sans text-sm leading-relaxed text-ash"
          >
            A photography studio in {siteConfig.location.area}, {siteConfig.location.city}, working
            across people, moments, and brands.
          </p>
        </div>
      </Container>
    </section>
  );
}
