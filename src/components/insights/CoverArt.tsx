import type { CoverBlock } from "@/lib/insights";

// Editorial cover treatment borrowed in spirit from Jasper's resource art:
// a grainy monochrome photo with one solid block of the brand purple.
// PLACEHOLDER source: picsum by seed until real cover art is commissioned.
const blockClass: Record<CoverBlock, string> = {
  tl: "left-0 top-0 h-[38%] w-[30%]",
  br: "bottom-0 right-0 h-[34%] w-[26%]",
  band: "inset-x-0 bottom-0 h-[13%]",
};

export function CoverArt({
  seed,
  block = "br",
  src,
  alt = "",
  className = "aspect-[16/10]",
  eager = false,
}: {
  seed?: string;
  block?: CoverBlock;
  src?: string;
  alt?: string;
  className?: string;
  eager?: boolean;
}) {
  const url = src ?? `https://picsum.photos/seed/${seed}/1200/800?grayscale`;
  return (
    <div
      className={`relative isolate overflow-hidden rounded-2xl bg-surface ring-1 ring-white/10 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={url}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.7] contrast-125 grayscale transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      {/* Cool the greys toward the brand hue */}
      <div className="absolute inset-0 bg-purple-1 opacity-40 mix-blend-color" />
      <div
        className={`absolute bg-purple-3 opacity-90 transition-opacity duration-500 group-hover:opacity-100 ${blockClass[block]}`}
      />
      <div className="cover-grain pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay" />
    </div>
  );
}
