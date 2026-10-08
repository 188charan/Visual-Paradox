import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { MetaLabel } from './MetaLabel';

interface SectionHeadingProps {
  /** Small uppercase eyebrow metadata. */
  eyebrow?: ReactNode;
  index?: number;
  title: ReactNode;
  /** Supporting line under the title. */
  lead?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

/** Editorial section heading: eyebrow + large serif title + optional lead. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'flex flex-col gap-5',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <MetaLabel index={index}>{eyebrow}</MetaLabel>
      )}
      <h2 className="font-serif text-display-sm font-light text-bone">{title}</h2>
      {lead && <p className="max-w-xl font-sans text-base leading-relaxed text-ash">{lead}</p>}
    </header>
  );
}
