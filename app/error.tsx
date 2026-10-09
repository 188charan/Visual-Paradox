'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui';

/**
 * Branded route-level error boundary — matches the visual language rather than
 * a raw stack trace. Offers a recovery action.
 */
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[100svh] items-center bg-ink-900">
      <Container>
        <p className="mb-8 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
          Something slipped
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,9vw,8rem)] font-light leading-[0.9] tracking-tight3 text-bone">
          The light
          <br />
          flickered.
        </h1>
        <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-ash">
          An unexpected error interrupted this frame. Try again — it usually settles.
        </p>
        <button
          type="button"
          onClick={reset}
          data-cursor-interactive
          className="mt-10 inline-flex items-center bg-bone px-7 py-4 font-sans text-[11px] uppercase tracking-meta text-ink transition-colors duration-500 hover:bg-champagne"
        >
          Try again
        </button>
      </Container>
    </section>
  );
}
