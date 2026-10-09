import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Navbar } from '@/components/navigation';
import { Footer } from '@/components/sections';
import { AppProviders } from '@/components/providers';
import { StructuredData } from '@/components/seo/StructuredData';
import { siteConfig } from '@/lib/config';
import './globals.css';

/** Editorial serif for display typography. */
const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-serif',
  display: 'swap',
});

/** Modern sans for UI, body, and metadata. */
const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Photography Studio, ${siteConfig.location.city}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: '/' },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        {/* Skip link for keyboard users. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-bone focus:px-4 focus:py-2 focus:font-sans focus:text-[11px] focus:uppercase focus:tracking-meta focus:text-ink"
        >
          Skip to content
        </a>
        <StructuredData />
        <AppProviders>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </AppProviders>
        <Analytics />
      </body>
    </html>
  );
}
