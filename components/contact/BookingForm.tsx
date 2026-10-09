'use client';

import { useState, useTransition } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { track } from '@vercel/analytics';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui';
import { Magnetic } from '@/components/animations';
import { submitBooking } from '@/app/actions/booking';
import {
  bookingSchema,
  collectFieldErrors,
  type BookingFieldErrors,
  type BookingInput,
} from '@/lib/validation/booking';

const EMPTY: BookingInput = {
  name: '',
  email: '',
  phone: '',
  photographyType: '',
  preferredDate: '',
  message: '',
};

/**
 * Premium booking form. Validates with the shared Zod schema on the client,
 * then calls the server action which re-validates authoritatively. On success
 * it swaps to a branded confirmation rather than a plain "submitted" message.
 */
export function BookingForm({ photographyTypes }: { photographyTypes: string[] }) {
  const [values, setValues] = useState<BookingInput>(EMPTY);
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [pending, startTransition] = useTransition();

  const set = (key: keyof BookingInput, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('idle');
    const parsed = bookingSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(collectFieldErrors(parsed.error));
      return;
    }
    setErrors({});
    startTransition(async () => {
      const result = await submitBooking(parsed.data);
      if (result.status === 'success') {
        // Useful, non-invasive conversion signal (no PII sent).
        track('booking_submitted', { photographyType: parsed.data.photographyType });
        setStatus('success');
        setValues(EMPTY);
      } else {
        setErrors(result.errors ?? {});
        setStatus('error');
      }
    });
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-6 border-t border-ink-500 pt-12">
        <p className="font-sans text-[11px] uppercase tracking-meta text-champagne/70">
          Enquiry received
        </p>
        <h2 className="font-serif text-[clamp(2.2rem,6vw,4.5rem)] font-light leading-[0.95] tracking-tight3 text-bone">
          Thank you.
          <br />
          <span className="text-champagne/90">Your story starts here.</span>
        </h2>
        <p className="max-w-md font-sans text-base leading-relaxed text-ash">
          We&apos;ll be in touch shortly. In the meantime, feel free to keep exploring the work.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          data-cursor-interactive
          className="font-sans text-[11px] uppercase tracking-meta text-ash transition-colors hover:text-bone"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="flex flex-col gap-10">
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        <Field
          label="Name"
          id="name"
          value={values.name}
          onChange={(v) => set('name', v)}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          label="Email"
          id="email"
          type="email"
          value={values.email}
          onChange={(v) => set('email', v)}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          label="Phone (optional)"
          id="phone"
          type="tel"
          value={values.phone ?? ''}
          onChange={(v) => set('phone', v)}
          error={errors.phone}
          autoComplete="tel"
        />
        <SelectField
          label="Photography type"
          id="photographyType"
          value={values.photographyType}
          onChange={(v) => set('photographyType', v)}
          error={errors.photographyType}
          options={photographyTypes}
        />
        <Field
          label="Preferred date (optional)"
          id="preferredDate"
          type="date"
          value={values.preferredDate ?? ''}
          onChange={(v) => set('preferredDate', v)}
          error={errors.preferredDate}
        />
      </div>

      <TextAreaField
        label="Message"
        id="message"
        value={values.message}
        onChange={(v) => set('message', v)}
        error={errors.message}
      />

      {status === 'error' && (
        <p role="alert" className="font-sans text-sm text-champagne">
          Please check the highlighted fields and try again.
        </p>
      )}

      <Magnetic>
        <Button type="submit" variant="solid" size="md" disabled={pending} data-cursor-interactive>
          {pending ? 'Sending…' : 'Send enquiry'}
          <ArrowUpRight className="h-4 w-4" />
        </Button>
      </Magnetic>
    </form>
  );
}

/* ---- Field primitives (editorial underline style, not boxed inputs) ---- */

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}

const fieldBase =
  'w-full border-b bg-transparent py-3 font-sans text-base text-bone outline-none transition-colors placeholder:text-ash-dim focus:border-champagne';

function Field({ label, id, value, onChange, error, type = 'text', autoComplete }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-[11px] uppercase tracking-meta text-ash">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, error ? 'border-champagne' : 'border-ink-500')}
      />
      {error && (
        <span id={`${id}-error`} className="font-sans text-xs text-champagne">
          {error}
        </span>
      )}
    </div>
  );
}

function SelectField({
  label,
  id,
  value,
  onChange,
  error,
  options,
}: FieldProps & { options: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-[11px] uppercase tracking-meta text-ash">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          fieldBase,
          'appearance-none [&>option]:bg-ink-800 [&>option]:text-bone',
          error ? 'border-champagne' : 'border-ink-500',
          value ? 'text-bone' : 'text-ash-dim',
        )}
      >
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} className="font-sans text-xs text-champagne">
          {error}
        </span>
      )}
    </div>
  );
}

function TextAreaField({ label, id, value, onChange, error }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-sans text-[11px] uppercase tracking-meta text-ash">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldBase, 'resize-none', error ? 'border-champagne' : 'border-ink-500')}
      />
      {error && (
        <span id={`${id}-error`} className="font-sans text-xs text-champagne">
          {error}
        </span>
      )}
    </div>
  );
}
