import type { ReactNode } from "react";
import Link from "next/link";

export const linkClass =
  "text-purple-5 underline decoration-purple-4/40 underline-offset-4 transition-colors hover:text-purple-6";

// Inline marks used in the article copy: **bold** and [text](url).
export function Inline({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1]) {
      parts.push(
        <strong key={m.index} className="font-semibold text-fg">
          <Inline text={m[1]} />
        </strong>,
      );
    } else if (m[3].startsWith("/")) {
      parts.push(
        <Link key={m.index} href={m[3]} className={linkClass}>
          {m[2]}
        </Link>,
      );
    } else {
      parts.push(
        <a key={m.index} href={m[3]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {m[2]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
