'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ArrowDownRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui';
import { Magnetic, gsap, useGSAP, EASE } from '@/components/animations';
import { usePrefersReducedMotion } from '@/hooks';
import { siteConfig } from '@/lib/config';
import { demoImageUrl } from '@/lib/data';

const WORDS = ['THE', 'VISUAL', 'PARADOX'] as const;

/**
 * Cinematic hero.
 *
 * On load: the photograph settles from a slight zoom, the three words rise out
 * of their masks in sequence, and the metadata + CTAs follow. On scroll the
 * whole section behaves like a transition — the image scales and drifts, the
 * words move at different speeds (depth), and the content compresses away as
 * the visitor moves "into" the studio's world. All gated on reduced motion.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      const scope = root.current;
      if (!scope) return;

      const image = scope.querySelector('[data-hero-img]');
      const words = gsap.utils.toArray<HTMLElement>('[data-hero-word-inner]');
      const meta = scope.querySelectorAll('[data-hero-fade]');
      const content = scope.querySelector('[data-hero-content]');

      if (reduced) {
        gsap.set([image, words, meta], { clearProps: 'all' });
        return;
      }

      // --- Entrance ---
      const tl = gsap.timeline({ defaults: { ease: EASE.out } });
      tl.fromTo(image, { scale: 1.18 }, { scale: 1, duration: 1.8, ease: EASE.cinema });
      tl.fromTo(
        words,
        { yPercent: 115 },
        { yPercent: 0, duration: 1.1, stagger: 0.12 },
        0.25,
      );
      tl.fromTo(meta, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12 }, 0.9);

      // --- Scroll transition ---
      // immediateRender:false so these don't fight the entrance timeline before
      // any scroll happens.
      const st = { trigger: scope, start: 'top top', end: 'bottom top', scrub: true };
      gsap.fromTo(
        image,
        { scale: 1, yPercent: 0 },
        { scale: 1.25, yPercent: 12, ease: 'none', immediateRender: false, scrollTrigger: st },
      );
      gsap.fromTo(
        content,
        { yPercent: 0, autoAlpha: 1 },
        { yPercent: -18, autoAlpha: 0, ease: 'none', immediateRender: false, scrollTrigger: st },
      );
      // Each word drifts a little differently for layered depth.
      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { yPercent: 0 },
          {
            yPercent: -40 - i * 22,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: st,
          },
        );
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-900"
    >
      {/* Cinematic background photograph */}
      <div className="absolute inset-0">
        <div data-hero-img className="relative h-full w-full will-change-transform">
          <Image
            src={demoImageUrl('tvp-hero-cinematic', 'landscape')}
            alt="A cinematic photograph by TheVisualParadox"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/70" />
        <div className="absolute inset-0 bg-ink-900/20" />
      </div>

      {/* PHASE 4 MOUNT POINT — 3D optical/lens element mounts here later. */}

      <div
        data-hero-content
        className="relative z-10 mx-auto w-full max-w-shell px-5 pb-14 pt-28 will-change-transform sm:px-8 sm:pb-20 lg:px-16"
      >
        <div className="mb-auto flex items-start justify-between pb-16">
          <p data-hero-fade className="max-w-xs font-sans text-[11px] uppercase leading-relaxed tracking-meta text-bone/70">
            {siteConfig.tagline}
          </p>
          <p data-hero-fade className="hidden font-sans text-[11px] uppercase tracking-meta text-bone/70 sm:block">
            {siteConfig.location.short}
          </p>
        </div>

        <h1 className="font-serif font-light leading-[0.82] tracking-tight3 text-bone">
          {WORDS.map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <span
                data-hero-word-inner
                className={`block text-display will-change-transform ${i === 2 ? 'text-champagne/90' : ''}`}
              >
                {word}
              </span>
            </span>
          ))}
        </h1>

        <div data-hero-fade className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <Magnetic>
              <ButtonLink href="/work" variant="solid" size="md" data-cursor-interactive>
                Explore the work
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink href="/contact" variant="outline" size="md" data-cursor-interactive>
                Book a shoot
              </ButtonLink>
            </Magnetic>
          </div>
          <span className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-meta text-bone/60">
            Scroll to enter the studio
            <ArrowDownRight className="h-4 w-4 animate-pulse text-champagne" />
          </span>
        </div>
      </div>
    </section>
  );
}
