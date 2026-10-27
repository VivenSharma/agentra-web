"use client";

import { useEffect, useRef, useState } from "react";

// Interactive graphic from /public/embeds. The embed posts its own height
// ({ agentraEmbedHeight }) so the frame grows with it and never scrolls.
export function ArticleEmbed({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(720);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source !== ref.current?.contentWindow) return;
      const h = e.data?.agentraEmbedHeight;
      if (typeof h === "number" && h > 0) setHeight(h);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="py-2">
      <iframe
        ref={ref}
        src={src}
        title={title}
        height={height}
        loading="lazy"
        className="block w-full rounded-2xl border-0"
      />
    </div>
  );
}
