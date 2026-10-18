// Team headshot with the site's signature hover: greyscale still by default,
// cross-fading to the animated colour variant on hover (or simply to colour
// when no animated variant exists). Pure CSS, so it stays
// a Server Component. The parent must carry the `group` class.
export function Portrait({
  src,
  hoverSrc,
  alt,
  className = "aspect-[4/5]",
}: {
  src: string;
  hoverSrc?: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl bg-surface ring-1 ring-white/10 transition-[box-shadow] duration-500 group-hover:ring-purple-4/40 ${className}`}
    >
      {/* eslint-disable @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover grayscale duration-500 ${
          hoverSrc
            ? "transition-opacity group-hover:opacity-0"
            : // No animated variant yet: reveal colour on hover instead
              "transition-[filter] group-hover:grayscale-0"
        }`}
      />
      {hoverSrc && (
        <img
          src={hoverSrc}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-105 object-cover opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
        />
      )}
      {/* eslint-enable @next/next/no-img-element */}
      {/* Bottom scrim so the frame reads as one object against the black page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
