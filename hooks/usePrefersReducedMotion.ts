'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks the user's reduced-motion preference reactively.
 *
 * Starts `true` on the server/first paint so we never flash heavy motion before
 * we know the preference, then settles to the real value on mount. Every motion
 * system in the app (Lenis, cursor, parallax, reveals) gates on this.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return reduced;
}
