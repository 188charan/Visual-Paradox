import { defineField, defineType } from 'sanity';

/** A capability / studio feature block (People, Moments, Brands groupings etc.). */
export const studioFeature = defineType({
  name: 'studioFeature',
  title: 'Studio feature',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'title', media: 'image' } },
});
