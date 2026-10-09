import Link from 'next/link';
import { Container } from '@/components/ui';

/**
 * Cinematic 404 — part of the brand, not a browser error.
 */
export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center bg-ink-900">
      <Container>
        <p className="mb-8 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
          404 · Lost frame
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,10vw,9rem)] font-light leading-[0.9] tracking-tight3 text-bone">
          The frame
          <br />
          doesn&apos;t exist.
        </h1>
        <p className="mt-8 max-w-md font-sans text-base leading-relaxed text-ash">
          This image was never developed — or it has moved. Return to the visual archive.
        </p>
        <Link
          href="/"
          data-cursor-interactive
          className="mt-10 inline-flex items-center bg-bone px-7 py-4 font-sans text-[11px] uppercase tracking-meta text-ink transition-colors duration-500 hover:bg-champagne"
        >
          Back home
        </Link>
      </Container>
    </section>
  );
}
