import {
  Hero,
  IntroStatement,
  FeaturedWork,
  CategoryExplorer,
  Marquee,
  BookingCta,
} from '@/components/sections';

/**
 * Homepage flow:
 * Hero → Editorial statement → Featured work → Visual marquee →
 * Photography worlds (category explorer) → Booking CTA → Footer (in layout).
 *
 * Rhythm over quantity: a focused set of sections that each earn their place,
 * all reading from the data-driven ContentSource.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <FeaturedWork />
      <Marquee
        items={['Weddings', 'Portraits', 'Fashion', 'Stories', 'People', 'Brands', 'Moments']}
      />
      <CategoryExplorer />
      <BookingCta />
    </>
  );
}
