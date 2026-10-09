import { defineField, defineType } from 'sanity';

/**
 * Reusable image object carrying the metadata the frontend needs: meaningful
 * alt text, an optional caption, orientation (drives editorial composition),
 * and an order for manual sequencing.
 */
export const galleryImage = defineType({
  name: 'galleryImage',
  title: 'Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the photograph for accessibility and SEO. Not "image1".',
      validation: (rule) => rule.required().min(3),
    }),
    defineField({ name: 'caption', title: 'Caption', type: 'string' }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Square', value: 'square' },
        ],
        layout: 'radio',
      },
      initialValue: 'landscape',
    }),
    defineField({ name: 'order', title: 'Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'alt', media: 'image' },
  },
});
