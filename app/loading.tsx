/**
 * Minimal branded loading state. Shown only when a route genuinely suspends.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-ink-900">
      <div className="flex flex-col items-center gap-4">
        <span className="font-sans text-[11px] uppercase tracking-meta text-ash">
          THEVISUALPARADOX
        </span>
        <span className="relative h-px w-40 overflow-hidden bg-ink-500">
          <span className="absolute inset-y-0 left-0 w-1/3 animate-[loaderSlide_1.1s_ease-in-out_infinite] bg-champagne" />
        </span>
      </div>
    </div>
  );
}
