import { defineArrayMember, defineField, defineType } from 'sanity';

/** A shoot / project. Route: /work/[category]/[project]. */
export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt text', type: 'string' },
        {
          name: 'orientation',
          title: 'Orientation',
          type: 'string',
          options: {
            list: ['landscape', 'portrait', 'square'],
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [defineArrayMember({ type: 'galleryImage' })],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'seoTitle', title: 'SEO title', type: 'string' }),
    defineField({ name: 'seoDescription', title: 'SEO description', type: 'text', rows: 2 }),
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'category.name', media: 'coverImage' },
  },
});
