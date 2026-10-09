import { defineArrayMember, defineField, defineType } from 'sanity';

/** Editable homepage content + section selection. Singleton. */
export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'heroHeadline', title: 'Hero headline', type: 'string' }),
    defineField({ name: 'heroTagline', title: 'Hero tagline', type: 'string' }),
    defineField({ name: 'introStatement', title: 'Intro statement', type: 'text', rows: 3 }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured projects',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'project' }] })],
    }),
    defineField({
      name: 'featuredCategories',
      title: 'Featured categories',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'category' }] })],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
    }),
    defineField({ name: 'bookingHeadline', title: 'Booking CTA headline', type: 'string' }),
  ],
  preview: { select: { title: 'heroHeadline' } },
});
