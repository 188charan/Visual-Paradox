import type { SchemaTypeDefinition } from 'sanity';

// Objects
import { galleryImage } from './objects/galleryImage';
import { seo } from './objects/seo';
import { socialLinks } from './objects/socialLinks';

// Documents
import { category } from './documents/category';
import { project } from './documents/project';
import { testimonial } from './documents/testimonial';
import { about } from './documents/about';
import { studioFeature } from './documents/studioFeature';
import { homepage } from './documents/homepage';
import { contactSettings } from './documents/contactSettings';
import { studioSettings } from './documents/studioSettings';

export const schemaTypes: SchemaTypeDefinition[] = [
  // objects
  galleryImage,
  seo,
  socialLinks,
  // documents
  studioSettings,
  category,
  project,
  testimonial,
  homepage,
  about,
  studioFeature,
  contactSettings,
];
