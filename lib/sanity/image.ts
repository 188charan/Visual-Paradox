import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url';
import type { GalleryImage, ImageOrientation } from '@/types';
import { client } from './client';

const builder = client ? imageUrlBuilder(client) : null;

/** Shape of an image field as returned by our GROQ projections. */
export interface SanityImageField {
  asset?: { _ref?: string; _id?: string };
  alt?: string;
  caption?: string;
  orientation?: ImageOrientation;
  order?: number;
}

/**
 * Build an optimized Sanity CDN URL. We request a sensible max width with
 * auto format (AVIF/WebP where supported) and let next/image downscale from
 * there — using the Sanity pipeline rather than hardcoding transforms.
 */
export function urlFor(source: SanityImageSource, width = 1600, quality = 75): string {
  if (!builder) return '';
  return builder.image(source).width(width).quality(quality).auto('format').fit('max').url();
}

/** Map a Sanity image field to the app's GalleryImage shape. */
export function toGalleryImage(
  field: SanityImageField | undefined,
  fallbackAlt: string,
  width = 1600,
): GalleryImage {
  if (!field?.asset) {
    return { src: '', alt: fallbackAlt };
  }
  return {
    src: urlFor(field as SanityImageSource, width),
    alt: field.alt ?? fallbackAlt,
    caption: field.caption,
    orientation: field.orientation,
    order: field.order,
  };
}
