import { defineField, defineType } from 'sanity';

/** SEO metadata reusable on any document. */
export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({
      name: 'title',
      title: 'SEO title',
      type: 'string',
      validation: (rule) => rule.max(70).warning('Keep under ~70 characters'),
    }),
    defineField({
      name: 'description',
      title: 'SEO description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep under ~160 characters'),
    }),
    defineField({ name: 'ogImage', title: 'Social share image', type: 'image' }),
  ],
});
