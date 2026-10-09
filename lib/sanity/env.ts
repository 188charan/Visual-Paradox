/**
 * Sanity environment configuration. The app runs perfectly without any of
 * these set — it simply uses the demo ContentSource. These only matter once a
 * real Sanity project is connected.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-10-01';

/** True only when a project id is present — the switch the data layer checks. */
export const isSanityConfigured = projectId.length > 0;
