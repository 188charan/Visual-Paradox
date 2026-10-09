import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { projectId, dataset } from './lib/sanity/env';

/**
 * Sanity Studio configuration.
 *
 * Run the studio locally with `pnpm studio:dev` (uses the Sanity CLI, not the
 * Next build). Deploy a hosted studio with `pnpm studio:deploy`. The schemas
 * here match the app's content types 1:1 so the frontend keeps consuming the
 * same ContentSource interface.
 */
export default defineConfig({
  name: 'thevisualparadox',
  title: 'TheVisualParadox Studio',
  projectId: projectId || 'placeholder-project-id',
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
