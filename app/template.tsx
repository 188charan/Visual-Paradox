'use client';

import { useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks';
import { gsap, useGSAP, EASE } from '@/components/animations';

/**
 * Page transition.
 *
 * `template.tsx` re-mounts on every navigation, so this plays an "enter"
 * animation each time: a brief dark overlay wipe lifts away while the new
 * content fades/clips in. Premium rhythm (~0.7s), never a long wait. Under
 * reduced motion it renders instantly with no overlay.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(overlay.current, { autoAlpha: 0 });
        gsap.set(wrap.current, { autoAlpha: 1 });
        return;
      }
      const tl = gsap.timeline();
      tl.set(overlay.current, { scaleY: 1, transformOrigin: 'top', autoAlpha: 1 });
      tl.set(wrap.current, { autoAlpha: 0, y: 18 });
      tl.to(overlay.current, {
        scaleY: 0,
        transformOrigin: 'bottom',
        duration: 0.6,
        ease: EASE.cinema,
      });
      tl.to(
        wrap.current,
        { autoAlpha: 1, y: 0, duration: 0.7, ease: EASE.out },
        '-=0.35',
      );
    },
    { dependencies: [reduced] },
  );

  return (
    <>
      <div
        ref={overlay}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[90] bg-ink-900"
        style={{ opacity: 0 }}
      />
      <div ref={wrap}>{children}</div>
    </>
  );
}
