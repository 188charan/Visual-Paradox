import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { ButtonLink } from '@/components/ui';
import { Magnetic, TextReveal } from '@/components/animations';
import { siteConfig } from '@/lib/config';

/**
 * Closing booking CTA — the conversion moment before the footer. Large reveal
 * headline and the primary enquiry action.
 */
export function BookingCta() {
  return (
    <section className="relative border-t border-ink-500 bg-ink-900 py-28 sm:py-40">
      <Container>
        <div className="flex flex-col items-start gap-12">
          <p className="font-sans text-[11px] uppercase tracking-meta text-champagne/70">
            Let&apos;s begin
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,9vw,8rem)] font-light leading-[0.92] tracking-tight3 text-bone">
            <TextReveal text="Let's create" as="span" className="block" />
            <TextReveal text="something" as="span" className="block" />
            <TextReveal text="worth remembering." as="span" className="block text-champagne/90" />
          </h2>

          <div className="flex flex-wrap items-center gap-6">
            <Magnetic>
              <ButtonLink href="/contact" variant="solid" size="md" data-cursor-interactive>
                Book a shoot
                <ArrowUpRight className="h-4 w-4" />
              </ButtonLink>
            </Magnetic>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              data-cursor-interactive
              className="font-sans text-[11px] uppercase tracking-meta text-ash transition-colors duration-500 hover:text-bone"
            >
              {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
