/**
 * Minimal className combiner. Intentionally dependency-free for Phase 1 — we
 * avoid pulling in clsx/tailwind-merge until the design system genuinely needs
 * conflict resolution.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
