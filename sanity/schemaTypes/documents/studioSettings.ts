import { defineField, defineType } from 'sanity';

/** Global studio settings. Singleton. */
export const studioSettings = defineType({
  name: 'studioSettings',
  title: 'Studio settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Studio name', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'area', title: 'Area', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'region', title: 'Region', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
      ],
    }),
    defineField({ name: 'seo', title: 'Default SEO', type: 'seo' }),
  ],
  preview: { select: { title: 'title' } },
});
