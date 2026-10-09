import type { Metadata } from 'next';
import { Container } from '@/components/ui';
import { ImageReveal, TextReveal, FadeUp } from '@/components/animations';
import { demoImageUrl } from '@/lib/data/images';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Studio',
  description: `Inside the ${siteConfig.name} studio in ${siteConfig.location.area}, ${siteConfig.location.city}.`,
  alternates: { canonical: '/studio' },
};

/**
 * /studio — the physical studio. Polished placeholder content (no fabricated
 * facts); real copy and photography drop in via the CMS later.
 */
export default function StudioPage() {
  const frames: Array<{ seed: string; label: string; aspect: string }> = [
    { seed: 'tvp-studio-space', label: 'The space', aspect: 'aspect-[16/10]' },
    { seed: 'tvp-studio-lighting', label: 'Lighting', aspect: 'aspect-[4/5]' },
    { seed: 'tvp-studio-backdrops', label: 'Backdrops', aspect: 'aspect-[4/5]' },
    { seed: 'tvp-studio-production', label: 'Production', aspect: 'aspect-[16/10]' },
  ];

  return (
    <article className="pb-28 pt-36 sm:pt-44">
      <Container>
        <p className="mb-6 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
          The Studio
        </p>
        <h1 className="max-w-4xl font-serif text-display-sm font-light leading-[0.95] tracking-tight3 text-bone">
          <TextReveal text="A room built for light." trigger="mount" />
        </h1>
        <p className="mt-8 max-w-xl font-sans text-base leading-relaxed text-ash">
          A controlled space in {siteConfig.location.area}, {siteConfig.location.city} — lighting,
          backdrops, and room to build a shoot slowly. Details and real photography are coming soon.
        </p>
      </Container>

      <Container className="mt-16 sm:mt-24">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-10">
          {frames.map((frame, i) => (
            <FadeUp key={frame.seed} className={i % 3 === 0 ? 'sm:col-span-2' : ''}>
              <figure>
                <ImageReveal
                  src={demoImageUrl(frame.seed, i % 3 === 0 ? 'landscape' : 'portrait')}
                  alt={`${frame.label} — studio placeholder`}
                  aspect={frame.aspect}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <figcaption className="mt-4 font-sans text-[11px] uppercase tracking-meta text-ash">
                  {frame.label}
                </figcaption>
              </figure>
            </FadeUp>
          ))}
        </div>
      </Container>
    </article>
  );
}
