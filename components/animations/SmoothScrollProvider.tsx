'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { usePrefersReducedMotion } from '@/hooks';
import { gsap, ScrollTrigger } from './gsap';

/**
 * Premium smooth scrolling with Lenis, kept in lockstep with GSAP ScrollTrigger.
 *
 * - One shared RAF: Lenis is driven by gsap.ticker so there's no second loop.
 * - ScrollTrigger.update runs on every Lenis scroll event (no conflicting
 *   scroll systems).
 * - Disabled entirely under prefers-reduced-motion — native scrolling only.
 * - Mobile keeps native scroll feel (smoothTouch off).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Expose for in-page anchor handling below.
    });

    // Keep ScrollTrigger synced to Lenis' virtual scroll position.
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth in-page anchor navigation (keeps hrefs like /#experience working).
    const onAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('/#')) {
        const el = document.querySelector(href.slice(1));
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: 0 });
        }
      }
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  // On navigation, reset scroll to top and refresh triggers for the new page.
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  return <>{children}</>;
}
