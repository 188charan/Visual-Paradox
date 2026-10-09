'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useIsTouch, usePrefersReducedMotion } from '@/hooks';
import { hasWebGL } from './webgl';
import { LensErrorBoundary } from './LensErrorBoundary';

/**
 * Guarded, code-split entry point for the hero 3D lens.
 *
 * Renders the Canvas ONLY when: mounted on the client, not a touch device, not
 * reduced-motion, and WebGL is available. Otherwise it renders nothing and the
 * hero photograph is the (already premium) experience — the required graceful
 * fallback. The heavy Three.js bundle is dynamically imported (ssr:false) so it
 * never blocks initial render or inflates the shared bundle.
 */
const LensScene = dynamic(() => import('./LensScene'), { ssr: false });

export function HeroLens() {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [supported, setSupported] = useState(false);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    setSupported(hasWebGL());
  }, []);

  const enabled = mounted && supported && !touch && !reduced;

  // Pause rendering when the hero scrolls out of view.
  useEffect(() => {
    if (!enabled || !wrapRef.current) return;
    const el = wrapRef.current;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.01,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  // Fade the canvas out across the hero without triggering React re-renders.
  useEffect(() => {
    if (!enabled) return;
    const el = wrapRef.current;
    const onScroll = () => {
      if (!el) return;
      const h = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / h));
      el.style.opacity = String(1 - p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[5] lg:left-[35%]"
    >
      <LensErrorBoundary>
        <LensScene active={visible} />
      </LensErrorBoundary>
    </div>
  );
}
