'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';
import { useScrollState } from '@/hooks';
import { Logo } from './Logo';
import { NavLinks } from './NavLinks';
import { MobileNavOverlay } from './MobileNavOverlay';

/**
 * Premium minimal navigation. Transparent over the hero, then gains a subtle
 * backdrop on scroll. Desktop: logo + links + BOOK A SHOOT. Mobile: a trigger
 * that opens the fullscreen overlay.
 */
export function Navbar() {
  const scrolled = useScrollState(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-cinema',
          scrolled || menuOpen
            ? 'border-b border-ink-500/70 bg-ink-900/80 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex h-16 max-w-shell items-center justify-between px-5 sm:h-20 sm:px-8 lg:px-16">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            <NavLinks />
            <Link
              href={siteConfig.cta.href}
              className="inline-flex items-center border border-ash-dim px-5 py-2.5 font-sans text-[10px] uppercase tracking-meta text-bone transition-colors duration-500 ease-cinema hover:border-bone hover:bg-bone hover:text-ink"
            >
              {siteConfig.cta.label}
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="flex items-center gap-3 lg:hidden"
          >
            <span className="font-sans text-[11px] uppercase tracking-meta text-bone">
              {menuOpen ? 'CLOSE' : 'MENU'}
            </span>
            <span className="relative flex h-3 w-6 flex-col justify-between">
              <span
                className={cn(
                  'h-px w-full bg-bone transition-transform duration-500 ease-cinema',
                  menuOpen && 'translate-y-[5.5px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'h-px w-full bg-bone transition-transform duration-500 ease-cinema',
                  menuOpen && '-translate-y-[5.5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </header>

      <MobileNavOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
