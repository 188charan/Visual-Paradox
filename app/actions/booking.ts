'use server';

import {
  bookingSchema,
  collectFieldErrors,
  type BookingFieldErrors,
  type BookingInput,
} from '@/lib/validation/booking';

export interface BookingResult {
  status: 'success' | 'error';
  errors?: BookingFieldErrors;
  message?: string;
}

/**
 * Server-side enquiry handler.
 *
 * Validation runs here authoritatively (never trusting the client). In this
 * phase there is intentionally NO email provider wired up — enquiries are logged
 * server-side so the flow is development-safe and no secret is invented. To go
 * live, send `parsed.data` to an email/CRM provider (e.g. Resend) from here
 * using a server-only secret (never a NEXT_PUBLIC_ var).
 */
export async function submitBooking(values: BookingInput): Promise<BookingResult> {
  const parsed = bookingSchema.safeParse(values);

  if (!parsed.success) {
    return { status: 'error', errors: collectFieldErrors(parsed.error) };
  }

  const data = parsed.data;
  // Development-safe sink. Replace with a provider integration for production.
  console.info('[booking] new enquiry received', {
    name: data.name,
    email: data.email,
    phone: data.phone || '—',
    photographyType: data.photographyType,
    preferredDate: data.preferredDate || '—',
    messagePreview: data.message.slice(0, 80),
  });

  return { status: 'success' };
}
