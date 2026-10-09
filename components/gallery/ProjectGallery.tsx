'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ImageReveal } from '@/components/animations';
import type { GalleryImage, ImageOrientation } from '@/types';
import { Lightbox } from './Lightbox';

/**
 * Editorial gallery — mixed, asymmetric composition rather than a uniform grid.
 * Column spans follow a repeating rhythm (full-width, offset pairs, portrait
 * with whitespace) while aspect ratios respect each image's orientation.
 * Clicking any image opens the custom fullscreen Lightbox.
 */

interface Slot {
  /** Tailwind column-span + start classes on a 12-col grid (lg). */
  span: string;
  aspect?: string;
}

// Repeating editorial rhythm. The gallery breathes via offsets + whitespace.
const RHYTHM: Slot[] = [
  { span: 'lg:col-span-12' },
  { span: 'lg:col-span-6 lg:col-start-1' },
  { span: 'lg:col-span-5 lg:col-start-8' },
  { span: 'lg:col-span-7 lg:col-start-1' },
  { span: 'lg:col-span-4 lg:col-start-9' },
  { span: 'lg:col-span-8 lg:col-start-3' },
  { span: 'lg:col-span-5 lg:col-start-1' },
  { span: 'lg:col-span-6 lg:col-start-7' },
];

const aspectFor = (orientation?: ImageOrientation): string => {
  switch (orientation) {
    case 'portrait':
      return 'aspect-[4/5]';
    case 'square':
      return 'aspect-square';
    case 'landscape':
    default:
      return 'aspect-[3/2]';
  }
};

export function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-16">
        {images.map((image, i) => {
          const slot = RHYTHM[i % RHYTHM.length];
          return (
            <button
              key={`${image.src}-${i}`}
              type="button"
              onClick={() => setOpenIndex(i)}
              data-cursor="view"
              aria-label={`View image ${i + 1}: ${image.alt}`}
              className={cn('group block w-full text-left', slot.span)}
            >
              <div className="overflow-hidden">
                <div className="transition-transform duration-[900ms] ease-cinema-out group-hover:scale-[1.03]">
                  <ImageReveal
                    src={image.src}
                    alt={image.alt}
                    aspect={aspectFor(image.orientation)}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
