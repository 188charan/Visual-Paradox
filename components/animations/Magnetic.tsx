'use client';

import { useRef, type ReactNode } from 'react';
import { useIsTouch, usePrefersReducedMotion } from '@/hooks';
import { gsap, useGSAP } from './gsap';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** Max pull toward the pointer, in px. Kept small (4–12px feel). */
  strength?: number;
}

/**
 * Magnetic wrapper: the element drifts slightly toward the pointer while it
 * hovers nearby, then springs back on leave. Uses gsap.quickTo (no React state
 * per mouse move). Disabled on touch and reduced motion.
 */
export function Magnetic({ children, className, strength = 10 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const enabled = !touch && !reduced;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || !enabled) return;

      const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo((relX / (rect.width / 2)) * strength);
        yTo((relY / (rect.height / 2)) * strength);
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      return () => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      };
    },
    { scope: ref, dependencies: [enabled, strength] },
  );

  return (
    <div ref={ref} className={className} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
