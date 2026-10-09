import { defineField, defineType } from 'sanity';

/** Contact / booking configuration. Singleton. Placeholders until real. */
export const contactSettings = defineType({
  name: 'contactSettings',
  title: 'Contact settings',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp number (digits only)',
      type: 'string',
      description: 'International format without symbols, e.g. 919000000000',
    }),
    defineField({ name: 'social', title: 'Social', type: 'socialLinks' }),
  ],
  preview: { select: { title: 'email' } },
});
