'use client';

import { cn } from '@/lib/utils';
import type { Category } from '@/types';

export interface FilterOption {
  label: string;
  value: string;
}

interface CategoryFilterProps {
  categories: Category[];
  active: string;
  onChange: (value: string) => void;
}

/**
 * Elegant inline filter — not a browser dropdown. A horizontally scrollable row
 * of uppercase labels with an animated underline on the active one.
 */
export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  const options: FilterOption[] = [
    { label: 'All', value: 'all' },
    ...categories.map((c) => ({ label: c.name, value: c.slug })),
  ];

  return (
    <div
      role="tablist"
      aria-label="Filter work by category"
      className="flex flex-wrap gap-x-6 gap-y-3 border-y border-ink-500 py-5"
    >
      {options.map((opt) => {
        const isActive = active === opt.value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={isActive}
            data-cursor-interactive
            onClick={() => onChange(opt.value)}
            className={cn(
              'relative font-sans text-[11px] uppercase tracking-meta transition-colors duration-300',
              'after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-champagne after:transition-all after:duration-500',
              isActive
                ? 'text-bone after:w-full'
                : 'text-ash after:w-0 hover:text-bone hover:after:w-full',
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
