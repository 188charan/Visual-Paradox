'use client';

import { useEffect, useState } from 'react';

/**
 * Detects coarse-pointer / no-hover (touch) devices. Used to disable the custom
 * cursor, magnetic buttons, and pointer-follow interactions that make no sense
 * without a hovering pointer.
 *
 * Starts `true` so touch-first behaviour renders before hydration resolves.
 */
export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse)');
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return touch;
}
