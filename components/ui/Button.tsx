import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'outline' | 'ghost';
type Size = 'sm' | 'md';

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const base =
  'group relative inline-flex items-center justify-center gap-2 font-sans uppercase tracking-meta transition-colors duration-500 ease-cinema focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-champagne focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:cursor-not-allowed disabled:opacity-50';

const sizes: Record<Size, string> = {
  sm: 'text-[10px] px-5 py-3',
  md: 'text-[11px] px-7 py-4',
};

const variants: Record<Variant, string> = {
  // Restrained warm fill — intentionally not a generic blue CTA.
  solid: 'bg-bone text-ink hover:bg-champagne',
  outline: 'border border-ash-dim text-bone hover:border-bone',
  ghost: 'text-ash hover:text-bone',
};

function classes(variant: Variant, size: Size, className?: string) {
  return cn(base, sizes[size], variants[variant], className);
}

/** Anchor-style button (renders a Next.js Link). */
export function ButtonLink({
  children,
  href,
  variant = 'solid',
  size = 'md',
  className,
  ...rest
}: BaseProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'className'>) {
  return (
    <Link href={href} className={classes(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

/** Native button element. */
export function Button({
  children,
  variant = 'solid',
  size = 'md',
  className,
  ...rest
}: BaseProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={classes(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
