import Link from 'next/link';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/lib/config';

interface LogoProps {
  className?: string;
  onClick?: () => void;
}

/** Wordmark logo. "THEVISUAL" in bone, "PARADOX" dimmed for a subtle split. */
export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${siteConfig.name} — home`}
      className={cn(
        'font-sans text-sm font-medium uppercase tracking-[0.18em] text-bone transition-opacity duration-500 hover:opacity-70',
        className,
      )}
    >
      THEVISUAL<span className="text-ash">PARADOX</span>
    </Link>
  );
}
