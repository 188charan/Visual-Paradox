import { defineField, defineType } from 'sanity';

/** Social links — placeholders until real accounts exist. */
export const socialLinks = defineType({
  name: 'socialLinks',
  title: 'Social links',
  type: 'object',
  fields: [
    defineField({ name: 'instagramHandle', title: 'Instagram handle', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
  ],
});
