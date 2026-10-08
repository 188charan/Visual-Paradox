import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

interface NavLinksProps {
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
}

/** Shared desktop nav link list. */
export function NavLinks({ className, itemClassName, onNavigate }: NavLinksProps) {
  return (
    <ul className={cn('flex items-center gap-8', className)}>
      {siteConfig.nav.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className={cn(
              'relative font-sans text-[11px] uppercase tracking-meta text-ash transition-colors duration-500 ease-cinema hover:text-bone',
              'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-all after:duration-500 hover:after:w-full',
              itemClassName,
            )}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
