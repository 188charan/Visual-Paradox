import Link from 'next/link';
import { Instagram, MessageCircle, Mail } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { FooterWordmark } from './FooterWordmark';

/**
 * Footer — the end of the visual journey. Large wordmark, location, social and
 * contact links (all placeholder-driven via siteConfig), navigation, copyright.
 */
export function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      label: `Instagram · @${siteConfig.social.instagramHandle}`,
      href: siteConfig.social.instagramUrl,
      icon: Instagram,
      external: true,
    },
    {
      label: 'WhatsApp',
      href: siteConfig.contact.whatsappUrl,
      icon: MessageCircle,
      external: true,
    },
    {
      label: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
      icon: Mail,
      external: false,
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-ink-500 bg-ink-900">
      <div className="mx-auto max-w-shell px-5 pb-10 pt-20 sm:px-8 sm:pt-28 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand block */}
          <div className="flex flex-col gap-5">
            <p className="font-sans text-[11px] uppercase tracking-meta text-ash">Photography Studio</p>
            <p className="font-sans text-sm leading-relaxed text-ash">
              {siteConfig.location.area}, {siteConfig.location.city}
              <br />
              {siteConfig.location.region}, {siteConfig.location.country}
            </p>
          </div>

          {/* Reach */}
          <nav aria-label="Social and contact" className="flex flex-col gap-4">
            <p className="font-sans text-[11px] uppercase tracking-meta text-champagne/70">Reach</p>
            <ul className="flex flex-col gap-3">
              {socialLinks.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <Link
                    href={href}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex items-center gap-3 font-sans text-sm text-ash transition-colors duration-500 hover:text-bone"
                  >
                    <Icon className="h-4 w-4 text-ash-dim transition-colors duration-500 group-hover:text-champagne" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="flex flex-col gap-4">
            <p className="font-sans text-[11px] uppercase tracking-meta text-champagne/70">Index</p>
            <ul className="flex flex-col gap-3">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-ash transition-colors duration-500 hover:text-bone"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Oversized wordmark */}
        <div className="mt-20 border-t border-ink-500 pt-10">
          <FooterWordmark />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="font-sans text-[11px] uppercase tracking-meta text-ash-dim">
            © {year} {siteConfig.name}
          </p>
          <p className="font-sans text-[11px] uppercase tracking-meta text-ash-dim">
            Crafted in {siteConfig.location.city}
          </p>
        </div>
      </div>
    </footer>
  );
}
