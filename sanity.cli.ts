import { defineCliConfig } from 'sanity/cli';
import { projectId, dataset } from './lib/sanity/env';

export default defineCliConfig({
  api: { projectId, dataset },
});
