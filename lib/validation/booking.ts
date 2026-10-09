import { z } from 'zod';

// Simple, dependency-free email shape (avoids zod version-specific format APIs).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Booking / enquiry schema. Shared by the client form and the server action so
 * validation rules can never drift between the two.
 */
export const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Please share your name').max(80),
  email: z.string().trim().regex(EMAIL_RE, 'Enter a valid email address'),
  phone: z
    .string()
    .trim()
    .max(20)
    .optional()
    .or(z.literal('')),
  photographyType: z.string().trim().min(1, 'Choose a photography type'),
  preferredDate: z.string().trim().optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Tell us a little about the shoot').max(2000),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export type BookingFieldErrors = Partial<Record<keyof BookingInput, string>>;

/** Collapse Zod issues into one message per field for the UI. */
export function collectFieldErrors(error: z.ZodError<BookingInput>): BookingFieldErrors {
  const errors: BookingFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !errors[key as keyof BookingInput]) {
      errors[key as keyof BookingInput] = issue.message;
    }
  }
  return errors;
}
