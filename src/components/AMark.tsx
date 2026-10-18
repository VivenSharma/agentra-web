/* The Agentra "A" glyph (white body + purple gradient dot). */
export function AMark({ className = "h-8 w-8" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/agentra-a.svg" alt="Agentra" className={className} />;
}
