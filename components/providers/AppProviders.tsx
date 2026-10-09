'use client';

import { SmoothScrollProvider } from '@/components/animations';
import { CustomCursor } from '@/components/cursor';

/**
 * Client-side experience providers mounted once in the root layout:
 * - Lenis smooth scroll (synced to ScrollTrigger)
 * - Custom cursor
 * Both self-disable on touch / reduced motion.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CustomCursor />
      {children}
    </SmoothScrollProvider>
  );
}
