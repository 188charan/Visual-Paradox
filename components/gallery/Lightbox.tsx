'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLockBodyScroll } from '@/hooks';
import type { GalleryImage } from '@/types';

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

/**
 * Custom fullscreen image viewer. Keyboard (←/→/Esc), on-screen controls, a
 * NN / NN counter, and touch swipe. Cinematic fade rather than a browser-style
 * modal. Focus is trapped lightly: the panel takes focus and Escape closes.
 */
export function Lightbox({ images, index, onClose, onNavigate }: LightboxProps) {
  const open = index !== null;
  const touchStartX = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openedFrom = useRef<HTMLElement | null>(null);

  useLockBodyScroll(open);

  // Capture the triggering element on open; restore focus to it on close.
  useEffect(() => {
    if (open) {
      openedFrom.current = (document.activeElement as HTMLElement) ?? null;
      // Focus the dialog on the next frame so it's mounted/visible.
      requestAnimationFrame(() => panelRef.current?.focus());
    } else if (openedFrom.current) {
      openedFrom.current.focus();
      openedFrom.current = null;
    }
  }, [open]);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      const next = (index + dir + images.length) % images.length;
      onNavigate(next);
    },
    [index, images.length, onNavigate],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
      // Trap focus inside the dialog while open.
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const activeEl = document.activeElement;
        if (e.shiftKey && activeEl === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, go]);

  const current = index !== null ? images[index] : null;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      tabIndex={-1}
      className={cn(
        'fixed inset-0 z-[120] flex flex-col bg-ink-900/97 outline-none transition-opacity duration-500',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchStartX.current = null;
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <span className="font-sans text-[11px] uppercase tracking-meta text-ash">
          {index !== null ? String(index + 1).padStart(2, '0') : '00'} /{' '}
          {String(images.length).padStart(2, '0')}
        </span>
        <button
          type="button"
          onClick={onClose}
          data-cursor-interactive
          aria-label="Close viewer"
          className="flex items-center gap-2 font-sans text-[11px] uppercase tracking-meta text-bone transition-colors hover:text-champagne"
        >
          Close <X className="h-4 w-4" />
        </button>
      </div>

      {/* Image stage */}
      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        {current && (
          <div className="relative h-full w-full">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              data-cursor-interactive
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-bone/70 transition-colors hover:text-bone sm:left-5"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              data-cursor-interactive
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center text-bone/70 transition-colors hover:text-bone sm:right-5"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </>
        )}
      </div>

      {/* Caption */}
      {current?.caption && (
        <div className="px-5 pb-6 text-center sm:px-8">
          <p className="font-sans text-xs text-ash">{current.caption}</p>
        </div>
      )}
    </div>
  );
}
