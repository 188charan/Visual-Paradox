'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsTouch, usePrefersReducedMotion } from '@/hooks';
import { gsap, useGSAP } from '@/components/animations';

type CursorMode = 'default' | 'label' | 'interactive';

/**
 * Refined custom cursor (desktop only).
 *
 * - Position is driven entirely by gsap.quickTo on refs — no React state per
 *   frame, so no re-renders while moving.
 * - Mode/label change only on enter/leave of elements carrying a `data-cursor`
 *   attribute: `data-cursor="view|explore|open"` shows a word, `data-cursor-interactive`
 *   expands the dot.
 * - Hidden entirely on touch devices and under reduced motion, so it never
 *   interferes with keyboard or touch users.
 */
export function CustomCursor() {
  const touch = useIsTouch();
  const reduced = usePrefersReducedMotion();
  const enabled = !touch && !reduced;

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>('default');
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useGSAP(
    () => {
      if (!enabled) return;

      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      const dotX = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3.out' });
      const dotY = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3.out' });
      const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3.out' });
      const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3.out' });

      const onMove = (e: MouseEvent) => {
        setVisible(true);
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };

      const resolve = (el: Element | null): { mode: CursorMode; label: string } => {
        const labelled = el?.closest<HTMLElement>('[data-cursor]');
        if (labelled) {
          return { mode: 'label', label: labelled.dataset.cursor ?? '' };
        }
        const interactive = el?.closest('a, button, [data-cursor-interactive]');
        if (interactive) return { mode: 'interactive', label: '' };
        return { mode: 'default', label: '' };
      };

      const onOver = (e: MouseEvent) => {
        const next = resolve(e.target as Element);
        setMode(next.mode);
        setLabel(next.label.toUpperCase());
      };

      const onLeaveWindow = () => setVisible(false);

      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseover', onOver);
      document.documentElement.addEventListener('mouseleave', onLeaveWindow);
      return () => {
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseover', onOver);
        document.documentElement.removeEventListener('mouseleave', onLeaveWindow);
      };
    },
    { dependencies: [enabled] },
  );

  if (!enabled) return null;

  const isLabel = mode === 'label' && label.length > 0;

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 z-[100] hidden lg:block',
        visible ? 'opacity-100' : 'opacity-0',
      )}
      style={{ transition: 'opacity 300ms ease' }}
    >
      {/* Small dot */}
      <div
        ref={dotRef}
        className={cn(
          'fixed left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone transition-[width,height,opacity] duration-300',
          isLabel ? 'h-0 w-0 opacity-0' : 'h-1.5 w-1.5 opacity-100',
        )}
      />
      {/* Expanding ring / label capsule */}
      <div
        ref={ringRef}
        className={cn(
          'fixed left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-out',
          isLabel
            ? 'h-20 w-20 bg-champagne text-ink'
            : mode === 'interactive'
              ? 'h-10 w-10 border border-bone/60 bg-transparent'
              : 'h-8 w-8 border border-bone/25 bg-transparent',
        )}
      >
        {isLabel && (
          <span className="font-sans text-[10px] uppercase tracking-meta">{label}</span>
        )}
      </div>
    </div>
  );
}
