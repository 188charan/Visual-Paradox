'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks whether the page has scrolled past a threshold. Used by the navbar to
 * transition from a transparent over-hero state to a subtly present state.
 * Deliberately lightweight (no GSAP) for Phase 1.
 */
export function useScrollState(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}
