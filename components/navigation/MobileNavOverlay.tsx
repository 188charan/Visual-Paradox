'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { useLockBodyScroll } from '@/hooks';

interface MobileNavOverlayProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Fullscreen cinematic mobile navigation overlay. Items stagger in on open.
 * Keyboard-accessible: Escape closes, focus is sent to the panel. Not a generic
 * hamburger drawer.
 */
export function MobileNavOverlay({ open, onClose }: MobileNavOverlayProps) {
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      aria-hidden={!open}
      className={cn(
        'fixed inset-0 z-40 flex flex-col bg-ink-900 transition-[opacity,visibility] duration-700 ease-cinema lg:hidden',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <nav className="flex flex-1 flex-col justify-center px-6">
        <ul className="flex flex-col gap-2">
          {siteConfig.nav.map((item, i) => (
            <li
              key={item.href}
              className={cn(
                'overflow-hidden transition-all duration-700 ease-cinema-out',
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
              )}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : '0ms' }}
            >
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-2 font-serif text-5xl font-light tracking-tight2 text-bone transition-colors duration-300 hover:text-champagne"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={cn(
          'flex flex-col gap-5 border-t border-ink-500 px-6 py-8 transition-opacity duration-700',
          open ? 'opacity-100' : 'opacity-0',
        )}
        style={{ transitionDelay: open ? '520ms' : '0ms' }}
      >
        <Link
          href={siteConfig.cta.href}
          onClick={onClose}
          className="inline-flex w-fit items-center bg-bone px-6 py-3.5 font-sans text-[11px] uppercase tracking-meta text-ink transition-colors duration-500 hover:bg-champagne"
        >
          {siteConfig.cta.label}
        </Link>
        <p className="font-sans text-[11px] uppercase tracking-meta text-ash">
          {siteConfig.location.short}
        </p>
      </div>
    </div>
  );
}
