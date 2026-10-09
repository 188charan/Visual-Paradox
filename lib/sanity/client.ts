import { createClient, type SanityClient } from 'next-sanity';
import { apiVersion, dataset, isSanityConfigured, projectId } from './env';

/**
 * Shared read client. Null when Sanity isn't configured, so callers must guard
 * — the data layer does this and falls back to demo content.
 */
export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true, // fast, cached reads for a public read-only site
      perspective: 'published',
    })
  : null;
