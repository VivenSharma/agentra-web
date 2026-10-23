import { isPlaceholder } from "@/lib/sectors";

// Renders copy as-is, or, while it is still a [PLACEHOLDER], as a dashed
// slot so nobody mistakes it for signed-off content.
export function Copy({ text, className = "" }: { text: string; className?: string }) {
  if (!isPlaceholder(text)) return <p className={className}>{text}</p>;
  return (
    <p className="rounded-xl border border-dashed border-purple-4/40 bg-purple-3/[0.06] px-4 py-3 font-mono text-sm text-purple-5">
      {text}
    </p>
  );
}
