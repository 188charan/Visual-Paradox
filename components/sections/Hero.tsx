import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';
import { ButtonLink } from '@/components/ui';
import { siteConfig } from '@/lib/config';
import { demoImageUrl } from '@/lib/data';

/**
 * Hero shell (Phase 1).
 *
 * Full-viewport cinematic photograph with the brand name integrated as large
 * editorial typography (THE / VISUAL / PARADOX). Static and premium for now —
 * the scroll-driven motion (Phase 3) and the 3D optical element (Phase 4) will
 * attach at the marked mount points below without restructuring this layout.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-900">
      {/* Cinematic background photograph */}
      <div className="absolute inset-0">
        <Image
          src={demoImageUrl('tvp-hero-cinematic', 'landscape')}
          alt="A cinematic photograph by TheVisualParadox"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Legibility + mood grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-ink-900/70" />
        <div className="absolute inset-0 bg-ink-900/20" />
      </div>

      {/*
        PHASE 4 MOUNT POINT — 3D optical / lens element will mount here as an
        absolutely-positioned, dynamically-imported client component with a 2D
        fallback. Kept empty in Phase 1.
      */}

      {/*
        PHASE 3 MOUNT POINT — scroll-driven parallax + typography reveal will
        wrap the content block below. The DOM structure here is intentionally
        stable so GSAP/ScrollTrigger can target it without markup changes.
      */}
      <div className="relative z-10 mx-auto w-full max-w-shell px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-16">
        {/* Top metadata row */}
        <div className="mb-auto flex items-start justify-between pb-16">
          <p className="max-w-xs font-sans text-[11px] uppercase leading-relaxed tracking-meta text-bone/70">
            {siteConfig.tagline}
          </p>
          <p className="hidden font-sans text-[11px] uppercase tracking-meta text-bone/70 sm:block">
            {siteConfig.location.short}
          </p>
        </div>

        {/* Display wordmark */}
        <h1 className="font-serif font-light leading-[0.82] tracking-tight3 text-bone">
          <span className="block text-display">THE</span>
          <span className="block text-display">VISUAL</span>
          <span className="block text-display text-champagne/90">PARADOX</span>
        </h1>

        {/* CTA row */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <ButtonLink href="/work" variant="solid" size="md">
              Explore the work
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="md">
              Book a shoot
            </ButtonLink>
          </div>
          <span className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-meta text-bone/60">
            Scroll to enter the studio
            <ArrowDownRight className="h-4 w-4 text-champagne" />
          </span>
        </div>
      </div>
    </section>
  );
}
