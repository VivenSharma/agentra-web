import Link from "next/link";
import Image from "next/image";

/** Official Agentra wordmark (white, for the dark theme). */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Agentra home"
    >
      <Image
        src="/brand/agentra-white.svg"
        alt="Agentra"
        width={142}
        height={40}
        priority
        className="h-8 w-auto"
      />
    </Link>
  );
}
