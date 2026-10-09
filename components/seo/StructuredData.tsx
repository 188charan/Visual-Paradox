import { siteConfig } from '@/lib/config';
import { demoImageUrl } from '@/lib/data/images';

/**
 * LocalBusiness / photography-studio JSON-LD for the organisation. Only facts
 * we actually know are included (name, location, URL, Instagram). No phone,
 * rating, hours, or other fabricated data — those can be added once real.
 */
export function StructuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    additionalType: 'https://schema.org/PhotographicStudio',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    image: demoImageUrl('tvp-hero-cinematic', 'landscape'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: `${siteConfig.location.area}, ${siteConfig.location.city}`,
      addressRegion: siteConfig.location.region,
      addressCountry: 'IN',
    },
    areaServed: siteConfig.location.city,
    sameAs: [siteConfig.social.instagramUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
