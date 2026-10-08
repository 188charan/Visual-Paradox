/**
 * Sanity integration placeholder (Phase 5).
 *
 * Intentionally empty for now. When the CMS is wired up, this module will
 * export a configured client plus a `sanitySource: ContentSource`
 * implementation, which `lib/data/source.ts` will select when
 * NEXT_PUBLIC_CONTENT_SOURCE=sanity. No frontend component imports from here
 * directly — everything goes through the ContentSource interface.
 */

export {};
