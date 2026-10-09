import type { Metadata } from 'next';
import { Container } from '@/components/ui';
import { ImageReveal, TextReveal, FadeUp } from '@/components/animations';
import { demoImageUrl } from '@/lib/data/images';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${siteConfig.name} — a photography studio in ${siteConfig.location.city}.`,
};

/**
 * /about — studio philosophy and story. Placeholder copy only; the CMS will
 * supply the real founder story, values, and portrait.
 */
export default function AboutPage() {
  const values = [
    { k: 'Approach', v: 'Photography first. The frame leads; everything else serves it.' },
    { k: 'Light', v: 'Natural where it sings, shaped where it must. Always intentional.' },
    { k: 'Pace', v: 'Unhurried. The best moments rarely arrive on a schedule.' },
  ];

  return (
    <article className="pb-28 pt-36 sm:pt-44">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-6 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
              About
            </p>
            <h1 className="font-serif text-display-sm font-light leading-[0.95] tracking-tight3 text-bone">
              <TextReveal text="A studio for" trigger="mount" />
              <TextReveal text="visual stories." trigger="mount" delay={0.1} />
            </h1>
          </div>
          <p className="font-sans text-base leading-relaxed text-ash lg:col-span-4 lg:col-start-9">
            {siteConfig.name} is a photography studio based in {siteConfig.location.area},{' '}
            {siteConfig.location.city}. This page is a placeholder — the full story and founder
            portrait will be editable through the CMS.
          </p>
        </div>
      </Container>

      <Container className="mt-16 sm:mt-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <FadeUp className="lg:col-span-5">
            <ImageReveal
              src={demoImageUrl('tvp-about-portrait', 'portrait')}
              alt="Founder portrait placeholder"
              aspect="aspect-[4/5]"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </FadeUp>
          <div className="flex flex-col justify-center gap-10 lg:col-span-6 lg:col-start-7">
            {values.map((item) => (
              <FadeUp key={item.k} className="border-b border-ink-500 pb-8">
                <p className="mb-3 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
                  {item.k}
                </p>
                <p className="font-serif text-xl font-light leading-relaxed text-bone sm:text-2xl">
                  {item.v}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </Container>
    </article>
  );
}
