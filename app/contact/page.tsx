import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui';
import { TextReveal, FadeUp } from '@/components/animations';
import { BookingForm } from '@/components/contact';
import { content } from '@/lib/data';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Enquire and book a shoot with ${siteConfig.name}, ${siteConfig.location.city}.`,
  alternates: { canonical: '/contact' },
};

/**
 * /contact — the conversion page. Cinematic headline + a validated booking form
 * (data-driven photography types) + direct reach methods. All contact values
 * are config-driven placeholders — no fabricated business facts.
 */
export default async function ContactPage() {
  const categories = await content.getCategories();
  const photographyTypes = [...categories.map((c) => c.name), 'Other'];

  const methods = [
    { label: 'Email', value: siteConfig.contact.email, href: `mailto:${siteConfig.contact.email}` },
    { label: 'WhatsApp', value: 'Message the studio', href: siteConfig.contact.whatsappUrl },
    {
      label: 'Instagram',
      value: `@${siteConfig.social.instagramHandle}`,
      href: siteConfig.social.instagramUrl,
    },
  ];

  return (
    <article className="pb-28 pt-36 sm:pt-44">
      <Container>
        <p className="mb-8 font-sans text-[11px] uppercase tracking-meta text-champagne/70">
          Enquire · Book
        </p>
        <h1 className="font-serif text-[clamp(2.5rem,9vw,8rem)] font-light leading-[0.9] tracking-tight3 text-bone">
          <TextReveal text="Let's create" trigger="mount" className="block" />
          <TextReveal text="something" trigger="mount" delay={0.08} className="block" />
          <TextReveal
            text="worth remembering."
            trigger="mount"
            delay={0.16}
            className="block text-champagne/90"
          />
        </h1>

        <div className="mt-16 grid gap-16 lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
            <BookingForm photographyTypes={photographyTypes} />
          </div>

          {/* Direct reach */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9">
            <p className="font-sans text-[11px] uppercase tracking-meta text-ash">Or reach us directly</p>
            {methods.map((m) => (
              <FadeUp key={m.label}>
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-interactive
                  className="group flex items-center justify-between border-b border-ink-500 pb-5 transition-colors"
                >
                  <span>
                    <span className="block font-sans text-[11px] uppercase tracking-meta text-ash">
                      {m.label}
                    </span>
                    <span className="mt-1 block font-serif text-xl font-light text-bone transition-colors group-hover:text-champagne">
                      {m.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ash-dim transition-colors group-hover:text-champagne" />
                </a>
              </FadeUp>
            ))}
            <p className="mt-2 font-sans text-xs leading-relaxed text-ash-dim">
              {siteConfig.location.area}, {siteConfig.location.city}, {siteConfig.location.region},{' '}
              {siteConfig.location.country}
            </p>
          </div>
        </div>
      </Container>
    </article>
  );
}
