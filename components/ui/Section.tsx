import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Vertical rhythm. Defaults to a generous editorial spacing. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
}

const spacingMap: Record<NonNullable<SectionProps['spacing']>, string> = {
  none: '',
  sm: 'py-16 sm:py-20',
  md: 'py-24 sm:py-32',
  lg: 'py-32 sm:py-44',
};

export function Section({ children, className, id, spacing = 'md' }: SectionProps) {
  return (
    <section id={id} className={cn('relative', spacingMap[spacing], className)}>
      {children}
    </section>
  );
}
