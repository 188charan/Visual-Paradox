import { defineArrayMember, defineField, defineType } from 'sanity';

/** About / studio story. Singleton (edited once). */
export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'story', title: 'Story', type: 'array', of: [defineArrayMember({ type: 'block' })] }),
    defineField({ name: 'philosophy', title: 'Philosophy', type: 'text', rows: 3 }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'text', title: 'Text', type: 'text', rows: 2 },
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading' } },
});
