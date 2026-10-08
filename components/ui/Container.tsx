import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Wider gutter variant for hero/editorial moments. */
  bleed?: boolean;
}

/** Centered max-width shell with responsive gutters. */
export function Container({ children, className, as: Tag = 'div', bleed = false }: ContainerProps) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full max-w-shell',
        bleed ? 'px-5 sm:px-8 lg:px-12' : 'px-5 sm:px-8 lg:px-16',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
