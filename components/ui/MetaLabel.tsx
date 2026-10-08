import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetaLabelProps {
  children: ReactNode;
  className?: string;
  /** Optional index marker, rendered as 01 / 02 etc. */
  index?: number;
}

/** Small uppercase, letter-spaced metadata label — a core atmosphere element. */
export function MetaLabel({ children, className, index }: MetaLabelProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-meta text-ash',
        className,
      )}
    >
      {typeof index === 'number' && (
        <span className="text-champagne/70">{String(index).padStart(2, '0')}</span>
      )}
      {children}
    </span>
  );
}
