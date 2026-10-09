import { cn } from '@/lib/utils';

interface MarqueeProps {
  items: string[];
  className?: string;
  /** Seconds per full loop. Higher = slower. */
  speed?: number;
}

/**
 * Subtle editorial ticker. Pure CSS marquee (keyframes in globals.css), paused
 * under reduced motion. Decorative, so hidden from the accessibility tree.
 */
export function Marquee({ items, className, speed = 40 }: MarqueeProps) {
  const sequence = [...items, ...items];
  return (
    <div
      aria-hidden
      className={cn(
        'relative flex overflow-hidden border-y border-ink-500 bg-ink-800 py-6 sm:py-8',
        className,
      )}
    >
      <div
        className="flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 motion-reduce:animate-none"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-10">
            <span className="font-serif text-3xl font-light tracking-tight2 text-ash sm:text-5xl">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-champagne/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
