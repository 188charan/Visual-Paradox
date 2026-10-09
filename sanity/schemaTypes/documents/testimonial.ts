import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'clientName', title: 'Client name', type: 'string' }),
    defineField({ name: 'shootCategory', title: 'Shoot category', type: 'string' }),
    defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
  ],
  preview: { select: { title: 'clientName', subtitle: 'shootCategory' } },
});
