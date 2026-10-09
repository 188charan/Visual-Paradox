'use client';

import { useRef } from 'react';
import { gsap, useGSAP, EASE } from '@/components/animations';
import { usePrefersReducedMotion } from '@/hooks';

/**
 * The oversized footer wordmark, revealed from a mask and drifting slightly as
 * it enters — the quiet conclusion of the experience. Static under reduced
 * motion.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const inner = ref.current.querySelector('[data-wordmark-inner]');
      if (!inner) return;
      gsap.fromTo(
        inner,
        { yPercent: 40, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: EASE.out,
          scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
        },
      );
    },
    { scope: ref, dependencies: [reduced] },
  );

  return (
    <div ref={ref} className="overflow-hidden">
      <p
        data-wordmark-inner
        className="select-none bg-gradient-to-b from-bone/90 to-bone/30 bg-clip-text text-center font-sans text-[clamp(2.2rem,11vw,11rem)] font-semibold leading-none tracking-tight3 text-transparent"
      >
        THEVISUALPARADOX
      </p>
    </div>
  );
}
