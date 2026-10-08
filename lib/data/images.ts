import type { GalleryImage, ImageOrientation } from '@/types';

/**
 * Single source of truth for demo image URLs.
 *
 * We use picsum.photos with deterministic seeds so layouts are stable across
 * reloads and builds. When real photography arrives (Phase 5), only this file
 * changes: swap `demoImage` to build Sanity CDN URLs and the rest of the app is
 * untouched because every image flows through here.
 */

const DEMO_HOST = 'https://picsum.photos';

const DIMENSIONS: Record<ImageOrientation, { w: number; h: number }> = {
  landscape: { w: 1600, h: 1067 },
  portrait: { w: 1067, h: 1600 },
  square: { w: 1400, h: 1400 },
};

/**
 * Build a deterministic demo image URL.
 * @param seed stable identifier (project slug + index, etc.)
 * @param orientation controls aspect ratio
 */
export function demoImageUrl(seed: string, orientation: ImageOrientation = 'landscape'): string {
  const { w, h } = DIMENSIONS[orientation];
  const safeSeed = encodeURIComponent(seed);
  return `${DEMO_HOST}/seed/${safeSeed}/${w}/${h}`;
}

/** Convenience builder for a fully-formed demo GalleryImage. */
export function demoImage(
  seed: string,
  alt: string,
  orientation: ImageOrientation = 'landscape',
  extra?: Partial<Pick<GalleryImage, 'caption' | 'order'>>,
): GalleryImage {
  return {
    src: demoImageUrl(seed, orientation),
    alt,
    orientation,
    ...extra,
  };
}
